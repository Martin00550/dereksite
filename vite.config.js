import { defineConfig } from "vite";

// Social crawlers need an absolute URL in the server-rendered HTML.
// SITE_URL can select a custom domain; Vercel supplies its domains at build time.
export function socialImageUrl(env = process.env) {
  const domain =
    env.SITE_URL || env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL;
  if (!domain) return "/og-image.jpg"; // Local development only.
  const origin = new URL(domain.includes("://") ? domain : `https://${domain}`);
  if (origin.protocol !== "https:")
    throw new Error("Social preview site URL must use HTTPS");
  return new URL("/og-image.jpg", origin.origin).href;
}

export default defineConfig({
  plugins: [
    {
      name: "absolute-social-preview",
      transformIndexHtml(html) {
        return html.replaceAll(
          'content="/og-image.jpg"',
          `content="${socialImageUrl()}"`,
        );
      },
    },
  ],
});
