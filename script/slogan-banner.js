/**
 * Slogan Banner Modülü - Dinamik Banner Yönetimi
 * 
 * Bu dosya slogan banner'ının JavaScript işlevselliğini yönetir.
 * Banner'ı açma, kapama, içerik güncelleme ve animasyon işlemlerini sağlar.
 * localStorage ile kullanıcı tercihlerini hatırlar.
 */

/**
 * SloganBanner Sınıfı - Ana Banner Yönetim Sınıfı
 * 
 * Bu sınıf slogan banner'ının tüm işlevselliğini yönetir.
 * Açma, kapama, içerik güncelleme ve animasyon işlemlerini sağlar.
 */
class SloganBanner {
    /**
     * Constructor - Sınıf başlatıldığında çalışır
     * Banner elementini bulur ve modülü başlatır
     */
    constructor() {
        this.banner = document.querySelector('#sloganBanner');  // Banner elementi
        this.init();  // Modülü başlat
    }
    
    /**
     * Init - Modülü başlatır
     * Banner elementini kontrol eder ve event listener'ları ayarlar
     */
    init() {
        if (this.banner) {
            this.setupEventListeners();  // Event listener'ları ayarla
            console.log('✅ Slogan Banner modülü başlatıldı');
        } else {
            console.warn('⚠️ Slogan banner elementi bulunamadı');
        }
    }
    
    /**
     * Event Listener'ları Ayarla - Kullanıcı etkileşimlerini dinler
     * 
     * Kapatma butonu ve ESC tuşu ile banner'ı kapatma işlevselliği sağlar.
     */
    setupEventListeners() {
        // Kapatma butonuna tıklama - X butonuna tıklandığında kapat
        const closeBtn = this.banner.querySelector('.slogan-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        
        // ESC tuşu ile kapatma - Klavye kısayolu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.banner.style.display !== 'none') {
                this.close();
            }
        });
    }
    
    /**
     * Banner'ı Kapat - Animasyonlu kapatma işlemi
     * 
     * Banner'ı yukarı doğru kaydırarak kapatır ve body padding'ini günceller.
     * 300ms animasyon süresi ile yumuşak geçiş sağlar.
     */
    close() {
        if (this.banner) {
            // Yukarı kaydırma animasyonu
            this.banner.style.animation = 'slideUp 0.3s ease-out forwards';
            
            // Animasyon tamamlandıktan sonra gizle
            setTimeout(() => {
                this.banner.style.display = 'none';
                this.updateBodyPadding();  // Body padding'ini güncelle
                console.log('✅ Slogan banner kapatıldı');
            }, 300);
        }
    }
    
    /**
     * Banner'ı Göster - Animasyonlu gösterme işlemi
     * 
     * Banner'ı aşağı doğru kaydırarak gösterir ve body padding'ini günceller.
     * 400ms animasyon süresi ile yumuşak geçiş sağlar.
     */
    show() {
        if (this.banner) {
            this.banner.style.display = 'block';
            // Aşağı kaydırma animasyonu
            this.banner.style.animation = 'slideDown 0.4s ease-out';
            this.updateBodyPadding();  // Body padding'ini güncelle
            console.log('✅ Slogan banner gösterildi');
        }
    }
    
    /**
     * Body Padding Güncelle - Sayfa düzenini ayarlar
     * 
     * Banner görünür olduğunda body'ye üst padding ekler,
     * gizli olduğunda normal padding'e döner.
     */
    updateBodyPadding() {
        const isVisible = this.banner && this.banner.style.display !== 'none';
        if (isVisible) {
            document.body.style.paddingTop = '60px';  // Banner için alan
        } else {
            document.body.style.paddingTop = '20px';  // Normal padding
        }
    }
    
    /**
     * İçerik Güncelle - Banner içeriğini dinamik olarak değiştirir
     * 
     * @param {Object} config - Güncellenecek içerik konfigürasyonu
     * @param {string} config.icon - Banner ikonu
     * @param {string} config.main_text - Ana metin
     * @param {string} config.sub_text - Alt metin
     * @param {string} config.button_text - Buton metni
     * @param {string} config.button_link - Buton linki
     */
    updateContent(config) {
        if (!this.banner) return;  // Banner yoksa çık
        
        // Banner içindeki elementleri bul
        const icon = this.banner.querySelector('.slogan-icon');           // İkon elementi
        const mainText = this.banner.querySelector('.slogan-main');       // Ana metin elementi
        const subText = this.banner.querySelector('.slogan-sub');         // Alt metin elementi
        const buttonText = this.banner.querySelector('.slogan-btn .btn-text');  // Buton metni elementi
        const buttonLink = this.banner.querySelector('.slogan-btn');      // Buton link elementi
        
        // Konfigürasyona göre içerikleri güncelle
        if (config.icon && icon) icon.textContent = config.icon;
        if (config.main_text && mainText) mainText.textContent = config.main_text;
        if (config.sub_text && subText) subText.textContent = config.sub_text;
        if (config.button_text && buttonText) buttonText.textContent = config.button_text;
        if (config.button_link && buttonLink) buttonLink.href = config.button_link;
        
        console.log('✅ Slogan banner içeriği güncellendi');
    }
}

/**
 * Global Fonksiyon - Geriye Uyumluluk İçin
 * 
 * HTML'den doğrudan çağrılabilir global fonksiyon.
 * Eski kodlarla uyumluluk sağlar.
 */
function closeSloganBanner() {
    if (window.sloganBanner) {
        window.sloganBanner.close();  // Global instance'ı kullan
    }
}

/**
 * Modül Dışa Aktarma - ES6 Module Sistemi
 * 
 * Bu modülü diğer dosyalarda import edebilmek için dışa aktarır.
 */
export { SloganBanner };
