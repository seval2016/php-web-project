<?php
/**
 * Login Sayfası - Kullanıcı Giriş İşlemleri
 */

// Hata ve başarı mesajları için değişkenler
$error = '';           // Hata mesajı
$success = '';         // Başarı mesajı
$redirect_url = '';    // Yönlendirme URL'i

// Form POST metodu ile gönderildi mi kontrol et
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Form verilerini güvenli şekilde al
    $email = $_POST['email'] ?? '';        // E-posta adresi
    $password = $_POST['password'] ?? '';  // Şifre
    
    // Demo kullanıcı bilgileri ile giriş kontrolü
    if ($email === 'demo@destan.com' && $password === '123456') {
        // Giriş başarılı - Session bilgilerini ayarla
        $_SESSION['user_id'] = 1;                    // Kullanıcı ID'si
        $_SESSION['user_email'] = $email;            // E-posta adresi
        $_SESSION['user_name'] = 'Demo Kullanıcı';   // Kullanıcı adı
        
        // Başarı mesajı ve yönlendirme URL'i
        $success = 'Giriş başarılı! Admin paneline yönlendiriliyorsunuz...';
        $redirect_url = '../admin/index.php';
    } else {
        // Giriş başarısız - Hata mesajı
        $error = 'E-posta veya şifre hatalı.';
    }
}
?>

<!-- Ana giriş formu container'ı -->
<div class="auth-container">
    <!-- Giriş formu kartı -->
    <div class="login-form">
        <!-- Sayfa başlığı -->
        <h2>Giriş Yap</h2>
        
        <!-- Hata mesajı gösterimi -->
        <?php if ($error): ?>
            <div class="alert alert-error"><?php echo $error; ?></div>
        <?php endif; ?>
        
        <!-- Başarı mesajı gösterimi -->
        <?php if ($success): ?>
            <div class="alert alert-success"><?php echo $success; ?></div>
        <?php endif; ?>
        
        <!-- Giriş formu - POST metodu ile gönderilir -->
        <form method="POST" action="index.php?action=login" autocomplete="off" novalidate>
            <!-- E-posta alanı -->
            <div class="form-group">
                <label for="email">E-posta</label>
                <input type="text" id="email" name="email" 
                       value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>" 
                       autocomplete="off">
            </div>
            
            <!-- Şifre alanı -->
            <div class="form-group">
                <label for="password">Şifre</label>
                <input type="password" id="password" name="password" 
                       autocomplete="off" 
                       data-lpignore="true" 
                       data-form-type="other" 
                       spellcheck="false">
            </div>
            
            <!-- Beni hatırla checkbox'ı -->
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="remember" value="1">
                    <span class="checkmark"></span>
                    Beni hatırla
                </label>
            </div>
            
            <!-- Giriş butonu -->
            <button type="submit" class="btn btn-primary">Giriş Yap</button>
        </form>
        
        <!-- Yardımcı linkler -->
        <div class="auth-links">
            <p>Hesabınız yok mu? <a href="index.php?action=register">Üye Ol</a></p>
            <p><a href="index.php?action=forgot-password">Şifremi Unuttum</a></p>
        </div>
        
        <!-- Demo kullanıcı bilgileri -->
        <div class="demo-info">
            <p><strong>Demo Giriş:</strong></p>
            <p>E-posta: demo@destan.com</p>
            <p>Şifre: 123456</p>
        </div>
    </div>
</div>

<?php if ($redirect_url): ?>
<!-- Başarılı giriş sonrası otomatik yönlendirme -->
<script>
// 2 saniye sonra admin paneline yönlendir
setTimeout(function() {
    window.location.href = '<?php echo $redirect_url; ?>';
}, 2000);
</script>
<?php endif; ?>
