const form = document.getElementById('contact-form');
const alertPlaceholder = document.getElementById('alert-placeholder');

// Function to show Bootstrap alerts
function showAlert(message, type) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    alertPlaceholder.append(wrapper);
}

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    const formData = new FormData(form);
    const action = "https://formspree.io/f/xaqbkbzl"; // Replace with your Formspree form ID

    fetch(action, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            showAlert(' Message sent successfully!', 'success');
            form.reset();
        } else {
            response.json().then(data => {
                if (data.errors) {
                    showAlert( + data.errors.map(error => error.message).join(", "), 'danger');
                } else {
                    showAlert(' Something went wrong. Please try again.', 'danger');
                }
            })
        }
    }).catch(error => {
        showAlert('Something went wrong. Please try again.', 'danger');
        console.error(error);
    });
});
