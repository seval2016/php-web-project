// Slogan Banner Modülü
class SloganBanner {
    constructor() {
        this.banner = document.querySelector('#sloganBanner');
        this.init();
    }
    
    init() {
        if (this.banner) {
            this.setupEventListeners();
            console.log('✅ Slogan Banner modülü başlatıldı');
        } else {
            console.warn('⚠️ Slogan banner elementi bulunamadı');
        }
    }
    
    setupEventListeners() {
        // Kapatma butonuna tıklama
        const closeBtn = this.banner.querySelector('.slogan-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        
        // ESC tuşu ile kapatma
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.banner.style.display !== 'none') {
                this.close();
            }
        });
    }
    
    close() {
        if (this.banner) {
            this.banner.style.animation = 'slideUp 0.3s ease-out forwards';
            
            setTimeout(() => {
                this.banner.style.display = 'none';
                this.updateBodyPadding();
                console.log('✅ Slogan banner kapatıldı');
            }, 300);
        }
    }
    
    show() {
        if (this.banner) {
            this.banner.style.display = 'block';
            this.banner.style.animation = 'slideDown 0.4s ease-out';
            this.updateBodyPadding();
            console.log('✅ Slogan banner gösterildi');
        }
    }
    
    updateBodyPadding() {
        const isVisible = this.banner && this.banner.style.display !== 'none';
        if (isVisible) {
            document.body.style.paddingTop = '60px';
        } else {
            document.body.style.paddingTop = '20px';
        }
    }
    
    // Slogan içeriğini dinamik olarak güncelleme
    updateContent(config) {
        if (!this.banner) return;
        
        const icon = this.banner.querySelector('.slogan-icon');
        const mainText = this.banner.querySelector('.slogan-main');
        const subText = this.banner.querySelector('.slogan-sub');
        const buttonText = this.banner.querySelector('.slogan-btn .btn-text');
        const buttonLink = this.banner.querySelector('.slogan-btn');
        
        if (config.icon && icon) icon.textContent = config.icon;
        if (config.main_text && mainText) mainText.textContent = config.main_text;
        if (config.sub_text && subText) subText.textContent = config.sub_text;
        if (config.button_text && buttonText) buttonText.textContent = config.button_text;
        if (config.button_link && buttonLink) buttonLink.href = config.button_link;
        
        console.log('✅ Slogan banner içeriği güncellendi');
    }
}

// Global fonksiyon (geriye uyumluluk için)
function closeSloganBanner() {
    if (window.sloganBanner) {
        window.sloganBanner.close();
    }
}

// Modülü dışa aktar
export { SloganBanner };
