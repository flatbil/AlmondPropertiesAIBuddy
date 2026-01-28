// Listings data management
let listingsData = [];

// Format price as currency
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(price);
}

// Format number with commas
function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

// Get status label
function getStatusLabel(status) {
    const labels = {
        'active': 'For Sale',
        'pending': 'Pending',
        'sold': 'Sold'
    };
    return labels[status] || status;
}

// Create property card HTML
function createPropertyCard(listing) {
    const statusClass = listing.status === 'sold' ? 'sold' : listing.status === 'pending' ? 'pending' : '';
    const imageUrl = listing.images && listing.images[0] ? listing.images[0] : 'images/placeholder.jpg';

    return `
        <article class="property-card" onclick="viewProperty('${listing.id}')">
            <div class="property-image">
                <img src="${imageUrl}" alt="${listing.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22 viewBox=%220 0 400 300%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2220%22 x=%22200%22 y=%22150%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'">
                <span class="property-status ${statusClass}">${getStatusLabel(listing.status)}</span>
            </div>
            <div class="property-content">
                <div class="property-price">${formatPrice(listing.price)}</div>
                <h3 class="property-title">${listing.title}</h3>
                <p class="property-address">${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}</p>
                <div class="property-features">
                    <span class="property-feature"><span>🛏️</span> ${listing.bedrooms} Beds</span>
                    <span class="property-feature"><span>🚿</span> ${listing.bathrooms} Baths</span>
                    <span class="property-feature"><span>📐</span> ${formatNumber(listing.sqft)} sqft</span>
                </div>
            </div>
        </article>
    `;
}

// Load listings from JSON file
async function loadListings() {
    try {
        const response = await fetch('data/listings.json');
        if (!response.ok) {
            throw new Error('Failed to load listings');
        }
        const data = await response.json();
        listingsData = data.listings || [];
        return listingsData;
    } catch (error) {
        console.error('Error loading listings:', error);
        // Return empty array if fetch fails
        return [];
    }
}

// Filter listings based on criteria
function filterListings(listings, filters) {
    return listings.filter(listing => {
        // Status filter
        if (filters.status && listing.status !== filters.status) {
            return false;
        }

        // Type filter
        if (filters.type && listing.type !== filters.type) {
            return false;
        }

        // Min price filter
        if (filters.minPrice && listing.price < parseInt(filters.minPrice)) {
            return false;
        }

        // Max price filter
        if (filters.maxPrice && listing.price > parseInt(filters.maxPrice)) {
            return false;
        }

        // Bedrooms filter
        if (filters.beds && listing.bedrooms < parseInt(filters.beds)) {
            return false;
        }

        return true;
    });
}

// Render listings to a container
function renderListings(containerId, listings, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (listings.length === 0) {
        container.innerHTML = '<div class="no-results">No properties found matching your criteria.</div>';
        return;
    }

    // If featured only, filter and limit
    let displayListings = listings;
    if (options.featuredOnly) {
        displayListings = listings.filter(l => l.featured).slice(0, options.limit || 3);
    }

    // If limit specified without featured filter
    if (options.limit && !options.featuredOnly) {
        displayListings = listings.slice(0, options.limit);
    }

    container.innerHTML = displayListings.map(createPropertyCard).join('');
}

// Update listings count display
function updateListingsCount(count) {
    const countEl = document.getElementById('listings-count');
    if (countEl) {
        countEl.textContent = `${count} ${count === 1 ? 'property' : 'properties'} found`;
    }
}

// Navigate to property detail page
function viewProperty(id) {
    window.location.href = `property.html?id=${id}`;
}

// Initialize listings on page load
document.addEventListener('DOMContentLoaded', async function() {
    const listings = await loadListings();

    // Check if we're on the home page (featured listings)
    const featuredContainer = document.getElementById('featured-listings');
    if (featuredContainer) {
        renderListings('featured-listings', listings, { featuredOnly: true, limit: 3 });
    }

    // Check if we're on the listings page (all listings)
    const allListingsContainer = document.getElementById('all-listings');
    if (allListingsContainer) {
        renderListings('all-listings', listings);
        updateListingsCount(listings.length);

        // Set up filters
        setupFilters(listings);
    }
});

// Set up filter event listeners
function setupFilters(listings) {
    const filterElements = [
        'filter-status',
        'filter-type',
        'filter-min-price',
        'filter-max-price',
        'filter-beds'
    ];

    filterElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('change', () => applyFilters(listings));
        }
    });
}

// Apply filters and re-render listings
function applyFilters(listings) {
    const filters = {
        status: document.getElementById('filter-status')?.value || '',
        type: document.getElementById('filter-type')?.value || '',
        minPrice: document.getElementById('filter-min-price')?.value || '',
        maxPrice: document.getElementById('filter-max-price')?.value || '',
        beds: document.getElementById('filter-beds')?.value || ''
    };

    const filtered = filterListings(listings, filters);
    renderListings('all-listings', filtered);
    updateListingsCount(filtered.length);
}
