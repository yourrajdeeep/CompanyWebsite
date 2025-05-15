document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            const formData = {
                name: contactForm.querySelector('#name').value,
                email: contactForm.querySelector('#email').value,
                phone: contactForm.querySelector('#phone').value,
                subject: contactForm.querySelector('#subject').value,
                message: contactForm.querySelector('#message').value
            };
            
            try {
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // Show success message
                    showMessage('success', 'Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    // Show error message
                    showMessage('error', data.error || 'Something went wrong. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                showMessage('error', 'Network error. Please check your connection and try again.');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }
});

function showMessage(type, text) {
    const messageContainer = document.querySelector('.form-message') || createMessageContainer();
    messageContainer.className = `form-message ${type} show`;
    messageContainer.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${text}</span>
    `;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageContainer.classList.remove('show');
    }, 5000);
}

function createMessageContainer() {
    const container = document.createElement('div');
    container.className = 'form-message';
    document.querySelector('.contact-form-container').appendChild(container);
    return container;
}
