// Theme Toggle Functionality
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLightTheme = document.body.classList.contains('light-theme');
    
    // Save theme preference to localStorage (if available)
    try {
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    } catch (e) {
        // Handle case where localStorage might not be available
        console.log('localStorage not available');
    }
    
    // Update theme toggle icon
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeToggle = document.querySelector('.theme-toggle');
    const isLightTheme = document.body.classList.contains('light-theme');
    
    if (themeToggle) {
        themeToggle.innerHTML = isLightTheme 
            ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
            : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
}

// Navigation Active State Management
function updateActiveNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    
    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'home.html') ||
            (currentPage === 'index.html' && href === 'home.html')) {
            item.classList.add('active');
        }
    });
}

// Smooth scrolling for better UX
function initSmoothScrolling() {
    document.body.style.scrollBehavior = 'smooth';
}

// Enhanced hover effects for tech cards
function initTechCardEffects() {
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Project card animations
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const links = this.querySelectorAll('.project-link');
            links.forEach(link => {
                link.style.transform = 'translateX(5px)';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            const links = this.querySelectorAll('.project-link');
            links.forEach(link => {
                link.style.transform = 'translateX(0)';
            });
        });
    });
}

// Blog post animations
function initBlogPostEffects() {
    const blogPosts = document.querySelectorAll('.blog-post');
    
    blogPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            const readMore = this.querySelector('.read-more');
            if (readMore) {
                readMore.style.transform = 'translateX(5px)';
            }
        });
        
        post.addEventListener('mouseleave', function() {
            const readMore = this.querySelector('.read-more');
            if (readMore) {
                readMore.style.transform = 'translateX(0)';
            }
        });
    });
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should fade in
    const animatedElements = document.querySelectorAll('.tech-card, .project-card, .blog-post, .experience-item, .education-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Navigate between pages with arrow keys (when focused on navigation)
        if (document.activeElement.classList.contains('nav-item')) {
            const navItems = Array.from(document.querySelectorAll('.nav-item'));
            const currentIndex = navItems.indexOf(document.activeElement);
            
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                e.preventDefault();
                navItems[currentIndex - 1].focus();
            } else if (e.key === 'ArrowRight' && currentIndex < navItems.length - 1) {
                e.preventDefault();
                navItems[currentIndex + 1].focus();
            }
        }
        
        // Theme toggle with 'T' key
        if (e.key.toLowerCase() === 't' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            toggleTheme();
        }
    });
}

// Performance optimization: Debounced resize handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize events
function initResponsiveHandling() {
    const handleResize = debounce(() => {
        // Recalculate any size-dependent elements
        const navContainer = document.querySelector('.nav-container');
        if (navContainer && window.innerWidth < 400) {
            navContainer.style.maxWidth = `${window.innerWidth - 40}px`;
        } else if (navContainer) {
            navContainer.style.maxWidth = '400px';
        }
    }, 250);
    
    window.addEventListener('resize', handleResize);
}

// Initialize theme on page load
function initTheme() {
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    } catch (e) {
        // Handle case where localStorage might not be available
        console.log('localStorage not available, using default theme');
    }
    updateThemeIcon();
}

// Add loading states for better UX
function initLoadingStates() {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 100);
    });
}

// Add CSS for loading states
function addLoadingStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .loading * {
            transition: none !important;
        }
        
        .loaded {
            transition: all 0.3s ease;
        }
        
        .project-link,
        .read-more {
            transition: transform 0.3s ease, color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Main initialization function
function init() {
    // Initialize all components
    initTheme();
    updateActiveNavigation();
    initSmoothScrolling();
    initTechCardEffects();
    initProjectCardEffects();
    initBlogPostEffects();
    initScrollAnimations();
    initKeyboardNavigation();
    initResponsiveHandling();
    initLoadingStates();
    addLoadingStyles();
    
    // Add focus styles for better accessibility
    const style = document.createElement('style');
    style.textContent = `
        .nav-item:focus {
            outline: 2px solid #61dafb;
            outline-offset: 2px;
        }
        
        .theme-toggle:focus {
            outline: 2px solid #61dafb;
            outline-offset: 2px;
        }
        
        .project-link:focus,
        .read-more:focus {
            outline: 1px solid #61dafb;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for potential external use
window.portfolioUtils = {
    toggleTheme,
    updateActiveNavigation,
    initScrollAnimations
};