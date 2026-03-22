// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather Icons safely
    try {
        feather.replace();
    } catch (e) {
        console.warn("Feather icons failed to load", e);
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Scroll Animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md', 'bg-white/90');
            navbar.classList.remove('bg-white/80', 'shadow-sm');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/90');
            navbar.classList.add('bg-white/80', 'shadow-sm');
        }
    });
});

// Booking Modal Logic
function openBooking() {
    const modal = document.getElementById('booking-modal');
    if(modal) {
        modal.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            modal.querySelector('.modal-bg').classList.remove('opacity-0');
            modal.querySelector('.modal-content').classList.remove('translate-y-full', 'scale-95');
        }, 10);
    }
}

function closeBooking() {
    const modal = document.getElementById('booking-modal');
    if(modal) {
        modal.querySelector('.modal-bg').classList.add('opacity-0');
        modal.querySelector('.modal-content').classList.add('translate-y-full', 'scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300); // Matches transition duration
    }
}

// Form Submission (Simulated)
function handleBookingSubmit(event) {
    event.preventDefault();
    const btn = document.getElementById('submit-booking-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-feather="loader" class="animate-spin inline-block mr-2"></i> Confirming...';
    feather.replace();
    
    setTimeout(() => {
        btn.innerHTML = '<i data-feather="check-circle" class="inline-block mr-2"></i> Confirmed';
        btn.classList.add('bg-green-600', 'hover:bg-green-700');
        feather.replace();
        
        setTimeout(() => {
            closeBooking();
            // Reset state
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('bg-green-600', 'hover:bg-green-700');
                event.target.reset();
            }, 300);
        }, 1500);
    }, 1500);
}
