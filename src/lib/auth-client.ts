import { getBetterAuthUrl } from "@/utils/get-absolute-url";
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: getBetterAuthUrl(),
});
