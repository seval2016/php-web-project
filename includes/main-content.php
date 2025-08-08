<?php
/**
 * Ana İçerik Modülü - Site Ana Bölümü
 */

// Ana İçerik - Site ana bölümü
?>
<!-- Ana İçerik - Site ana bölümü -->
<main class="main-content">
    <div class="container">
        <!-- Ürünler Bölümü - Ürün kartları ve açıklamaları -->
        <?php include 'products.php'; ?>

        <!-- Neden Destan Teknoloji? Bölümü - Özellikler ve avantajlar -->
        <section class="why-destan-section">
            <div class="section-header">
                <div class="section-badge">Neden Biz?</div>
                <h2 class="section-title">Neden Destan Teknoloji?</h2>
                <p class="section-subtitle">Yapay zeka destekli çözümlerle işinizi büyütün</p>
            </div>
            
            <!-- Özellikler Grid - 6 adet özellik kartı -->
            <div class="features-grid">
                <!-- Hızlı Kurulum Kartı -->
                <div class="feature-card">
                    <div class="feature-icon-wrapper">
                        <div class="feature-icon">🚀</div>
                        <div class="icon-bg"></div>
                    </div>
                    <div class="feature-content">
                        <h3>Hızlı Kurulum</h3>
                        <p>5 dakikada sisteminizi kurun ve hemen kullanmaya başlayın. Teknik bilgi gerektirmez.</p>
                        <div class="feature-stats">
                            <span class="stat">5 dk</span>
                            <span class="stat-label">Kurulum</span>
                        </div>
                    </div>
                </div>
                
                <!-- Güvenli Altyapı Kartı -->
                <div class="feature-card">
                    <div class="feature-icon-wrapper">
                        <div class="feature-icon">🛡️</div>
                        <div class="icon-bg"></div>
                    </div>
                    <div class="feature-content">
                        <h3>Güvenli Altyapı</h3>
                        <p>SSL sertifikalı, ISO 27001 uyumlu güvenlik standartları ile verileriniz güvende.</p>
                        <div class="feature-stats">
                            <span class="stat">%99.9</span>
                            <span class="stat-label">Uptime</span>
                        </div>
                    </div>
                </div>
                
                <!-- Yapay Zeka Destekli Kartı -->
                <div class="feature-card">
                    <div class="feature-icon-wrapper">
                        <div class="feature-icon">🤖</div>
                        <div class="icon-bg"></div>
                    </div>
                    <div class="feature-content">
                        <h3>Yapay Zeka Destekli</h3>
                        <p>AI teknolojileri ile otomatik süreçler, akıllı analizler ve tahmin modelleri.</p>
                        <div class="feature-stats">
                            <span class="stat">AI</span>
                            <span class="stat-label">Destekli</span>
                        </div>
                    </div>
                </div>
                
                <!-- 7/24 Destek Kartı -->
                <div class="feature-card">
                    <div class="feature-icon-wrapper">
                        <div class="feature-icon">📞</div>
                        <div class="icon-bg"></div>
                    </div>
                    <div class="feature-content">
                        <h3>7/24 Destek</h3>
                        <p>Uzman kadromuz her zaman yanınızda. Canlı destek, telefon ve e-posta ile ulaşın.</p>
                        <div class="feature-stats">
                            <span class="stat">24/7</span>
                            <span class="stat-label">Destek</span>
                        </div>
                    </div>
                </div>
                
                <!-- Detaylı Raporlama Kartı -->
                <div class="feature-card">
                    <div class="feature-icon-wrapper">
                        <div class="feature-icon">📊</div>
                        <div class="icon-bg"></div>
                    </div>
                    <div class="feature-content">
                        <h3>Detaylı Raporlama</h3>
                        <p>Gerçek zamanlı dashboard, özelleştirilebilir raporlar ve performans analizleri.</p>
                        <div class="feature-stats">
                            <span class="stat">Real-time</span>
                            <span class="stat-label">Raporlar</span>
                        </div>
                    </div>
                </div>
                
                <!-- Uygun Fiyat Kartı -->
                <div class="feature-card">
                    <div class="feature-icon-wrapper">
                        <div class="feature-icon">💰</div>
                        <div class="icon-bg"></div>
                    </div>
                    <div class="feature-content">
                        <h3>Uygun Fiyat</h3>
                        <p>Küçük işletmeler için uygun fiyatlar, büyük kurumlar için kurumsal çözümler.</p>
                        <div class="feature-stats">
                            <span class="stat">%40</span>
                            <span class="stat-label">Tasarruf</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Newsletter Bölümü - E-posta abonelik formu -->
        <?php include 'newsletter.php'; ?>
    </div>
</main>
