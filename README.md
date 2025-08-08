# Destan Teknoloji Web Projesi

Modern ve modüler yapıda geliştirilmiş web sitesi projesi.

## 📁 Proje Yapısı

```
destan-web-proje/
├── index.php              # Ana sayfa (modüler yapı)
├── style.css              # Ana CSS dosyası (modülleri import eder)
├── script.js              # Ana JavaScript dosyası (modülleri import eder)
├── assets/
│   └── images/
│       └── logo.png       # Logo dosyası
├── includes/              # PHP Modüler dosyalar
│   ├── header.php         # Header bölümü
│   ├── main-content.php   # Ana içerik
│   ├── products.php       # Ürünler bölümü
│   ├── newsletter.php     # Newsletter bölümü
│   └── footer.php         # Footer bölümü
├── auth/                  # Kimlik doğrulama modülü
│   ├── index.php          # Auth router (login, register, logout)
│   ├── pages/             # Auth sayfaları
│   │   ├── login.php      # Giriş sayfası
│   │   ├── register.php   # Kayıt sayfası
│   │   └── logout.php     # Çıkış işlemi
│   ├── auth.css           # Auth stilleri
│   └── auth.js            # Auth JavaScript
├── admin/                 # Admin paneli modülü
│   ├── index.php          # Admin router
│   ├── dashboard.php      # Dashboard sayfası
│   ├── admin.css          # Admin paneli stilleri
│   └── admin.js           # Admin paneli JavaScript
├── style/                 # CSS Modüler dosyalar
│   ├── base.css           # Temel ayarlar ve CSS variables
│   ├── header.css         # Header stilleri
│   ├── buttons.css        # Buton stilleri
│   ├── main-content.css   # Ana içerik stilleri
│   ├── newsletter.css     # Newsletter stilleri
│   ├── footer.css         # Footer stilleri
│   ├── forms.css          # Form stilleri
│   ├── responsive.css     # Responsive tasarım
│   └── animations.css     # Animasyonlar
└── script/                # JavaScript Modüler dosyalar
    ├── mobile-menu.js     # Mobil menü modülü
    ├── animations.js      # Animasyonlar modülü
    ├── navigation.js      # Navigasyon modülü
    └── products.js        # Ürün kartları modülü
```

## 🚀 Özellikler

- **Modüler Yapı**: PHP include/require ve CSS/JS @import/module kullanarak modüler geliştirme
- **Responsive Tasarım**: Mobil uyumlu modern tasarım
- **Modern CSS**: CSS Grid, Flexbox, CSS Variables kullanımı
- **Modern JavaScript**: ES6+ Modules, Classes, Intersection Observer
- **Animasyonlar**: Smooth scroll, hover efektleri, loading animasyonları
- **SEO Optimizasyonu**: Meta tags, semantic HTML yapısı

## 🛠️ Teknolojiler

- **HTML5**: Semantic markup
- **CSS3**: Modern styling (Grid, Flexbox, Variables, @import)
- **JavaScript ES6+**: Modern JS (Modules, Classes, Arrow Functions)
- **PHP**: Server-side includes

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

## 🎨 Tasarım Özellikleri

- **Gradient Backgrounds**: Modern gradient efektleri
- **Glassmorphism**: Blur efektleri ve şeffaflık
- **Smooth Animations**: CSS transitions ve keyframes
- **Modern Typography**: Inter font ailesi
- **Color Scheme**: Mavi-mor gradient tema

## 📋 Modüller

### Ana Modüller

#### Auth Modülü (`auth/`)
- **Kimlik Doğrulama**: Login, register, logout işlemleri
- **Form Validasyonu**: Client-side ve server-side validation
- **Session Yönetimi**: Güvenli oturum kontrolü
- **Responsive Tasarım**: Mobil uyumlu form tasarımı

#### Admin Modülü (`admin/`)
- **Dashboard**: İstatistikler, grafikler, aktivite takibi
- **Modern UI**: Koyu tema ile profesyonel görünüm
- **Responsive Sidebar**: Mobil uyumlu navigasyon
- **Quick Actions**: Hızlı işlem butonları
- **Chart Interactions**: Etkileşimli grafikler

### PHP Modülleri (`includes/`)

