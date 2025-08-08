<?php
// Login sayfası
$error = '';
$success = '';

// Form gönderildi mi kontrol et
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    
    // Basit validasyon
    if (empty($email) || empty($password)) {
        $error = 'Lütfen tüm alanları doldurun.';
    } else {
        // Burada gerçek login işlemi yapılacak
        // Şimdilik demo amaçlı basit kontrol
        if ($email === 'demo@destan.com' && $password === '123456') {
            $_SESSION['user_id'] = 1;
            $_SESSION['user_email'] = $email;
            $_SESSION['user_name'] = 'Demo Kullanıcı';
            
            $success = 'Giriş başarılı! Admin paneline yönlendiriliyorsunuz...';
            header('Refresh: 2; URL=../admin/index.php');
        } else {
            $error = 'E-posta veya şifre hatalı.';
        }
    }
}
?>

<div class="auth-container">
    <div class="login-form">
        <h2>Giriş Yap</h2>
        
        <?php if ($error): ?>
            <div class="alert alert-error"><?php echo $error; ?></div>
        <?php endif; ?>
        
        <?php if ($success): ?>
            <div class="alert alert-success"><?php echo $success; ?></div>
        <?php endif; ?>
        
        <form method="POST" action="index.php?action=login">
            <div class="form-group">
                <label for="email">E-posta</label>
                <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>" required>
            </div>
            <div class="form-group">
                <label for="password">Şifre</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="remember" value="1">
                    <span class="checkmark"></span>
                    Beni hatırla
                </label>
            </div>
            <button type="submit" class="btn btn-primary">Giriş Yap</button>
        </form>
        
        <div class="auth-links">
            <p>Hesabınız yok mu? <a href="index.php?action=register">Üye Ol</a></p>
            <p><a href="index.php?action=forgot-password">Şifremi Unuttum</a></p>
        </div>
        
        <div class="demo-info">
            <p><strong>Demo Giriş:</strong></p>
            <p>E-posta: demo@destan.com</p>
            <p>Şifre: 123456</p>
        </div>
    </div>
</div>
