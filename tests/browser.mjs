import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import assert from "node:assert/strict";
const server = spawn(
  process.execPath,
  [
    "node_modules/vite/bin/vite.js",
    "--host",
    "127.0.0.1",
    "--port",
    "4175",
    "--strictPort",
  ],
  { stdio: "pipe" },
);
let browser;
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch("http://127.0.0.1:4175")).ok) {
        ready = true;
        break;
      }
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  assert.ok(ready);
  browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:4175");
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `overflow at ${width}`,
    );
  }
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator(".service-card").count(), 6);
  const text = await page.locator("body").innerText();
  assert.doesNotMatch(text, /Oak & Fern|landscaping|Galway|€|353/);
  assert.match(text, /call-out fee/);
  assert.match(text, /credited toward your labor cost/);
  assert.match(text, /U.S. by arrangement/);
  for (const link of await page.locator('a[target="_blank"]').all()) {
    assert.ok(
      [
        "https://www.facebook.com/profile.php?id=61594562596712",
        "https://m.me/61594562596712",
      ].includes(await link.getAttribute("href")),
    );
    assert.match(await link.getAttribute("rel"), /noopener/);
  }
  for (const a of await page.locator('a[href^="#"]').all()) {
    const id = await a.getAttribute("href");
    assert.equal(await page.locator(id).count(), 1);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  assert.equal(await page.locator("#mobile-nav").isVisible(), true);
  await page.locator("#mobile-nav a").first().click();
  assert.equal(await page.locator("#mobile-nav").isVisible(), false);
  await page.locator("#faq details").first().locator("summary").click();
  assert.equal(
    await page.locator("#faq details").first().getAttribute("open"),
    "",
  );
  assert.deepEqual(errors, []);
  assert.equal(await page.locator(".review-card").count(), 6);
  assert.equal(await page.locator(".review-card img").count(), 0);
  const names = await page.locator(".review-author strong").allTextContents();
  assert.equal(new Set(names).size, 6);
  assert.ok(names.includes("Linda M. Thompson"));
  assert.equal(
    await page
      .getByRole("img", { name: "5 out of 5 stars", exact: true })
      .count(),
    6,
  );
  await page.locator(".review-card").first().locator("summary").click();
  assert.match(
    await page
      .locator(".review-card")
      .first()
      .locator(".review-full p")
      .innerText(),
    /I had such a great experience with Derek!/,
  );
  const beforeScroll = await page
    .locator(".review-grid")
    .evaluate((el) => el.scrollLeft);
  await page
    .locator(".review-grid")
    .evaluate((el) => el.scrollBy({ left: 320, behavior: "instant" }));
  assert.ok(
    (await page.locator(".review-grid").evaluate((el) => el.scrollLeft)) >
      beforeScroll,
  );
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS: six unique text-only reviews, exact full review expansion, five-star labels and mobile review scrolling.",
  );
  assert.equal(
    await page.locator('form, textarea, input:not([type="range"])').count(),
    0,
  );
  assert.doesNotMatch(
    await page.locator("body").innerText(),
    /Prepare a repair enquiry|Prepare my message|Copy message/,
  );
  assert.equal(await page.locator(".hero .actions a").count(), 1);
  for (const selector of [
    ".hero .actions a",
    ".service-link",
    ".contact-panel > .button",
    ".mobile-booking a",
  ]) {
    for (const link of await page.locator(selector).all()) {
      assert.equal(
        await link.getAttribute("href"),
        "https://m.me/61594562596712",
      );
    }
  }
  await page.locator(".contact-panel > .button").scrollIntoViewIfNeeded();
  await page.locator(".mobile-booking").waitFor({ state: "hidden" });
  await page.locator(".hero").scrollIntoViewIfNeeded();
  await page.locator(".mobile-booking").waitFor({ state: "visible" });
  assert.deepEqual(errors, []);
  console.log(
    "PASS: no enquiry form, single hero CTA, direct Messenger service links and mobile contact visibility.",
  );
  mkdirSync("test-results", { recursive: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "test-results/derek-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: "test-results/derek-desktop.png",
    fullPage: true,
  });
  await page.evaluate(async () => {
    const { mountComparison } = await import("/src/comparison.js");
    const svg = (color) =>
      "data:image/svg+xml," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="500"><rect width="960" height="500" fill="${color}"/></svg>`,
      );
    mountComparison(document.querySelector(".hero-art"), {
      before: svg("red"),
      after: svg("blue"),
    });
  });
  const range = page.getByRole("slider", {
    name: "Compare blue car before and after repairs",
  });
  await range.waitFor();
  await range.focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await range.inputValue(), "51");
  assert.equal(
    await range.getAttribute("aria-valuetext"),
    "51% before, 49% after",
  );
  await range.fill("0");
  await range.dispatchEvent("input");
  assert.equal(
    await page
      .locator(".comparison")
      .evaluate((el) => el.style.getPropertyValue("--reveal")),
    "0%",
  );
  await range.fill("100");
  await range.dispatchEvent("input");
  assert.equal(
    await range.getAttribute("aria-valuetext"),
    "100% before, 0% after",
  );
  console.log(
    "PASS: hero comparison loads images, responds to keyboard and reaches both reveal endpoints.",
  );
  console.log(
    "PASS: six widths, services, booking policy, Facebook links, section links, mobile navigation, FAQs, no browser errors.",
  );
} finally {
  await browser?.close();
  server.kill();
}
