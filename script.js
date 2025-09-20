// Teklif oluşturucu JavaScript kodu
class ProposalCreator {
    constructor() {
        this.services = [];
        this.initializeEventListeners();
        this.setDefaultValues();
    }

    initializeEventListeners() {
        // Form elemanları
        const addServiceBtn = document.getElementById('addServiceBtn');
        const previewBtn = document.getElementById('previewBtn');
        const closePreviewBtn = document.getElementById('closePreviewBtn');
        const exportBtn = document.getElementById('exportBtn');
        const saveBtn = document.getElementById('saveBtn');
        const loadBtn = document.getElementById('loadBtn');
        const fileInput = document.getElementById('fileInput');

        // Event listener'ları ekle
        addServiceBtn.addEventListener('click', () => this.addService());
        previewBtn.addEventListener('click', () => this.showPreview());
        closePreviewBtn.addEventListener('click', () => this.hidePreview());
        exportBtn.addEventListener('click', () => this.exportToPDF());
        saveBtn.addEventListener('click', () => this.saveProposal());
        loadBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => this.loadProposal(e));

        // Hizmet miktar ve fiyat değişikliklerini dinle
        document.addEventListener('input', (e) => {
            if (e.target.name === 'serviceQuantity' || e.target.name === 'serviceUnitPrice') {
                this.calculateServiceTotal(e.target);
            }
        });

