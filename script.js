// Store the current language in localStorage
let currentLang = localStorage.getItem('language') || 'ru';

// Initialize language and animations on page load
document.addEventListener('DOMContentLoaded', function() {
    setLang(currentLang);
    initializeAnimations();
    setupTestimonialSlider();
});

function setLang(lang) {
    // Fade out content
    document.body.style.opacity = '0.5';
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Store language preference
    localStorage.setItem('language', lang);
    currentLang = lang;

    // Update text content with smooth transition
    document.querySelectorAll('[data-lang-ru], [data-lang-uz]').forEach(function(el) {
        el.style.opacity = '0';
        setTimeout(() => {
            const newText = el.getAttribute(`data-lang-${lang}`);
            if (newText) {
                // Always use innerHTML to preserve HTML structure
                el.innerHTML = newText;
            }
            el.style.opacity = '1';
        }, 150);
    });

    // Update placeholders with fade effect
    document.querySelectorAll('[data-lang-ru-placeholder], [data-lang-uz-placeholder]').forEach(function(el) {
        el.style.opacity = '0';
        setTimeout(() => {
            const newPlaceholder = el.getAttribute(`data-lang-${lang}-placeholder`);
            if (newPlaceholder) {
                el.placeholder = newPlaceholder;
            }
            el.style.opacity = '1';
        }, 150);
    });

    // Update language buttons appearance with animation
    document.querySelectorAll('.lang-switch button').forEach(function(btn) {
        const btnLang = btn.querySelector('img').alt.toLowerCase();
        btn.classList.toggle('active', btnLang === lang);
    });

    // Restore body opacity
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 300);
}

function initializeAnimations() {
    // Add smooth transitions for language changes
    const style = document.createElement('style');
    style.textContent = `
        body {
            transition: opacity 0.3s ease;
        }
        [data-lang-ru], [data-lang-uz] {
            transition: opacity 0.3s ease;
        }
        .lang-switch button {
            transition: all 0.3s ease;
        }
        .lang-switch button.active {
            background: rgba(255,255,255,0.2);
            border-color: #fff;
            transform: scale(1.1);
        }
        .interactive-img {
            transition: transform 0.5s ease, box-shadow 0.5s ease;
        }
        .interactive-img:hover {
            transform: scale(1.05) translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
    `;
    document.head.appendChild(style);

    // Add scroll animations
    window.addEventListener('scroll', function() {
        const scrollElements = document.querySelectorAll('.service-item, .partner-item, .about-multi-img');
        
        scrollElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    });
}

function setupTestimonialSlider() {
    // If testimonial slider exists
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Initialize dots click events
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Touch events for mobile
    let startX, moveX;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchmove', (e) => {
        moveX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', () => {
        if (startX - moveX > 50) { // Swipe right
            currentSlide = Math.min(currentSlide + 1, slides.length - 1);
        } else if (moveX - startX > 50) { // Swipe left
            currentSlide = Math.max(currentSlide - 1, 0);
        }
        showSlide(currentSlide);
    });
}

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !phone || !message) {
                alert(currentLang === 'ru' ? 'Пожалуйста, заполните все поля' : 'Iltimos, barcha maydonlarni to\'ldiring');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = currentLang === 'ru' ? 'Отправка...' : 'Yuborilmoqda...';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                alert(currentLang === 'ru' ? 'Сообщение успешно отправлено!' : 'Xabar muvaffaqiyatli yuborildi!');
            }, 1500);
        });
    }
});

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add active class to navigation items based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200 && 
            window.pageYOffset < sectionTop + sectionHeight - 200) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === currentSection) {
            item.classList.add('active');
        }
    });
});
