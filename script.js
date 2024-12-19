const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Loop back to first slide
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 2000); // Change slide every 5 seconds
// Get modal element
const modal = document.getElementById("partnerModal");
// Get button that opens the modal
const partnerButton = document.getElementById("partnerButton");
// Get the <span> element that closes the modal
const closeButton = document.getElementsByClassName("close-button")[0];

// When the user clicks the button, open the modal 
partnerButton.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

document.getElementById('contactForm').addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission

            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
            };

            try {
                // Send form data to server
                const response = await fetch('submit_contact.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData) // Convert form data to JSON
                });

                const result = await response.json(); // Parse JSON response
                document.getElementById('responseMessage').textContent = result.message; // Display response message

                // Clear form fields
                document.getElementById('contactForm').reset();
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('responseMessage').textContent = 'There was an error submitting your message. Please try again later.';
            }
        });

       