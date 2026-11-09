# Derek-AutoForge Mobile Repair

Responsive Vite website for Derek's mobile mechanic and auto body repair business.

## Develop and verify

Node 24 recommended (minimum 22.12).

```
npm ci
npm run dev
npm test
npm run test:browser
npm run build
```

Vercel: framework Vite, install `npm ci`, build `npm run build`, output `dist`, repository root directory. Production branch: `main`.

Business content is in `src/client-config.js` and `src/main.js`. Primary contact links open Messenger at `https://m.me/61594562596712`; a visible Facebook-page fallback is available. Confirm the Messenger destination on a real logged-in phone before presenting the site as launch-ready. No on-site payments, automatic booking, or form delivery are claimed. Travel across the U.S. is by individual arrangement. No phone, address, fee amounts, reviews or certifications have been invented.

The car graphic is an illustration, not a photo of Derek's work. The chat photos were not available as local files, so they are not included as a fabricated portfolio. Add original approved photos when available. Confirm the final public name and booking-fee terms with Derek: the introduction says credit applies “where applicable”, while the later poster states it without qualification.

## Hero before/after

The hero comparison is prepared in `src/comparison.js`. Supply original blue-car photos in `public/images/`, then set `heroComparison.before` and `heroComparison.after` in `src/client-config.js` to their `/images/...` URLs. Both are currently configured with the supplied signed Facebook CDN URLs because Cloud egress blocks that image host (HTTP 403). Visitors load those URLs directly; they may expire or be blocked by Facebook. Replace them with local copies for reliable long-term hosting. If either photo fails to load, the illustration remains. The two source photos have different camera angles; the reveal compares them but does not imply precise alignment. A 15:8 landscape frame fills with both photos using object-fit: cover, cropping excess edges without stretching. Pointer capture keeps the divider aligned with mouse/touch dragging; keyboard control remains native. Failed or stale image loads cannot replace a newer comparison. The native range control supports touch, mouse, and arrow keys.

## Conversion and mobile design

The single primary action is “Message Derek”, linking directly to Messenger from the hero, service cards, header and mobile bar. The final contact section gives a short prompt about what to include, with the Facebook page as a fallback. There is no enquiry form, clipboard step or instant price calculator. Diagnosis, parts and travel are discussed with Derek. Booking and call-out fees remain visible before contact.

Mobile design includes 44px or larger contact/navigation targets, safe-area padding, reduced-motion support and keyboard-operable comparison controls. The floating Messenger action hides while the main contact button is visible. No extra third-party scripts or frontend libraries are required.

Checks cover six widths from 320px to 1440px, overflow, navigation, FAQs, reviews, the absence of the retired form, direct Messenger link targets, mobile CTA visibility, and comparison keyboard/endpoints using fixture images. They do not establish Facebook login availability, real photo delivery or real-world Messenger routing.

## Brand and customer reviews

The current visual system follows the supplied automotive poster: midnight navy (#060c17), electric blue (#1585fa), cyan (#55c8ff), silver-white (#f1f5fa), and gold (#e9bf70). Reviews in `src/reviews.js` are transcribed from the supplied screenshots; William’s repeated screenshot is included once. Six unique customers are displayed after adding Linda’s review. Cards show the individual five-star ratings in the screenshots, exact excerpts, full review disclosure and names. No reviewer photos, fabricated dates, platform endorsements or aggregate rating/schema are added. The long-form review mentioning towing is a customer’s account; it does not add a general towing service or guaranteed response time to the service menu.
