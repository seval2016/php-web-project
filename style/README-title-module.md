# Title Module Documentation

Bu modül, web sitesindeki section başlıkları için tutarlı bir tasarım sağlar.

## Kullanım

### HTML Yapısı

```html
<div class="section-header">
    <div class="section-badge">Badge Metni</div>
    <h2 class="section-title">Ana Başlık</h2>
    <p class="section-subtitle">Alt başlık açıklaması</p>
</div>
```

### Özellikler

#### Section Badge
- Gradient arka plan
- Yuvarlak köşeler
- Gölge efekti
- Uppercase metin

#### Section Title
- Büyük font boyutu (3rem)
- Kalın font ağırlığı
- Highlight efekti için `.highlight` sınıfı kullanılabilir

#### Section Subtitle
- Orta boyut font (1.25rem)
- Gri renk
- Maksimum genişlik sınırı
- Ortalanmış metin

### Responsive Tasarım

- **768px altında**: Font boyutları küçülür
- **480px altında**: Daha da küçük font boyutları

### Import

Bu modül `main-content.css` dosyasında otomatik olarak import edilir:

```css
@import url('title.css');
```

### Örnek Kullanım

```html
<!-- Ürünler Bölümü -->
<section class="products-section">
    <div class="section-header">
        <div class="section-badge">Çözümlerimiz</div>
        <h2 class="section-title">Ürünlerimiz</h2>
        <p class="section-subtitle">İşinizi büyütecek profesyonel çözümler</p>
    </div>
    <!-- İçerik -->
</section>

<!-- Neden Biz Bölümü -->
<section class="why-destan-section">
    <div class="section-header">
        <div class="section-badge">Neden Biz?</div>
        <h2 class="section-title">Neden Destan Teknoloji?</h2>
        <p class="section-subtitle">Yapay zeka destekli çözümlerle işinizi büyütün</p>
    </div>
    <!-- İçerik -->
</section>
```