        // Hizmet silme butonlarını dinle
        document.addEventListener('click', (e) => {
            if (e.target.closest('.remove-service')) {
                this.removeService(e.target.closest('.service-item'));
            }
        });
    }

    setDefaultValues() {
        // Bugünün tarihini varsayılan olarak ayarla
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('proposalDate').value = today;
        
        // Geçerlilik tarihini 30 gün sonra olarak ayarla
        const validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + 30);
        document.getElementById('validUntil').value = validUntil.toISOString().split('T')[0];

        // Teklif numarasını otomatik oluştur
        const currentYear = new Date().getFullYear();
        const proposalNumber = `${currentYear} / ${String(Math.floor(Math.random() * 1000) + 1).padStart(3, '0')}`;
        document.getElementById('proposalNumber').value = proposalNumber;

        // Varsayılan şirket bilgileri
        document.getElementById('companyName').value = 'ZİNCİR YAZILIM';
        document.getElementById('companyEmail').value = 'info@zincir.com';
        document.getElementById('companyPhone').value = '+90 (212) 555 0123';
        document.getElementById('companyAddress').value = 'İstanbul, Türkiye';
        document.getElementById('companyWebsite').value = 'www.zincir.com';
        
        // Test verileri
        document.getElementById('clientName').value = 'Sercan Bey';
        document.getElementById('clientTitle').value = 'Sayın';
        document.getElementById('clientEmail').value = 'sercan@example.com';
        document.getElementById('clientPhone').value = '+90 555 123 4567';
        document.getElementById('clientAddress').value = 'Müşteri Adresi';
        
        // Hizmet bilgileri
        const serviceContainer = document.getElementById('servicesContainer');
        serviceContainer.innerHTML = '';
        
        // Yeni hizmet ekle
        this.addService();
        const serviceItem = serviceContainer.lastElementChild;
        serviceItem.querySelector('input[name="serviceDescription"]').value = 'B2C E-TİCARET YAZILIMI YILLIK KİRALAMA';
        serviceItem.querySelector('input[name="serviceQuantity"]').value = '1';
        serviceItem.querySelector('input[name="serviceUnitPrice"]').value = '400.000,00';
        serviceItem.querySelector('input[name="serviceTotal"]').value = '400.000,00';
        
        // Hizmet açıklaması
        const serviceDetails = `Web Satış Platformu
Mobil Uyumlu Site
Webview Mobil Uygulama (IOS)
Webview Mobil Uygulama (ANDROID)
Muhasebe Programı Entegrasyonu
Yönetici Paneli
Sanal Pos Entegrasyonu
Kargo Entegrasyonu
Yabancı Dil Desteği (İngilizce)
Cloud Alt Yapı (1 Yıl)
256 Bit SSL Şifreleme
1 Yıllık Yazılım Destek Hizmeti`;
        serviceItem.querySelector('textarea[name="serviceDetails"]').value = serviceDetails;
        
        // Fiyata dahil olan hizmetler
        const includedServices = `1 yıllık Cloud Sunucu Barındırma
256 Bit SSL Şifreleme
Yazılım Destek Hizmeti
Ücretsiz versiyon güncelleme`;
        document.getElementById('includedServicesText').value = includedServices;
        
        // Özel notlar
        const notes = `Fatura ve Ödeme gününe kadar Vergiler de meydana gelebilecek değişiklikler aynı oranda fiyatlara yansıtılır.
Özel geliştirme talepleriniz, 5.500TL / Adam / Saat hesaplaması üzerinden belirlenmektedir.
Tüm kurulum ve eğitim süreçleri uzak bağlantı /video konferans toplantı ile gerçekleşmektedir.
Mobil uygulamalar webview uygulama olarak kullanımınıza sunulacak olup, mobil application uygulama talep etmeniz halinde ek bir fiyat teklifi tarafınıza gönderilecektir.
B2C kampanya yönetimi mevcutta geçerli olan kampanya opsiyonlarını içermektedir.
Yeni kampanya yönetimi talepleriniz, özel yazılım geliştirme hizmeti ve ücretlendirmesi kapsamında gerçekleştirilecektir.
Bu teklif oluşabilecek, talep edilebilecek, istenecek olan ve ortaya çıkması muhtemel özel geliştirme talep ve isteklerini barındırmamaktadır. Görüşme sonucu ortaya çıkabilecek olan talep ve istekleri ile ilgili yeni ya da ek bir fiyat teklifi hazırlanarak tarafınıza sunulacaktır.
Yazım, hesaplama ve yorum hatası gibi sehven ortaya çıkan durumlardan kaynaklı oluşan maddi kazanç ya da kayıplar oluşması hususunda teklifin yeniden hazırlanması gerekliliği bulunmaktadır.
Takip Eden Yıllar "Kiralama " Fiyatlandırma ve Hizmet Detayları
B2C Perakende Satış Yönetim Sistemi ve Mobil Uygulamalar ile ilgili sonra ki yıl kiralama ücreti 80,000 TL 'dir.
Sonra ki yıllara ait kiralama ücretleri o yıl için açıklanan Üfe / Tüfe oranları üzerinden + % 5 oranında artış göstererek hesaplanmaktadır.
Fatura ve Ödeme gününe kadar Vergiler de meydana gelebilecek değişiklikler aynı oranda fiyatlara yansıtılır.`;
        document.getElementById('notes').value = notes;
        
        // İndirim bilgileri
        document.getElementById('specialDiscount').value = '150.000,00';
        document.getElementById('additionalDiscount').value = '100.000,00';

        // Varsayılan KDV oranı
        document.getElementById('vatRate').value = '20';
        document.getElementById('vatIncluded').value = 'false';

        // Varsayılan ödeme koşulları
        document.getElementById('paymentTerms').value = 'Sipariş onayı ile birlikte Nakit, havale eft, kredi kartı tek çekim olarak ödeme talep edilmektedir.';
    }

    addService() {
        const container = document.getElementById('servicesContainer');
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        
        serviceItem.innerHTML = `
            <div class="form-row">
                <div class="form-field">
                    <label>Hizmet/Ürün Adı</label>
                    <input type="text" name="serviceDescription" placeholder="Hizmet/Ürün adı">
                </div>
                <div class="form-field">
                    <label>Miktar</label>
                    <input type="number" name="serviceQuantity" placeholder="1" min="1" value="1">
                </div>
                <div class="form-field">
                    <label>Birim Fiyat</label>
                    <input type="text" name="serviceUnitPrice" placeholder="1.000,00" pattern="[0-9.,]+" title="Türkçe format: 1.000,00">
                </div>
                <div class="form-field">
                    <label>Toplam</label>
                    <input type="text" name="serviceTotal" placeholder="1.000,00" readonly>
                </div>
                <div class="form-field">
                    <label>İşlem</label>
                    <button type="button" class="btn btn-danger btn-sm remove-service">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="form-field">
                <label>Hizmet Açıklaması (Her satıra bir özellik yazın)</label>
                <textarea name="serviceDetails" rows="4" placeholder="Her satıra bir özellik yazın:&#10;• Web Satış Platformu&#10;• Mobil Uyumlu Site&#10;• Yönetici Paneli&#10;• Sanal Pos Entegrasyonu"></textarea>
            </div>
        `;
        
        container.appendChild(serviceItem);
    }

    removeService(serviceItem) {
        serviceItem.remove();
    }


    calculateServiceTotal(input) {
        const serviceItem = input.closest('.service-item');
        const quantity = parseFloat(serviceItem.querySelector('input[name="serviceQuantity"]').value) || 0;
        const unitPrice = parseFloat(serviceItem.querySelector('input[name="serviceUnitPrice"]').value) || 0;
        const total = quantity * unitPrice;
        
        serviceItem.querySelector('input[name="serviceTotal"]').value = this.formatTurkishNumber(total);
    }

    formatTurkishNumber(number) {
        return new Intl.NumberFormat('tr-TR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    }

    parseTurkishNumber(str) {
        if (!str) return 0;
        // Türkçe formatındaki sayıyı parse et
        return parseFloat(str.replace(/\./g, '').replace(',', '.'));
    }

    getFormData() {
        const formData = {
            company: {
                name: document.getElementById('companyName').value,
                phone: document.getElementById('companyPhone').value,
                email: document.getElementById('companyEmail').value,
                website: document.getElementById('companyWebsite').value,
                address: document.getElementById('companyAddress').value
            },
            client: {
                name: document.getElementById('clientName').value,
                title: document.getElementById('clientTitle').value,
                email: document.getElementById('clientEmail').value,
                phone: document.getElementById('clientPhone').value,
                address: document.getElementById('clientAddress').value
            },
            proposal: {
                number: document.getElementById('proposalNumber').value,
                date: document.getElementById('proposalDate').value,
                validUntil: document.getElementById('validUntil').value,
                currency: document.getElementById('currency').value
            },
            services: this.getServicesData(),
            includedServices: this.getIncludedServicesText(),
            notes: this.getNotesText(),
            paymentTerms: document.getElementById('paymentTerms').value,
            discounts: {
                special: parseFloat(document.getElementById('specialDiscount').value) || 0,
                additional: parseFloat(document.getElementById('additionalDiscount').value) || 0
            },
            vat: {
                rate: parseFloat(document.getElementById('vatRate').value) || 0,
                included: document.getElementById('vatIncluded').value === 'true'
            }
        };

        return formData;
    }

    getServicesData() {
        const services = [];
        const serviceItems = document.querySelectorAll('#servicesContainer .service-item');
        
        serviceItems.forEach(item => {
            const description = item.querySelector('input[name="serviceDescription"]').value;
            const quantity = parseFloat(item.querySelector('input[name="serviceQuantity"]').value) || 0;
            const unitPrice = this.parseTurkishNumber(item.querySelector('input[name="serviceUnitPrice"]').value);
            const total = this.parseTurkishNumber(item.querySelector('input[name="serviceTotal"]').value);
            const details = item.querySelector('textarea[name="serviceDetails"]').value;
            
            if (description.trim()) {
                services.push({
                    description,
                    quantity,
                    unitPrice,
                    total,
                    details: details.split('\n').filter(line => line.trim())
                });
            }
        });
        
        return services;
    }

    getIncludedServicesText() {
        const text = document.getElementById('includedServicesText').value;
        return text.split('\n').filter(line => line.trim()).map(line => ({ description: line.trim() }));
    }

    getNotesText() {
        const text = document.getElementById('notes').value;
        return text.split('\n').filter(line => line.trim()).map(line => ({ description: line.trim() }));
    }

    calculateGrandTotal() {
        const services = this.getServicesData();
        const subtotal = services.reduce((total, service) => total + service.total, 0);
        const specialDiscount = this.parseTurkishNumber(document.getElementById('specialDiscount').value);
        const additionalDiscount = this.parseTurkishNumber(document.getElementById('additionalDiscount').value);
        return subtotal - specialDiscount - additionalDiscount;
    }

    calculateVAT() {
        const grandTotal = this.calculateGrandTotal();
        const vatRate = parseFloat(document.getElementById('vatRate').value) || 0;
        const vatIncluded = document.getElementById('vatIncluded').value === 'true';
        
        if (vatIncluded) {
            return {
                vatAmount: grandTotal * vatRate / (100 + vatRate),
                totalWithVAT: grandTotal,
                totalWithoutVAT: grandTotal - (grandTotal * vatRate / (100 + vatRate))
            };
        } else {
            return {
                vatAmount: grandTotal * vatRate / 100,
                totalWithVAT: grandTotal + (grandTotal * vatRate / 100),
                totalWithoutVAT: grandTotal
            };
        }
    }

    showPreview() {
        const formData = this.getFormData();
        const previewSection = document.getElementById('previewSection');
        const previewContent = document.getElementById('proposalPreview');
        
        // Form validasyonu
        if (!this.validateForm()) {
            alert('Lütfen gerekli alanları doldurun.');
            return;
        }

        previewContent.innerHTML = this.generatePreviewHTML(formData);
        previewSection.style.display = 'block';
        
        // Önizleme bölümüne kaydır
        previewSection.scrollIntoView({ behavior: 'smooth' });
    }

    hidePreview() {
        document.getElementById('previewSection').style.display = 'none';
    }

    validateForm() {
        const requiredFields = ['companyName', 'clientName', 'proposalNumber', 'proposalDate'];
        
        for (const fieldId of requiredFields) {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.focus();
                return false;
            }
        }
        
        return true;
    }

    generatePreviewHTML(data) {
        const grandTotal = this.calculateGrandTotal();
        const vatInfo = this.calculateVAT();
        const currencySymbol = this.getCurrencySymbol(data.proposal.currency);
        const subtotal = data.services.reduce((total, service) => total + service.total, 0);
        
        return `
            <!-- 1. SAYFA -->
            <div class="pdf-page">
                <div class="proposal-header">
                    <div class="proposal-logo">
                        <div class="proposal-logo-circle">
                            <span class="proposal-logo-letter">Z</span>
                        </div>
                        <h1 class="proposal-company-name">${data.company.name}</h1>
                        <p class="proposal-slogan">GELECEĞİ SİZİN İÇİN YAZIYORUZ...</p>
                    </div>
                    
                    <div class="proposal-date-info">
                        <p>${this.formatDate(data.proposal.date)}</p>
                        <p>Teklif No: ${data.proposal.number}</p>
                    </div>
                </div>
                
                <div class="client-info">
                    <h3>MÜŞTERİ BİLGİLERİ</h3>
                    <p><strong>${data.client.title || 'Sayın'} ${data.client.name}</strong></p>
                    ${data.client.company ? `<p>${data.client.company}</p>` : ''}
                    ${data.client.address ? `<p>${data.client.address}</p>` : ''}
                    ${data.client.phone ? `<p>Tel: ${data.client.phone}</p>` : ''}
                    ${data.client.email ? `<p>E-posta: ${data.client.email}</p>` : ''}
                </div>
                
                <div class="proposal-greeting">
                    ${data.client.title || 'Sayın'} ${data.client.name},
                </div>
                
                <div class="proposal-content">
                    <p>Öncelikle firmamıza gösterdiğiniz ilgi ve detaylı bilgilendirmeler için teşekkür ederiz. Firmanıza özel olarak hazırlanan yazılım hizmetimiz ile ilgili detaylı fiyat teklifimiz aşağıdaki sayfalarda yer almaktadır.</p>
                    <p>Teklifimizin olumlu değerlendirmesini diler, görüş ve önerilerinizi rica ederiz.</p>
                </div>
            </div>
            
            <!-- 2. SAYFA -->
            <div class="pdf-page">
                <div class="proposal-details">
                    <h2 style="text-align: center; font-weight: bold; text-decoration: underline; margin-bottom: 20px;">
                        Yazılım Ürün ve Hizmetler Fiyatlandırma Detayları
                    </h2>
                
                <table style="width: 100%; border-collapse: collapse; margin: 15px 0; table-layout: fixed; font-size: 11px;">
                    <thead>
                        <tr style="background-color: #333; color: white;">
                            <th style="padding: 12px; text-align: left; border: 1px solid #333; font-weight: bold; width: 70%;">Teklif Edilen Ürün</th>
                            <th style="padding: 12px; text-align: center; border: 1px solid #333; font-weight: bold; width: 15%;">Adet</th>
                            <th style="padding: 12px; text-align: right; border: 1px solid #333; font-weight: bold; width: 15%;">Liste Fiyatı</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.services.map(service => `
                            <tr style="border-bottom: 1px solid #ddd;">
                                <td style="vertical-align: top; padding: 15px; border: 1px solid #ddd;">
                                    <div style="margin-bottom: 10px;">
                                        <strong style="font-size: 14px;">${service.description}</strong>
                                    </div>
                                    ${service.details && service.details.length > 0 ? `
                                        <div style="margin-top: 10px;">
                                            ${service.details.map(detail => `
                                                <div style="margin-bottom: 5px; padding-left: 15px; position: relative;">
                                                    <span style="position: absolute; left: 0; top: 0;">•</span>
                                                    <span style="font-size: 12px;">${detail}</span>
                                                </div>
                                            `).join('')}
                                        </div>
                                    ` : ''}
                                </td>
                                <td style="vertical-align: top; text-align: center; padding: 15px; border: 1px solid #ddd;">${service.quantity}</td>
                                <td style="vertical-align: top; text-align: right; padding: 15px; font-weight: bold; border: 1px solid #ddd;">${currencySymbol}${this.formatTurkishNumber(service.unitPrice)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div style="text-align: right; margin-top: 15px; padding: 15px; background-color: #f8f9fa; border-radius: 5px; font-size: 11px;">
                    <div style="margin-bottom: 10px; font-size: 14px;">
                        <strong>TOPLAM:</strong> ${currencySymbol}${this.formatTurkishNumber(subtotal)}
                    </div>
                    ${data.discounts.special > 0 ? `
                        <div style="margin-bottom: 10px; font-size: 14px;">
                            <strong>FİRMANIZA ÖZEL İNDİRİM:</strong> ${currencySymbol}${this.formatTurkishNumber(data.discounts.special)}
                        </div>
                    ` : ''}
                    ${data.discounts.additional > 0 ? `
                        <div style="margin-bottom: 10px; font-size: 14px;">
                            <strong>SİZE ÖZEL EK İNDİRİM:</strong> ${currencySymbol}${this.formatTurkishNumber(data.discounts.additional)}
                        </div>
                    ` : ''}
                    <div style="font-size: 16px; font-weight: bold; color: #333; border-top: 2px solid #333; padding-top: 10px;">
                        <strong>GENEL TOPLAM:</strong> ${currencySymbol}${this.formatTurkishNumber(grandTotal)}
                    </div>
                </div>
                
                    <div class="proposal-vat-info">
                        <p>Fiyatlarımıza KDV Dahil değildir.</p>
                        <p>KDV oranımız %${data.vat.rate}'dir.</p>
                    </div>
                </div>
            </div>
            
            <!-- 3. SAYFA -->
            <div class="pdf-page">
                ${data.notes && data.notes.length > 0 ? `
                    <div class="proposal-notes">
                        <h3>Özel Notlar:</h3>
                        <ul>
                            ${data.notes.map(note => `<li>${note.description}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
            
            <!-- 4. SAYFA -->
            <div class="pdf-page">
                ${data.includedServices && data.includedServices.length > 0 ? `
                    <div class="proposal-included-services">
                        <h3>Fiyata Dahil Olan Hizmetler:</h3>
                        <ul>
                            ${data.includedServices.map(service => `<li>${service.description}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${data.paymentTerms ? `
                    <div class="proposal-payment-terms">
                        <h3>Ödeme Koşulları:</h3>
                        <p>${data.paymentTerms.replace(/\n/g, '<br>')}</p>
                    </div>
                ` : ''}
                
                <div class="proposal-validity">
                    <h3>Teklif Geçerlilik Süresi:</h3>
                    <p>Teklifimiz, ${this.formatDate(data.proposal.validUntil)} tarihine kadar geçerlidir.</p>
                </div>
                
                <div class="proposal-signature">
                    <p>Saygılarımla.</p>
                    <div class="signature-block">
                        <p><strong>Uğur ÖZTÜRK</strong></p>
                        <p>Genel Müdür</p>
                        <p><strong>ZİNCİR YAZILIM</strong></p>
                        <p>${data.company.address}</p>
                        <p>Tel: ${data.company.phone} | E-posta: ${data.company.email}</p>
                    </div>
                </div>
            </div>
        `;
    }

    getCurrencySymbol(currency) {
        const symbols = {
            'TRY': '₺',
            'USD': '$',
            'EUR': '€'
        };
        return symbols[currency] || '₺';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR');
    }

    // Kapsamlı Türkçe karakter dönüştürme
    convertTurkishChars(text) {
        if (!text) return '';
        
        const turkishMap = {
            // Büyük harfler
            'İ': 'I', 'Ğ': 'G', 'Ü': 'U', 'Ş': 'S', 'Ö': 'O', 'Ç': 'C',
            // Küçük harfler  
            'ı': 'i', 'ğ': 'g', 'ü': 'u', 'ş': 's', 'ö': 'o', 'ç': 'c',
            // Özel kelimeler
            'İNDİRİM': 'INDIRIM', 'İndirim': 'Indirim', 'indirim': 'indirim',
            'FİRMANIZA': 'FIRMANIZA', 'firmanıza': 'firmaniza',
            'SİZE': 'SIZE', 'size': 'size',
            'YAZILIM': 'YAZILIM', 'yazılım': 'yazilim',
            'MÜŞTERİ': 'MUSTERI', 'müşteri': 'musteri',
            'BİLGİLERİ': 'BILGILERI', 'bilgileri': 'bilgileri',
            'ÜRÜN': 'URUN', 'ürün': 'urun',
            'HİZMETLER': 'HIZMETLER', 'hizmetler': 'hizmetler',
            'FİYATLANDIRMA': 'FIYATLANDIRMA', 'fiyatlandırma': 'fiyatlandirma',
            'DETAYLARI': 'DETAYLARI', 'detayları': 'detaylari',
            'TEKLİF': 'TEKLIF', 'teklif': 'teklif',
            'EDİLEN': 'EDILEN', 'edilen': 'edilen',
            'ADET': 'ADET', 'adet': 'adet',
            'FİYATI': 'FIYATI', 'fiyatı': 'fiyati',
            'E-TİCARET': 'E-TICARET', 'e-ticaret': 'e-ticaret',
            'YILLIK': 'YILLIK', 'yıllık': 'yillik',
            'KİRALAMA': 'KIRALAMA', 'kiralama': 'kiralama',
            'SATIŞ': 'SATIS', 'satış': 'satis',
            'PROGRAMI': 'PROGRAMI', 'programı': 'programi',
            'YÖNETİCİ': 'YONETICI', 'yönetici': 'yonetici',
            'YABANCI': 'YABANCI', 'yabancı': 'yabanci',
            'DESTEĞİ': 'DESTEGI', 'desteği': 'destegi',
            'İNGİLİZCE': 'INGILIZCE', 'İngilizce': 'Ingilizce',
            'YAPI': 'YAPI', 'yapı': 'yapi',
            'YIL': 'YIL', 'yıl': 'yil',
            'ŞİFRELEME': 'SIFRELEME', 'şifreleme': 'sifreleme',
            'FİYATLARIMIZA': 'FIYATLARIMIZA', 'fiyatlarımıza': 'fiyatlarimiza',
            'DEĞİLDİR': 'DEGILDIR', 'değildir': 'degildir',
            'ORANIMIZ': 'ORANIMIZ', 'oranımız': 'oranimiz',
            'ÖDEME': 'ODEME', 'ödeme': 'odeme',
            'KOŞULLARI': 'KOSULLARI', 'koşulları': 'kosullari',
            'SÖZLEŞME': 'SOZLESME', 'sözleşme': 'sozlesme',
            'GEÇERLİLİK': 'GECERLILIK', 'geçerlilik': 'gecerlilik',
            'SÜRESİ': 'SURESI', 'süresi': 'suresi',
            'SAYGILARIMLA': 'SAYGILARIMLA', 'saygılarımla': 'saygilarimla',
            'GENEL': 'GENEL', 'genel': 'genel',
            'MÜDÜR': 'MUDUR', 'müdür': 'mudur',
            'GELECEĞİ': 'GELECEGI', 'geleceği': 'gelecegi',
            'SİZİN': 'SIZIN', 'sizin': 'sizin',
            'İÇİN': 'ICIN', 'için': 'icin',
            'YAZIYORUZ': 'YAZIYORUZ', 'yazıyoruz': 'yaziyoruz'
        };
        
        let result = text;
        for (const [turkish, ascii] of Object.entries(turkishMap)) {
            result = result.replace(new RegExp(turkish, 'g'), ascii);
        }
        
        return result;
    }

    // PDF için özel metin düzenleme
    formatTextForPDF(text) {
        if (!text) return '';
        return this.convertTurkishChars(text)
            .replace(/\s+/g, ' ') // Çoklu boşlukları tek boşluğa çevir
            .trim();
    }

    async exportToPDF() {
        if (!this.validateForm()) {
            alert('Lütfen gerekli alanları doldurun.');
            return;
        }

        // Önce önizlemeyi göster
        this.showPreview();
        
        // Kısa bir bekleme sonrası PDF oluştur
        setTimeout(async () => {
            try {
                const previewElement = document.getElementById('previewSection');
                const previewContent = document.querySelector('.proposal-preview');
                
                if (!previewElement || !previewContent) {
                    alert('Önizleme bulunamadı. Lütfen önce "Önizleme Göster" butonuna tıklayın.');
                    return;
                }
                
                const { jsPDF } = window.jspdf;
                
                // Önizleme elementini görünür hale getir
                previewElement.style.display = 'block';
                previewContent.style.height = 'auto';
                previewContent.style.overflow = 'visible';
                
                // A4 boyutları
                const A4_WIDTH = 210; // mm
                const A4_HEIGHT = 297; // mm
                const A4_PADDING = 20; // mm
                const CONTENT_WIDTH = A4_WIDTH - (A4_PADDING * 2);
                const CONTENT_HEIGHT = A4_HEIGHT - (A4_PADDING * 2);
                
                // PDF sayfalarını bul
                const pdfPages = previewContent.querySelectorAll('.pdf-page');
                
                if (pdfPages.length === 0) {
                    alert('PDF sayfaları bulunamadı.');
                    return;
                }
                
                const pdf = new jsPDF('p', 'mm', 'a4');
                
                // Her sayfayı ayrı ayrı işle
                for (let i = 0; i < pdfPages.length; i++) {
                    const page = pdfPages[i];
                    
                    // Sayfa görünürlüğünü ayarla
                    page.style.position = 'relative';
                    page.style.left = '0';
                    page.style.top = '0';
                    page.style.margin = '0';
                    page.style.border = '1px solid #ddd';
                    
                    // HTML2Canvas ile sayfayı yakala
                    const canvas = await html2canvas(page, {
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: '#ffffff',
                        logging: false,
                        width: page.offsetWidth,
                        height: page.offsetHeight,
                        windowWidth: page.offsetWidth,
                        windowHeight: page.offsetHeight
                    });
                    
                    const imgData = canvas.toDataURL('image/png');
                    
                    // İlk sayfa değilse yeni sayfa ekle
                    if (i > 0) {
                        pdf.addPage();
                    }
                    
                    // Resmi A4 sayfasına ekle
                    pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH, A4_HEIGHT);
                    
                    console.log(`Sayfa ${i + 1} işlendi`);
                }
                
                // PDF'i indir
                const fileName = `Teklif_${document.getElementById('proposalNumber').value}_${new Date().toISOString().split('T')[0]}.pdf`;
                pdf.save(fileName);
                
                console.log('PDF başarıyla oluşturuldu:', fileName);
                
            } catch (error) {
                console.error('PDF oluşturma hatası:', error);
                alert('PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
            }
        }, 1500);
    }

    async generatePage1PDF(pdf) {
        const formData = this.getFormData();
        
        // Logo ve başlık
        pdf.setFillColor(220, 53, 69);
        pdf.circle(105, 25, 8, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Z', 105, 29, { align: 'center' });
        
        pdf.setTextColor(220, 53, 69);
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text(this.formatTextForPDF('ZİNCİR YAZILIM'), 105, 45, { align: 'center' });
        pdf.setFontSize(10);
        pdf.setTextColor(255, 107, 53);
        pdf.text(this.formatTextForPDF('GELECEĞİ SİZİN İÇİN YAZIYORUZ...'), 105, 52, { align: 'center' });
        
        // Tarih ve teklif no
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(this.formatDate(formData.proposal.date), 170, 20, { align: 'right' });
        pdf.text(`Teklif No: ${formData.proposal.number}`, 170, 27, { align: 'right' });
        
        // Şirket bilgileri
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(this.formatTextForPDF('ZİNCİR YAZILIM'), 20, 75);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(this.formatTextForPDF(formData.company.address), 20, 82);
        pdf.text(`Tel: ${formData.company.phone}`, 20, 89);
        pdf.text(`E-posta: ${formData.company.email}`, 20, 96);
        
        // Müşteri bilgileri
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(this.formatTextForPDF('MÜŞTERİ BİLGİLERİ'), 20, 110);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${this.formatTextForPDF(formData.client.title || 'Sayın')} ${this.formatTextForPDF(formData.client.name)}`, 20, 117);
        if (formData.client.company) {
            pdf.text(this.formatTextForPDF(formData.client.company), 20, 124);
        }
        if (formData.client.address) {
            pdf.text(this.formatTextForPDF(formData.client.address), 20, 131);
        }
        if (formData.client.phone) {
            pdf.text(`Tel: ${formData.client.phone}`, 20, 138);
        }
        if (formData.client.email) {
            pdf.text(`E-posta: ${formData.client.email}`, 20, 145);
        }
        
        // Hitap ve giriş metni
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${this.formatTextForPDF(formData.client.title || 'Sayın')} ${this.formatTextForPDF(formData.client.name)},`, 20, 165);
        
        // İçerik
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        const content1 = this.formatTextForPDF('Öncelikle firmamıza gösterdiğiniz ilgi ve detaylı bilgilendirmeler için teşekkür ederiz.');
        const content2 = this.formatTextForPDF('Firmanıza özel olarak hazırlanan yazılım hizmetimiz ile ilgili detaylı fiyat teklifimiz aşağıdaki sayfalarda yer almaktadır.');
        const content3 = this.formatTextForPDF('Teklifimizin olumlu değerlendirmesini diler, görüş ve önerilerinizi rica ederiz.');
        
        pdf.text(content1, 20, 180);
        pdf.text(content2, 20, 190);
        pdf.text(content3, 20, 200);
        
        // Sayfa sonu
        pdf.addPage();
    }

    async generatePage2PDF(pdf) {
        const formData = this.getFormData();
        
        // Başlık
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(this.formatTextForPDF('Yazılım Ürün ve Hizmetler Fiyatlandırma Detayları'), 105, 20, { align: 'center' });
        
        // Tablo başlığı
        pdf.setFillColor(51, 51, 51);
        pdf.rect(20, 35, 170, 12, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text(this.formatTextForPDF('Teklif Edilen Ürün'), 25, 43);
        pdf.text(this.formatTextForPDF('Adet'), 140, 43, { align: 'center' });
        pdf.text(this.formatTextForPDF('Liste Fiyatı'), 175, 43, { align: 'right' });
        
        // Hizmet satırı
        let yPos = 55;
        formData.services.forEach(service => {
            // Ürün adı
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'bold');
            pdf.text(this.formatTextForPDF(service.description), 25, yPos);
            
            // Hizmet detayları
            if (service.details && service.details.length > 0) {
                yPos += 7;
                pdf.setFontSize(9);
                pdf.setFont('helvetica', 'normal');
                service.details.forEach(detail => {
                    pdf.text(`• ${this.formatTextForPDF(detail)}`, 30, yPos);
                    yPos += 5;
                });
            }
            
            // Adet ve fiyat
            yPos += 5;
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'bold');
            pdf.text(service.quantity.toString(), 140, yPos, { align: 'center' });
            pdf.text(`₺${this.formatTurkishNumber(service.unitPrice)}`, 175, yPos, { align: 'right' });
            
            yPos += 15;
        });
        
        // Toplam
        const subtotal = formData.services.reduce((total, service) => total + service.total, 0);
        const grandTotal = this.calculateGrandTotal();
        
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`TOPLAM: ₺${this.formatTurkishNumber(subtotal)}`, 175, yPos, { align: 'right' });
        yPos += 8;
        
        if (formData.discounts.special > 0) {
            pdf.text(`FİRMANIZA ÖZEL İNDİRİM: ₺${this.formatTurkishNumber(formData.discounts.special)}`, 175, yPos, { align: 'right' });
            yPos += 8;
        }
        
        if (formData.discounts.additional > 0) {
            pdf.text(`SİZE ÖZEL EK İNDİRİM: ₺${this.formatTurkishNumber(formData.discounts.additional)}`, 175, yPos, { align: 'right' });
            yPos += 8;
        }
        
        pdf.setFontSize(14);
        pdf.text(`GENEL TOPLAM: ₺${this.formatTurkishNumber(grandTotal)}`, 175, yPos, { align: 'right' });
        
        // KDV bilgisi
        yPos += 15;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(this.formatTextForPDF('Fiyatlarımıza KDV Dahil değildir.'), 20, yPos);
        pdf.text(this.formatTextForPDF(`KDV oranımız %${formData.vat.rate}'dir.`), 20, yPos + 5);
        
        // Sayfa sonu
        pdf.addPage();
    }

    async generatePage3PDF(pdf) {
        const formData = this.getFormData();
        
        // Başlık
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(this.formatTextForPDF('Hizmet Detayları ve Özel Notlar'), 105, 20, { align: 'center' });
        
        let yPos = 40;
        
        // Fiyata dahil olan hizmetler
        if (formData.includedServices && formData.includedServices.length > 0) {
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text(this.formatTextForPDF('Fiyata Dahil Olan Hizmetler:'), 20, yPos);
            yPos += 15;
            
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            formData.includedServices.forEach(service => {
                pdf.text(`• ${this.formatTextForPDF(service.description)}`, 25, yPos);
                yPos += 6;
            });
            yPos += 10;
        }
        
        // Özel notlar
        if (formData.notes && formData.notes.length > 0) {
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text(this.formatTextForPDF('Özel Notlar:'), 20, yPos);
            yPos += 15;
            
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            formData.notes.forEach(note => {
                const lines = pdf.splitTextToSize(`• ${this.formatTextForPDF(note.description)}`, 170);
                pdf.text(lines, 25, yPos);
                yPos += lines.length * 4 + 5;
            });
        }
        
        // Sayfa sonu
        pdf.addPage();
    }

    async generatePage4PDF(pdf) {
        const formData = this.getFormData();
        
        // Başlık
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(this.formatTextForPDF('Ödeme Koşulları ve Sözleşme Detayları'), 105, 20, { align: 'center' });
        
        let yPos = 50;
        
        // Ödeme koşulları
        if (formData.paymentTerms) {
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text(this.formatTextForPDF('Ödeme Koşulları:'), 20, yPos);
            yPos += 15;
            
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            const paymentLines = pdf.splitTextToSize(this.formatTextForPDF(formData.paymentTerms), 170);
            pdf.text(paymentLines, 20, yPos);
            yPos += paymentLines.length * 4 + 15;
        }
        
        // Geçerlilik süresi
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(this.formatTextForPDF('Teklif Geçerlilik Süresi:'), 20, yPos);
        yPos += 15;
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.text(this.formatTextForPDF(`Teklifimiz, ${this.formatDate(formData.proposal.validUntil)} tarihine kadar geçerlidir.`), 20, yPos);
        yPos += 20;
        
        // İmza bölümü
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(this.formatTextForPDF('Saygılarımla.'), 20, yPos);
        
        yPos += 15;
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(this.formatTextForPDF('Uğur ÖZTÜRK'), 20, yPos);
        
        yPos += 10;
        pdf.setFontSize(12);
        pdf.text(this.formatTextForPDF('Genel Müdür'), 20, yPos);
        
        yPos += 20;
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text(this.formatTextForPDF('ZİNCİR YAZILIM'), 20, yPos);
        pdf.text(this.formatTextForPDF(formData.company.address), 20, yPos + 7);
        pdf.text(`Tel: ${formData.company.phone} | E-posta: ${formData.company.email}`, 20, yPos + 14);
    }

    saveProposal() {
        const formData = this.getFormData();
        const dataStr = JSON.stringify(formData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `Teklif_${formData.proposal.number}_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    loadProposal(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                this.populateForm(data);
                alert('Teklif başarıyla yüklendi.');
            } catch (error) {
                console.error('Dosya yükleme hatası:', error);
                alert('Dosya yüklenirken bir hata oluştu. Lütfen geçerli bir JSON dosyası seçin.');
            }
        };
        reader.readAsText(file);
    }

    populateForm(data) {
        // Şirket bilgileri
        if (data.company) {
            document.getElementById('companyName').value = data.company.name || '';
            document.getElementById('companyPhone').value = data.company.phone || '';
            document.getElementById('companyEmail').value = data.company.email || '';
            document.getElementById('companyWebsite').value = data.company.website || '';
            document.getElementById('companyAddress').value = data.company.address || '';
        }
        
        // Müşteri bilgileri
        if (data.client) {
            document.getElementById('clientName').value = data.client.name || '';
            document.getElementById('clientEmail').value = data.client.email || '';
            document.getElementById('clientAddress').value = data.client.address || '';
        }
        
        // Teklif bilgileri
        if (data.proposal) {
            document.getElementById('proposalNumber').value = data.proposal.number || '';
            document.getElementById('proposalDate').value = data.proposal.date || '';
            document.getElementById('validUntil').value = data.proposal.validUntil || '';
            document.getElementById('currency').value = data.proposal.currency || 'TRY';
        }
        
        // Hizmetler
        if (data.services && data.services.length > 0) {
            // Mevcut hizmetleri temizle
            const container = document.getElementById('servicesContainer');
            container.innerHTML = '';
            
            // Yeni hizmetleri ekle
            data.services.forEach(service => {
                this.addService();
                const lastService = container.lastElementChild;
                lastService.querySelector('input[name="serviceDescription"]').value = service.description || '';
                lastService.querySelector('input[name="serviceQuantity"]').value = service.quantity || 1;
                lastService.querySelector('input[name="serviceUnitPrice"]').value = this.formatTurkishNumber(service.unitPrice || 0);
                lastService.querySelector('input[name="serviceTotal"]').value = this.formatTurkishNumber(service.total || 0);
                if (service.details && service.details.length > 0) {
                    lastService.querySelector('textarea[name="serviceDetails"]').value = service.details.join('\n');
                }
            });
        }
        
        // İndirim bilgileri
        if (data.discounts) {
            document.getElementById('specialDiscount').value = this.formatTurkishNumber(data.discounts.special || 0);
            document.getElementById('additionalDiscount').value = this.formatTurkishNumber(data.discounts.additional || 0);
        }
        
        if (data.vat) {
            document.getElementById('vatRate').value = data.vat.rate || 20;
            document.getElementById('vatIncluded').value = data.vat.included ? 'true' : 'false';
        }
        
        // Fiyata dahil olan hizmetler
        if (data.includedServices && data.includedServices.length > 0) {
            const includedText = data.includedServices.map(service => service.description).join('\n');
            document.getElementById('includedServicesText').value = includedText;
        }
        
        // Notlar ve ödeme koşulları
        if (data.notes && data.notes.length > 0) {
            const notesText = data.notes.map(note => note.description).join('\n');
            document.getElementById('notes').value = notesText;
        }
        document.getElementById('paymentTerms').value = data.paymentTerms || '';
    }
}

// Sayfa yüklendiğinde uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    new ProposalCreator();
});
