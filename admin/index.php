<?php
// Admin modülü ana dosyası
session_start();

// Oturum kontrolü
if (!isset($_SESSION['user_id'])) {
    header('Location: ../auth/index.php?action=login');
    exit;
}

// URL'den action parametresini al
$action = $_GET['action'] ?? 'dashboard';

// Güvenlik kontrolü
$allowedActions = ['dashboard', 'users', 'products', 'orders', 'analytics', 'settings', 'support'];
if (!in_array($action, $allowedActions)) {
    $action = 'dashboard';
}

// Sayfa başlığı ve meta bilgileri
$pageTitles = [
    'dashboard' => 'Dashboard',
    'users' => 'Kullanıcı Yönetimi',
    'products' => 'Ürün Yönetimi',
    'orders' => 'Sipariş Yönetimi',
    'analytics' => 'Analitik',
    'settings' => 'Sistem Ayarları',
    'support' => 'Destek'
];

$pageTitle = $pageTitles[$action] ?? 'Dashboard';
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?> - Admin Panel</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="admin.css">
</head>
<body>
    <?php
    // Action'a göre ilgili dosyayı include et
    $filePath = "{$action}.php";
    if (file_exists($filePath)) {
        include $filePath;
    } else {
        echo '<div class="error-message">Sayfa bulunamadı.</div>';
    }
    ?>
    
    <script type="module" src="../script.js"></script>
    <script src="admin.js"></script>
</body>
</html>
