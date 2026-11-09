import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { client } from "../src/client-config.js";
test("business metadata and contact identify Derek without old template claims", () => {
  const html = readFileSync("index.html", "utf8");
  assert.match(html, /<title>Derek-AutoForge/);
  assert.match(html, /Travel across the U.S. by arrangement/);
  assert.doesNotMatch(html, /Landscaping|Galway|Oak &amp; Fern/);
  assert.equal(
    new URL(client.facebook).searchParams.get("id"),
    "61594562596712",
  );
  assert.equal(client.services.length, 6);
});

import { reviews } from "../src/reviews.js";
test("supplied reviews are unique and excerpts are literal quotes", () => {
  assert.equal(reviews.length, 6);
  assert.equal(new Set(reviews.map((r) => r.name)).size, 6);
  for (const review of reviews)
    assert.ok(review.text.includes(review.excerpt), review.name);
  assert.equal(
    reviews.filter((r) => r.name === "William J. Anderson").length,
    1,
  );
});

import config, { socialImageUrl } from "../vite.config.js";
test("sharing image resolves to production domain with custom-domain override", () => {
  assert.equal(
    socialImageUrl({
      VERCEL_PROJECT_PRODUCTION_URL: "derek.example",
      VERCEL_URL: "preview.example",
    }),
    "https://derek.example/og-image.jpg",
  );
  assert.equal(
    socialImageUrl({
      SITE_URL: "https://custom.example/some-path",
      VERCEL_PROJECT_PRODUCTION_URL: "derek.example",
    }),
    "https://custom.example/og-image.jpg",
  );
  assert.equal(
    socialImageUrl({ VERCEL_URL: "preview.example" }),
    "https://preview.example/og-image.jpg",
  );
  assert.equal(socialImageUrl({}), "/og-image.jpg");
  assert.throws(
    () => socialImageUrl({ SITE_URL: "http://derek.example" }),
    /HTTPS/,
  );
});
test("sharing image is a compact JPEG and tags are in static HTML", () => {
  const html = readFileSync("index.html", "utf8");
  assert.match(html, /property="og:image" content="\/og-image.jpg"/);
  assert.match(html, /summary_large_image/);
  assert.match(html, /property="og:image:width" content="1200"/);
  assert.match(html, /property="og:image:height" content="630"/);
  const bytes = readFileSync("public/og-image.jpg");
  assert.equal(bytes.readUInt16BE(0), 0xffd8);
  assert.ok(bytes.length < 300000);
});

test("image tags are emitted as absolute URLs in the HTML delivered to crawlers", () => {
  const saved = process.env.SITE_URL;
  try {
    process.env.SITE_URL = "https://derek.example";
    const result = config.plugins[0].transformIndexHtml(
      readFileSync("index.html", "utf8"),
    );
    assert.match(
      result,
      /property="og:image" content="https:\/\/derek.example\/og-image.jpg"/,
    );
    assert.match(
      result,
      /name="twitter:image" content="https:\/\/derek.example\/og-image.jpg"/,
    );
    assert.doesNotMatch(result, /content="\/og-image.jpg"/);
  } finally {
    if (saved === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = saved;
  }
});
