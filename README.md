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

Business content is in `src/client-config.js` and `src/main.js`. Primary contact links open Messenger at `https://m.me/61594562596712`; a visible Facebook-page fallback is available. Confirm the Messenger destination on a real logged-in phone before presenting the site as launch-ready. The enquiry composer creates text locally for customers to copy and send themselves; it does not submit a lead or book an appointment. No on-site payments, automatic booking, or form delivery are claimed. Travel across the U.S. is by individual arrangement. No phone, address, fee amounts, reviews or certifications have been invented.

The car graphic is an illustration, not a photo of Derek's work. The chat photos were not available as local files, so they are not included as a fabricated portfolio. Add original approved photos when available. Confirm the final public name and booking-fee terms with Derek: the introduction says credit applies “where applicable”, while the later poster states it without qualification.

## Hero before/after

The hero comparison is prepared in `src/comparison.js`. Supply original blue-car photos in `public/images/`, then set `heroComparison.before` and `heroComparison.after` in `src/client-config.js` to their `/images/...` URLs. Both are currently configured with the supplied signed Facebook CDN URLs because Cloud egress blocks that image host (HTTP 403). Visitors load those URLs directly; they may expire or be blocked by Facebook. Replace them with local copies for reliable long-term hosting. If either photo fails to load, the illustration remains. The two source photos have different camera angles; the reveal compares them but does not imply precise alignment. The native range control supports touch, mouse, and arrow keys.

## Conversion and mobile design

The primary action is a conversation with Derek. An instant price calculator is deliberately absent because rates, diagnosis, parts and travel vary. Service links lead to a short enquiry composer: vehicle, location and repair needs. The visitor can copy the prepared message, open Messenger and send it there. Fields are never sent to a server, saved to storage or used for analytics. Location is for arranging a visit, not a restriction to one state. Booking and call-out fees remain visible before contact.

Mobile design includes 44px or larger navigation/contact targets, 16px form inputs to avoid iOS input zoom, a bottom Messenger action with safe-area padding, reduced-motion support and keyboard-operable comparison controls. The bottom action hides while the enquiry form is in view. No extra third-party scripts or frontend libraries are required. Social metadata and organization/service structured data avoid inventing a local address or search ranking claims.

Checks cover six widths from 320px to 1440px, overflow, navigation, FAQ, service links, message composition and validation, successful/denied clipboard access, zero POST submissions, and comparison keyboard/endpoints using fixture images. These tests do not establish Facebook login availability, real photo delivery, or real-world Messenger routing.

## Brand and customer reviews

The current visual system follows the supplied automotive poster: midnight navy (#060c17), electric blue (#1585fa), cyan (#55c8ff), silver-white (#f1f5fa), and gold (#e9bf70). Reviews in `src/reviews.js` are transcribed from the supplied screenshots; William’s repeated screenshot is included once. Six unique customers are displayed after adding Linda’s review. Cards show the individual five-star ratings in the screenshots, exact excerpts, full review disclosure and names. No reviewer photos, fabricated dates, platform endorsements or aggregate rating/schema are added. The long-form review mentioning towing is a customer’s account; it does not add a general towing service or guaranteed response time to the service menu.
