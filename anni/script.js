// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const openInvitationBtn = document.getElementById('open-invitation');
const musicToggleBtn = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');
const guestNameElement = document.getElementById('guest-name');
const rsvpForm = document.getElementById('rsvp-form');
const wishesForm = document.getElementById('wishes-form');
const wishesContainer = document.getElementById('wishes-container');
const copyButtons = document.querySelectorAll('.btn-copy');

// 3D Effect Elements
const heroContent = document.querySelector('.hero-content');
const galleryItems = document.querySelectorAll('.gallery-item');
const eventCards = document.querySelectorAll('.event-card');
const giftCards = document.querySelectorAll('.gift-card');
const coupleInfo = document.querySelector('.couple-info');

// Ensure welcome screen is positioned at the top
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when welcome screen is shown
});

// Get guest name from URL
const urlParams = new URLSearchParams(window.location.search);
const guest = urlParams.get('to');
if (guest) {
    const guestElements = document.querySelectorAll('#guest-name');
    guestElements.forEach(element => {
        element.textContent = decodeURIComponent(guest);
    });
}

// Open invitation button with 3D effect
if (openInvitationBtn) {
    openInvitationBtn.addEventListener('mouseenter', () => {
        openInvitationBtn.style.transform = 'translateY(-5px) rotateX(10deg)';
    });
    
    openInvitationBtn.addEventListener('mouseleave', () => {
        openInvitationBtn.style.transform = 'translateY(0) rotateX(0)';
    });
    
    openInvitationBtn.addEventListener('click', () => {
        welcomeScreen.style.opacity = '0';
        welcomeScreen.style.transform = 'scale3d(1.2, 1.2, 1.2)';
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
            // Start playing music when invitation is opened
            if (backgroundMusic) {
                backgroundMusic.play().catch(error => {
                    console.log('Auto-play was prevented');
                });
            }
            // Add entrance animation for hero content
            animateHeroEntrance();
        }, 500);
    });
}

// Hero content entrance animation
function animateHeroEntrance() {
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px) scale3d(0.9, 0.9, 0.9)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease-out';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0) scale3d(1, 1, 1)';
            
            // Start animating countdown items
            const countdownItems = document.querySelectorAll('.countdown-item');
            countdownItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'scale3d(0.5, 0.5, 0.5)';
                    item.style.transition = 'all 0.5s ease-out';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale3d(1, 1, 1)';
                    }, 100);
                }, index * 200);
            });
        }, 300);
    }
}

