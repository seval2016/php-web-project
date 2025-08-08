// Auth Modülü JavaScript

class AuthModule {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupFormValidation();
        this.setupPasswordStrength();
        this.setupRememberMe();
        this.setupAutoLogout();
        console.log('Auth modülü başlatıldı');
    }
    
    // Form validasyonu
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                }
            });
            
            // Real-time validation
            const inputs = form.querySelectorAll('input[required]');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });
                
                input.addEventListener('input', () => {
                    this.clearFieldError(input);
                });
            });
        });
    }
    
    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        // Özel validasyonlar
        if (form.action.includes('register')) {
            const password = form.querySelector('input[name="password"]');
            const confirmPassword = form.querySelector('input[name="confirm-password"]');
            
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                this.showFieldError(confirmPassword, 'Şifreler eşleşmiyor');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    validateField(input) {
        const value = input.value.trim();
        const type = input.type;
        const name = input.name;
        
        // Boş alan kontrolü
        if (!value) {
            this.showFieldError(input, 'Bu alan zorunludur');
            return false;
        }
        
        // E-posta validasyonu
        if (type === 'email' && !this.isValidEmail(value)) {
            this.showFieldError(input, 'Geçerli bir e-posta adresi girin');
            return false;
        }
        
        // Şifre validasyonu
        if (name === 'password' && value.length < 6) {
            this.showFieldError(input, 'Şifre en az 6 karakter olmalıdır');
            return false;
        }
        
        // Ad soyad validasyonu
        if (name === 'name' && value.length < 2) {
            this.showFieldError(input, 'Ad soyad en az 2 karakter olmalıdır');
            return false;
        }
        
        this.clearFieldError(input);
        return true;
    }
    
    showFieldError(input, message) {
        this.clearFieldError(input);
        
        input.style.borderColor = '#dc2626';
        input.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc2626';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        input.parentNode.appendChild(errorDiv);
    }
    
    clearFieldError(input) {
        input.style.borderColor = '';
        input.style.boxShadow = '';
        
        const errorDiv = input.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Şifre gücü kontrolü
    setupPasswordStrength() {
        const passwordInput = document.querySelector('input[name="password"]');
        if (!passwordInput) return;
        
        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const strength = this.calculatePasswordStrength(password);
            this.updatePasswordStrengthIndicator(strength);
        });
    }
    
    calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 6) score += 1;
        if (password.length >= 8) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        
        return Math.min(score, 5);
    }
    
    updatePasswordStrengthIndicator(strength) {
        let strengthText = '';
        let strengthColor = '';
        
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
        
        // Şifre gücü göstergesini güncelle
        let strengthIndicator = document.querySelector('.password-strength');
        if (!strengthIndicator) {
            strengthIndicator = document.createElement('div');
            strengthIndicator.className = 'password-strength';
            strengthIndicator.style.marginTop = '0.25rem';
            strengthIndicator.style.fontSize = '0.875rem';
            
            const passwordInput = document.querySelector('input[name="password"]');
            if (passwordInput) {
                passwordInput.parentNode.appendChild(strengthIndicator);
            }
        }
        
        strengthIndicator.textContent = `Şifre Gücü: ${strengthText}`;
        strengthIndicator.style.color = strengthColor;
    }
    
    // Beni hatırla fonksiyonu
    setupRememberMe() {
        const rememberCheckbox = document.querySelector('input[name="remember"]');
        if (!rememberCheckbox) return;
        
        // Sayfa yüklendiğinde checkbox durumunu kontrol et
        const remembered = localStorage.getItem('rememberMe');
        if (remembered === 'true') {
            rememberCheckbox.checked = true;
        }
        
        rememberCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('rememberMe');
            }
        });
    }
    
    // Otomatik logout (güvenlik için)
    setupAutoLogout() {
        let inactivityTimer;
        const timeout = 30 * 60 * 1000; // 30 dakika
        
        const resetTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                this.autoLogout();
            }, timeout);
        };
        
        // Kullanıcı aktivitelerini dinle
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetTimer, true);
        });
        
        resetTimer();
    }
    
    autoLogout() {
        if (confirm('Güvenlik nedeniyle otomatik olarak çıkış yapılacak. Devam etmek istiyor musunuz?')) {
            window.location.href = 'index.php?action=logout';
        }
    }
    
    // Şifre göster/gizle
    togglePasswordVisibility(inputId) {
        const input = document.getElementById(inputId);
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        
        const button = input.nextElementSibling;
        if (button) {
            button.textContent = type === 'password' ? '👁️' : '🙈';
        }
    }
    
    // Form temizleme
    clearForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
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

// Auth modülünü başlat
document.addEventListener('DOMContentLoaded', () => {
    window.authModule = new AuthModule();
});

// Global fonksiyonlar
window.togglePassword = function(inputId) {
    if (window.authModule) {
        window.authModule.togglePasswordVisibility(inputId);
    }
};

window.clearAuthForm = function(formId) {
    if (window.authModule) {
        window.authModule.clearForm(formId);
    }
};
