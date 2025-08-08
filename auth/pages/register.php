<?php
// Register sayfası
$error = '';
$success = '';

// Form gönderildi mi kontrol et
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm-password'] ?? '';
    $terms = $_POST['terms'] ?? '';
    
    // Validasyon
    if (empty($name) || empty($email) || empty($password) || empty($confirmPassword)) {
        $error = 'Lütfen tüm alanları doldurun.';
    } elseif ($password !== $confirmPassword) {
        $error = 'Şifreler eşleşmiyor.';
    } elseif (strlen($password) < 6) {
        $error = 'Şifre en az 6 karakter olmalıdır.';
    } elseif (empty($terms)) {
        $error = 'Kullanım şartlarını kabul etmelisiniz.';
    } else {
        // Burada gerçek kayıt işlemi yapılacak
        // Şimdilik demo amaçlı başarılı kabul ediyoruz
        $success = 'Kayıt başarılı! 2 saniye sonra giriş sayfasına yönlendirileceksiniz.';
        
        // JavaScript ile yönlendirme yapalım
        echo '<script>
            setTimeout(function() {
                window.location.href = "index.php?action=login";
            }, 2000);
        </script>';
    }
}
?>

<div class="auth-container">
    <div class="register-form">
        <h2>Üye Ol</h2>
        
        <?php if ($error): ?>
            <div class="alert alert-error"><?php echo $error; ?></div>
        <?php endif; ?>
        
        <?php if ($success): ?>
            <div class="alert alert-success"><?php echo $success; ?></div>
        <?php endif; ?>
        
        <form method="POST" action="index.php?action=register">
            <div class="form-group">
                <label for="name">Ad Soyad</label>
                <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($_POST['name'] ?? ''); ?>" required>
            </div>
            <div class="form-group">
                <label for="email">E-posta</label>
                <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>" required>
            </div>
            <div class="form-group">
                <label for="password">Şifre</label>
                <input type="password" id="password" name="password" required>
                <small class="form-help">En az 6 karakter olmalıdır.</small>
            </div>
            <div class="form-group">
                <label for="confirm-password">Şifre Tekrar</label>
                <input type="password" id="confirm-password" name="confirm-password" required>
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="terms" value="1" <?php echo isset($_POST['terms']) ? 'checked' : ''; ?>>
                    <span class="checkmark"></span>
                    <a href="../terms.php" target="_blank">Kullanım şartlarını</a> kabul ediyorum.
                </label>
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="newsletter" value="1" <?php echo isset($_POST['newsletter']) ? 'checked' : ''; ?>>
                    <span class="checkmark"></span>
                    E-posta bültenine abone olmak istiyorum.
                </label>
            </div>
            <button type="submit" class="btn btn-primary">Üye Ol</button>
        </form>
        
        <div class="auth-links">
            <p>Zaten hesabınız var mı? <a href="index.php?action=login">Giriş Yap</a></p>
        </div>
    </div>
</div>
