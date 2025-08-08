<!-- Slogan Banner Modülü -->
<?php include 'slogan-banner.php'; ?>

<!-- Ana Header -->
<header class="main-header">
    <div class="container">
        <div class="header-wrapper">
            <!-- Sol: Logo -->
            <div class="header-logo">
                <img src="<?php echo isset($isAuthPage) ? '../assets/images/logo.png' : 'assets/images/logo.png'; ?>" alt="Destan Teknoloji Logo" class="logo-img">
            </div>         
            <!-- Sağ: Menü ve Butonlar -->
            <div class="header-right">
                <!-- Desktop Menü -->
                <nav class="desktop-menu">
                    <ul class="menu">
                        <li><a href="#home" class="active">Ana Sayfa</a></li>
                        <li><a href="#products">Ürünler</a></li>
                        <li><a href="#services">Hizmetler</a></li>
                        <li><a href="#about">Hakkımızda</a></li>
                        <li><a href="#contact">İletişim</a></li>
                    </ul>
                </nav>
                
                <!-- Butonlar -->
                <div class="header-buttons">
                    <a href="<?php echo isset($isAuthPage) ? 'index.php?action=login' : 'auth/index.php?action=login'; ?>" class="btn btn-primary" onclick="window.location.href='<?php echo isset($isAuthPage) ? 'index.php?action=login' : 'auth/index.php?action=login'; ?>'">
                        <i class="btn-icon">🔐</i>
                        <span class="btn-text">Giriş Yap</span>
                    </a>
                    <a href="<?php echo isset($isAuthPage) ? 'index.php?action=register' : 'auth/index.php?action=register'; ?>" class="btn btn-secondary" onclick="window.location.href='<?php echo isset($isAuthPage) ? 'index.php?action=register' : 'auth/index.php?action=register'; ?>'">
                        <i class="btn-icon">👤</i>
                        <span class="btn-text">Üye Ol</span>
                    </a>
                    <a href="<?php echo isset($isAuthPage) ? '../admin/index.php' : 'admin/index.php'; ?>" class="btn btn-admin" title="Admin Paneli">
                        <i class="admin-icon">⚙️</i>
                        <span class="admin-text">Admin</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- Mobil Alt Navigasyon -->
<nav class="mobile-bottom-nav">
    <div class="mobile-nav-container">
        <a href="#home" class="mobile-nav-item active">
            <i class="mobile-nav-icon">🏠</i>
            <span class="mobile-nav-text">Ana Sayfa</span>
        </a>
        <a href="#products" class="mobile-nav-item">
            <i class="mobile-nav-icon">📦</i>
            <span class="mobile-nav-text">Ürünler</span>
        </a>
        <a href="#services" class="mobile-nav-item">
            <i class="mobile-nav-icon">⚙️</i>
            <span class="mobile-nav-text">Hizmetler</span>
        </a>
        <a href="#about" class="mobile-nav-item">
            <i class="mobile-nav-icon">ℹ️</i>
            <span class="mobile-nav-text">Hakkımızda</span>
        </a>
        <a href="#contact" class="mobile-nav-item">
            <i class="mobile-nav-icon">📞</i>
            <span class="mobile-nav-text">İletişim</span>
        </a>
    </div>
</nav>
