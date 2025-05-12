// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Project Card Hover Effects
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const overlay = card.querySelector('.project-overlay');
        overlay.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
        const overlay = card.querySelector('.project-overlay');
        overlay.style.opacity = '0';
    });
});

// Project Image Loading Animation
const projectImages = document.querySelectorAll('.project-image img');
projectImages.forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Intersection Observer for Project Cards
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            projectObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// Project Tags Animation
const projectTags = document.querySelectorAll('.project-tags span');
projectTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-3px)';
        tag.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });

    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0)';
        tag.style.boxShadow = 'none';
    });
});
