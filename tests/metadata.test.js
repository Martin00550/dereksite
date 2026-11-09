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
