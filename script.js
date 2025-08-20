
// Google Analytics Events
function trackEvent(eventName, category = 'engagement') {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: category,
            event_label: 'User Interaction'
        });
    }
}

// Facebook Pixel Events
function trackFBEvent(eventName) {
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName);
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Track navigation clicks
            trackEvent('navigation_click', 'navigation');
        }
    });
});

// Track CTA button clicks
document.querySelector('.cta-button')?.addEventListener('click', function() {
    trackEvent('cta_click', 'conversion');
    trackFBEvent('Lead');
});

// Track social media clicks
document.querySelectorAll('.social-btn, .social-link').forEach(btn => {
    btn.addEventListener('click', function() {
        const platform = this.classList.contains('facebook') ? 'facebook' : 
                        this.classList.contains('instagram') ? 'instagram' :
                        this.classList.contains('google') ? 'google' : 'whatsapp';
        trackEvent(`social_click_${platform}`, 'social_media');
    });
});

// Track contact form interactions
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        trackEvent('contact_click', 'contact');
        trackFBEvent('Contact');
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});
