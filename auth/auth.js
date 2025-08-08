/**
 * Auth Modülü JavaScript - Kimlik Doğrulama Sistemi
 * 
 * Bu dosya kullanıcı kimlik doğrulama işlemlerini yönetir.
 * Form validasyonu, şifre gücü kontrolü, otomatik logout ve güvenlik özellikleri içerir.
 * Tüm auth sayfalarında kullanılır (login, register, logout).
 */

/**
 * AuthModule Sınıfı - Ana Kimlik Doğrulama Modülü
 * 
 * Bu sınıf tüm auth işlemlerini yönetir ve güvenlik özelliklerini sağlar.
 */
class AuthModule {
    /**
     * Constructor - Sınıf başlatıldığında çalışır
     * Tüm auth özelliklerini başlatır
     */
    constructor() {
        this.init();
    }
    
    /**
     * Init - Modülü başlatır
     * Tüm auth özelliklerini sırayla başlatır
     */
    init() {
        this.setupFormValidation();    // Form validasyonu
        this.setupPasswordStrength();  // Şifre gücü kontrolü
        this.setupRememberMe();        // Beni hatırla özelliği
        this.setupAutoLogout();        // Otomatik logout
        console.log('Auth modülü başlatıldı');
    }
    
    /**
     * Form Validasyonu - Form Doğrulama Sistemi
     * 
     * Tüm formları dinler ve gerçek zamanlı validasyon yapar.
     * Submit olayını engeller ve hata mesajları gösterir.
     */
    setupFormValidation() {
        // Sayfadaki tüm formları seç
        const forms = document.querySelectorAll('form');
        
        // Her form için validasyon ayarla
        forms.forEach(form => {
            // Form submit olayını dinle
            form.addEventListener('submit', (e) => {
                // Form geçerli değilse submit'i engelle
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
            
            // Gerçek zamanlı validasyon - zorunlu alanları dinle
            const inputs = form.querySelectorAll('input[required]');
            inputs.forEach(input => {
                // Alan odaktan çıktığında validasyon yap
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                // Kullanıcı yazmaya başladığında hata mesajını temizle
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        });
    }
    
    /**
     * Form Doğrulama - Tüm Form Alanlarını Kontrol Eder
     * 
     * @param {HTMLFormElement} form - Doğrulanacak form elementi
     * @returns {boolean} - Form geçerli mi?
     */
    validateForm(form) {
        let isValid = true;  // Form geçerlilik durumu
        const inputs = form.querySelectorAll('input[required]');  // Zorunlu alanlar
        
        // Her zorunlu alanı kontrol et
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;  // Bir alan geçersizse form geçersiz
            }
        });
        
        // Kayıt formu için özel validasyonlar
        if (form.action.includes('register')) {
            const password = form.querySelector('input[name="password"]');
            const confirmPassword = form.querySelector('input[name="confirm-password"]');
            
            // Şifre eşleşme kontrolü
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                this.showFieldError(confirmPassword, 'Şifreler eşleşmiyor');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    /**
     * Alan Doğrulama - Tek Bir Input Alanını Kontrol Eder
     * 
     * @param {HTMLInputElement} input - Doğrulanacak input elementi
     * @returns {boolean} - Alan geçerli mi?
     */
    validateField(input) {
        const value = input.value.trim();  // Boşlukları temizle
        const type = input.type;           // Input tipi
        const name = input.name;           // Input adı
        
        // 1. Boş alan kontrolü
        if (!value) {
            this.showFieldError(input, 'Bu alan zorunludur');
            return false;
        }
        
        // 2. E-posta format kontrolü
        if (type === 'email' && !this.isValidEmail(value)) {
            this.showFieldError(input, 'Geçerli bir e-posta adresi girin');
            return false;
        }
        
        // 3. Şifre uzunluk kontrolü
        if (name === 'password' && value.length < 6) {
            this.showFieldError(input, 'Şifre en az 6 karakter olmalıdır');
            return false;
        }
        
        // 4. Ad soyad uzunluk kontrolü
        if (name === 'name' && value.length < 2) {
            this.showFieldError(input, 'Ad soyad en az 2 karakter olmalıdır');
            return false;
        }
        
        // Tüm kontroller geçildi - hata mesajını temizle
        this.clearFieldError(input);
        return true;
    }
    
    /**
     * Hata Göster - Input Alanında Hata Mesajı Gösterir
     * 
     * @param {HTMLInputElement} input - Hata gösterilecek input
     * @param {string} message - Hata mesajı
     */
    showFieldError(input, message) {
        // Önceki hata mesajını temizle
        this.clearFieldError(input);
        
        // Input stilini hata rengine çevir
        input.style.borderColor = '#dc2626';  // Kırmızı border
        input.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';  // Kırmızı glow
        
        // Hata mesajı elementi oluştur
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc2626';        // Kırmızı metin
        errorDiv.style.fontSize = '0.875rem';    // Küçük font
        errorDiv.style.marginTop = '0.25rem';    // Üst boşluk
        
        // Hata mesajını input'un altına ekle
        input.parentNode.appendChild(errorDiv);
    }
    
    /**
     * Hata Temizle - Input Alanındaki Hata Mesajını Kaldırır
     * 
     * @param {HTMLInputElement} input - Hata temizlenecek input
     */
    clearFieldError(input) {
        // Input stilini normale çevir
        input.style.borderColor = '';
        input.style.boxShadow = '';
        
        // Hata mesajı elementini bul ve kaldır
        const errorDiv = input.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    /**
     * E-posta Doğrulama - E-posta Formatını Kontrol Eder
     * 
     * @param {string} email - Kontrol edilecek e-posta adresi
     * @returns {boolean} - E-posta geçerli mi?
     */
    isValidEmail(email) {
        // E-posta formatı için regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Şifre Gücü Kontrolü - Şifre Kalitesini Ölçer
     * 
     * Şifre alanını dinler ve gerçek zamanlı güç analizi yapar.
     * Kullanıcıya şifre gücü hakkında görsel geri bildirim verir.
     */
    setupPasswordStrength() {
        // Şifre input alanını bul
        const passwordInput = document.querySelector('input[name="password"]');
        if (!passwordInput) return;  // Şifre alanı yoksa çık
        
        // Şifre yazıldıkça güç analizi yap
        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const strength = this.calculatePasswordStrength(password);
            this.updatePasswordStrengthIndicator(strength);
        });
    }
    
    /**
     * Şifre Gücü Hesaplama - Şifre Kalitesini Puanlar
     * 
     * @param {string} password - Analiz edilecek şifre
     * @returns {number} - Şifre gücü puanı (0-5)
     */
    calculatePasswordStrength(password) {
        let score = 0;  // Başlangıç puanı
        
        // 1. Uzunluk kontrolü (6+ karakter)
        if (password.length >= 6) score += 1;
        // 2. Uzunluk kontrolü (8+ karakter)
        if (password.length >= 8) score += 1;
        // 3. Küçük harf kontrolü
        if (/[a-z]/.test(password)) score += 1;
        // 4. Büyük harf kontrolü
        if (/[A-Z]/.test(password)) score += 1;
        // 5. Rakam kontrolü
        if (/[0-9]/.test(password)) score += 1;
        // 6. Özel karakter kontrolü
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        
        // Maksimum 5 puan döndür
        return Math.min(score, 5);
    }
    
    /**
     * Şifre Gücü Göstergesi - Görsel Geri Bildirim Sağlar
     * 
     * @param {number} strength - Şifre gücü puanı (0-5)
     */
    updatePasswordStrengthIndicator(strength) {
        let strengthText = '';   // Güç metni
        let strengthColor = '';  // Güç rengi
        
        // Puanına göre güç seviyesi belirle
        switch (strength) {
            case 0:
            case 1:
                strengthText = 'Çok Zayıf';
                strengthColor = '#dc2626';
                break;
            case 2:
                strengthText = 'Zayıf';
                strengthColor = '#ea580c';
                break;
            case 3:
                strengthText = 'Orta';
                strengthColor = '#ca8a04';
                break;
            case 4:
                strengthText = 'Güçlü';
                strengthColor = '#16a34a';
                break;
            case 5:
                strengthText = 'Çok Güçlü';
                strengthColor = '#059669';
                break;
        }
        
        // Şifre gücü göstergesini bul veya oluştur
        let strengthIndicator = document.querySelector('.password-strength');
        if (!strengthIndicator) {
            // Gösterge yoksa oluştur
            strengthIndicator = document.createElement('div');
            strengthIndicator.className = 'password-strength';
            strengthIndicator.style.marginTop = '0.25rem';
            strengthIndicator.style.fontSize = '0.875rem';
            
            // Şifre input'unun altına ekle
            const passwordInput = document.querySelector('input[name="password"]');
            if (passwordInput) {
                passwordInput.parentNode.appendChild(strengthIndicator);
            }
        }
        
        // Göstergeyi güncelle
        strengthIndicator.textContent = `Şifre Gücü: ${strengthText}`;
        strengthIndicator.style.color = strengthColor;
    }
    
    /**
     * Beni Hatırla - Kullanıcı Tercihini Kaydeder
     * 
     * "Beni hatırla" checkbox'ını dinler ve localStorage'da saklar.
     * Sayfa yenilendiğinde kullanıcının tercihini hatırlar.
     */
    setupRememberMe() {
        // Beni hatırla checkbox'ını bul
        const rememberCheckbox = document.querySelector('input[name="remember"]');
        if (!rememberCheckbox) return;  // Checkbox yoksa çık
        
        // Sayfa yüklendiğinde önceki tercihi kontrol et
        const remembered = localStorage.getItem('rememberMe');
        if (remembered === 'true') {
            rememberCheckbox.checked = true;  // Önceki tercihi uygula
        }
        
        // Checkbox değiştiğinde localStorage'ı güncelle
        rememberCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                localStorage.setItem('rememberMe', 'true');  // Tercihi kaydet
            } else {
                localStorage.removeItem('rememberMe');  // Tercihi sil
            }
        });
    }
    
