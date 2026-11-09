import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import assert from "node:assert/strict";
const server = spawn(
  process.execPath,
  [
    "node_modules/vite/bin/vite.js",
    ...(process.env.TEST_PRODUCTION ? ["preview"] : []),
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
  await page.waitForFunction(
    () =>
      document.querySelector(".hero-art").dataset.comparisonState === "ready",
  );
  assert.equal(await page.locator(".hero-art .comparison img").count(), 2);
  for (const img of await page.locator(".hero-art .comparison img").all()) {
    assert.ok(
      await img.evaluate(
        (el) =>
          el.naturalWidth > 0 && new URL(el.src).origin === location.origin,
      ),
    );
  }
  const socialImage = await page.evaluate(async () => {
    const img = new Image();
    img.src = "/og-image.jpg";
    await img.decode();
    return [img.naturalWidth, img.naturalHeight];
  });
  assert.deepEqual(socialImage, [1200, 630]);
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
  assert.equal(await page.locator(".project-card").count(), 4);
  for (const card of await page.locator(".project-card").all()) {
    assert.equal(
      await card.locator('[data-state="before"]').getAttribute("aria-pressed"),
      "true",
    );
    assert.equal(
      await card.locator(".project-photo-label").textContent(),
      "Before",
    );
    assert.match(
      await card.locator(".project-photo").getAttribute("aria-label"),
      /before photo/,
    );
    await card.scrollIntoViewIfNeeded();
    for (const state of ["before", "after"]) {
      await card.locator(`[data-state="${state}"]`).click();
      await card.locator("img").evaluate((img) => img.decode());
      assert.equal(
        await card
          .locator(`[data-state="${state}"]`)
          .getAttribute("aria-pressed"),
        "true",
      );
      assert.ok(
        await card
          .locator("img")
          .evaluate(
            (img) =>
              img.naturalWidth > 0 &&
              new URL(img.src).origin === location.origin,
          ),
      );
    }
    await card.locator(".project-photo").click();
    const dialog = page.locator("#repair-photo-dialog");
    assert.equal(await dialog.isVisible(), true);
    await dialog.locator('[data-state="before"]').click();
    await dialog.locator("img").evaluate((img) => img.decode());
    assert.match(await dialog.locator("h3").innerText(), /Before/);
    assert.equal(
      await dialog
        .locator("img")
        .evaluate((img) => getComputedStyle(img).objectFit),
      "contain",
    );
    await dialog.locator('[data-state="after"]').click();
    await dialog.locator("img").evaluate((img) => img.decode());
    await page.keyboard.press("Escape");
    assert.equal(await dialog.isVisible(), false);
    assert.equal(
      await card
        .locator(".project-photo")
        .evaluate((el) => el === document.activeElement),
      true,
    );
  }
  await page.locator(".workshop-photo").scrollIntoViewIfNeeded();
  await page.locator(".workshop-photo img").evaluate((img) => img.decode());
  assert.ok(
    await page
      .locator(".workshop-photo img")
      .evaluate((img) => img.naturalWidth === 810),
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS: original local hero photos, four gallery pairs, all images load, full-size before/after dialog, Escape and focus return.",
  );
  mkdirSync("test-results", { recursive: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "test-results/derek-mobile.png",
    fullPage: true,
  });
  await page
    .locator(".hero")
    .screenshot({ path: "test-results/hero-mobile.png" });
  await page
    .locator("#work")
    .screenshot({ path: "test-results/gallery-mobile.png" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: "test-results/derek-desktop.png",
    fullPage: true,
  });
  await page
    .locator(".hero")
    .screenshot({ path: "test-results/hero-desktop.png" });
  await page
    .locator("#work")
    .screenshot({ path: "test-results/gallery-desktop.png" });
  if (!process.env.TEST_PRODUCTION) {
    const mountFixture = async () => {
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
    };
    await page.evaluate(mountFixture);
    await page.waitForFunction(
      () =>
        document.querySelector(".hero-art").dataset.comparisonState === "ready",
    );
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
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      const fit = await page.locator(".comparison").evaluate((el) => {
        const box = el.getBoundingClientRect();
        return {
          width: box.width,
          height: box.height,
          fits: [...el.querySelectorAll("img")].every((img) => {
            const b = img.getBoundingClientRect();
            return (
              Math.abs(b.width - box.width) < 1 &&
              Math.abs(b.height - box.height) < 1 &&
              getComputedStyle(img).objectFit === "cover"
            );
          }),
        };
      });
      assert.ok(
        fit.fits && Math.abs(fit.width / fit.height - 15 / 8) < 0.03,
        `image fit at ${width}`,
      );
    }
    await range.scrollIntoViewIfNeeded();
    const box = await range.boundingBox();
    await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.5);
    assert.ok(Math.abs(Number(await range.inputValue()) - 75) <= 1);
    await page.mouse.move(box.x + box.width + 25, box.y + box.height * 0.5);
    assert.equal(await range.inputValue(), "100");
    await page.mouse.move(box.x - 25, box.y + box.height * 0.5);
    assert.equal(await range.inputValue(), "0");
    await page.mouse.up();
    await range.focus();
    await page.keyboard.press("End");
    assert.equal(await range.inputValue(), "100");
    await page.keyboard.press("Home");
    assert.equal(await range.inputValue(), "0");
    // A failed replacement must preserve the current visual.
    await page.evaluate(async () => {
      const { mountComparison } = await import("/src/comparison.js");
      mountComparison(document.querySelector(".hero-art"), {
        before: "data:image/png;base64,invalid",
        after: "data:image/png;base64,invalid",
      });
    });
    await page.waitForFunction(
      () =>
        document.querySelector(".hero-art").dataset.comparisonState === "error",
    );
    assert.equal(await range.count(), 1);
    assert.ok(
      await page
        .locator(".comparison img")
        .first()
        .evaluate((img) => img.naturalWidth > 0),
    );
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const touchPage = await mobileContext.newPage();
    await touchPage.goto("http://127.0.0.1:4175");
    await touchPage.evaluate(mountFixture);
    await touchPage.waitForFunction(
      () =>
        document.querySelector(".hero-art").dataset.comparisonState === "ready",
    );
    const touchSlider = touchPage.getByRole("slider");
    await touchSlider.waitFor();
    await touchSlider.scrollIntoViewIfNeeded();
    const touchBox = await touchSlider.boundingBox();
    const session = await mobileContext.newCDPSession(touchPage);
    const touch = (type, fraction) =>
      session.send("Input.dispatchTouchEvent", {
        type,
        touchPoints:
          type === "touchEnd"
            ? []
            : [
                {
                  x: touchBox.x + touchBox.width * fraction,
                  y: touchBox.y + touchBox.height * 0.5,
                },
              ],
      });
    await touch("touchStart", 0.3);
    await touch("touchMove", 0.7);
    await touch("touchEnd", 0.7);
    assert.ok(Math.abs(Number(await touchSlider.inputValue()) - 70) <= 2);
    await mobileContext.close();
    assert.deepEqual(errors, []);
    console.log(
      "PASS: landscape photo fit at four widths, precise mouse/touch dragging, pointer capture, keyboard endpoints and failed-image fallback.",
    );
    console.log(
      "PASS: hero comparison loads images, responds to keyboard and reaches both reveal endpoints.",
    );
  }
  console.log(
    "PASS: six widths, services, booking policy, Facebook links, section links, mobile navigation, FAQs, no browser errors.",
  );
} finally {
  await browser?.close();
  server.kill();
}
