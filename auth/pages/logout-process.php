<?php
/**
 * Logout İşlemi - Kullanıcı Çıkış İşlemleri
 */

// AJAX istekleri için JSON content type ayarla
header('Content-Type: application/json');

// Session'ın başlatılıp başlatılmadığını kontrol et ve gerekirse başlat
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

try {
    // Güvenli çıkış işlemi başlat
    
    // 1. Tüm session verilerini temizle
    $_SESSION = array();

    // 2. Session cookie'sini tarayıcıdan sil
    if (ini_get("session.use_cookies")) {
        // Mevcut session cookie parametrelerini al
        $params = session_get_cookie_params();
        
        // Cookie'yi geçmiş bir tarihle sil (güvenli silme)
        setcookie(session_name(), '', time() - 42000,
            $params["path"],      // Cookie path'i
            $params["domain"],    // Cookie domain'i
            $params["secure"],    // HTTPS gerekliliği
            $params["httponly"]   // HTTP only flag
        );
    }

    // 3. Session'ı tamamen yok et
    session_destroy();

    // 4. Başarılı çıkış yanıtı döndür
    echo json_encode([
        'success' => true, 
        'message' => 'Çıkış başarılı'
    ]);
    
} catch (Exception $e) {
    // Hata durumunda bile güvenli çıkış sağla
    // Kullanıcıya hata göstermek yerine başarılı çıkış mesajı ver
    echo json_encode([
        'success' => true, 
        'message' => 'Çıkış tamamlandı'
    ]);
}
?>
