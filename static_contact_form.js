document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      if (!name || !email || !subject || !message) {
        showAlert('Please fill out all fields', 'danger');
        return;
      }
      
      // Use a service like Formspree for the static site
      // Change the URL to your Formspree form URL
      fetch('https://formspree.io/f/xjkwzqpl', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          showAlert('Message sent successfully!', 'success');
          contactForm.reset();
        } else {
          showAlert('Failed to send message. Please try again later.', 'danger');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showAlert('Failed to send message. Please try again later.', 'danger');
      });
    });
  }
  
  function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    const alertHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    
    alertContainer.innerHTML = alertHTML;
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      const alert = alertContainer.querySelector('.alert');
      if (alert) {
        const bsAlert = new bootstrap.Alert(alert);
        bsAlert.close();
      }
    }, 5000);
  }
});
