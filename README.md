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

Business content is in `src/client-config.js` and `src/main.js`. Booking links open the supplied Facebook page. No on-site payments, automatic booking, or form delivery are claimed. Travel across the U.S. is by individual arrangement. No phone, address, fee amounts, reviews or certifications have been invented.

The car graphic is an illustration, not a photo of Derek's work. The chat photos were not available as local files, so they are not included as a fabricated portfolio. Add original approved photos when available. Confirm the final public name and booking-fee terms with Derek: the introduction says credit applies “where applicable”, while the later poster states it without qualification.

## Hero before/after
The hero comparison is prepared in `src/comparison.js`. Supply original blue-car photos in `public/images/`, then set `heroComparison.before` and `heroComparison.after` in `src/client-config.js` to their `/images/...` URLs. Both are currently configured with the supplied signed Facebook CDN URLs because Cloud egress blocks that image host (HTTP 403). Visitors load those URLs directly; they may expire or be blocked by Facebook. Replace them with local copies for reliable long-term hosting. If either photo fails to load, the illustration remains. The two source photos have different camera angles; the reveal compares them but does not imply precise alignment. The native range control supports touch, mouse, and arrow keys.
