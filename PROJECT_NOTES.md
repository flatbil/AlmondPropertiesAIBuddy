# Almond Properties Website - Project Notes

## Overview
Rebuilt real estate website for Almond Properties, replacing old WordPress site with a modern, secure static site.

**Live Site:** https://almondproperties.com (Netlify-hosted; almondproperties.netlify.app also resolves)
**GitHub Repo:** https://github.com/flatbil/AlmondPropertiesAIBuddy
**Domain:** almondproperties.com (connected and live)

---

## Tech Stack
- **Hosting:** Netlify (free tier)
- **Authentication:** Netlify Identity
- **Frontend:** HTML, CSS, JavaScript (no frameworks)
- **Data:** JSON lives in the repo (`data/listings.json`) — served directly, no external host
- **Images:** Cloudinary (cloud name: `dzquymqrl`, folder: `almond-properties`)
- **Maps:** Leaflet.js + OpenStreetMap (free, no API key required)
- **Forms:** Netlify Forms with honeypot spam protection

---

## Key Features
- Image carousel for featured properties (auto-rotate, swipe support)
- Photo gallery with lightbox on listing pages
- Interactive map (Leaflet/OpenStreetMap) on each property page
- Walk Score link for neighborhood info
- MLS number field with link to NWMLS
- Responsive design (mobile-friendly)
- Parallax hero images
- Secure admin panel with login
- Admin panel edits/uploads images to Cloudinary directly; publishing listing changes is a download + commit (see Admin Panel below)

---

## Color Scheme
```css
--primary-color: #1e2a78;    /* Navy blue */
--primary-dark: #141c52;
--primary-light: #3949ab;
--secondary-color: #5c6bc0;
--secondary-light: #9fa8da;
```

---

## File Structure
```
/
├── index.html              # Homepage
├── listings.html           # All listings with filters
├── property.html           # Individual property details
├── about.html              # About page
├── contact.html            # Contact form
├── css/
│   ├── style.css           # Main styles
│   └── gallery.css         # Carousel/gallery styles
├── js/
│   ├── main.js             # Core JavaScript
│   ├── listings.js         # Listing functionality
│   └── carousel.js         # Carousel/gallery code
├── data/
│   └── listings.json       # Live data source, served directly (no external host)
├── images/
│   ├── logo.png            # Almond Properties logo (header, light background)
│   ├── logo-footer.png     # Same logo, alpha remapped so PROPERTIES stays legible when
│   │                       #   inverted white on the dark footer (see Session History)
│   ├── nwmls-logo.png      # NWMLS member logo
│   ├── realtor-equal-housing.png  # Realtor & Equal Housing logos (transparent bg, for footer invert)
│   ├── favicon.ico, favicon-16/32/192.png  # Favicon (cropped "A" mark from logo.png)
│   └── apple-touch-icon.png
├── admin/
│   ├── index.html          # Admin panel (protected)
│   └── admin.css           # Admin styles
├── netlify.toml            # Netlify config & security headers
└── README.md               # User documentation
```

---

## Cloudinary Configuration

**Cloud name:** `dzquymqrl`

| Preset | Type | Used for |
|--------|------|----------|
| `AlmondPropertiesImages` | Unsigned, Image | Property photos |

Listings JSON is **not** hosted on Cloudinary anymore (see Session History — Feb 2026 entry
for why) — the `AlmondPropertiesData` raw preset and the old `listings_live.json` file on
Cloudinary are unused/retired. `data/listings.json` in the repo is the live source.

**Image folder:**
```
https://res.cloudinary.com/dzquymqrl/image/upload/almond-properties/
```

---

## Admin Panel

**URL:** /admin
**Authentication:** Netlify Identity

