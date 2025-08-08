// Admin Modülü JavaScript

// Admin Dashboard sınıfı
class AdminDashboard {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupCharts();
        this.setupQuickActions();
        this.setupResponsive();
    }

    // Navigation işlemleri
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Aktif link'i güncelle
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                link.parentElement.classList.add('active');
            });
        });
    }

    // Chart işlemleri
    setupCharts() {
        const chartPeriod = document.querySelector('.chart-period');
        if (chartPeriod) {
            chartPeriod.addEventListener('change', (e) => {
                console.log('Chart period changed to:', e.target.value);
                this.updateChart(e.target.value);
            });
        }
    }

    // Chart güncelleme
    updateChart(period) {
        // Burada gerçek chart güncelleme işlemi yapılacak
        console.log(`Updating chart for period: ${period} days`);
        
        // Demo: Chart bar'larını rastgele güncelle
        const chartBars = document.querySelectorAll('.chart-bar');
        chartBars.forEach(bar => {
            const randomHeight = Math.random() * 80 + 20; // 20-100 arası
            bar.style.height = `${randomHeight}%`;
        });
    }

    // Quick action işlemleri
    setupQuickActions() {
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const action = card.querySelector('span').textContent;
                this.handleQuickAction(action);
            });
        });
    }

    // Quick action handler
    handleQuickAction(action) {
        console.log(`Quick action triggered: ${action}`);
        
        // Demo mesajları
        const messages = {
            'Kullanıcı Ekle': 'Kullanıcı ekleme formu açılıyor...',
            'Ürün Ekle': 'Ürün ekleme formu açılıyor...',
            'Siparişleri Gör': 'Sipariş listesi yükleniyor...',
            'Rapor Oluştur': 'Rapor oluşturuluyor...',
            'Sistem Ayarları': 'Sistem ayarları açılıyor...',
            'Yedek Al': 'Sistem yedeği alınıyor...'
        };

        const message = messages[action] || `${action} işlemi başlatılıyor...`;
        alert(message);
    }

    // Responsive işlemler
    setupResponsive() {
        // Pencere boyutu değişikliği
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Mobil menü kapatma
        document.addEventListener('click', (e) => {
            const sidebar = document.querySelector('.admin-sidebar');
            const toggleBtn = document.querySelector('.mobile-menu-toggle');
            
            if (window.innerWidth <= 1024 && 
                sidebar.classList.contains('mobile-open') && 
                !sidebar.contains(e.target) && 
                !toggleBtn?.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
        
        // ESC tuşu ile mobil menüyü kapat
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }
    
    // Mobil menüyü kapat
    closeMobileMenu() {
        const sidebar = document.querySelector('.admin-sidebar');
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('mobile-open');
            toggleBtn?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Resize handler
    handleResize() {
        const sidebar = document.querySelector('.admin-sidebar');
        const main = document.querySelector('.admin-main');
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('mobile-open');
            sidebar.classList.remove('collapsed');
            main.classList.remove('expanded');
            toggleBtn?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Sidebar toggle
    toggleSidebar() {
        const sidebar = document.querySelector('.admin-sidebar');
        const main = document.querySelector('.admin-main');
        const toggleBtn = document.querySelector('.mobile-menu-toggle');
        
        if (window.innerWidth <= 1024) {
            sidebar.classList.toggle('mobile-open');
            toggleBtn?.classList.toggle('active');
            
            // Body scroll'u engelle/etkinleştir
            if (sidebar.classList.contains('mobile-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        } else {
            sidebar.classList.toggle('collapsed');
            main.classList.toggle('expanded');
        }
    }

    // Notification göster
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Stil ekle
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        // Tip'e göre renk
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // 3 saniye sonra kaldır
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Loading göster/gizle
    showLoading() {
        const loading = document.createElement('div');
        loading.id = 'admin-loading';
        loading.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Yükleniyor...</p>
            </div>
        `;
        
        loading.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        document.body.appendChild(loading);
    }

    hideLoading() {
        const loading = document.getElementById('admin-loading');
        if (loading) {
            loading.remove();
        }
    }
}

// CSS Animasyonları
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .loading-spinner {
        text-align: center;
        color: white;
    }
    
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Global fonksiyonlar
window.toggleSidebar = function() {
    if (window.adminDashboard) {
        window.adminDashboard.toggleSidebar();
    }
};

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', function() {
    window.adminDashboard = new AdminDashboard();
    
    // Demo: Sayfa yüklendiğinde hoş geldin mesajı
    setTimeout(() => {
        if (window.adminDashboard) {
            window.adminDashboard.showNotification('Admin paneline hoş geldiniz!', 'success');
        }
    }, 1000);
});
