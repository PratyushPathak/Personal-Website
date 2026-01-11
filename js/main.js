// Mobile menu toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact form
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    status.textContent = 'Sending...';
    status.className = '';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            status.textContent = 'Message sent successfully!';
            status.className = 'success';
            form.reset();
        } else {
            status.textContent = 'Error sending message';
            status.className = 'error';
        }
    } catch {
        status.textContent = 'Error sending message';
        status.className = 'error';
    }
});
