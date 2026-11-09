// Keep both photos at full width; reveal with clipping rather than resizing.
export function mountComparison(host, { before, after }) {
  if (!host || !before || !after) return false;
  const label = document.createElement('label');
  label.className = 'comparison';
  label.style.setProperty('--reveal', '50%');
  const picture = (src, alt, className) => {
    const img = document.createElement('img');
    img.src = src; img.alt = alt; img.className = className;
    img.decoding = 'async'; img.fetchPriority = 'high';
    return img;
  };
  const afterImage = picture(after, 'Blue car after body repairs', 'comparison-after');
  const beforeImage = picture(before, 'Blue car before body repairs, showing damage to the driver-side doors and window', 'comparison-before');
  label.append(afterImage, beforeImage);
  const overlays = document.createElement('div');
  overlays.className = 'comparison-overlays';
  overlays.innerHTML = '<span class="comparison-label before-label">BEFORE</span><span class="comparison-label after-label">AFTER</span><span class="comparison-divider"><span>‹ ›</span></span><span class="comparison-hint">Slide to compare · Actual repair photos</span>';
  label.append(overlays);
  const slider = document.createElement('input');
  slider.type = 'range'; slider.min = '0'; slider.max = '100'; slider.value = '50';
  slider.className = 'comparison-range';
  slider.setAttribute('aria-label', 'Compare blue car before and after repairs');
  slider.setAttribute('aria-valuetext', '50% before, 50% after');
  slider.addEventListener('input', () => {
    label.style.setProperty('--reveal', `${slider.value}%`);
    slider.setAttribute('aria-valuetext', `${slider.value}% before, ${100 - Number(slider.value)}% after`);
  });
  label.append(slider);
  // Preserve the existing hero if either photograph cannot load.
  const loaded = img => new Promise((resolve, reject) => {
    img.onload = resolve; img.onerror = reject;
    if (img.complete) img.naturalWidth ? resolve() : reject();
  });
  Promise.all([loaded(beforeImage), loaded(afterImage)]).then(() => {
    host.replaceChildren(label);
    host.classList.add('has-comparison');
  }).catch(() => { /* Existing hero remains visible. */ });
  return true;
}
