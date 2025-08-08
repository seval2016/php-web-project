<?php
/**
 * Logout Sayfası - Kullanıcı Çıkış Arayüzü
 */

// Çıkış mesajı - kullanıcıya gösterilecek metin
$logout_message = 'Çıkış yapılıyor...';
?>

<!-- Ana çıkış sayfası container'ı -->
<div class="auth-container">
    <!-- Çıkış mesajı kartı -->
    <div class="logout-message">
        <!-- Sayfa başlığı -->
        <h2>Çıkış Yapılıyor</h2>
        
        <!-- Dinamik çıkış mesajı -->
        <p><?php echo $logout_message; ?></p>
        
        <!-- Loading animasyonu -->
        <div class="loading-spinner"></div>
    </div>
</div>

<script>
/**
 * Logout İşlemi JavaScript Fonksiyonları
 * 
 * Bu script kullanıcının güvenli şekilde sistemden çıkış yapmasını sağlar.
 * AJAX ile logout-process.php dosyasını çağırır ve sonucu işler.
 */

// Ana logout fonksiyonu - AJAX ile çıkış işlemi yapar
function performLogout() {
    // AJAX ile logout işlemi yap
    fetch('logout-process.php', {
        method: 'POST',                    // POST metodu kullan
        headers: {
            'Content-Type': 'application/json',  // JSON content type
        }
    })
    .then(response => response.json())     // Yanıtı JSON olarak parse et
    .then(data => {
        // Başarılı veya başarısız durumda ana sayfaya yönlendir
        if (data.success) {
            // Başarılı çıkış - ana sayfaya yönlendir
            window.location.href = '../index.php';
        } else {
            // Hata durumunda da güvenlik için ana sayfaya yönlendir
            window.location.href = '../index.php';
        }
    })
    .catch(error => {
        // Network hatası durumunda da ana sayfaya yönlendir
        // Kullanıcıyı takılı bırakmamak için
        window.location.href = '../index.php';
    });
}

// Sayfa yüklendiğinde logout işlemini başlat
document.addEventListener('DOMContentLoaded', function() {
    // 1 saniye bekle ve logout işlemini başlat
    // Kullanıcının loading animasyonunu görmesi için
    setTimeout(performLogout, 1000);
});
</script>

<style>
/**
 * Logout Sayfası CSS Stilleri
 * 
 * Bu stiller çıkış sayfasının görünümünü ve loading animasyonunu tanımlar.
 */

/* Çıkış mesajı kartı stilleri */
.logout-message {
    text-align: center;    /* İçeriği ortala */
    padding: 2rem;         /* İç boşluk */
}

/* Loading spinner animasyonu */
.loading-spinner {
    width: 40px;           /* Genişlik */
    height: 40px;          /* Yükseklik */
    border: 4px solid #f3f3f3;      /* Açık gri çerçeve */
    border-top: 4px solid #3498db;  /* Mavi üst çerçeve */
    border-radius: 50%;    /* Daire şekli */
    animation: spin 1s linear infinite;  /* Döndürme animasyonu */
    margin: 1rem auto;     /* Ortalama ve üst-alt boşluk */
}

/* Döndürme animasyonu keyframes */
@keyframes spin {
    0% { transform: rotate(0deg); }     /* Başlangıç pozisyonu */
    100% { transform: rotate(360deg); } /* Tam dönüş */
}
</style>
