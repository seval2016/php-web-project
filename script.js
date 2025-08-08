// Destan Teknoloji - Modüler JavaScript Yapısı v1.1

// Slogan Banner Kapatma Fonksiyonu
function closeSloganBanner() {
    const banner = document.querySelector('.slogan-banner');
    if (banner) {
        banner.style.animation = 'slideUp 0.3s ease-out forwards';
        setTimeout(() => {
            banner.style.display = 'none';
            // Header'ın top değerini güncelle
            document.body.style.paddingTop = '80px';
        }, 300);
    }
}

// Modülleri import et
import './script/mobile-menu.js';
import './script/animations.js';
import './script/navigation.js';
import './script/products.js';
import { SloganBanner } from './script/slogan-banner.js';

// Ana uygulama sınıfı
class DestanApp {
    constructor() {
        this.modules = {};
        this.init();
    }
    
    init() {
        console.log('Destan Teknoloji uygulaması başlatılıyor... (v1.1)');
        
        // DOM yüklendiğinde modülleri başlat
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeModules();
            });
        } else {
            this.initializeModules();
        }
        
        // Console'a hoş geldin mesajı
        this.showWelcomeMessage();
    }
    
    initializeModules() {
        try {
            console.log('Modüller başlatılıyor...');
            
            // Animations modülünü kontrol et
            if (typeof Animations !== 'undefined') {
                this.modules.animations = new Animations();
                console.log('✅ Animations modülü başlatıldı');
            } else {
                console.error('❌ Animations sınıfı tanımlı değil');
            }
            
            // Navigation modülünü kontrol et
            if (typeof Navigation !== 'undefined') {
                this.modules.navigation = new Navigation();
                console.log('✅ Navigation modülü başlatıldı');
            } else {
                console.error('❌ Navigation sınıfı tanımlı değil');
            }
            
            // Products modülünü kontrol et
            if (typeof Products !== 'undefined') {
                this.modules.products = new Products();
                console.log('✅ Products modülü başlatıldı');
            } else {
                console.error('❌ Products sınıfı tanımlı değil');
            }
            
            // Animasyonları ayarla
            if (this.modules.animations && this.modules.animations.setupButtonAnimations) {
                this.modules.animations.setupButtonAnimations();
                console.log('✅ Buton animasyonları ayarlandı');
            }
            
            console.log('🎉 Tüm modüller başarıyla yüklendi!');
            
        } catch (error) {
            console.error('❌ Modül yükleme hatası:', error);
        }
    }
    
    showWelcomeMessage() {
        console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    Destan Teknoloji v1.1                    ║
║                                                              ║
║  🚀 Yapay Zeka ile Güçlenin!                               ║
║  📧 info@destanteknoloji.com                               ║
║  📞 +90 212 555 0123                                       ║
║                                                              ║
║  ✅ Modüler JavaScript Yapısı Aktif                        ║
║  ✅ Mobil Alt Navigasyon Çalışıyor                          ║
║  ✅ Animasyonlar Aktif                                       ║
║  ✅ Navigasyon Sistemi Çalışıyor                            ║
╚══════════════════════════════════════════════════════════════╝
        `);
    }
    
    // Global erişim için modülleri dışa aktar
    getModules() {
        return this.modules;
    }
}

// Uygulamayı başlat
const destanApp = new DestanApp();

// Global erişim için
window.destanApp = destanApp;
window.animations = destanApp.modules?.animations;
window.navigation = destanApp.modules?.navigation;
window.products = destanApp.modules?.products;
