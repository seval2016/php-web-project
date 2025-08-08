<?php
// CSS dosyalarının kontrolü
$cssFiles = [
    'style.css',
    'style/base.css',
    'style/header.css',
    'style/buttons.css',
    'style/main-content.css',
    'style/newsletter.css',
    'style/footer.css',
    'style/responsive.css',
    'style/animations.css',
    'style/forms.css'
];

echo "<h1>CSS Dosya Kontrolü</h1>";
echo "<table border='1' style='border-collapse: collapse; width: 100%;'>";
echo "<tr><th>Dosya</th><th>Durum</th><th>Boyut</th><th>Son Değişiklik</th></tr>";

foreach ($cssFiles as $file) {
    if (file_exists($file)) {
        $size = filesize($file);
        $modified = date('Y-m-d H:i:s', filemtime($file));
        echo "<tr style='background-color: #d4edda;'>";
        echo "<td>$file</td>";
        echo "<td>✅ Mevcut</td>";
        echo "<td>" . number_format($size) . " bytes</td>";
        echo "<td>$modified</td>";
        echo "</tr>";
    } else {
        echo "<tr style='background-color: #f8d7da;'>";
        echo "<td>$file</td>";
        echo "<td>❌ Bulunamadı</td>";
        echo "<td>-</td>";
        echo "<td>-</td>";
        echo "</tr>";
    }
}

echo "</table>";

// CSS içeriği kontrolü
echo "<h2>style.css İçeriği Kontrolü</h2>";
if (file_exists('style.css')) {
    $content = file_get_contents('style.css');
    echo "<pre style='background: #f8f9fa; padding: 1rem; border-radius: 0.5rem;'>";
    echo htmlspecialchars($content);
    echo "</pre>";
} else {
    echo "<p style='color: red;'>style.css dosyası bulunamadı!</p>";
}

// forms.css içeriği kontrolü
echo "<h2>forms.css İçeriği Kontrolü</h2>";
if (file_exists('style/forms.css')) {
    $content = file_get_contents('style/forms.css');
    echo "<pre style='background: #f8f9fa; padding: 1rem; border-radius: 0.5rem;'>";
    echo htmlspecialchars($content);
    echo "</pre>";
} else {
    echo "<p style='color: red;'>style/forms.css dosyası bulunamadı!</p>";
}
?>
