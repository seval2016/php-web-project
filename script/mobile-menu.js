/**
 * Mobil Alt Navigasyon Modülü - Mobil Menü Yönetimi
 * 
 * Bu dosya mobil cihazlarda alt navigasyon menüsünün işlevselliğini yönetir.
 * Scroll takibi, aktif item güncelleme ve smooth scroll işlemlerini sağlar.
 * Responsive tasarım ile sadece mobil cihazlarda aktif olur.
 */

/**
 * MobileBottomNav Sınıfı - Mobil Alt Navigasyon Yönetimi
 * 
 * Bu sınıf mobil alt navigasyon menüsünün tüm işlevselliğini yönetir.
 * Scroll takibi, aktif item güncelleme ve smooth scroll işlemlerini sağlar.
 */
class MobileBottomNav {
    /**
     * Constructor - Sınıf başlatıldığında çalışır
     * Navigasyon itemlarını bulur ve modülü başlatır
     */
    constructor() {
        this.navItems = document.querySelectorAll('.mobile-nav-item');  // Navigasyon itemları
        this.scrollTimeout = null;  // Scroll throttle için timeout
        this.init();  // Modülü başlat
    }
    
    /**
     * Init - Modülü başlatır
     * Navigasyon itemlarını kontrol eder ve event listener'ları ayarlar
     */
    init() {
        if (this.navItems.length > 0) {
            this.setupEventListeners();  // Event listener'ları ayarla
            this.setActiveItem();        // Varsayılan aktif item'ı ayarla
            console.log('Mobil alt navigasyon modülü başlatıldı');
        }
    }
    
    /**
     * Event Listener'ları Ayarla - Kullanıcı etkileşimlerini dinler
     * 
     * Navigasyon itemlarına tıklama ve scroll olaylarını dinler.
     * Throttled scroll takibi ile performans optimizasyonu sağlar.
     */
    setupEventListeners() {
        // Navigasyon itemlarına tıklama - Smooth scroll ile bölüme git
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();  // Varsayılan link davranışını engelle
                this.setActiveItem(item);  // Tıklanan item'ı aktif yap
                this.scrollToSection(item.getAttribute('href'));  // Bölüme scroll yap
            });
        });
        
        // Scroll ile aktif item'ı güncelle - Throttled scroll takibi
        window.addEventListener('scroll', () => {
            this.updateActiveItemOnScroll();
        });
    }
    
    /**
     * Aktif Item Ayarla - Navigasyon itemının aktif durumunu yönetir
     * 
     * @param {HTMLElement} activeItem - Aktif yapılacak item (opsiyonel)
     */
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
    
    /**
     * Bölüme Scroll Yap - Smooth scroll ile hedef bölüme git
     * 
     * @param {string} href - Hedef bölümün ID'si (# ile başlar)
     */
    scrollToSection(href) {
        const targetId = href.substring(1);  // # işaretini kaldır
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Header yüksekliğini hesapla
            const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
            const bottomNavHeight = document.querySelector('.mobile-bottom-nav')?.offsetHeight || 0;
            const offset = headerHeight + 20;  // 20px ekstra boşluk
            
            // Hedef pozisyonu hesapla
            const targetPosition = targetElement.offsetTop - offset;
            
            // Smooth scroll ile git
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    /**
     * Scroll ile Aktif Item Güncelle - Scroll pozisyonuna göre aktif item'ı değiştirir
     * 
     * Throttled scroll takibi ile performans optimizasyonu sağlar.
     * 100ms throttle ile scroll olaylarını sınırlar.
     */
    updateActiveItemOnScroll() {
        // Throttle için kontrol - Zaten timeout varsa çık
        if (this.scrollTimeout) {
            return;
        }
        
        // 100ms sonra scroll pozisyonunu kontrol et
        this.scrollTimeout = setTimeout(() => {
            const scrollPosition = window.scrollY + 100;  // Offset için 100px ekle
            
            // Tüm section'ları kontrol et
            const sections = ['home', 'products', 'services', 'about', 'contact'];
            let activeSection = 'home';  // Varsayılan aktif section
            
            // Her section'ın pozisyonunu kontrol et
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;      // Section başlangıcı
                    const sectionBottom = sectionTop + section.offsetHeight;  // Section sonu
                    
                    // Scroll pozisyonu bu section içinde mi kontrol et
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        activeSection = sectionId;
                    }
                }
            });
            
            // Aktif item'ı güncelle
            this.navItems.forEach(item => {
                item.classList.remove('active');  // Tüm itemlardan active'i kaldır
                if (item.getAttribute('href') === `#${activeSection}`) {
                    item.classList.add('active');  // Uygun item'ı aktif yap
                }
            });
            
            this.scrollTimeout = null;  // Timeout'u temizle
        }, 100);  // 100ms throttle
    }
}

/**
 * Sayfa Yüklendiğinde Otomatik Başlat - DOM Ready Event
 * 
 * Sayfa yüklendiğinde mobil navigasyon modülünü başlatır.
 * Responsive tasarım ile sadece mobil cihazlarda aktif olur.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Mobil alt navigasyon başlat - Sadece mobil cihazlarda
    if (window.innerWidth <= 768) {
        window.mobileBottomNav = new MobileBottomNav();
    }
    
    // Scroll efekti için header'ı izle - Header scroll animasyonu
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');  // Scroll edildiğinde stil ekle
            } else {
                header.classList.remove('scrolled');  // Başa döndüğünde stili kaldır
            }
        });
    }
    
    // Pencere boyutu değiştiğinde kontrol et - Responsive davranış
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && !window.mobileBottomNav) {
            // Mobil boyuta geçildi ve modül yoksa başlat
            window.mobileBottomNav = new MobileBottomNav();
        } else if (window.innerWidth > 768 && window.mobileBottomNav) {
            // Desktop boyuta geçildi ve modül varsa temizle
            window.mobileBottomNav = null;
        }
    });
});
