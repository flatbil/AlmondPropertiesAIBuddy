// Carousel and Gallery functionality

// ===== FEATURED CAROUSEL =====

function initFeaturedCarousel() {
    const container = document.getElementById('featured-carousel');
    if (!container) return;

    const track = container.querySelector('.carousel-track');
    const slides = container.querySelectorAll('.carousel-slide');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');
    const dotsContainer = container.querySelector('.carousel-dots');

    if (!slides.length) return;

    let currentIndex = 0;
    let autoplayInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoplay();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoplay();
        }
    }

    // Start autoplay
    resetAutoplay();

    // Pause on hover
    container.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    container.addEventListener('mouseleave', resetAutoplay);
}

// Create featured carousel HTML
function createFeaturedCarousel(listings) {
    const featured = listings.filter(l => l.featured).slice(0, 5);
    if (!featured.length) return '';

    const slides = featured.map((listing, index) => {
        const imageUrl = listing.images && listing.images[0] ? listing.images[0] : 'images/placeholder.jpg';
        const mlsHtml = listing.mlsNumber ? `<span class="carousel-mls">MLS# ${listing.mlsNumber}</span>` : '';

        return `
            <div class="carousel-slide">
                <a href="property.html?id=${listing.id}" class="carousel-link">
                    <div class="carousel-image">
                        <img src="${imageUrl}" alt="${listing.title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22500%22 viewBox=%220 0 800 500%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22800%22 height=%22500%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2224%22 x=%22400%22 y=%22250%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'">
                    </div>
                    <div class="carousel-content">
                        <span class="carousel-status status-${listing.status}">${listing.status === 'active' ? 'For Sale' : listing.status === 'pending' ? 'Pending' : 'Sold'}</span>
                        ${mlsHtml}
                        <h3 class="carousel-title">${listing.title}</h3>
                        <p class="carousel-address">${listing.address}, ${listing.city}, ${listing.state}</p>
                        <div class="carousel-details">
                            <span class="carousel-price">${formatPrice(listing.price)}</span>
                            <span class="carousel-specs">${listing.bedrooms} bed | ${listing.bathrooms} bath | ${formatNumber(listing.sqft)} sqft</span>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }).join('');

    return `
        <div id="featured-carousel" class="featured-carousel">
            <div class="carousel-track">
                ${slides}
            </div>
            <button class="carousel-prev" aria-label="Previous slide">&#10094;</button>
            <button class="carousel-next" aria-label="Next slide">&#10095;</button>
            <div class="carousel-dots"></div>
        </div>
    `;
}

// ===== PROPERTY GALLERY =====

let currentGalleryIndex = 0;
let galleryImages = [];

function initPropertyGallery(images) {
    galleryImages = images || [];
    if (galleryImages.length <= 1) return;

    // Add click handlers to thumbnails
    document.querySelectorAll('.gallery-thumb').forEach((thumb, index) => {
        thumb.addEventListener('click', () => setGalleryImage(index));
    });

    // Add keyboard navigation
    document.addEventListener('keydown', handleGalleryKeyboard);
}

function setGalleryImage(index) {
    currentGalleryIndex = index;
    const mainImage = document.getElementById('gallery-main-image');
    const thumbs = document.querySelectorAll('.gallery-thumb');

    if (mainImage && galleryImages[index]) {
        mainImage.src = galleryImages[index];
        mainImage.alt = `Property image ${index + 1}`;
    }

    thumbs.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });

    // Update counter
    const counter = document.getElementById('gallery-counter');
    if (counter) {
        counter.textContent = `${index + 1} / ${galleryImages.length}`;
    }
}

function nextGalleryImage() {
    if (galleryImages.length <= 1) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    setGalleryImage(currentGalleryIndex);
}

function prevGalleryImage() {
    if (galleryImages.length <= 1) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    setGalleryImage(currentGalleryIndex);
}

function handleGalleryKeyboard(e) {
    if (e.key === 'ArrowRight') nextGalleryImage();
    if (e.key === 'ArrowLeft') prevGalleryImage();
}

// ===== LIGHTBOX =====

function openLightbox(index) {
    currentGalleryIndex = index;
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateLightboxImage() {
    const img = document.getElementById('lightbox-image');
    const counter = document.getElementById('lightbox-counter');

    if (img && galleryImages[currentGalleryIndex]) {
        img.src = galleryImages[currentGalleryIndex];
    }
    if (counter) {
        counter.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
    }
}

function lightboxNext() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function lightboxPrev() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

// Create gallery HTML for property page
function createPropertyGallery(images) {
    if (!images || images.length === 0) {
        return `<div class="property-gallery-single">
            <img src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22500%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%25%22 height=%22100%25%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2224%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3ENo Images%3C/text%3E%3C/svg%3E" alt="No image available">
        </div>`;
    }

    const mainImage = images[0];
    const thumbsHtml = images.map((img, index) => `
        <button class="gallery-thumb ${index === 0 ? 'active' : ''}" onclick="setGalleryImage(${index})">
            <img src="${img}" alt="Property image ${index + 1}" onerror="this.parentElement.style.display='none'">
        </button>
    `).join('');

    const lightboxHtml = `
        <div id="lightbox" class="lightbox" onclick="if(event.target === this) closeLightbox()">
            <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
            <button class="lightbox-prev" onclick="lightboxPrev()">&#10094;</button>
            <div class="lightbox-content">
                <img id="lightbox-image" src="${mainImage}" alt="Property image">
                <div id="lightbox-counter" class="lightbox-counter">1 / ${images.length}</div>
            </div>
            <button class="lightbox-next" onclick="lightboxNext()">&#10095;</button>
        </div>
    `;

    return `
        <div class="property-gallery-container">
            <div class="gallery-main" onclick="openLightbox(${0})">
                <img id="gallery-main-image" src="${mainImage}" alt="Property main image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22500%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%25%22 height=%22100%25%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2224%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3ENo Image%3C/text%3E%3C/svg%3E'">
                <div id="gallery-counter" class="gallery-counter">1 / ${images.length}</div>
                ${images.length > 1 ? `
                <button class="gallery-nav gallery-prev" onclick="event.stopPropagation(); prevGalleryImage()">&#10094;</button>
                <button class="gallery-nav gallery-next" onclick="event.stopPropagation(); nextGalleryImage()">&#10095;</button>
                ` : ''}
                <div class="gallery-expand-hint">Click to expand</div>
            </div>
            ${images.length > 1 ? `
            <div class="gallery-thumbs">
                ${thumbsHtml}
            </div>
            ` : ''}
        </div>
        ${lightboxHtml}
    `;
}
