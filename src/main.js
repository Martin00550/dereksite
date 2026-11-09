import { reviews } from "./reviews.js";
import { mountComparison } from "./comparison.js";
import { client as c } from "./client-config.js";
import "./style.css";
const arrow =
  '<span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span>';
const message = (text = "Message Derek", cls = "button") =>
  `<a class="${cls}" href="${c.messenger}" target="_blank" rel="noopener noreferrer">${text} ${arrow}</a>`;
const brand = `<a class="brand" href="#home" aria-label="Derek AutoForge home"><strong>DEREK<span>—</span>AUTOFORGE</strong><small>MOBILE REPAIR</small></a>`;
const nav =
  '<a href="#services">Services</a><a href="#reviews">Reviews</a><a href="#about">Meet Derek</a><a href="#booking">How to book</a><a href="#faq">FAQs</a>';
document.querySelector("#app").innerHTML = `
<div class="topline">PROFESSIONAL AUTO REPAIR. AT YOUR LOCATION. <span>Travel across the U.S. by arrangement <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></div>
<header><div class="container header-inner">${brand}<nav aria-label="Main navigation">${nav}</nav>${message("Message Derek", "button small")}<button class="menu" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav">☰</button></div><nav id="mobile-nav" hidden aria-label="Mobile navigation">${nav}</nav></header>
<main id="main"><section class="hero" id="home"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow"><span class="dot"></span> MOBILE MECHANIC & AUTO BODY REPAIR</p><h1>Any car.<br>Personal care.<br><em>At your location.</em></h1><p class="lead">Mobile mechanic and auto body repair, with a real conversation before any work begins. Tell Derek what’s wrong. Agree on the next step together.</p><div class="actions">${message("Message Derek")}<a href="#contact" class="text-link">Prepare a repair enquiry <span>↓</span></a></div><p class="hero-foot">Home or work. Near or far. Visits agreed individually.</p><a class="hero-review-link" href="#reviews"><span class="review-stars" aria-hidden="true">★★★★★</span><span>Real experiences. In their words.</span><span aria-hidden="true">↓</span></a></div><div class="hero-art" aria-label="Automotive service illustration"><div class="art-top"><span>AUTO CARE, WITHOUT THE RUNAROUND</span><span>MOBILE REPAIR</span></div><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><svg class="car" viewBox="0 0 620 340" fill="none" aria-hidden="true"><path d="M75 221 100 160 181 143 237 79 394 79 462 142 533 164 553 224 536 248H85Z" fill="#152e48" stroke="#78c6ff" stroke-width="3"/><path d="m202 141 43-48h64v48Zm123-48h61l52 48H325Z" fill="#07131f" stroke="#448fbe" stroke-width="2"/><path d="M96 179h58l-12 19H87m388-21h57l10 22h-54" fill="#aee4ff"/><path d="M177 214h257m-90-57h24M105 247h424" stroke="#4a8bb8" stroke-width="3"/><circle cx="173" cy="241" r="44" fill="#080f19" stroke="#6da5ce" stroke-width="3"/><circle cx="173" cy="241" r="25" stroke="#41647f" stroke-width="9"/><circle cx="456" cy="241" r="44" fill="#080f19" stroke="#6da5ce" stroke-width="3"/><circle cx="456" cy="241" r="25" stroke="#41647f" stroke-width="9"/></svg><div class="art-caption"><span class="dot"></span> READY FOR WHAT’S NEXT.</div><div class="art-bottom"><strong>ANY CAR.<br>PERSONAL CARE.</strong><span>Mobile mechanic<br>& auto body repair</span></div></div></div><div class="container hero-strip"><span>DIAGNOSE WITH HONESTY</span><span>EXPLAIN THE WORK</span><span>AGREE BEFORE REPAIR</span></div></section>
<section class="service-section section" id="services"><div class="container"><div class="section-heading"><div><p class="eyebrow">THE RIGHT CARE FOR YOUR VEHICLE</p><h2>Complete auto care.<br><em>Without the runaround.</em></h2></div><p>From a warning light to body damage,<br>start with a conversation about your vehicle.</p></div><div class="service-grid">${c.services.map(([id, name, tag, text]) => `<article class="service-card"><div class="card-top"><span>${id}</span><span aria-hidden="true"><svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></div><h3>${name}</h3><p class="tag">${tag}</p><p>${text}</p><a class="service-link" href="#contact" data-service="${name}">Discuss this repair ${arrow}</a></article>`).join("")}</div><p class="fine-print">All makes and models welcome for enquiries. Derek will confirm the work, equipment and location suitable for your repair.</p></div></section>
<section class="section reviews-section" id="reviews"><div class="container"><div class="section-heading"><div><p class="eyebrow">CUSTOMER EXPERIENCES</p><h2>Good work speaks.<br><em>So do our customers.</em></h2></div><p>Clear communication. Careful repairs.<br>Read what customers shared about Derek.</p></div><div class="review-grid" tabindex="0" role="region" aria-label="Customer reviews. Swipe or scroll horizontally on mobile.">${reviews.map((review, i) => `<article class="review-card"><div class="review-top"><span class="review-stars" role="img" aria-label="5 out of 5 stars">★★★★★</span><span class="quote-mark" aria-hidden="true">“</span></div><blockquote>“${review.excerpt}”</blockquote><div class="review-author"><strong>${review.name}</strong><span>Customer review</span></div><details class="review-full"><summary>Read full review<span aria-hidden="true">+</span></summary><p>${review.text}</p></details></article>`).join("")}</div><div class="review-footer"><p>Honest conversations. Individual experiences.</p>${message("Discuss your repair", "text-link")}</div></div></section><section class="travel"><div class="container travel-inner"><p class="eyebrow">NEAR OR FAR. LET’S TALK.</p><h2>Your location doesn’t<br>have to stop the conversation.</h2><div><p>Derek can travel to customers across the U.S. by arrangement. Share where you are and what your vehicle needs to discuss availability, travel arrangements and fees before booking.</p>${message("Ask about a visit", "text-link")}</div></div></section>
<section class="section about" id="about"><div class="container about-grid"><div class="about-panel"><p class="eyebrow">THE MAN BEHIND THE TOOLS</p><span class="about-statement">HONEST<br>WORK.<br><em>EVERY TIME.</em></span><p>HUSBAND. FATHER.<br>YOUR MECHANIC.</p></div><div class="about-copy"><p class="eyebrow">THE MAN BEHIND THE TOOLS</p><h2>Your trust matters<br>as much as your vehicle.</h2><p>I’m Derek—a husband, father, mobile mechanic and auto body repair specialist. I care for your vehicle with the attention I’d want someone to give my own family’s car.</p><p>I believe in honest diagnosis, quality workmanship, fair pricing and explaining what your vehicle actually needs. No unnecessary repairs. No hidden surprises.</p><blockquote>“I want my work, my communication, and the way I treat you to speak for me.”</blockquote>${message("Get to know Derek", "text-link")}</div></div></section>
<section class="section booking" id="booking"><div class="container"><div class="section-heading"><div><p class="eyebrow">SIMPLE STEPS. CLEAR COMMUNICATION.</p><h2>Let’s get you booked.</h2></div><p>A clear conversation.<br>A plan you understand.</p></div><div class="steps"><article><span>01</span><h3>Send your vehicle details.</h3><p>Message Derek with your make, model, year, repair needs and location. Photos can help explain body damage.</p></article><article><span>02</span><h3>Receive your quote.</h3><p>Discuss the work and receive a quote and booking fee. Confirm any travel arrangements and costs together.</p></article><article><span>03</span><h3>Secure your appointment.</h3><p>Pay the agreed booking fee to reserve your appointment. Derek confirms the schedule directly with you.</p></article></div><div class="policy"><div><p class="eyebrow">BEFORE YOU BOOK</p><h3>A booking fee reserves your time.</h3></div><div><p>The booking fee is credited toward your labor cost, where applicable. It covers Derek’s time, travel and commitment to setting time aside for your vehicle.</p><p>For immediate service requests, a call-out fee applies. Confirm the applicable fees and terms with Derek before paying.</p></div></div></div></section>
<section class="section faq" id="faq"><div class="container faq-grid"><div><p class="eyebrow">BEFORE YOU BOOK</p><h2>Straight answers.<br>Before we start.</h2></div><div>${[
  [
    "Can Derek travel to my state?",
    "Derek is willing to travel to customers across the U.S. by arrangement. Message your location and repair needs so you can discuss availability, travel and fees. A visit is confirmed individually.",
  ],
  [
    "What should I send in my first message?",
    "Include your vehicle’s make, model and year, your location, the symptoms or repair needed, and any useful photos. Derek will discuss the next steps with you.",
  ],
  [
    "Is a booking fee required?",
    "Yes. A booking fee secures a scheduled appointment and is credited toward labor where applicable. Immediate requests have a call-out fee. Derek confirms the amount and terms with you before booking.",
  ],
  [
    "Can you give me an instant online price?",
    "Every repair depends on the vehicle, diagnosis, parts, scope and location. Message Derek for a quote instead of relying on a generic online price.",
  ],
  [
    "Do you handle body repairs too?",
    "Yes. Derek handles auto body and exterior repair enquiries as well as mechanical work. Send photos and details so he can confirm the repair scope and arrangements.",
  ],
]
  .map(
    ([q, a]) =>
      `<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`,
  )
  .join("")}</div></div></section>
<section class="contact" id="contact"><div class="container contact-grid"><div class="contact-intro"><p class="eyebrow">LET’S GET YOU BACK ON THE ROAD</p><h2>A good repair starts<br>with <em>a conversation.</em></h2><p>Already know what you need? Message Derek directly. Or put the details together here so he has a clear starting point.</p>${message("Open Messenger")}<a class="facebook-fallback" href="${c.facebook}" target="_blank" rel="noopener noreferrer">Prefer Facebook? Visit Derek’s page ${arrow}</a><div class="contact-expectation"><strong>What happens next?</strong><p>Derek discusses your repair, confirms travel and fees, and agrees on an appointment with you. No automated quotes. No payment on this website.</p></div></div><form id="repair-enquiry" class="enquiry-form"><p class="eyebrow">YOUR REPAIR, AT A GLANCE</p><h3>Make the first message easy.</h3><p class="form-helper">Prepare your details, then copy and send them to Derek in Messenger.</p><label for="vehicle">Vehicle <span>Required</span></label><input id="vehicle" name="vehicle" required maxlength="160" autocomplete="off" placeholder="e.g. 2018 Dodge Charger"><label for="repair-location">Your city and state <span>Required</span></label><input id="repair-location" name="location" required maxlength="160" autocomplete="address-level2" placeholder="Where does your vehicle need care?"><label for="repair-needs">What’s going on? <span>Required</span></label><textarea id="repair-needs" name="needs" required maxlength="2000" rows="3" placeholder="Symptoms, warning lights, body damage or maintenance…"></textarea><button class="button" type="submit">Prepare my message ${arrow}</button><p class="form-privacy">Nothing is sent or saved here. You choose what to share with Derek.</p><div id="message-ready" hidden><label for="prepared-message">Your message</label><textarea id="prepared-message" rows="7" readonly></textarea><div class="message-actions"><button class="copy-button" type="button" id="copy-message">Copy message</button>${message("Open Messenger", "button small")}</div><p id="copy-status" role="status" aria-live="polite"></p><p class="form-privacy">Paste your message into Messenger and press Send there. Preparing this message does not book an appointment.</p></div></form></div></section></main>
<footer><div class="container footer-top">${brand}<p>Professional service. Honest work.<br>Mobile repairs by arrangement.</p><a href="#home">Back to top ↑</a></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} Derek-AutoForge Mobile Repair</span><a href="${c.facebook}" target="_blank" rel="noopener noreferrer">Find Derek on Facebook <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a></div></footer><aside class="mobile-booking" aria-label="Contact Derek"><span>Let’s talk about your car.<small>Quote & visit by arrangement</small></span>${message("Message Derek", "button small")}</aside>`;
const toggle = document.querySelector(".menu");
const mobile = document.querySelector("#mobile-nav");
function closeMenu() {
  mobile.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open navigation");
}
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  mobile.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
mobile
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

