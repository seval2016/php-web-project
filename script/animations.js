// Animasyonlar Modülü
class Animations {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupLoadingAnimation();
        console.log('Animasyonlar modülü başlatıldı');
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Animasyon için gözlemlenecek elementler
        const animateElements = document.querySelectorAll('.product-card, .feature-item, .section-title');
        animateElements.forEach(el => this.observer.observe(el));
    }
    
    setupLoadingAnimation() {
        window.addEventListener('load', () => {
            // Loading animasyonunu kaldır
            const loader = document.querySelector('.loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 300);
            }
            
            // Sayfa yüklendiğinde fade-in efekti
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease-in';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    }
    
    // Buton hover efektleri
    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', this.addButtonHoverEffect);
            button.addEventListener('mouseleave', this.removeButtonHoverEffect);
        });
    }
    
    addButtonHoverEffect(e) {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    }
    
    removeButtonHoverEffect(e) {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '';
    }
    
    // Smooth scroll animasyonu
    smoothScrollTo(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Fade in animasyonu
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-in`;
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    }
    
    // Slide in animasyonu
    slideIn(element, direction = 'up', duration = 300) {
        const transforms = {
            up: 'translateY(30px)',
            down: 'translateY(-30px)',
            left: 'translateX(30px)',
            right: 'translateX(-30px)'
        };
        
        element.style.opacity = '0';
        element.style.transform = transforms[direction];
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0, 0)';
        }, 10);
    }
}

// Global olarak erişilebilir yap
window.Animations = Animations;
