// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe narrative lines for staggered animation
document.addEventListener('DOMContentLoaded', () => {
    const narrativeLines = document.querySelectorAll('.narrative-line');
    narrativeLines.forEach(line => {
        observer.observe(line);
    });

    // Observe biomes for hover effects
    const biomes = document.querySelectorAll('.biome');
    biomes.forEach(biome => {
        observer.observe(biome);
    });

    // Add parallax effect to floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.cloud, .letter-fragment, .drift-letter');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add typing effect to narrative lines
    const narrativeSection = document.querySelector('.narrative-section');
    let narrativeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startNarrativeAnimation();
                narrativeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    narrativeObserver.observe(narrativeSection);

    function startNarrativeAnimation() {
        const lines = document.querySelectorAll('.narrative-line');
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.animation = `writeIn 1s forwards`;
            }, index * 1000);
        });
    }

    // Add glow effect to biomes on scroll
    const biomesSection = document.querySelector('.biomes-section');
    let biomesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const biomes = entry.target.querySelectorAll('.biome');
                biomes.forEach((biome, index) => {
                    setTimeout(() => {
                        biome.style.animation = `fadeInUp 0.8s forwards`;
                        biome.style.animationDelay = `${index * 0.2}s`;
                    }, 500);
                });
                biomesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    biomesObserver.observe(biomesSection);

    // Add smooth scrolling for better experience
    document.documentElement.style.scrollBehavior = 'smooth';

    // Create additional floating particles dynamically
    createFloatingParticles();
});

function createFloatingParticles() {
    const heroSection = document.querySelector('.hero-section');
    const particleContainer = heroSection.querySelector('.floating-particles');
    
    // Add more particles for enhanced atmosphere
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particleContainer.appendChild(particle);
    }
}

// Add CSS animation for fade in up effect
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add interactive hover effects for biomes
document.addEventListener('DOMContentLoaded', () => {
    const biomes = document.querySelectorAll('.biome');
    
    biomes.forEach(biome => {
        biome.addEventListener('mouseenter', () => {
            // Add subtle sound effect simulation (visual feedback)
            biome.style.filter = 'brightness(1.1)';
        });
        
        biome.addEventListener('mouseleave', () => {
            biome.style.filter = 'brightness(1)';
        });
    });
});

// Add letter fragment interaction
document.addEventListener('DOMContentLoaded', () => {
    const letterFragments = document.querySelectorAll('.letter-fragment');
    
    letterFragments.forEach(fragment => {
        fragment.addEventListener('click', () => {
            fragment.style.animation = 'none';
            fragment.offsetHeight; // Trigger reflow
            fragment.style.animation = 'drift 25s infinite linear';
        });
    });
});