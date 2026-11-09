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

## Local photos and repair gallery

All 11 original uploads in `images/` are preserved. `src/repair-images.js` references them using static asset URLs; Vite emits versioned local files for Vercel. The hero uses the blue-car before/after slider, with no Facebook image dependency or expiring URLs. Different camera angles mean the photos do not align exactly.

Four additional repair pairs use Before/After buttons and an accessible full-size photo dialog. Gallery previews crop to a consistent frame; the dialog shows each entire original image with contain sizing, including portrait photos. Gallery and AC-service photos load lazily. The service photo appears next to Derek’s introduction. No work descriptions, locations, timelines or prices have been invented.

The native range input supports keyboard, precise mouse/touch dragging and pointer capture. Failed or stale image loads cannot replace a newer comparison.

## Conversion and mobile design

The single primary action is “Message Derek”, linking directly to Messenger from the hero, service cards, header and mobile bar. The final contact section gives a short prompt about what to include, with the Facebook page as a fallback. There is no enquiry form, clipboard step or instant price calculator. Diagnosis, parts and travel are discussed with Derek. Booking and call-out fees remain visible before contact.

Mobile design includes 44px or larger contact/navigation targets, safe-area padding, reduced-motion support and keyboard-operable comparison controls. The floating Messenger action hides while the main contact button is visible. No extra third-party scripts or frontend libraries are required.

Checks cover six widths from 320px to 1440px, overflow, navigation, FAQs, reviews, the absence of the retired form, direct Messenger link targets, mobile CTA visibility, and comparison keyboard/endpoints using fixture images. They also verify all local photos, gallery toggles, full-image viewing, Escape and focus return. They do not establish Facebook login availability or real-world Messenger routing. Run `TEST_PRODUCTION=1 npm run test:browser` after building to exercise the built Vercel assets through Vite preview.

## Brand and customer reviews

The current visual system follows the supplied automotive poster: midnight navy (#060c17), electric blue (#1585fa), cyan (#55c8ff), silver-white (#f1f5fa), and gold (#e9bf70). Reviews in `src/reviews.js` are transcribed from the supplied screenshots; William’s repeated screenshot is included once. Six unique customers are displayed after adding Linda’s review. Cards show the individual five-star ratings in the screenshots, exact excerpts, full review disclosure and names. No reviewer photos, fabricated dates, platform endorsements or aggregate rating/schema are added. The long-form review mentioning towing is a customer’s account; it does not add a general towing service or guaranteed response time to the service menu.

## Messenger / Facebook sharing preview

`public/og-image.jpg` is a 1200 × 630 JPEG graphic with the business wordmark, service description and finished blue-car image. The generated graphic original is retained in the workspace; the JPEG export is committed with the website. Open Graph and Twitter large-image tags are present in the built HTML, without client-side injection.

The build uses `SITE_URL` (optional custom HTTPS domain), then Vercel’s `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL` to emit an absolute image URL. Local builds without these settings use `/og-image.jpg`. On Vercel, keep system environment variables exposed to the build, or set `SITE_URL` to the actual public domain and redeploy. The image must be publicly accessible without deployment protection. After deployment, use Facebook Sharing Debugger to refresh cached previews. Existing messages may retain their prior preview.
