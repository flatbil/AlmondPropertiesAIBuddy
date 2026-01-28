# Almond Properties Website

A modern, secure real estate website for Almond Properties.

## Quick Start

### Option 1: Deploy to Netlify (Recommended - Free)

1. Create a free account at [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Connect your GitHub repository (or drag & drop this folder)
4. Netlify will auto-deploy with free SSL certificate

### Option 2: Deploy to Cloudflare Pages (Free)

1. Create a free account at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Set build output directory to `/` (root)
4. Deploy

## Managing Listings

### Using the Admin Panel

1. Go to `yoursite.com/admin`
2. Click "Add New Listing" to add properties
3. Fill in the property details
4. Click "Save Listing"
5. When ready to publish, click "Download listings.json"
6. Replace the `data/listings.json` file with the downloaded file
7. Commit and push to deploy changes

### Manual Editing

You can also edit `data/listings.json` directly. Each listing has these fields:

```json
{
  "id": "unique-id",
  "title": "Property Title",
  "address": "123 Street Name",
  "city": "Seattle",
  "state": "WA",
  "zip": "98101",
  "price": 450000,
  "status": "active",
  "type": "house",
  "bedrooms": 3,
  "bathrooms": 2,
  "sqft": 1850,
  "lotSize": "0.25 acres",
  "yearBuilt": 2005,
  "description": "Property description...",
  "features": ["Feature 1", "Feature 2"],
  "images": ["images/photo.jpg"],
  "featured": true,
  "dateAdded": "2024-01-15"
}
```

### Status Options
- `active` - For Sale
- `pending` - Sale Pending
- `sold` - Sold

### Property Types
- `house`
- `condo`
- `townhouse`
- `land`

## Adding Property Images

1. Add your images to the `images/` folder
2. Name them clearly (e.g., `123-oak-street-1.jpg`)
3. Reference them in listings as `images/filename.jpg`
4. Recommended size: 1200x800 pixels, under 500KB

## Setting Up Email

### Option 1: Cloudflare Email Routing (Free)

1. Add your domain to Cloudflare (free)
2. Go to Email > Email Routing
3. Create routing rules to forward to your Gmail/existing email
4. Example: info@almondproperties.com -> yourgmail@gmail.com

### Option 2: Zoho Mail (Free for 1 user)

1. Sign up at [zoho.com/mail](https://zoho.com/mail)
2. Add your domain
3. Follow DNS setup instructions

## Contact Form

The contact form works automatically with Netlify Forms (free, up to 100 submissions/month). Form submissions will appear in your Netlify dashboard under Forms.

## Folder Structure

```
/
├── index.html          # Homepage
├── listings.html       # All listings page
├── property.html       # Individual property page
├── about.html          # About page
├── contact.html        # Contact page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   ├── main.js         # Core JavaScript
│   └── listings.js     # Listings functionality
├── data/
│   └── listings.json   # Property listings data
├── images/             # Property images
├── admin/
│   ├── index.html      # Admin panel
│   └── admin.css       # Admin styles
└── netlify.toml        # Netlify configuration
```

## Security Features

- No database = no SQL injection
- No PHP/WordPress = no code injection
- Honeypot spam protection on forms
- Security headers configured
- Free SSL via Netlify/Cloudflare

## Support

For website changes or help, contact your web developer.
