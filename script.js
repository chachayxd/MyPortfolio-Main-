// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuIcon = document.getElementById('menu');
    const navLinks = document.querySelector('.links');
    
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinksList = document.querySelectorAll('.links a');
    if (navLinksList.length > 0) {
        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navAnchors = document.querySelectorAll('a[href^="#"]');
    if (navAnchors.length > 0) {
        navAnchors.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calculate the position to scroll to, accounting for fixed header
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Animate .fade-in-up elements on scroll
    const fadeEls = document.querySelectorAll('.fade-in-up');
    if ('IntersectionObserver' in window && fadeEls.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        fadeEls.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }
});