### To Add/Edit Listings:
1. Go to `almondproperties.com/admin`
2. Log in with Netlify Identity credentials
3. Add/edit listings in the form (edits are saved to the browser's localStorage as you go)
4. Click **"Download listings.json"**
5. Replace `data/listings.json` in the repo with the downloaded file, then commit and push
   — Netlify auto-deploys on push, so that's what actually takes it live

### How listings data loads:
The site fetches `data/listings.json` directly from the repo — that's the only source.
(An earlier version tried a Cloudinary-hosted copy first; dropped in Feb 2026, see Session History.)

### Listing Fields:
- Title, MLS Number, Address, City, State, ZIP
- Price, Status (active/pending/sold), Property Type
- Bedrooms, Bathrooms, Square Feet, Lot Size, Year Built
- Description, Features (comma-separated)
- Images (uploaded via Cloudinary widget)
- Featured (show on homepage carousel)

---

## Netlify Configuration

### Identity Setup:
1. Site configuration → Identity → Enable
2. Registration: Invite only
3. Invite users via email

### Forms:
- Contact form submissions appear in Netlify dashboard → Forms
- Honeypot field for spam protection

### Security Headers (in netlify.toml):
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Content-Security-Policy configured for Identity, Cloudinary, Leaflet (unpkg.com), Nominatim

---

## Domain Setup (When Ready)

### Option 1: Keep DNS at GoDaddy
1. Netlify → Domain management → Add custom domain
2. Add these records at GoDaddy:
   - A record: @ → Netlify IP
   - CNAME: www → yoursite.netlify.app

### Option 2: Transfer DNS to Netlify (Recommended)
1. Netlify → Domain management → Add custom domain
2. Click "Set up Netlify DNS"
3. Update nameservers at GoDaddy to Netlify's

---

## Email Setup Options

### Cloudflare Email Routing (Free):
1. Add domain to Cloudflare
2. Email → Email Routing
3. Create rule: info@almondproperties.com → personal@gmail.com

### Zoho Mail (Free for 1 user):
1. Sign up at zoho.com/mail
2. Add domain, follow DNS setup

---

## NWMLS Integration Notes

**Current:** Manual listing management with MLS# displayed
**Future Options:**
- IDX Broker (~$90-125/mo) - full MLS search
- SimplyRETS - developer API
- Direct NWMLS API - requires broker membership

---

## Maintenance Tasks

### Adding/Updating Listings:
1. Log into admin panel at `/admin`
2. Add or edit listings using the form
3. Click **Download listings.json**, replace `data/listings.json` in the repo, commit and push

### Adding Property Photos:
1. Use the "Upload Images" button inside the listing form
2. Photos go directly to Cloudinary (`almond-properties` folder)
3. First image becomes the main/thumbnail photo

### Checking Form Submissions:
- Netlify dashboard → Forms

---

## Costs

| Item | Cost |
|------|------|
| Netlify hosting | Free |
| SSL certificate | Free (included) |
| Netlify Forms | Free (100/month) |
| Netlify Identity | Free (5 users) |
| Cloudinary (image hosting) | Free tier |
| Domain renewal | ~$12-15/year |
| **Total** | **~$12-15/year** |

---

## Troubleshooting

### Listings not showing:
1. Open browser console (F12) and check for fetch errors on `data/listings.json`
2. Confirm the deploy actually included your latest `data/listings.json` (check the commit in Netlify's deploy log)
3. Hard refresh with Ctrl+Shift+R to clear cached JS

### Changes made in admin panel aren't showing on the live site:
This is expected until you finish the manual step — the admin panel only saves to the
browser's localStorage and generates a download. Download **listings.json**, replace
`data/listings.json` in the repo, then commit and push so Netlify deploys it.

### Map not loading on property page:
- Uses Leaflet.js + OpenStreetMap (free, no API key)
- Geocoding via Nominatim — if address doesn't resolve, shows "Map unavailable" gracefully

### Admin login not working:
1. Check Identity is enabled in Netlify
2. Verify `/.netlify/identity/settings` returns JSON
3. Hard refresh: Ctrl+Shift+R
4. Check browser console for errors

### Forms not submitting:
1. Check `data-netlify="true"` attribute
2. Verify honeypot field exists
3. Check Netlify Forms dashboard

---

## Session History

### January 2026 — Initial Build
- Built full site replacing WordPress
- Netlify hosting, Identity auth, Forms
- Admin panel with Cloudinary image upload widget

### February 2026 — Cloudinary & Map Fixes
- Moved `listings.json` to Cloudinary as live data source
- `data/listings.json` kept in repo as automatic fallback
- Added **Publish to Cloudinary** button in admin panel (one-click deploy for listing changes)
- Replaced broken Google Maps embed with Leaflet.js + OpenStreetMap (free, no API key)
- Fixed admin panel bug where failed Cloudinary load would cache empty listings in localStorage
- Updated CSP in `netlify.toml` to allow Leaflet CDN and Nominatim geocoding

### September 2026 — Domain Live, Cleanup Pass
- Confirmed `almondproperties.com` is connected and serving via Netlify (was previously listed as "not yet connected" in these notes — stale)
- Removed the dead "Publish to Cloudinary" button/flow from the admin panel — it uploaded to a `listings_live.json` on Cloudinary that the site hasn't read since the Feb 2026 revert to `data/listings.json`, so it silently did nothing useful. Admin panel now just downloads `listings.json`, with notes on the manual replace/commit/push step
- Added a proper favicon (cropped from the "A" mark in `images/logo.png`) — `images/favicon.ico`, `favicon-16/32/192.png`, `apple-touch-icon.png`, wired into every page's `<head>`
- Fixed stale comments in `js/listings.js` and `admin/index.html` that still described the old Cloudinary-first data-loading flow
- Updated this file throughout to match current reality (data flow, admin instructions, troubleshooting)
- Fixed the footer's white-on-dark logo filter (`brightness(0) invert(1)`) silently blanking out
  any opaque artwork it touched — it turned the Realtor/Equal Housing JPG into a solid white box
  (fixed via a transparent PNG) and the "PROPERTIES" wordmark on the main logo into a blank white
  bar (fixed with `logo-footer.png`, a footer-only copy whose alpha channel is remapped from the
  original's light/dark contrast so the filter reads it as intended instead of crushing it flat)

---

## Created
- **Date:** January 2026
- **Built with:** Claude Code (Claude Opus 4.5 / Sonnet 4.6)
