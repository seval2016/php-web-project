<?php
/**
 * Header Modülü - Site Üst Kısmı
 * 
 * Bu dosya sitenin üst kısmını oluşturur.
 * Logo, navigasyon menüsü, giriş/üye ol butonları ve mobil alt navigasyon içerir.
 * Auth sayfalarında farklı yollar kullanır.
 */

// Slogan Banner Modülü - Dinamik banner sistemi
include 'slogan-banner.php';
?>

<!-- Ana Header - Site üst kısmı -->
<header class="main-header">
    <div class="container">
        <!-- Header wrapper - Logo ve menü container'ı -->
        <div class="header-wrapper">
            <!-- Sol taraf: Logo alanı -->
            <div class="header-logo">
                <!-- Dinamik logo yolu - Auth sayfalarında farklı yol kullanır -->
                <img src="<?php echo isset($isAuthPage) ? '../assets/images/logo.png' : 'assets/images/logo.png'; ?>" 
                     alt="Destan Teknoloji Logo" class="logo-img">
            </div>         
            
            <!-- Sağ taraf: Menü ve butonlar alanı -->
            <div class="header-right">
                <!-- Desktop Menü - Masaüstü navigasyon -->
                <nav class="desktop-menu">
                    <ul class="menu">
                        <li><a href="#home" class="active">Ana Sayfa</a></li>
                        <li><a href="#products">Ürünler</a></li>
                        <li><a href="#services">Hizmetler</a></li>
                        <li><a href="#about">Hakkımızda</a></li>
                        <li><a href="#contact">İletişim</a></li>
                    </ul>
                </nav>
                
                <!-- Butonlar - Giriş, üye ol ve admin butonları -->
                <div class="header-buttons">
                    <!-- Giriş Yap Butonu - Dinamik yol ile auth sayfasına yönlendirir -->
                    <a href="<?php echo isset($isAuthPage) ? 'index.php?action=login' : 'auth/index.php?action=login'; ?>" 
                       class="btn btn-primary" 
                       onclick="window.location.href='<?php echo isset($isAuthPage) ? 'index.php?action=login' : 'auth/index.php?action=login'; ?>'">
                        <i class="btn-icon">🔐</i>
                        <span class="btn-text">Giriş Yap</span>
                    </a>
                    
                    <!-- Üye Ol Butonu - Dinamik yol ile kayıt sayfasına yönlendirir -->
                    <a href="<?php echo isset($isAuthPage) ? 'index.php?action=register' : 'auth/index.php?action=register'; ?>" 
                       class="btn btn-secondary" 
                       onclick="window.location.href='<?php echo isset($isAuthPage) ? 'index.php?action=register' : 'auth/index.php?action=register'; ?>'">
                        <i class="btn-icon">👤</i>
                        <span class="btn-text">Üye Ol</span>
                    </a>
                    
                    <!-- Admin Butonu - Dinamik yol ile admin paneline yönlendirir -->
                    <a href="<?php echo isset($isAuthPage) ? '../admin/index.php' : 'admin/index.php'; ?>" 
                       class="btn btn-admin" 
                       title="Admin Paneli">
                        <i class="admin-icon">⚙️</i>
                        <span class="admin-text">Admin</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- Mobil Alt Navigasyon - Mobil cihazlar için alt menü -->
<nav class="mobile-bottom-nav">
    <div class="mobile-nav-container">
        <!-- Ana Sayfa Linki -->
        <a href="#home" class="mobile-nav-item active">
            <i class="mobile-nav-icon">🏠</i>
            <span class="mobile-nav-text">Ana Sayfa</span>
        </a>
        
        <!-- Ürünler Linki -->
        <a href="#products" class="mobile-nav-item">
            <i class="mobile-nav-icon">📦</i>
            <span class="mobile-nav-text">Ürünler</span>
        </a>
        
        <!-- Hizmetler Linki -->
        <a href="#services" class="mobile-nav-item">
            <i class="mobile-nav-icon">⚙️</i>
            <span class="mobile-nav-text">Hizmetler</span>
        </a>
        
        <!-- Hakkımızda Linki -->
        <a href="#about" class="mobile-nav-item">
            <i class="mobile-nav-icon">ℹ️</i>
            <span class="mobile-nav-text">Hakkımızda</span>
        </a>
        
        <!-- İletişim Linki -->
        <a href="#contact" class="mobile-nav-item">
            <i class="mobile-nav-icon">📞</i>
            <span class="mobile-nav-text">İletişim</span>
        </a>
    </div>
</nav>