#### `includes/header.php`
- Logo, slogan ve navigasyon
- Desktop ve mobil menü
- Giriş/Üye ol butonları

#### `includes/main-content.php`
- Ana içerik wrapper
- Kullanıcı panel butonu
- Ürünler ve özellikler bölümleri

#### `includes/products.php`
- Ürün kartları
- E-ticaret, muhasebe, AI paketleri

#### `includes/newsletter.php`
- Newsletter abonelik formu
- "Güncel Kalın" bölümü

#### `includes/footer.php`
- İletişim bilgileri
- Sosyal medya linkleri
- Footer linkleri ve copyright

### CSS Modülleri (`style/`)

#### `style/base.css`
- CSS Reset ve temel ayarlar
- CSS Variables (renkler, gölgeler, fontlar)
- Container ve body stilleri
- Smooth scrolling ve focus states

#### `style/header.css`
- Header gradient background
- Logo, slogan ve navigasyon stilleri
- Desktop ve mobil menü
- Hamburger menü animasyonları

#### `style/buttons.css`
- Tüm buton stilleri (primary, secondary, outline)
- Hover efektleri ve transitions
- Responsive buton boyutları

#### `style/main-content.css`
- Ana içerik wrapper
- Ürün kartları ve grid sistemi
- Feature items ve bilgilendirme bölümü
- Kullanıcı panel butonu

#### `style/newsletter.css`
- Newsletter gradient background
- Form input ve buton stilleri
- Glassmorphism efektleri
- Hover animasyonları

#### `style/footer.css`
- Footer gradient background
- İletişim bilgileri kartları
- Sosyal medya ikonları
- Footer linkleri ve copyright

#### `style/responsive.css`
- Tüm responsive breakpoint'ler
- Mobil menü düzenlemeleri
- Grid sistem responsive ayarları
- Font boyutları ve spacing

#### `style/animations.css`
- FadeInUp animasyonları
- Loading spinner
- Modal animasyonları
- Hover efektleri

### JavaScript Modülleri (`script/`)

#### `script/mobile-menu.js`
- Mobil menü toggle fonksiyonları
- Hamburger menü animasyonları
- ESC tuşu ve dış tıklama ile kapatma
- Body scroll engelleme

#### `script/animations.js`
- Intersection Observer ile scroll animasyonları
- Loading animasyonları
- Buton hover efektleri
- Fade in/slide in animasyonları

#### `script/navigation.js`
- Smooth scrolling
- Aktif menü öğesi takibi
- Scroll pozisyonuna göre menü güncelleme
- Debounce optimizasyonu

#### `script/products.js`
- Ürün kartı hover efektleri
- Modal sistemi
- WhatsApp iletişim entegrasyonu
- Analytics tracking

## 🔧 Kurulum

1. Dosyaları web sunucusuna yükleyin
2. `assets/images/` klasörüne logo dosyasını ekleyin
3. Tarayıcıda `index.php` dosyasını açın

## 📝 Geliştirme Notları

- **Modüler Yapı**: Kod tekrarı minimuma indirildi
- **Bakım Kolaylığı**: Her bölüm ayrı dosyada tutularak kolay güncelleme
- **Responsive Tasarım**: Tüm cihazlarda uyumlu çalışıyor
- **Modern CSS**: CSS Variables ve @import kullanımı
- **Modern JavaScript**: ES6+ Modules ve Classes kullanımı
- **Performans**: Modüler yapı sayesinde sadece gerekli kod yükleniyor

## 🎯 Gelecek Geliştirmeler

- [x] Database entegrasyonu
- [x] Admin paneli
- [ ] Blog sistemi
- [ ] E-ticaret entegrasyonu
- [ ] API geliştirme
- [ ] Çoklu dil desteği
- [ ] CSS preprocessor (Sass/SCSS) entegrasyonu
- [ ] CSS minification ve optimization
- [ ] JavaScript bundling (Webpack/Vite)
- [ ] Service Worker ile PWA desteği

## 📞 İletişim

**Destan Teknoloji**
- Email: info@destanteknoloji.com
- Telefon: +90 212 555 0123
- Adres: İstanbul, Türkiye

---

© 2025 Destan Teknoloji. Tüm hakları saklıdır.
