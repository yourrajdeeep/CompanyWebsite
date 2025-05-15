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

// Blog Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const blogArticles = {
        'ai-web-development': {
            title: 'The Future of AI in Web Development',
            image: '../assets/images/blog-ai.jpg',
            date: 'March 15, 2024',
            category: 'Technology',
            content: `
                <p>Artificial Intelligence is revolutionizing the way we approach web development. From automated coding assistance to intelligent user experience optimization, AI is becoming an integral part of modern web development practices.</p>
                <h3>The Impact of AI on Development</h3>
                <p>One of the most significant impacts of AI in web development is in the area of personalization. AI algorithms can analyze user behavior and preferences to create highly customized experiences for each visitor.</p>
                <h3>Key Areas of AI Implementation</h3>
                <ul>
                    <li><strong>Automated Code Generation:</strong> AI-powered tools can generate code snippets and even complete components</li>
                    <li><strong>Intelligent Debug Assistance:</strong> AI helps identify and fix bugs more efficiently</li>
                    <li><strong>User Experience Optimization:</strong> AI analyzes user behavior to improve site layout and functionality</li>
                    <li><strong>Predictive Analytics:</strong> AI helps forecast user trends and behavior</li>
                </ul>
                <p>As we look to the future, AI will continue to transform web development, making it more efficient and user-centric.</p>
            `
        },
        'cloud-computing': {
            title: 'Cloud Computing Trends 2024',
            image: '../assets/images/blog1.jpeg',
            date: 'March 10, 2024',
            category: 'Cloud',
            content: `
                <p>The cloud computing landscape is rapidly evolving with new technologies and approaches emerging constantly.</p>
                <h3>Major Trends in 2024</h3>
                <ol>
                    <li>Serverless Architecture Adoption</li>
                    <li>Multi-cloud Strategies</li>
                    <li>Edge Computing Integration</li>
                    <li>AI-Powered Cloud Services</li>
                </ol>
                <p>Organizations are increasingly moving towards hybrid and multi-cloud solutions to optimize their operations and maintain flexibility.</p>
                <h3>Security Considerations</h3>
                <p>With the expansion of cloud services, security remains a top priority. Zero-trust architecture and advanced encryption are becoming standard practices.</p>
            `
        },
        'cybersecurity': {
            title: 'Essential Cybersecurity Practices',
            image: '../assets/images/blog-cyber.jpg',
            date: 'March 5, 2024',
            category: 'Security',
            content: `
                <p>In today's digital landscape, cybersecurity is more critical than ever. Organizations must implement robust security measures to protect their assets.</p>
                <h3>Key Security Measures</h3>
                <p>Essential practices include:</p>
                <ul>
                    <li>Multi-factor Authentication</li>
                    <li>Regular Security Audits</li>
                    <li>Employee Security Training</li>
                    <li>Incident Response Planning</li>
                </ul>
                <h3>Emerging Threats</h3>
                <p>Stay ahead of new security challenges by monitoring emerging threats and updating security protocols regularly.</p>
            `
        }
        // Add more articles as needed
    };

    const blogModal = document.getElementById('blogModal');
    if (!blogModal) return;

    const modalTitle = blogModal.querySelector('.blog-modal-header h2');
    const modalImage = blogModal.querySelector('.modal-blog-image');
    const modalDate = blogModal.querySelector('.modal-date');
    const modalCategory = blogModal.querySelector('.modal-category');
    const modalContent = blogModal.querySelector('.modal-blog-content');

    // Handle Read More clicks
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const blogId = this.getAttribute('data-blog-id');
            const article = blogArticles[blogId];

            if (article) {
                modalTitle.textContent = article.title;
                modalImage.src = article.image;
                modalImage.alt = article.title;
                modalDate.innerHTML = `<i class="far fa-calendar"></i> ${article.date}`;
                modalCategory.innerHTML = `<i class="far fa-folder"></i> ${article.category}`;
                modalContent.innerHTML = article.content;
                
                blogModal.style.display = 'block';
                document.body.style.overflow = 'hidden';

                // Add fade-in animation
                blogModal.classList.add('fade-in');
            }
        });
    });

    // Close modal functionality
    const closeModalBtn = blogModal.querySelector('.close-blog-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeBlogModal);
    }

    // Close on outside click
    blogModal.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            closeBlogModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && blogModal.style.display === 'block') {
            closeBlogModal();
        }
    });

    function closeBlogModal() {
        blogModal.classList.remove('fade-in');
        blogModal.classList.add('fade-out');
        
        setTimeout(() => {
            blogModal.style.display = 'none';
            document.body.style.overflow = '';
            blogModal.classList.remove('fade-out');
        }, 300);
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
