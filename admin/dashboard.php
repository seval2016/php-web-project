<?php
// Dashboard sayfası - Oturum kontrolü
if (!isset($_SESSION['user_id'])) {
    header('Location: ../auth/index.php?action=login');
    exit;
}

$userName = $_SESSION['user_name'] ?? 'Kullanıcı';
$userEmail = $_SESSION['user_email'] ?? '';
?>

<div class="admin-dashboard">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
        <div class="sidebar-header">
            <div class="logo-section">
                <img src="../assets/images/logo.png" alt="Destan Teknoloji" class="sidebar-logo">
                <h3>Admin Panel</h3>
            </div>
        </div>
        
        <nav class="sidebar-nav">
            <ul class="nav-menu">
                <li class="nav-item active">
                    <a href="index.php?action=dashboard" class="nav-link">
                        <span class="nav-icon">📊</span>
                        <span class="nav-text">Dashboard</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <span class="nav-icon">👥</span>
                        <span class="nav-text">Kullanıcılar</span>
                    </a>
                </li>
                <li class="nav-item">
                <a href="#" class="nav-link">
                        <span class="nav-icon">🛒</span>
                        <span class="nav-text">Ürünler</span>
                    </a>
                </li>
                <li class="nav-item">
                <a href="#" class="nav-link">
                        <span class="nav-icon">📦</span>
                        <span class="nav-text">Siparişler</span>
                    </a>
                </li>
                <li class="nav-item">
                <a href="#" class="nav-link">
                        <span class="nav-icon">📈</span>
                        <span class="nav-text">Analitik</span>
                    </a>
                </li>
                <li class="nav-item">
                <a href="#" class="nav-link">
                        <span class="nav-icon">⚙️</span>
                        <span class="nav-text">Ayarlar</span>
                    </a>
                </li>
                <li class="nav-item">
                <a href="#" class="nav-link">
                        <span class="nav-icon">💬</span>
                        <span class="nav-text">Destek</span>
                    </a>
                </li>
            </ul>
        </nav>
        
        <div class="sidebar-footer">
            <div class="user-info">
                <div class="user-avatar">
                    <span><?php echo strtoupper(substr($userName, 0, 1)); ?></span>
                </div>
                <div class="user-details">
                    <p class="user-name"><?php echo htmlspecialchars($userName); ?></p>
                    <p class="user-role">Admin</p>
                </div>
            </div>
            <a href="../auth/index.php?action=logout" class="logout-btn" onclick="return confirm('Çıkış yapmak istediğinizden emin misiniz?')">
                <span class="logout-icon">🚪</span>
                <span>Çıkış</span>
            </a>
        </div>
    </aside>

    <!-- Main Content -->
    <main class="admin-main">
        <!-- Dashboard Content -->
        <div class="admin-content">
            <!-- Mobil Menü Toggle Butonu -->
            <button class="mobile-menu-toggle" onclick="toggleSidebar()" style="display: none;">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <!-- Stats Cards -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon users-icon">👥</div>
                    <div class="stat-info">
                        <h3 class="stat-number">1,234</h3>
                        <p class="stat-label">Toplam Kullanıcı</p>
                        <span class="stat-change positive">+12%</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon orders-icon">📦</div>
                    <div class="stat-info">
                        <h3 class="stat-number">567</h3>
                        <p class="stat-label">Aktif Sipariş</p>
                        <span class="stat-change positive">+8%</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon revenue-icon">💰</div>
                    <div class="stat-info">
                        <h3 class="stat-number">₺45,678</h3>
                        <p class="stat-label">Aylık Gelir</p>
                        <span class="stat-change positive">+15%</span>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon products-icon">🛒</div>
                    <div class="stat-info">
                        <h3 class="stat-number">89</h3>
                        <p class="stat-label">Aktif Ürün</p>
                        <span class="stat-change negative">-3%</span>
                    </div>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="charts-section">
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>Gelir Grafiği</h3>
                        <div class="chart-actions">
                            <select class="chart-period">
                                <option value="7">Son 7 Gün</option>
                                <option value="30" selected>Son 30 Gün</option>
                                <option value="90">Son 90 Gün</option>
                            </select>
                        </div>
                    </div>
                    <div class="chart-content">
                        <div class="chart-placeholder">
                            <div class="chart-bars">
                                <div class="chart-bar" style="height: 60%"></div>
                                <div class="chart-bar" style="height: 80%"></div>
                                <div class="chart-bar" style="height: 45%"></div>
                                <div class="chart-bar" style="height: 90%"></div>
                                <div class="chart-bar" style="height: 70%"></div>
                                <div class="chart-bar" style="height: 85%"></div>
                                <div class="chart-bar" style="height: 95%"></div>
                            </div>
                            <p class="chart-label">Günlük Gelir (₺)</p>
                        </div>
                    </div>
                </div>
                
                <div class="chart-card">
                    <div class="chart-header">
                        <h3>Kullanıcı Aktivitesi</h3>
                    </div>
                    <div class="chart-content">
                        <div class="activity-chart">
                            <div class="chart-circle">
                                <div class="circle-progress" style="--progress: 75%">
                                    <span class="progress-text">75%</span>
                                </div>
                            </div>
                            <div class="activity-stats">
                                <div class="activity-item">
                                    <span class="activity-dot active"></span>
                                    <span>Aktif Kullanıcılar</span>
                                </div>
                                <div class="activity-item">
                                    <span class="activity-dot inactive"></span>
                                    <span>Pasif Kullanıcılar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activity & Quick Actions -->
            <div class="bottom-section">
                <div class="recent-activity">
                    <div class="section-header">
                        <h3>Son Aktiviteler</h3>
                        <a href="index.php?action=analytics" class="view-all">Tümünü Gör</a>
                    </div>
                    <div class="activity-list">
                        <div class="activity-item">
                            <div class="activity-icon new-user">👤</div>
                            <div class="activity-content">
                                <p class="activity-text">Yeni kullanıcı kaydoldu: <strong>Ahmet Yılmaz</strong></p>
                                <span class="activity-time">2 dakika önce</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon new-order">📦</div>
                            <div class="activity-content">
                                <p class="activity-text">Yeni sipariş alındı: <strong>#ORD-2024-001</strong></p>
                                <span class="activity-time">15 dakika önce</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon payment">💰</div>
                            <div class="activity-content">
                                <p class="activity-text">Ödeme alındı: <strong>₺1,250</strong></p>
                                <span class="activity-time">1 saat önce</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon support">💬</div>
                            <div class="activity-content">
                                <p class="activity-text">Yeni destek talebi: <strong>Teknik Sorun</strong></p>
                                <span class="activity-time">2 saat önce</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="quick-actions">
                    <div class="section-header">
                        <h3>Hızlı İşlemler</h3>
                    </div>
                    <div class="actions-grid">
                        <a href="index.php?action=users" class="action-card">
                            <div class="action-icon">➕</div>
                            <span>Kullanıcı Ekle</span>
                        </a>
                        <a href="index.php?action=products" class="action-card">
                            <div class="action-icon">🛒</div>
                            <span>Ürün Ekle</span>
                        </a>
                        <a href="index.php?action=orders" class="action-card">
                            <div class="action-icon">📋</div>
                            <span>Siparişleri Gör</span>
                        </a>
                        <a href="index.php?action=analytics" class="action-card">
                            <div class="action-icon">📊</div>
                            <span>Rapor Oluştur</span>
                        </a>
                        <a href="index.php?action=settings" class="action-card">
                            <div class="action-icon">⚙️</div>
                            <span>Sistem Ayarları</span>
                        </a>
                        <a href="index.php?action=support" class="action-card">
                            <div class="action-icon">💾</div>
                            <span>Yedek Al</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>

<script>
// Chart interactions
document.addEventListener('DOMContentLoaded', function() {
    // Chart period selector
    const chartPeriod = document.querySelector('.chart-period');
    if (chartPeriod) {
        chartPeriod.addEventListener('change', function() {
            console.log('Chart period changed to:', this.value);
            // Burada gerçek chart güncelleme işlemi yapılacak
        });
    }
    
    // Navigation link tıklamaları
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Aktif link'i güncelle
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            this.parentElement.classList.add('active');
        });
    });
    
    // Quick action kartları
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.querySelector('span').textContent;
            alert(`${action} işlemi başlatılıyor...`);
            // Burada gerçek işlem yapılacak
        });
    });
});
</script>
