document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for the hero title
    const heroTitle = document.querySelector('.hero h1');
    const heroText = 'Domain Specific AI for Medical Professionals';  // Original text
    heroTitle.textContent = '';  // Clear the original text for the animation
    let index = 0;

    function typeWriter() {
        if (index < heroText.length) {
            heroTitle.textContent += heroText.charAt(index);
            index++;
            setTimeout(typeWriter, 50);  // Speed of typing (50ms per character for faster effect)
        }
    }

    typeWriter();  // Trigger the typing animation on load
});