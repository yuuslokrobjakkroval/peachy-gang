import { getAbsoluteUrl } from "../../utils/get-absolute-url";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${getAbsoluteUrl()}/sitemap.xml`,
  };
}
