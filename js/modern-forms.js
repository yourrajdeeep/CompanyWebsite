document.addEventListener('DOMContentLoaded', () => {
    // Initialize floating labels
    initFloatingLabels();
    
    // Initialize form submission
    initContactForm();
});

function initFloatingLabels() {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        // Set initial state for filled inputs
        if (input.value !== '') {
            input.classList.add('has-value');
        }
        
        // Handle input events
        input.addEventListener('input', () => {
            if (input.value !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
        
        // Handle focus events
        input.addEventListener('focus', () => {
            input.classList.add('is-focused');
        });
        
        input.addEventListener('blur', () => {
            input.classList.remove('is-focused');
            if (input.value === '') {
                input.classList.remove('has-value');
            }
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.submit-button');
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!validateForm(data)) {
            showMessage('error', 'Please fill in all required fields correctly');
            return;
        }
        
        try {
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showMessage('success', 'Thank you! Your message has been sent successfully');
            form.reset();
            
        } catch (error) {
            // Show error message
            showMessage('error', 'Sorry, something went wrong. Please try again later');
            
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

function validateForm(data) {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) return false;
    
    // Check required fields
    if (!data.name || !data.email || !data.phone || !data.message) return false;
    
    // Phone validation (basic)
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!phoneRegex.test(data.phone)) return false;
    
    return true;
}

function showMessage(type, text) {
    const container = document.querySelector('.contact-form-container');
    let messageDiv = container.querySelector('.form-message');
    
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        container.appendChild(messageDiv);
    }
    
    // Clear existing classes
    messageDiv.className = 'form-message';
    
    // Add new classes and content
    messageDiv.classList.add(type, 'show');
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${text}</span>
    `;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 5000);
}
