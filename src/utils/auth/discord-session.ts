export interface DiscordProviderToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  scopes: string[];
}

function coerceScopes(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((scope): scope is string => typeof scope === "string");
  }

  if (typeof value === "string" && value.length > 0) {
    return value.split(/[ ,]+/).filter(Boolean);
  }

  return [];
}

function coerceTimestamp(value: unknown): string | undefined {
  if (!value) return undefined;

  if (typeof value === "number") {
    // Discord provider tokens are usually seconds since epoch
    const millis = value > 1e12 ? value : value * 1000;
    return new Date(millis).toISOString();
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed)) {
      return coerceTimestamp(parsed);
    }

    const date = new Date(value);
    if (!Number.isNaN(date.valueOf())) {
      return date.toISOString();
    }
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return undefined;
}

export function extractDiscordTokenFromSession(
  session: unknown
): DiscordProviderToken | null {
  if (!session || typeof session !== "object") {
    return null;
  }

  const candidate =
    (session as any).providerTokens?.discord ??
    (session as any).session?.providerTokens?.discord ??
    (session as any).session?.providerTokens?.Discord ??
    (session as any).session?.providerTokens?.DISCORD ??
    null;

  if (!candidate) {
    return null;
  }

  const accessToken = candidate.access_token ?? candidate.accessToken;
  if (typeof accessToken !== "string" || accessToken.length === 0) {
    return null;
  }

  const refreshToken =
    candidate.refresh_token ?? candidate.refreshToken ?? undefined;

  return {
    accessToken,
    refreshToken,
    expiresAt: coerceTimestamp(
      candidate.expires_at ?? candidate.expiresAt ?? candidate.expiry
    ),
    scopes: coerceScopes(candidate.scope ?? candidate.scopes),
  };
}
