document.addEventListener('DOMContentLoaded', () => {
    initFormHandling('serviceRequestForm');
    initFormHandling('serverRequestForm');
});

function initFormHandling(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    // Initialize floating labels
    initFloatingLabels(form);
    
    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.submit-button');
        const data = Object.fromEntries(formData.entries());
        
        if (!validateForm(data)) {
            showMessage(form, 'error', 'Please fill in all required fields correctly');
            return;
        }
        
        try {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showMessage(form, 'success', 'Thank you! Your request has been submitted successfully.');
            form.reset();
            
        } catch (error) {
            showMessage(form, 'error', 'Sorry, something went wrong. Please try again later');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

function initFloatingLabels(form) {
    const inputs = form.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        if (input.value !== '') {
            input.classList.add('has-value');
        }
        
        input.addEventListener('input', () => {
            if (input.value !== '') {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
        
        input.addEventListener('focus', () => {
            input.classList.add('is-focused');
        });
        
        input.addEventListener('blur', () => {
            input.classList.remove('is-focused');
        });
    });
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) return false;
    
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!phoneRegex.test(data.phone)) return false;
    
    return true;
}

function showMessage(form, type, text) {
    const container = form.closest('.contact-form-container');
    let messageDiv = container.querySelector('.form-message');
    
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        container.appendChild(messageDiv);
    }
    
    messageDiv.className = 'form-message';
    messageDiv.classList.add(type, 'show');
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${text}</span>
    `;
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 5000);
}