mountComparison(document.querySelector(".hero-art"), c.heroComparison);

const enquiry = document.querySelector("#repair-enquiry");
const ready = document.querySelector("#message-ready");
const prepared = document.querySelector("#prepared-message");
const copyStatus = document.querySelector("#copy-status");
enquiry.addEventListener("submit", (e) => {
  e.preventDefault();
  const fields = new FormData(enquiry);
  const vehicle = fields.get("vehicle").trim();
  const place = fields.get("location").trim();
  const needs = fields.get("needs").trim();
  for (const [id, value] of [
    ["vehicle", vehicle],
    ["repair-location", place],
    ["repair-needs", needs],
  ]) {
    const input = document.getElementById(id);
    input.setCustomValidity(value ? "" : "Please add this detail.");
    if (!value) {
      input.reportValidity();
      return;
    }
  }
  prepared.value = `Hi Derek, I’d like to discuss a repair.\n\nVehicle: ${vehicle}\nLocation: ${place}\nRepair needs: ${needs}\n\nCould you let me know the next steps, availability and applicable booking or call-out fees, including any travel costs?`;
  ready.hidden = false;
  copyStatus.textContent = "";
  prepared.focus();
});
enquiry.querySelectorAll("input, textarea:not([readonly])").forEach((input) =>
  input.addEventListener("input", () => {
    input.setCustomValidity("");
    ready.hidden = true;
  }),
);
document.querySelector("#copy-message").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(prepared.value);
    copyStatus.textContent =
      "Copied. Open Messenger, paste your message and send it to Derek.";
  } catch {
    prepared.focus();
    prepared.select();
    copyStatus.textContent =
      "Select and copy the message above, then paste it into Messenger.";
  }
});
document.querySelectorAll("[data-service]").forEach((link) =>
  link.addEventListener("click", () => {
    const needs = document.querySelector("#repair-needs");
    if (!needs.value.trim()) {
      needs.value = link.dataset.service + ": ";
      ready.hidden = true;
    }
  }),
);

// Keep the floating action out of the way while the enquiry form is visible.
const floatingContact = document.querySelector(".mobile-booking");
new IntersectionObserver(
  ([entry]) => {
    floatingContact.hidden = entry.isIntersecting;
  },
  { rootMargin: "0px 0px 90px 0px" },
).observe(enquiry);

// Collapse off-screen expanded reviews so swiping doesn't leave tall empty space.
const reviewRail = document.querySelector(".review-grid");
reviewRail.addEventListener(
  "scroll",
  () => {
    if (!matchMedia("(max-width: 700px)").matches) return;
    const rail = reviewRail.getBoundingClientRect();
    reviewRail.querySelectorAll("details[open]").forEach((detail) => {
      const card = detail.closest("article").getBoundingClientRect();
      if (card.right < rail.left + 40 || card.left > rail.right - 40)
        detail.open = false;
    });
  },
  { passive: true },
);
