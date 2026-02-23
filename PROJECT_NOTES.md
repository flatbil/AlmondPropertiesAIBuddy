# Almond Properties Website - Project Notes

## Overview
Rebuilt real estate website for Almond Properties, replacing old WordPress site with a modern, secure static site.

**Live Site:** https://almondproperties.netlify.app
**GitHub Repo:** https://github.com/flatbil/AlmondPropertiesAIBuddy
**Domain:** almondproperties.com (not yet connected)

---

## Tech Stack
- **Hosting:** Netlify (free tier)
- **Authentication:** Netlify Identity
- **Frontend:** HTML, CSS, JavaScript (no frameworks)
- **Data:** JSON hosted on Cloudinary (`data/listings.json` kept as local backup/fallback)
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
- One-click "Publish to Cloudinary" from admin panel — no deploy needed for listing updates

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
│   └── listings.json       # Local backup (Cloudinary is live source)
├── images/
│   ├── logo.png            # Almond Properties logo
│   ├── nwmls-logo.png      # NWMLS member logo
│   └── realtor-equal-housing.jpg  # Realtor & Equal Housing logos
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
| `AlmondPropertiesData` | Unsigned, Raw, Overwrite ON | listings.json |

**Live listings JSON URL:**
```
https://res.cloudinary.com/dzquymqrl/raw/upload/listings.json
```

**Image folder:**
```
https://res.cloudinary.com/dzquymqrl/image/upload/almond-properties/
```

---

## Admin Panel

**URL:** /admin
**Authentication:** Netlify Identity

### To Add/Edit Listings:
1. Go to `yoursite.netlify.app/admin`
2. Log in with Netlify Identity credentials
3. Add/edit listings in the form
4. Click **"Publish to Cloudinary"** — changes go live immediately, no deploy needed
5. "Download listings.json" is available as a backup option

### How listings data loads (with fallback):
1. Tries Cloudinary: `https://res.cloudinary.com/dzquymqrl/raw/upload/listings.json`
2. Falls back to local: `data/listings.json` in the repo

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
3. Click **Publish to Cloudinary** — live immediately

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
| Cloudinary (images + JSON) | Free tier |
| Domain renewal | ~$12-15/year |
| **Total** | **~$12-15/year** |

---

## Troubleshooting

### Listings not showing:
1. Open browser console (F12) and check for fetch errors
2. Verify Cloudinary URL is accessible: `https://res.cloudinary.com/dzquymqrl/raw/upload/listings.json`
3. If Cloudinary fails, site falls back to `data/listings.json` automatically
4. Hard refresh with Ctrl+Shift+R to clear cached JS

### Publish to Cloudinary failing:
1. Check browser console for error details
2. Verify `AlmondPropertiesData` preset exists in Cloudinary (unsigned, Raw, Overwrite ON)
3. Make sure you're logged into the admin panel before publishing

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

---

## Created
- **Date:** January 2026
- **Built with:** Claude Code (Claude Opus 4.5 / Sonnet 4.6)
