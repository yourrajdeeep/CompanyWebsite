// Team Member Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const teamCards = document.querySelectorAll('.team-card');

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter team cards
            teamCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    // Add animation class
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in');
                }
            });
        });
    });

    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // Team card hover effects
    teamCards.forEach(card => {
        const overlay = card.querySelector('.team-overlay');
        const socialLinks = card.querySelectorAll('.social-icon');

        card.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
            socialLinks.forEach(link => {
                link.style.transform = 'translateY(0)';
                link.style.opacity = '1';
            });
        });

        card.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
            socialLinks.forEach(link => {
                link.style.transform = 'translateY(20px)';
                link.style.opacity = '0';
            });
        });
    });

    // Image loading animation
    const teamImages = document.querySelectorAll('.team-image img');
    teamImages.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
}); 