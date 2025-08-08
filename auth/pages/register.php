<?php
/**
 * Register Sayfası - Kullanıcı Kayıt İşlemleri
 * 
 * Bu dosya kullanıcıların sisteme kayıt olmasını sağlar.
 * Form validasyonu yapar ve güvenli kayıt işlemi gerçekleştirir.
 * Başarılı kayıt sonrası giriş sayfasına yönlendirme yapar.
 */

// Hata ve başarı mesajları için değişkenler
$error = '';           // Hata mesajı
$success = '';         // Başarı mesajı

// Form POST metodu ile gönderildi mi kontrol et
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Form verilerini güvenli şekilde al
    $name = $_POST['name'] ?? '';                    // Ad soyad
    $email = $_POST['email'] ?? '';                  // E-posta adresi
    $password = $_POST['password'] ?? '';            // Şifre
    $confirmPassword = $_POST['confirm-password'] ?? '';  // Şifre tekrarı
    $terms = $_POST['terms'] ?? '';                  // Kullanım şartları onayı
    
    // Form validasyonu - adım adım kontrol
    if (empty($name) || empty($email) || empty($password) || empty($confirmPassword)) {
        // Boş alan kontrolü
        $error = 'Lütfen tüm alanları doldurun.';
    } elseif ($password !== $confirmPassword) {
        // Şifre eşleşme kontrolü
        $error = 'Şifreler eşleşmiyor.';
    } elseif (strlen($password) < 6) {
        // Şifre uzunluk kontrolü
        $error = 'Şifre en az 6 karakter olmalıdır.';
    } elseif (empty($terms)) {
        // Kullanım şartları onay kontrolü
        $error = 'Kullanım şartlarını kabul etmelisiniz.';
    } else {
        // Tüm validasyonlar geçildi - kayıt işlemi
        // Burada gerçek veritabanı kayıt işlemi yapılacak
        // Şimdilik demo amaçlı başarılı kabul ediyoruz
        
        // Başarı mesajı
        $success = 'Kayıt başarılı! 2 saniye sonra giriş sayfasına yönlendirileceksiniz.';
        
        // JavaScript ile otomatik yönlendirme
        echo '<script>
            setTimeout(function() {
                window.location.href = "index.php?action=login";
            }, 2000);
        </script>';
    }
}
?>

<!-- Ana kayıt formu container'ı -->
<div class="auth-container">
    <!-- Kayıt formu kartı -->
    <div class="register-form">
        <!-- Sayfa başlığı -->
        <h2>Üye Ol</h2>
        
        <!-- Hata mesajı gösterimi -->
        <?php if ($error): ?>
            <div class="alert alert-error"><?php echo $error; ?></div>
        <?php endif; ?>
        
        <!-- Başarı mesajı gösterimi -->
        <?php if ($success): ?>
            <div class="alert alert-success"><?php echo $success; ?></div>
        <?php endif; ?>
        
        <!-- Kayıt formu - POST metodu ile gönderilir -->
        <form method="POST" action="index.php?action=register">
            <!-- Ad Soyad alanı -->
            <div class="form-group">
                <label for="name">Ad Soyad</label>
                <input type="text" id="name" name="name" 
                       value="<?php echo htmlspecialchars($_POST['name'] ?? ''); ?>" 
                       required>
            </div>
            
            <!-- E-posta alanı -->
            <div class="form-group">
                <label for="email">E-posta</label>
                <input type="email" id="email" name="email" 
                       value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>" 
                       required>
            </div>
            
            <!-- Şifre alanı -->
            <div class="form-group">
                <label for="password">Şifre</label>
                <input type="password" id="password" name="password" required>
                <small class="form-help">En az 6 karakter olmalıdır.</small>
            </div>
            
            <!-- Şifre tekrar alanı -->
            <div class="form-group">
                <label for="confirm-password">Şifre Tekrar</label>
                <input type="password" id="confirm-password" name="confirm-password" required>
            </div>
            
            <!-- Kullanım şartları onayı -->
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="terms" value="1" 
                           <?php echo isset($_POST['terms']) ? 'checked' : ''; ?>>
                    <span class="checkmark"></span>
                    <a href="../terms.php" target="_blank">Kullanım şartlarını</a> kabul ediyorum.
                </label>
            </div>
            
            <!-- E-posta bülteni aboneliği (opsiyonel) -->
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="newsletter" value="1" 
                           <?php echo isset($_POST['newsletter']) ? 'checked' : ''; ?>>
                    <span class="checkmark"></span>
                    E-posta bültenine abone olmak istiyorum.
                </label>
            </div>
            
            <!-- Kayıt butonu -->
            <button type="submit" class="btn btn-primary">Üye Ol</button>
        </form>
        
        <!-- Yardımcı linkler -->
        <div class="auth-links">
            <p>Zaten hesabınız var mı? <a href="index.php?action=login">Giriş Yap</a></p>
        </div>
    </div>
</div>
