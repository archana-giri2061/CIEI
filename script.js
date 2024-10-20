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

        // backend
        const express = require('express');
        const nodemailer = require('nodemailer');
        const bodyParser = require('body-parser');
        const cors = require('cors');
        
        const app = express();
        const PORT = process.env.PORT || 3000;
        
        // Middleware
        app.use(cors()); // Allow cross-origin requests
        app.use(bodyParser.json()); // Parse JSON bodies
        app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
        
        // POST route for sending the email
        app.post('/send-message', (req, res) => {
            const { name, email, subject, message } = req.body;
        
            // Set up the email transport using nodemailer
            const transporter = nodemailer.createTransport({
                service: 'Gmail', // Use your email service
                auth: {
                    user: 'your-email@gmail.com', // Your email
                    pass: 'your-email-password', // Your email password or app password
                },
            });
        
            // Email options
            const mailOptions = {
                from: email, // Sender's email
                to: 'creationeducation2024@gmail.com', // Your email where the form submissions will be sent
                subject: subject,
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            };
        
            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).send('Error sending email.');
                }
                console.log('Email sent:', info.response);
                res.status(200).send('Message sent successfully!');
            });
        });
        
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        