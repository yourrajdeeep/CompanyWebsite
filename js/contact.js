document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Form validation and submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Basic form validation
        let isValid = true;
        formInputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                showError(input, 'This field is required');
            } else if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    showError(input, 'Please enter a valid email address');
                }
            } else if (input.type === 'tel' && input.value.trim()) {
                const phoneRegex = /^\+?[\d\s-]{10,}$/;
                if (!phoneRegex.test(input.value.trim())) {
                    isValid = false;
                    showError(input, 'Please enter a valid phone number');
                }
            }
        });

        if (isValid) {
            const submitBtn = contactForm.querySelector('.submit-button');
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');

            try {
                // Get form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());

                // Log the request for debugging
                console.log('Sending request to:', 'http://localhost:5000/api/contact');
                console.log('Request data:', data);

                // Send to backend
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Response:', result);
                
                if (response.ok) {
                    showSuccessMessage(result.message || 'Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                showError(null, error.message || 'An error occurred while sending your message');
            } finally {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        }
    });

    // Clear error message on input
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            clearError(input);
        });
    });

    // Error handling functions
    function showError(input, message) {
        console.log('Showing error:', message);
        if (!input) {
            // Show global error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message global-error';
            errorDiv.textContent = message;
            contactForm.insertAdjacentElement('beforebegin', errorDiv);
            
            // Remove after 5 seconds
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
            return;
        }

        const formGroup = input.closest('.form-group');
        if (!formGroup) return;

        const errorDiv = formGroup.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorDiv);
        }
        
        input.classList.add('error');
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;

        const errorDiv = formGroup.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        
        input.classList.remove('error');
    }

    function showSuccessMessage(message = 'Thank you for your message! We will get back to you soon.') {
        console.log('Showing success:', message);
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        contactForm.insertAdjacentElement('beforebegin', successDiv);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

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
});