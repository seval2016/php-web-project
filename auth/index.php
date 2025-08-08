<?php
// Auth modülü ana dosyası
session_start();

// URL'den action parametresini al
$action = $_GET['action'] ?? 'login';

// Güvenlik kontrolü
$allowedActions = ['login', 'register', 'logout'];
if (!in_array($action, $allowedActions)) {
    $action = 'login';
}

// Sayfa başlığı ve meta bilgileri
$pageTitles = [
    'login' => 'Giriş Yap',
    'register' => 'Üye Ol',
    'logout' => 'Çıkış Yap'
];

$pageTitle = $pageTitles[$action] ?? 'Giriş Yap';

// Auth sayfası olduğunu belirt
$isAuthPage = true;
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?> - Destan Teknoloji</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="auth.css">
</head>
<body>
    <?php include '../includes/header.php'; ?>
    
    <main class="main-content">
        <div class="container">
            <?php
            // Action'a göre ilgili dosyayı include et
            $filePath = "pages/{$action}.php";
            if (file_exists($filePath)) {
                include $filePath;
            } else {
                echo '<div class="error-message">Sayfa bulunamadı.</div>';
            }
            ?>
        </div>
    </main>
    
    <?php include '../includes/footer.php'; ?>
    <script type="module" src="../script.js"></script>
    <script src="auth.js"></script>
</body>
</html>
