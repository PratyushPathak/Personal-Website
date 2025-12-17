// CS 210 Final Exam Study Guide - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initRevealButtons();
    initProgressBar();
    showSection('intro');
});

// Re-initialize reveal buttons after content loads (called from content scripts)
function reinitRevealButtons() {
    initRevealButtons();
}

// Navigation
function initNavigation() {
    // Section headers toggle
    const sectionHeaders = document.querySelectorAll('.nav-section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.parentElement;
            section.classList.toggle('active');
        });
    });

    // Nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Topic cards click
    const topicCards = document.querySelectorAll('.topic-card');
    topicCards.forEach(card => {
        card.addEventListener('click', function() {
            const topic = this.getAttribute('data-topic');
            const firstSection = document.querySelector(`.nav-link[data-section^="${topic}"]`);
            if (firstSection) {
                firstSection.click();
            }
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => s.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Reveal Answer Buttons - Using event delegation for dynamically loaded content
function initRevealButtons() {
    // Use event delegation on document body
    document.body.addEventListener('click', function(e) {
        // Check if clicked element is a reveal button
        if (e.target.classList.contains('reveal-btn')) {
            const btn = e.target;
            const answerId = btn.getAttribute('data-answer');
            const answerContainer = document.getElementById(answerId);
            
            if (!answerContainer) {
                console.error('Answer container not found:', answerId);
                return;
            }
            
            if (answerContainer.classList.contains('visible')) {
                answerContainer.classList.remove('visible');
                btn.classList.remove('revealed');
                btn.innerHTML = '🔍 Reveal Answer';
            } else {
                answerContainer.classList.add('visible');
                btn.classList.add('revealed');
                btn.innerHTML = '✓ Answer Revealed';
            }
        }
    });
}

// Progress Bar
function initProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressFill.style.width = progress + '%';
    });
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Toggle all answers in a section
function toggleAllAnswers(sectionId, show) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const answers = section.querySelectorAll('.answer-container');
    const buttons = section.querySelectorAll('.reveal-btn');
    
    answers.forEach(answer => {
        if (show) {
            answer.classList.add('visible');
        } else {
            answer.classList.remove('visible');
        }
    });
    
    buttons.forEach(btn => {
        if (show) {
            btn.classList.add('revealed');
            btn.innerHTML = '✓ Answer Revealed';
        } else {
            btn.classList.remove('revealed');
            btn.innerHTML = '🔍 Reveal Answer';
        }
    });
}

// Search functionality (for future enhancement)
function searchContent(query) {
    const allCards = document.querySelectorAll('.content-card, .exercise-card');
    const lowerQuery = query.toLowerCase();
    
    allCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(lowerQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Reset search
function resetSearch() {
    const allCards = document.querySelectorAll('.content-card, .exercise-card');
    allCards.forEach(card => {
        card.style.display = 'block';
    });
}

