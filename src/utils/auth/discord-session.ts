export interface DiscordProviderToken {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  scopes: string[];
}

function coerceScopes(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter(
      (scope): scope is string => typeof scope === "string" && scope.length > 0
    );
  }

  if (typeof value === "string" && value.length > 0) {
    return value.split(/[ ,]+/).filter(Boolean);
  }

  return [];
}

function coerceTimestamp(value: unknown): string | undefined {
  if (!value) return undefined;

  if (typeof value === "number") {
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

function coerceAccountList(value: unknown): unknown[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>);
  }

  return [];
}

function extractFromProviderToken(
  candidate: unknown
): DiscordProviderToken | null {
  if (!candidate || typeof candidate !== "object") {
    return null;
  }

  const accessToken =
    (candidate as any).access_token ??
    (candidate as any).accessToken ??
    (candidate as any).token;
  if (typeof accessToken !== "string" || accessToken.length === 0) {
    return null;
  }

  const refreshToken =
    (candidate as any).refresh_token ?? (candidate as any).refreshToken;

  console.log("Extracted Discord token:", { accessToken, refreshToken });

  return {
    accessToken,
    refreshToken:
      typeof refreshToken === "string" && refreshToken.length > 0
        ? refreshToken
        : undefined,
    expiresAt: coerceTimestamp(
      (candidate as any).expires_at ??
        (candidate as any).expiresAt ??
        (candidate as any).expiry ??
        (candidate as any).accessTokenExpiresAt
    ),
    scopes: coerceScopes((candidate as any).scope ?? (candidate as any).scopes),
  };
}

function extractFromAccount(account: unknown): DiscordProviderToken | null {
  if (!account || typeof account !== "object") {
    return null;
  }

  const rawProvider =
    (account as any).providerId ??
    (account as any).provider ??
    (account as any).provider_id;
  if (
    typeof rawProvider !== "string" ||
    rawProvider.toLowerCase() !== "discord"
  ) {
    return null;
  }

  const accessToken =
    (account as any).accessToken ?? (account as any).access_token;
  if (typeof accessToken !== "string" || accessToken.length === 0) {
    return null;
  }

  const refreshToken =
    (account as any).refreshToken ?? (account as any).refresh_token;

  return {
    accessToken,
    refreshToken:
      typeof refreshToken === "string" && refreshToken.length > 0
        ? refreshToken
        : undefined,
    expiresAt: coerceTimestamp(
      (account as any).accessTokenExpiresAt ??
        (account as any).access_token_expires_at ??
        (account as any).expires_at ??
        (account as any).expiresAt
    ),
    scopes: coerceScopes((account as any).scope ?? (account as any).scopes),
  };
}

function collectPotentialAccounts(session: any): unknown[] {
  const sources = [
    session?.accounts,
    session?.user?.accounts,
    session?.session?.accounts,
    session?.session?.user?.accounts,
  ];

  const aggregated: unknown[] = [];
  for (const source of sources) {
    const accounts = coerceAccountList(source);
    if (accounts.length > 0) {
      aggregated.push(...accounts);
    }
  }
  return aggregated;
}

export function extractDiscordTokenFromSession(
  session: unknown
): DiscordProviderToken | null {
  if (!session || typeof session !== "object") {
    return null;
  }

  const candidates = [
    (session as any).providerTokens?.discord,
    (session as any).providerTokens?.Discord,
    (session as any).providerTokens?.DISCORD,
    (session as any).session?.providerTokens?.discord,
    (session as any).session?.providerTokens?.Discord,
    (session as any).session?.providerTokens?.DISCORD,
  ];

  for (const candidate of candidates) {
    const token = normalizeDiscordToken(candidate);
    if (token) {
      return token;
    }
  }

  const accounts = collectPotentialAccounts(session as any);
  for (const account of accounts) {
    const token = normalizeDiscordToken(account);
    if (token) {
      return token;
    }
  }

  return null;
}

export function normalizeDiscordToken(
  candidate: unknown
): DiscordProviderToken | null {
  return extractFromProviderToken(candidate) ?? extractFromAccount(candidate);
}

export function resolveDiscordUserId(session: unknown): string | null {
  if (!session || typeof session !== "object") {
    return null;
  }

  const candidates = [
    (session as any).user?.id,
    (session as any).session?.user?.id,
    (session as any).session?.userId,
    (session as any).session?.user?.userId,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.length > 0) {
      return candidate;
    }
  }

  return null;
}
