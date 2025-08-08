<?php
/**
 * Auth Modülü Ana Dosyası - Kimlik Doğrulama Router
 * 
 * Bu dosya auth modülünün ana giriş noktasıdır.
 * URL parametrelerine göre login, register veya logout sayfalarını yönlendirir.
 * Güvenlik kontrolleri yapar ve uygun sayfa başlıklarını ayarlar.
 */

// Session başlat - kullanıcı oturumu için gerekli
session_start();

// URL'den action parametresini güvenli şekilde al
$action = $_GET['action'] ?? 'login';  // Varsayılan olarak login sayfası

// Güvenlik kontrolü - sadece izin verilen action'ları kabul et
$allowedActions = ['login', 'register', 'logout'];
if (!in_array($action, $allowedActions)) {
    $action = 'login';  // Geçersiz action durumunda login'e yönlendir
}

// Sayfa başlığı ve meta bilgileri - her action için uygun başlık
$pageTitles = [
    'login' => 'Giriş Yap',      // Giriş sayfası başlığı
    'register' => 'Üye Ol',      // Kayıt sayfası başlığı
    'logout' => 'Çıkış Yap'      // Çıkış sayfası başlığı
];

// Seçilen action için başlığı al, yoksa varsayılan olarak 'Giriş Yap'
$pageTitle = $pageTitles[$action] ?? 'Giriş Yap';

// Auth sayfası olduğunu belirt - diğer modüller için flag
$isAuthPage = true;
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <!-- Meta bilgileri ve sayfa ayarları -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Dinamik sayfa başlığı - action'a göre değişir -->
    <title><?php echo $pageTitle; ?> - Destan Teknoloji</title>
    
    <!-- CSS dosyaları -->
    <link rel="stylesheet" href="../style.css">  <!-- Ana stil dosyası -->
    <link rel="stylesheet" href="auth.css">      <!-- Auth modülü stilleri -->
</head>
<body>
    <!-- Header bölümü - ana site header'ı -->
    <?php include '../includes/header.php'; ?>
    
    <!-- Ana içerik alanı -->
    <main class="main-content">
        <div class="container">
            <?php
            /**
             * Dinamik Sayfa Yükleme - Action'a Göre İçerik
             * 
             * URL'deki action parametresine göre ilgili sayfa dosyasını yükler.
             * Güvenlik için dosya varlığı kontrol edilir.
             */
            
            // Action'a göre ilgili dosya yolunu oluştur
            $filePath = "pages/{$action}.php";
            
            // Dosya var mı kontrol et ve güvenli şekilde include et
            if (file_exists($filePath)) {
                include $filePath;  // İlgili sayfa dosyasını yükle
            } else {
                // Dosya bulunamazsa hata mesajı göster
                echo '<div class="error-message">Sayfa bulunamadı.</div>';
            }
            ?>
        </div>
    </main>
    
    <!-- Footer bölümü - ana site footer'ı -->
    <?php include '../includes/footer.php'; ?>
    
    <!-- JavaScript dosyaları -->
    <script type="module" src="../script.js"></script>  <!-- Ana JavaScript modülleri -->
    <script src="auth.js"></script>                     <!-- Auth modülü JavaScript -->
</body>
</html>