// 3D Tilt Effect
function applyTiltEffect(element) {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        element.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
        element.style.transition = 'transform 0.1s ease-out';
        
        // Add shadow effect
        element.style.boxShadow = `${-angleY/2}px ${angleX/2}px 20px rgba(0, 0, 0, 0.2)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        element.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
        element.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
}

// Apply 3D tilt effect to various elements
function apply3DEffects() {
    // Apply to event cards
    if (eventCards) {
        eventCards.forEach(card => {
            applyTiltEffect(card);
        });
    }
    
    // Apply to gallery items
    if (galleryItems) {
        galleryItems.forEach(item => {
            applyTiltEffect(item);
            
            // Add hover zoom effect
            item.addEventListener('mouseenter', () => {
                const img = item.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.1)';
                    img.style.transition = 'transform 0.5s ease-out';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                const img = item.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // Apply to gift cards
    if (giftCards) {
        giftCards.forEach(card => {
            applyTiltEffect(card);
        });
    }
}

// Parallax scrolling effect
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        }
        
        // Animate elements on scroll
        animateOnScroll();
    });
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-title, .event-card, .gallery-item, .story-item, .gift-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            if (!element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '0';
                element.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.8s ease-out';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }
        }
    });
}

// Rotating 3D effect for couple info
function initCoupleRotation() {
    if (coupleInfo) {
        const bride = coupleInfo.querySelector('.bride');
        const groom = coupleInfo.querySelector('.groom');
        
        if (bride && groom) {
            // Initial setup
            bride.style.transform = 'perspective(1000px) rotateY(10deg)';
            groom.style.transform = 'perspective(1000px) rotateY(-10deg)';
            
            // Animation
            setInterval(() => {
                bride.style.transition = 'transform 3s ease-in-out';
                groom.style.transition = 'transform 3s ease-in-out';
                
                setTimeout(() => {
                    bride.style.transform = 'perspective(1000px) rotateY(-10deg)';
                    groom.style.transform = 'perspective(1000px) rotateY(10deg)';
                }, 3000);
                
                setTimeout(() => {
                    bride.style.transform = 'perspective(1000px) rotateY(10deg)';
                    groom.style.transform = 'perspective(1000px) rotateY(-10deg)';
                }, 6000);
            }, 6000);
        }
    }
}

// Music toggle with animation
let isMusicPlaying = false;
if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggleBtn.innerHTML = '<i class="fas fa-music"></i>';
            musicToggleBtn.style.transform = 'rotate(0deg)';
        } else {
            backgroundMusic.play();
            musicToggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
            musicToggleBtn.style.transform = 'rotate(360deg)';
        }
        musicToggleBtn.style.transition = 'transform 0.5s ease-out';
        isMusicPlaying = !isMusicPlaying;
    });
}

// Countdown Timer with 3D flip animation
function updateCountdown() {
    const weddingDate = new Date('June 1, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display with animation for seconds
    updateCountdownValue('days', days);
    updateCountdownValue('hours', hours);
    updateCountdownValue('minutes', minutes);
    
    // Flip animation for seconds
    const secondsElement = document.getElementById('seconds');
    if (secondsElement) {
        const currentSeconds = secondsElement.textContent;
        const newSeconds = seconds.toString().padStart(2, '0');
        
        if (currentSeconds !== newSeconds) {
            secondsElement.style.transform = 'rotateX(90deg)';
            secondsElement.style.opacity = '0.5';
            secondsElement.style.transition = 'all 0.3s ease-out';
            
            setTimeout(() => {
                secondsElement.textContent = newSeconds;
                secondsElement.style.transform = 'rotateX(0deg)';
                secondsElement.style.opacity = '1';
            }, 300);
        }
    }
}

function updateCountdownValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        const newValue = value.toString().padStart(2, '0');
        if (element.textContent !== newValue) {
            element.textContent = newValue;
        }
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// RSVP Form with 3D effect
if (rsvpForm) {
    const formInputs = rsvpForm.querySelectorAll('input, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transform = 'scale3d(1.02, 1.02, 1.02)';
            input.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            input.style.transition = 'all 0.3s ease-out';
        });
        
        input.addEventListener('blur', () => {
            input.style.transform = 'scale3d(1, 1, 1)';
            input.style.boxShadow = 'none';
        });
    });
    
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const guests = document.getElementById('guests').value;
        const attendance = document.querySelector('input[name="attendance"]:checked').value;
        
        // Animate form submission
        rsvpForm.style.transform = 'scale3d(0.95, 0.95, 0.95)';
        rsvpForm.style.opacity = '0.8';
        rsvpForm.style.transition = 'all 0.3s ease-out';
        
        setTimeout(() => {
            // Here you would typically send this data to a server
            alert(`Terima kasih ${name}! RSVP Anda telah kami terima.`);
            rsvpForm.reset();
            
            rsvpForm.style.transform = 'scale3d(1, 1, 1)';
            rsvpForm.style.opacity = '1';
        }, 300);
    });
}

// Wishes Form with 3D effect
if (wishesForm) {
    const wishTextarea = wishesForm.querySelector('textarea');
    
    if (wishTextarea) {
        wishTextarea.addEventListener('focus', () => {
            wishTextarea.style.transform = 'scale3d(1.02, 1.02, 1.02)';
            wishTextarea.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            wishTextarea.style.transition = 'all 0.3s ease-out';
        });
        
        wishTextarea.addEventListener('blur', () => {
            wishTextarea.style.transform = 'scale3d(1, 1, 1)';
            wishTextarea.style.boxShadow = 'none';
        });
    }
    
    wishesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = document.getElementById('wish-message').value;
        
        // Create a new wish element with 3D effect
        const wishElement = document.createElement('div');
        wishElement.classList.add('wish-item');
        wishElement.style.opacity = '0';
        wishElement.style.transform = 'scale3d(0.9, 0.9, 0.9) translateY(20px)';
        
        const guestName = guest ? decodeURIComponent(guest) : 'Tamu';
        const date = new Date().toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        wishElement.innerHTML = `
            <div class="wish-header">
                <h4>${guestName}</h4>
                <span>${date}</span>
            </div>
            <p>${message}</p>
        `;
        
        // Add the new wish to the container with animation
        wishesContainer.prepend(wishElement);
        wishesForm.reset();
        
        setTimeout(() => {
            wishElement.style.transition = 'all 0.5s ease-out';
            wishElement.style.opacity = '1';
            wishElement.style.transform = 'scale3d(1, 1, 1) translateY(0)';
            
            // Apply tilt effect to the new wish
            applyTiltEffect(wishElement);
        }, 100);
    });
}

// Copy account number with 3D effect
if (copyButtons) {
    copyButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale3d(1.1, 1.1, 1.1)';
            button.style.transition = 'all 0.3s ease-out';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale3d(1, 1, 1)';
        });
        
        button.addEventListener('click', () => {
            const textToCopy = button.getAttribute('data-clipboard');
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Tersalin!';
                button.style.transform = 'scale3d(1.2, 1.2, 1.2) rotateZ(5deg)';
                
                setTimeout(() => {
                    button.style.transform = 'scale3d(1, 1, 1) rotateZ(0)';
                    button.textContent = originalText;
                }, 2000);
            });
        });
    });
}

// Add smooth scrolling for all links with 3D effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('mouseenter', () => {
        anchor.style.transform = 'scale3d(1.1, 1.1, 1.1)';
        anchor.style.transition = 'all 0.3s ease-out';
    });
    
    anchor.addEventListener('mouseleave', () => {
        anchor.style.transform = 'scale3d(1, 1, 1)';
    });
    
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Add 3D effect during scroll
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
            
            // Highlight target section
            setTimeout(() => {
                targetElement.style.transform = 'scale3d(1.02, 1.02, 1.02)';
                targetElement.style.transition = 'all 0.5s ease-out';
                
                setTimeout(() => {
                    targetElement.style.transform = 'scale3d(1, 1, 1)';
                }, 500);
            }, 500);
        }
    });
});

// Initialize all 3D effects when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
    apply3DEffects();
    initParallaxEffect();
    initCoupleRotation();
    
    // Set initial opacity for scroll animations
    document.querySelectorAll('.section-title, .event-card, .gallery-item, .story-item, .gift-card').forEach(element => {
        element.style.opacity = '0';
    });
    
    // Trigger initial animations
    setTimeout(() => {
        animateOnScroll();
    }, 500);
});