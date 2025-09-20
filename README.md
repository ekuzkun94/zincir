# Zincir Teklif Oluşturucu

Zincir yazılım şirketi için geliştirilmiş profesyonel teklif oluşturma yazılımı.

## Özellikler

### 🏢 Şirket Yönetimi
- Şirket bilgilerini kaydetme ve düzenleme
- Logo ve iletişim bilgileri
- Profesyonel şirket profili

### 👥 Müşteri Yönetimi
- Müşteri bilgilerini kaydetme
- Müşteri geçmişi takibi
- İletişim bilgileri yönetimi

### 📋 Teklif Oluşturma
- Dinamik hizmet/ürün listesi
- Otomatik fiyat hesaplama
- Çoklu para birimi desteği (TRY, USD, EUR)
- Teklif numarası otomatik oluşturma
- Geçerlilik tarihi belirleme

### 📊 Hizmet/Ürün Yönetimi
- Sınırsız hizmet/ürün ekleme
- Miktar ve birim fiyat girişi
- Otomatik toplam hesaplama
- Hizmet/ürün silme ve düzenleme

### 💰 Fiyatlandırma
- Otomatik toplam hesaplama
- Vergi hesaplama desteği
- İndirim uygulama
- Çoklu para birimi desteği

### 📄 PDF Oluşturma
- Profesyonel PDF formatında çıktı
- Özelleştirilebilir şablon
- Yüksek kaliteli görüntü
- Otomatik dosya adlandırma

### 💾 Veri Yönetimi
- Teklif kaydetme (JSON format)
- Teklif yükleme
- Yerel veri saklama
- Veri yedekleme

### 🎨 Modern Arayüz
- Responsive tasarım
- Kullanıcı dostu arayüz
- Gerçek zamanlı önizleme
- Modern CSS animasyonları

## Kullanım

### 1. Teklif Oluşturma
1. Şirket bilgilerinizi girin
2. Müşteri bilgilerini doldurun
3. Teklif detaylarını belirleyin
4. Hizmet/ürünlerinizi ekleyin
5. Önizleme yapın
6. PDF olarak dışa aktarın

### 2. Veri Kaydetme
- "Kaydet" butonuna tıklayarak teklifi JSON formatında kaydedin
- Kaydedilen dosyaları daha sonra "Yükle" butonu ile açabilirsiniz

### 3. PDF Oluşturma
- "Önizleme" butonu ile teklifi kontrol edin
- "PDF Oluştur" butonu ile profesyonel PDF oluşturun

## Teknik Özellikler

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **PDF Oluşturma**: jsPDF, html2canvas
- **Stil**: Modern CSS Grid ve Flexbox
- **Responsive**: Mobil ve masaüstü uyumlu
- **Tarayıcı Desteği**: Modern tarayıcılar

## Kurulum

1. Dosyaları web sunucunuza yükleyin
2. `index.html` dosyasını tarayıcıda açın
3. Herhangi bir ek kurulum gerekmez

## Dosya Yapısı

```
zincir/
├── index.html          # Ana HTML dosyası
├── styles.css          # CSS stilleri
├── script.js           # JavaScript kodu
└── README.md           # Bu dosya
```

## Özelleştirme

### Şirket Bilgileri
`script.js` dosyasındaki `setDefaultValues()` fonksiyonunda varsayılan şirket bilgilerini değiştirebilirsiniz.

### Stil Değişiklikleri
`styles.css` dosyasında renkler, fontlar ve düzeni özelleştirebilirsiniz.

### Yeni Özellikler
`script.js` dosyasındaki `ProposalCreator` sınıfına yeni fonksiyonlar ekleyebilirsiniz.

## Lisans

Bu yazılım Zincir Yazılım şirketi için özel olarak geliştirilmiştir.

## Destek

Teknik destek için: info@zincir.com

---

**Zincir Yazılım** - Profesyonel yazılım çözümleri
