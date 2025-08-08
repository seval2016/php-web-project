/**
 * Products Sınıfı - Ürün Kartları Yönetimi
 * 
 * Bu sınıf ürün kartlarının tüm işlevselliğini yönetir.
 * Hover efektleri, modal gösterimi, iletişim işlemleri ve analytics tracking sağlar.
 */
class Products {
    /**
     * Constructor - Sınıf başlatıldığında çalışır
     * Ürün kartlarını bulur ve modülü başlatır
     */
    constructor() {
        this.productCards = document.querySelectorAll('.product-card');  // Ürün kartları
        this.init();  // Modülü başlat
    }
    
    init() {
        this.setupProductCards();
        console.log('Ürün kartları modülü başlatıldı');
    }
    
    setupProductCards() {
        this.productCards.forEach(card => {
            card.addEventListener('click', () => {
                const productName = card.getAttribute('data-product') || card.querySelector('h3').textContent;
                this.selectProduct(productName);
            });
            
            // Hover efektleri
            card.addEventListener('mouseenter', () => {
                this.addCardHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeCardHoverEffect(card);
            });
        });
    }
    
    addCardHoverEffect(card) {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    }
    
    removeCardHoverEffect(card) {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '';
    }
    
    selectProduct(productName) {
        console.log(`Seçilen ürün: ${productName}`);
        this.showProductModal(productName);
        this.trackProductSelection(productName);
    }
    
    showProductModal(productName) {
        // Modal HTML'ini oluştur
        const modalHTML = `
            <div class="product-modal" id="productModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${productName}</h2>
                        <button class="modal-close" onclick="products.closeModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="product-details">
                            <div class="product-info">
                                <h3>Ürün Detayları</h3>
                                <p>Bu ürün hakkında detaylı bilgi almak için bizimle iletişime geçin.</p>
                                <div class="product-features">
                                    <h4>Özellikler:</h4>
                                    <ul>
                                        <li>✅ Modern teknoloji</li>
                                        <li>✅ Güvenli altyapı</li>
                                        <li>✅ 7/24 destek</li>
                                        <li>✅ Kolay kullanım</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="product-contact">
                                <h4>İletişim</h4>
                                <p>Bu ürün hakkında bilgi almak için:</p>
                                <div class="contact-buttons">
                                    <button class="btn btn-primary" onclick="products.contactUs('${productName}')">
                                        📞 Hemen Ara
                                    </button>
                                    <button class="btn btn-secondary" onclick="products.contactUs('${productName}')">
                                        📧 E-posta Gönder
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Modal'ı sayfaya ekle
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Modal'ı göster
        const modal = document.getElementById('productModal');
        modal.style.display = 'flex';
        
        // Animasyon için
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
        
        // Modal dışına tıklayınca kapat
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }
    
    closeModal() {
        const modal = document.getElementById('productModal');
        if (modal) {
            // Animasyon ile kapat
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }
    
    contactUs(productName) {
        // WhatsApp linki
        const phoneNumber = '905555555555';
        const message = `Merhaba! ${productName} hakkında bilgi almak istiyorum.`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Yeni sekmede WhatsApp'ı aç
        window.open(whatsappUrl, '_blank');
        
        // Modal'ı kapat
        this.closeModal();
        
        // Analytics tracking
        this.trackContactClick(productName);
    }
    
    trackProductSelection(productName) {
        // Google Analytics tracking (eğer varsa)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'product_selection', {
                'product_name': productName,
                'event_category': 'engagement',
                'event_label': 'product_card_click'
            });
        }
        
        console.log(`Analytics: Ürün seçimi - ${productName}`);
    }
    
    trackContactClick(productName) {
        // Google Analytics tracking (eğer varsa)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_click', {
                'product_name': productName,
                'event_category': 'engagement',
                'event_label': 'contact_button_click'
            });
        }
        
        console.log(`Analytics: İletişim tıklaması - ${productName}`);
    }
}

// Global olarak erişilebilir yap
window.Products = Products;
