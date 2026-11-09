const pendingMounts = new WeakMap();

// Keep both photos at full width; reveal with clipping rather than resizing.
export function mountComparison(host, { before, after }) {
  if (!host || !before || !after) return false;
  const request = Symbol("comparison");
  pendingMounts.set(host, request);
  host.dataset.comparisonState = "loading";
  const label = document.createElement("label");
  label.className = "comparison";
  label.style.setProperty("--reveal", "50%");
  const picture = (src, alt, className) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.className = className;
    img.width = 960;
    img.height = className === "comparison-before" ? 444 : 512;
    img.decoding = "async";
    img.fetchPriority = className === "comparison-after" ? "high" : "auto";
    return img;
  };
  const afterImage = picture(
    after,
    "Blue car after body repairs",
    "comparison-after",
  );
  const beforeImage = picture(
    before,
    "Blue car before body repairs, showing damage to the driver-side doors and window",
    "comparison-before",
  );
  label.append(afterImage, beforeImage);
  const overlays = document.createElement("div");
  overlays.className = "comparison-overlays";
  overlays.innerHTML =
    '<span class="comparison-label before-label">BEFORE</span><span class="comparison-label after-label">AFTER</span><span class="comparison-divider"><span>‹ ›</span></span><span class="comparison-hint">Slide to compare · Actual repair photos</span>';
  label.append(overlays);
  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = "0";
  slider.max = "100";
  slider.value = "50";
  slider.className = "comparison-range";
  slider.setAttribute(
    "aria-label",
    "Compare blue car before and after repairs",
  );
  slider.setAttribute("aria-valuetext", "50% before, 50% after");
  const sync = () => {
    label.style.setProperty("--reveal", `${slider.value}%`);
    slider.setAttribute(
      "aria-valuetext",
      `${slider.value}% before, ${100 - Number(slider.value)}% after`,
    );
  };
  slider.addEventListener("input", sync);
  slider.setAttribute(
    "aria-description",
    "Before and after photos were taken from different camera angles. Use arrow keys or drag to compare.",
  );
  let activePointer = null;
  const move = (event) => {
    const bounds = slider.getBoundingClientRect();
    if (!bounds.width) return;
    slider.value = String(
      Math.round(
        Math.max(
          0,
          Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100),
        ),
      ),
    );
    sync();
  };
  slider.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    event.preventDefault();
    slider.focus({ preventScroll: true });
    activePointer = event.pointerId;
    slider.setPointerCapture(event.pointerId);
    move(event);
  });
  slider.addEventListener("pointermove", (event) => {
    if (event.pointerId === activePointer) move(event);
  });
  slider.addEventListener("pointerup", (event) => {
    if (event.pointerId !== activePointer) return;
    move(event);
    activePointer = null;
    if (slider.hasPointerCapture(event.pointerId))
      slider.releasePointerCapture(event.pointerId);
  });
  slider.addEventListener("pointercancel", () => {
    activePointer = null;
  });
  slider.addEventListener("lostpointercapture", () => {
    activePointer = null;
  });
  label.append(slider);
  // Preserve the existing hero if either photograph cannot load.
  const loaded = (img) =>
    new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      if (img.complete) img.naturalWidth ? resolve() : reject();
    });
  Promise.all([loaded(beforeImage), loaded(afterImage)])
    .then(() => {
      if (pendingMounts.get(host) !== request) return;
      host.dataset.comparisonState = "ready";
      host.replaceChildren(label);
      host.classList.add("has-comparison");
      host.setAttribute(
        "aria-label",
        "Blue car body repair: compare before and after photographs",
      );
    })
    .catch(() => {
      if (pendingMounts.get(host) === request)
        host.dataset.comparisonState = "error";
      // Keep the current visual if either photo fails; never show a broken image.
    });
  return true;
}
