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
- **Data:** JSON file (`data/listings.json`)
- **Forms:** Netlify Forms with honeypot spam protection

---

## Key Features
- Image carousel for featured properties (auto-rotate, swipe support)
- Photo gallery with lightbox on listing pages
- Google Maps embed for each property
- Walk Score link for neighborhood info
- MLS number field with link to NWMLS
- Responsive design (mobile-friendly)
- Parallax hero images
- Secure admin panel with login

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
│   └── listings.json       # Property listings data
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

## Admin Panel

**URL:** /admin
**Authentication:** Netlify Identity

### To Add/Edit Listings:
1. Go to `yoursite.netlify.app/admin`
2. Log in with Netlify Identity credentials
3. Add/edit listings in the form
4. Click "Download listings.json"
5. Replace `data/listings.json` in repo
6. Commit and push to deploy

### Listing Fields:
- Title, MLS Number, Address, City, State, ZIP
- Price, Status (active/pending/sold), Property Type
- Bedrooms, Bathrooms, Square Feet, Lot Size, Year Built
- Description, Features (comma-separated)
- Images (one URL per line)
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
- Content-Security-Policy configured for Identity widget

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

### Adding Property Photos:
1. Optimize images (1200x800px, <500KB)
2. Upload to `images/` folder
3. Name clearly: `123-main-st-1.jpg`
4. Reference in listing: `images/123-main-st-1.jpg`

### Updating Listings:
- Use admin panel, or
- Edit `data/listings.json` directly

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
| Domain renewal | ~$12-15/year |
| **Total** | **~$12-15/year** |

---

## Troubleshooting

### Admin login not working:
1. Check Identity is enabled in Netlify
2. Verify `/.netlify/identity/settings` returns JSON
3. Hard refresh: Ctrl+Shift+R
4. Check browser console for errors

### Images not loading:
1. Verify file exists in `images/` folder
2. Check filename matches exactly (case-sensitive)
3. Ensure path in listing is correct

### Forms not submitting:
1. Check `data-netlify="true"` attribute
2. Verify honeypot field exists
3. Check Netlify Forms dashboard

---

## Created
- **Date:** January 2026
- **Built with:** Claude Code (Claude Opus 4.5)
