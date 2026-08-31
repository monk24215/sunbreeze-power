# SunBreeze

Sales site for the SunBreeze Base Camp Bundle (solar fan + solar power bank), built for a ClickBank offer. Node/Express serving a static site from `/public`.

## Two things left before this is live-ready

1. **Upload the 3 ebook PDFs.** They were generated locally but couldn't be pushed as binary through this session's git path, so they aren't in the repo yet:
   - `public/ebooks/off-grid-battery-handbook.pdf`
   - `public/ebooks/keep-it-spinning-fan-maintenance-guide.pdf`
   - `public/ebooks/quick-reference-card.pdf`

   Easiest path: GitHub web UI → this repo → `public/ebooks/` → **Add file → Upload files**, drop the three PDFs in, commit to `main`. Railway will redeploy automatically. The files were sent to Kristian directly in the chat that built this site.

2. **Set the real ClickBank buy link.** In `public/script.js` and `public/index.html`, the "Get the Base Camp Bundle" button (`#buy-button`) currently points at `#`. Once the product exists in ClickBank, replace the `href="#"` with the real pay link (format: `https://pay.clickbank.net/?vendor=YOURVENDORID&item=1`).

## Local dev

```
npm install
npm start
```

Serves on `process.env.PORT` (defaults to 3000).

## Structure

- `server.js` — Express static server
- `public/index.html` — main sales page
- `public/privacy-policy.html`, `refund-policy.html`, `terms.html` — legal pages (ClickBank requires these to be reachable)
- `public/thank-you.html` — post-purchase page, delivers the 3 PDFs
- `public/style.css` — WiredHowse design system (Bebas Neue / DM Sans, dark + cyan/red)