    /**
     * Otomatik Logout - Güvenlik İçin İnaktivite Kontrolü
     * 
     * Kullanıcı 30 dakika hareketsiz kalırsa otomatik olarak çıkış yapar.
     * Güvenlik amacıyla kullanıcı aktivitelerini dinler.
     */
    setupAutoLogout() {
        let inactivityTimer;  // İnaktivite zamanlayıcısı
        const timeout = 30 * 60 * 1000;  // 30 dakika (milisaniye)
        
        // Zamanlayıcıyı sıfırla ve yeniden başlat
        const resetTimer = () => {
            clearTimeout(inactivityTimer);  // Önceki zamanlayıcıyı temizle
            inactivityTimer = setTimeout(() => {
                this.autoLogout();  // Süre dolduğunda logout yap
            }, timeout);
        };
        
        // Kullanıcı aktivitelerini dinle - her aktivitede zamanlayıcıyı sıfırla
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetTimer, true);
        });
        
        // İlk zamanlayıcıyı başlat
        resetTimer();
    }
    
    /**
     * Otomatik Logout - Güvenlik Uyarısı ve Çıkış
     * 
     * İnaktivite süresi dolduğunda kullanıcıya uyarı verir ve çıkış yapar.
     * Kullanıcı onaylarsa logout sayfasına yönlendirir.
     */
    autoLogout() {
        // Kullanıcıya güvenlik uyarısı göster
        if (confirm('Güvenlik nedeniyle otomatik olarak çıkış yapılacak. Devam etmek istiyor musunuz?')) {
            // Kullanıcı onaylarsa logout sayfasına yönlendir
            window.location.href = 'index.php?action=logout';
        }
    }
    
    /**
     * Şifre Göster/Gizle - Şifre Alanının Görünürlüğünü Değiştirir
     * 
     * @param {string} inputId - Şifre input'unun ID'si
     */
    togglePasswordVisibility(inputId) {
        const input = document.getElementById(inputId);
        const type = input.type === 'password' ? 'text' : 'password';  // Tip değiştir
        input.type = type;
        
        // Buton ikonunu güncelle
        const button = input.nextElementSibling;
        if (button) {
            button.textContent = type === 'password' ? '👁️' : '🙈';  // İkon değiştir
        }
    }
    
    /**
     * Form Temizleme - Formu Sıfırlar ve Hataları Temizler
     * 
     * @param {string} formId - Temizlenecek formun ID'si
     */
    clearForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            // Formu sıfırla
            form.reset();
            
            // Hata mesajlarını temizle
            const errors = form.querySelectorAll('.field-error');
            errors.forEach(error => error.remove());
            
            // Input stillerini sıfırla
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            });
        }
    }
}

/**
 * Modül Başlatma - Auth Modülünü Sayfa Yüklendiğinde Başlatır
 * 
 * DOM yüklendiğinde AuthModule sınıfını başlatır ve global erişim sağlar.
 */
document.addEventListener('DOMContentLoaded', () => {
    window.authModule = new AuthModule();  // Global auth modülü oluştur
});

/**
 * Global Fonksiyonlar - Dışarıdan Erişim İçin
 * 
 * Bu fonksiyonlar HTML'den doğrudan çağrılabilir.
 */

/**
 * Şifre Görünürlük Değiştirme - Global Erişim
 * 
 * @param {string} inputId - Şifre input'unun ID'si
 */
window.togglePassword = function(inputId) {
    if (window.authModule) {
        window.authModule.togglePasswordVisibility(inputId);
    }
};

/**
 * Form Temizleme - Global Erişim
 * 
 * @param {string} formId - Temizlenecek formun ID'si
 */
window.clearAuthForm = function(formId) {
    if (window.authModule) {
        window.authModule.clearForm(formId);
    }
};
