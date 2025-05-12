// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Variables for scroll behavior
let lastScrollTop = 0;
const scrollThreshold = 50; // Minimum scroll amount before hiding/showing navbar

// Scroll-based navigation behavior
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Determine scroll direction and amount
    if (Math.abs(currentScroll - lastScrollTop) > scrollThreshold) {
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            // Scrolling down & past threshold - hide navbar
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = currentScroll;
    }
});

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return; // Skip if href is just "#"
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 2000);
    }
});

// Page Transition
const pageTransition = () => {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);

    setTimeout(() => {
        transition.classList.add('active');
    }, 100);

    setTimeout(() => {
        transition.remove();
    }, 1000);
};

// Add page transition to all internal links
document.querySelectorAll('a[href^="/"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        pageTransition();
        setTimeout(() => {
            window.location.href = href;
        }, 500);
    });
});

// Active Navigation Link
const setActiveLink = () => {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

window.addEventListener('load', setActiveLink);

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Intersection Observer for Fade In Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.overview-card').forEach(card => {
    observer.observe(card);
});

// Blogs Section Horizontal Scroll
document.addEventListener('DOMContentLoaded', function() {
    const blogsTrack = document.querySelector('.blogs-track');
    const prevBtn = document.querySelector('.scroll-btn.prev');
    const nextBtn = document.querySelector('.scroll-btn.next');
    
    if (blogsTrack && prevBtn && nextBtn) {
        let scrollAmount = 0;
        const cardWidth = 430; // Card width + gap
        
        function updateScrollButtons() {
            prevBtn.disabled = scrollAmount <= 0;
            nextBtn.disabled = scrollAmount >= blogsTrack.scrollWidth - blogsTrack.clientWidth;
        }
        
        prevBtn.addEventListener('click', () => {
            scrollAmount = Math.max(scrollAmount - cardWidth, 0);
            blogsTrack.style.transform = `translateX(-${scrollAmount}px)`;
            updateScrollButtons();
        });
        
        nextBtn.addEventListener('click', () => {
            const maxScroll = blogsTrack.scrollWidth - blogsTrack.clientWidth;
            scrollAmount = Math.min(scrollAmount + cardWidth, maxScroll);
            blogsTrack.style.transform = `translateX(-${scrollAmount}px)`;
            updateScrollButtons();
        });
        
        // Initialize button states
        updateScrollButtons();
        
        // Update on window resize
        window.addEventListener('resize', updateScrollButtons);
    }
});

// FAQ Accordion
// Only one FAQ open at a time
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Service Form Submission
const serviceRequestForm = document.getElementById('serviceRequestForm');
if (serviceRequestForm) {
    serviceRequestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to your server
        // For now, we'll just redirect back to services.html
        window.location.href = 'services.html';
    });
}

// Server Plans Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const plansModal = document.getElementById('plansModal');
    const closeModal = document.querySelector('.close-modal');
    const planButtons = document.querySelectorAll('.plan-button');
    const modalTriggers = document.querySelectorAll('[data-modal="plans"]');

    // Function to open modal
    function openPlansModal(e) {
        if (e) {
            e.preventDefault();
        }
        if (plansModal) {
            plansModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // Function to close modal
    function closePlansModal() {
        if (plansModal) {
            plansModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Close modal when clicking the close button
    if (closeModal) {
        closeModal.addEventListener('click', closePlansModal);
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === plansModal) {
            closePlansModal();
        }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && plansModal && plansModal.style.display === 'block') {
            closePlansModal();
        }
    });

    // Handle Book Now button clicks
    const bookNowButtons = document.querySelectorAll('.plan-button');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const planCard = this.closest('.plan-card');
            const planName = planCard.querySelector('h3').textContent;
            const planPrice = planCard.querySelector('.plan-price').textContent;
            
            // Store selected plan details
            localStorage.setItem('selectedPlan', JSON.stringify({
                name: planName,
                price: planPrice
            }));
            
            // Redirect to server form
            window.location.href = 'server-form.html';
        });
    });

    // Add click event to modal triggers
    if (modalTriggers) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', openPlansModal);
        });
    }
});
