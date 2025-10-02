import { getAbsoluteUrl } from "@/utils/get-absolute-url";
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: getAbsoluteUrl(),
});
