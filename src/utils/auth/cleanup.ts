import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Clean up expired verification tokens from the database
 * This should be run periodically to prevent database bloat
 */
export async function cleanupExpiredVerifications() {
  try {
    const now = new Date();

    const result = await prisma.verification.deleteMany({
      where: {
        expiresAt: {
          lt: now,
        },
      },
    });

    console.log(`Cleaned up ${result.count} expired verification tokens`);
    return result.count;
  } catch (error) {
    console.error("Error cleaning up expired verifications:", error);
    throw error;
  }
}

/**
 * Clean up verification tokens older than specified hours
 * @param hoursOld - Remove tokens older than this many hours (default: 24)
 */
export async function cleanupOldVerifications(hoursOld: number = 24) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - hoursOld);

    const result = await prisma.verification.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    console.log(
      `Cleaned up ${result.count} old verification tokens (older than ${hoursOld} hours)`
    );
    return result.count;
  } catch (error) {
    console.error("Error cleaning up old verifications:", error);
    throw error;
  }
}

/**
 * Get statistics about verification tokens
 */
export async function getVerificationStats() {
  try {
    const now = new Date();

    const [total, expired, active] = await Promise.all([
      prisma.verification.count(),
      prisma.verification.count({
        where: {
          expiresAt: {
            lt: now,
          },
        },
      }),
      prisma.verification.count({
        where: {
          expiresAt: {
            gte: now,
          },
        },
      }),
    ]);

    return {
      total,
      expired,
      active,
    };
  } catch (error) {
    console.error("Error getting verification stats:", error);
    throw error;
  }
}
