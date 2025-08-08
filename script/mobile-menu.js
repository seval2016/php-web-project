// Mobil Alt Navigasyon Modülü
class MobileBottomNav {
    constructor() {
        this.navItems = document.querySelectorAll('.mobile-nav-item');
        this.scrollTimeout = null;
        this.init();
    }
    
    init() {
        if (this.navItems.length > 0) {
        this.setupEventListeners();
            this.setActiveItem();
            console.log('Mobil alt navigasyon modülü başlatıldı');
        }
    }
    
    setupEventListeners() {
        // Navigasyon itemlarına tıklama
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveItem(item);
                this.scrollToSection(item.getAttribute('href'));
            });
        });
        
        // Scroll ile aktif item'ı güncelle (throttled)
        window.addEventListener('scroll', () => {
            this.updateActiveItemOnScroll();
        });
    }
    
    setActiveItem(activeItem = null) {
        // Tüm itemlardan active class'ını kaldır
        this.navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Belirtilen item'ı aktif yap
        if (activeItem) {
            activeItem.classList.add('active');
        } else if (this.navItems.length > 0) {
            // Varsayılan olarak ilk item'ı aktif yap
            this.navItems[0].classList.add('active');
        }
    }
    
    scrollToSection(href) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
            const bottomNavHeight = document.querySelector('.mobile-bottom-nav')?.offsetHeight || 0;
            const offset = headerHeight + 20; // 20px ekstra boşluk
            
            const targetPosition = targetElement.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    updateActiveItemOnScroll() {
        // Throttle için kontrol
        if (this.scrollTimeout) {
            return;
        }
        
        this.scrollTimeout = setTimeout(() => {
            const scrollPosition = window.scrollY + 100; // Offset için
            
            // Tüm section'ları kontrol et
            const sections = ['home', 'products', 'services', 'about', 'contact'];
            let activeSection = 'home';
            
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        activeSection = sectionId;
                    }
                }
            });
            
            // Aktif item'ı güncelle
            this.navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${activeSection}`) {
                    item.classList.add('active');
                }
            });
            
            this.scrollTimeout = null;
        }, 100); // 100ms throttle
    }
}

// Sayfa yüklendiğinde otomatik başlat
document.addEventListener('DOMContentLoaded', function() {
    // Mobil alt navigasyon başlat
    if (window.innerWidth <= 768) {
        window.mobileBottomNav = new MobileBottomNav();
    }
    
    // Scroll efekti için header'ı izle
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Pencere boyutu değiştiğinde kontrol et
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && !window.mobileBottomNav) {
            window.mobileBottomNav = new MobileBottomNav();
        } else if (window.innerWidth > 768 && window.mobileBottomNav) {
            window.mobileBottomNav = null;
        }
    });
});
