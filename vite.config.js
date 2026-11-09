import { defineConfig } from "vite";

// Social crawlers need an absolute URL in the server-rendered HTML.
// Default to the confirmed public site. SITE_URL overrides this for a future custom domain.
export function socialImageUrl(env = process.env) {
  const domain =
    env.SITE_URL || "https://autoforgemobilerepair-demo.vercel.app";
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
