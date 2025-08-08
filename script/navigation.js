/**
 * Navigation Sınıfı - Ana Navigasyon Yönetimi
 * 
 * Bu sınıf ana navigasyon menüsünün tüm işlevselliğini yönetir.
 * Smooth scroll, aktif menü takibi, URL güncelleme ve performans optimizasyonu sağlar.
 */
class Navigation {
    /**
     * Constructor - Sınıf başlatıldığında çalışır
     * Menü linklerini bulur ve modülü başlatır
     */
    constructor() {
        this.menuLinks = document.querySelectorAll('.menu a');  // Menü linkleri
        this.currentActiveItem = null;  // Aktif menü öğesi
        this.init();  // Modülü başlat
    }
    
    init() {
        this.setupEventListeners();
        this.setActiveMenuItem();
        this.setupScrollListener();
        console.log('Navigasyon modülü başlatıldı');
    }
    
    setupEventListeners() {
        // Menü linklerine tıklama olayları
        this.menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }
    
    setupScrollListener() {
        // Scroll event'ini optimize et
        const optimizedScrollHandler = this.debounce(() => {
            this.updateActiveMenuOnScroll();
        }, 10);
        
        window.addEventListener('scroll', optimizedScrollHandler);
    }
    
    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // URL'yi güncelle
            history.pushState(null, null, `#${sectionId}`);
            
            // Aktif menü öğesini güncelle
            this.updateActiveMenuItem(sectionId);
        }
    }
    
    setActiveMenuItem() {
        const currentHash = window.location.hash.substring(1);
        if (currentHash) {
            this.updateActiveMenuItem(currentHash);
        }
    }
    
    updateActiveMenuItem(sectionId) {
        // Önceki aktif öğeyi kaldır
        if (this.currentActiveItem) {
            this.currentActiveItem.classList.remove('active');
        }
        
        // Yeni aktif öğeyi bul ve işaretle
        const activeLink = document.querySelector(`.menu a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            this.currentActiveItem = activeLink;
        }
    }
    
    updateActiveMenuOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.updateActiveMenuItem(sectionId);
            }
        });
    }
    
    // Performans optimizasyonu için debounce fonksiyonu
    debounce(func, wait) {
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
    
    // Smooth scrolling ayarları
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }
}

// Global olarak erişilebilir yap
window.Navigation = Navigation;
