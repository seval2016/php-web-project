<?php
/**
 * Slogan Banner Modülü - Dinamik Banner Sistemi
 */

// Slogan ayarları - Banner içeriği ve davranışı
$sloganConfig = [
    'icon' => '🚀',                                    // Banner ikonu
    'main_text' => 'Yapay Zeka İle Şirketini ve Muhasebeni Yönet!',  // Ana mesaj
    'sub_text' => '%20 İndirim - Sınırlı Süre',        // Alt mesaj
    'button_text' => 'Hemen Başla',                    // Buton metni
    'button_link' => '#products',                      // Buton linki
    'show_close_button' => true                        // Kapatma butonu göster
];
?>

<!-- Slogan Banner - Dinamik banner sistemi -->
<div class="slogan-banner" id="sloganBanner">
    <div class="container">
        <!-- Banner içeriği - Metin ve butonlar -->
        <div class="slogan-content">
            <!-- Sol taraf: İkon, ana metin ve alt metin -->
            <div class="slogan-text">
                <span class="slogan-icon"><?php echo $sloganConfig['icon']; ?></span>
                <span class="slogan-main"><?php echo $sloganConfig['main_text']; ?></span>
                <span class="slogan-sub"><?php echo $sloganConfig['sub_text']; ?></span>
            </div>
            
            <!-- Sağ taraf: Aksiyon butonları -->
            <div class="slogan-actions">
                <!-- Ana aksiyon butonu -->
                <a href="<?php echo $sloganConfig['button_link']; ?>" class="slogan-btn">
                    <span class="btn-text"><?php echo $sloganConfig['button_text']; ?></span>
                    <span class="btn-icon">→</span>
                </a>
                
                <!-- Kapatma butonu - Koşullu gösterim -->
                <?php if ($sloganConfig['show_close_button']): ?>
                <button class="slogan-close" onclick="closeSloganBanner()">
                    <span>×</span>
                </button>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
