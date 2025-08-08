<?php
// Slogan Banner Modülü
// Bu dosya header içerisinde include edilecek

// Slogan ayarları
$sloganConfig = [
    'icon' => '🚀',
    'main_text' => 'Yapay Zeka İle Şirketini ve Muhasebeni Yönet!',
    'sub_text' => '%20 İndirim - Sınırlı Süre',
    'button_text' => 'Hemen Başla',
    'button_link' => '#products',
    'show_close_button' => true
];
?>

<!-- Slogan Banner -->
<div class="slogan-banner" id="sloganBanner">
    <div class="container">
        <div class="slogan-content">
            <div class="slogan-text">
                <span class="slogan-icon"><?php echo $sloganConfig['icon']; ?></span>
                <span class="slogan-main"><?php echo $sloganConfig['main_text']; ?></span>
                <span class="slogan-sub"><?php echo $sloganConfig['sub_text']; ?></span>
            </div>
            
            <div class="slogan-actions">
                <a href="<?php echo $sloganConfig['button_link']; ?>" class="slogan-btn">
                    <span class="btn-text"><?php echo $sloganConfig['button_text']; ?></span>
                    <span class="btn-icon">→</span>
                </a>
                
                <?php if ($sloganConfig['show_close_button']): ?>
                <button class="slogan-close" onclick="closeSloganBanner()">
                    <span>×</span>
                </button>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
