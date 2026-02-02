
const fs = require('fs');

// 1. SCHENGEN/EU COUNTRIES (29 Countries) - Using Germany Template
const schengenTemplate = {
    "title": "{COUNTRY_NAME} Vizesi",
    "flag": "{FLAG}",
    "hero_image": "hero-bg",
    "description": "{COUNTRY_NAME} vize başvurularınızda uzman desteği! Randevu, evrak hazırlığı ve süreç takibi ile vizenizi şansa bırakmayın. Hemen profesyonel danışmanlık alın.",
    "page_content": "<div class=\"space-y-6\"> <section> <h2 class=\"text-2xl font-bold text-blue-950 mb-4\">Schengen Vizesi Hakkında Bilinmesi Gereken Kritik Kurallar</h2> <div class=\"grid gap-4\"> <div class=\"bg-blue-50 p-4 rounded-xl border border-blue-100\"> <h3 class=\"font-bold text-blue-900 mb-2\">1. 90/180 Kuralı</h3> <p class=\"text-sm text-slate-600\">Schengen vizesi sahibi bir kişi, bölgede herhangi bir 180 günlük süre içinde en fazla 90 gün kalabilir. Seyahat planlamanızı yaparken bu kurala dikkat etmeniz önemlidir.</p> </div> <div class=\"bg-blue-50 p-4 rounded-xl border border-blue-100\"> <h3 class=\"font-bold text-blue-900 mb-2\">2. İlk Giriş ve Ana Hedef Kuralı</h3> <p class=\"text-sm text-slate-600\">Vize başvurusu, seyahatin ana amacının gerçekleşeceği (en uzun süre kalınacak) ülkeden yapılmalıdır. Eğer her ülkede eşit süre kalınacaksa, bölgeye ilk giriş yapılacak ülkenin konsolosluğuna başvurulur.</p> </div> <div class=\"bg-blue-50 p-4 rounded-xl border border-blue-100\"> <h3 class=\"font-bold text-blue-900 mb-2\">3. EES ve ETIAS Sistemi (2026)</h3> <ul class=\"list-disc list-inside text-sm text-slate-600 space-y-1\"> <li><strong>EES:</strong> Pasaportlara fiziksel damga vurulması yerine dijital kayıt tutulmasıdır.</li> <li><strong>ETIAS:</strong> Vizesiz seyahat hakkı olanların (Yeşil Pasaport vb.) gitmeden önce online kayıt yaptırmasıdır. (Bordo pasaportlu vize sahipleri için vize süreci devam etmektedir).</li> </ul> </div> </div> </section> <section> <h2 class=\"text-2xl font-bold text-blue-950 mb-4\">İzlenmesi Gereken Adımlar</h2> <ol class=\"space-y-3 list-decimal list-inside text-slate-700\"> <li><strong>Ana Hedef Ülkeyi Belirleme:</strong> Birden fazla ülke ziyaret edilecekse, en uzun kalınacak veya ilk giriş yapılacak ülkeden başvuru yapılmalıdır.</li> <li><strong>Randevu Oluşturma:</strong> Ülkeye göre yetkili aracı kurumdan randevu alınır.</li> <li><strong>Belge Hazırlığı:</strong> Pasaport, biyometrik fotoğraf, seyahat sağlık sigortası (30.000 € teminatlı), uçak/otel rezervasyonları ve gelir belgeleri hazırlanır.</li> <li><strong>Parmak İzi ve Mülakat:</strong> Randevu günü biyometrik veriler verilir ve dosya teslim edilir.</li> </ol> </section> <section> <h2 class=\"text-2xl font-bold text-blue-950 mb-4\">Vize Kategorileri</h2> <div class=\"space-y-4\"> <div> <h3 class=\"font-bold text-lg text-blue-900\">A Tipi Vize (Havalimanı Transit Vizesi)</h3> <p class=\"text-slate-600\">Gidilecek asıl ülkeye ulaşmak için bir ülkenin havalimanındaki uluslararası transit bölgesinden geçiş yapma hakkı tanır. Havalimanından dışarı çıkmanıza izin vermez.</p> </div> <div> <h3 class=\"font-bold text-lg text-blue-900\">C Tipi Vize (Kısa Süreli Vize - Schengen)</h3> <p class=\"text-slate-600\">En yaygın vize türüdür. Herhangi bir 180 günlük dönem içinde en fazla 90 gün konaklama hakkı verir.</p> <ul class=\"list-disc list-inside ml-4 text-slate-600 mt-2\"> <li>Turistik: Gezi ve tatil amaçlı.</li> <li>Ticari: İş toplantıları, fuarlar veya konferanslar için.</li> <li>Aile/Arkadaş Ziyareti: Davetiye ile gidilen seyahatler.</li> </ul> </div> <div> <h3 class=\"font-bold text-lg text-blue-900\">D Tipi Vize (Uzun Süreli / Ulusal Vize)</h3> <p class=\"text-slate-600\">90 günden fazla konaklama gerektiren durumlar için verilir.</p> <ul class=\"list-disc list-inside ml-4 text-slate-600 mt-2\"> <li>Eğitim: Üniversite veya uzun süreli dil kursları.</li> <li>Çalışma: Bir işverenle sözleşme yapılması durumunda.</li> <li>Aile Birleşimi: O ülkede yaşayan eş veya çocukların yanına yerleşme.</li> </ul> </div> </div> </section> <div class=\"mt-6 p-4 bg-slate-50 border-l-4 border-blue-600 rounded-r-xl\"> <p class=\"font-semibold text-blue-950\">Dikkat Edilmesi Gerekenler:</p> <ul class=\"mt-2 space-y-2 text-sm text-slate-600\"> <li><strong>Sigorta:</strong> Poliçenin tüm Schengen bölgesini kapsaması ve seyahat tarihlerinden 1 gün önce/sonra başlaması kritiktir.</li> <li><strong>Finansal Kanıt:</strong> Banka hesap dökümlerinin son 3 aya ait, kaşeli ve ıslak imzalı olması şarttır.</li> </ul> </div> <div class=\"mt-4 text-sm text-slate-500\"> <p>Resmi Bilgi: <a href=\"{LINK_URL}\" target=\"_blank\" class=\"text-blue-600 underline hover:text-blue-800\">{LINK_TEXT}</a></p> </div> </div>",
    "duration": "Ortalama 15-45 Gün",
    "types": ["C Tipi (Turistik/Ticari)", "D Tipi (Ulusal)", "A Tipi (Transit)"],
    "requirements": ["Pasaport", "Biyometrik Fotoğraf", "Seyahat Sağlık Sigortası", "Maddi Durum Belgeleri", "Uçak/Otel Rezervasyonu"]
};

// List of 29 Schengen/EU countries
const schengenCountries = [
    { name: "Almanya", id: "almanya", flag: "🇩🇪", linkText: "Almanya Büyükelçiliği", linkUrl: "https://tuerkei.diplo.de/" },
    { name: "Avusturya", id: "avusturya", flag: "🇦🇹", linkText: "Avusturya Dışişleri", linkUrl: "https://www.bmeia.gv.at/tr/avusturya-bueyuekelciligi-ankara" },
    { name: "Belçika", id: "belcika", flag: "🇧🇪", linkText: "Belçika Konsolosluğu", linkUrl: "https://turkiye.diplomatie.belgium.be/tr" },
    { name: "Bulgaristan", id: "bulgaristan", flag: "🇧🇬", linkText: "Bulgaristan Dışişleri", linkUrl: "https://www.mfa.bg/en/embassyinfo/t%C3%BCrkiye" },
    { name: "Çek Cumhuriyeti", id: "cek_cumhuriyeti", flag: "🇨🇿", linkText: "Çekya Büyükelçiliği", linkUrl: "https://mzv.gov.cz/ankara" },
    { name: "Danimarka", id: "danimarka", flag: "🇩🇰", linkText: "Danimarka Elçiliği", linkUrl: "https://tyrkiet.um.dk/tr" },
    { name: "Estonya", id: "estonya", flag: "🇪🇪", linkText: "Estonya Ankara", linkUrl: "https://ankara.mfa.ee/tr/" },
    { name: "Finlandiya", id: "finlandiya", flag: "🇫🇮", linkText: "Finlandiya Temsilciliği", linkUrl: "https://finlandabroad.fi/web/tur/ana-sayfa" },
    { name: "Fransa", id: "fransa", flag: "🇫🇷", linkText: "France-Visas Portalı", linkUrl: "https://france-visas.gouv.fr/" },
    { name: "Hırvatistan", id: "hirvatistan", flag: "🇭🇷", linkText: "Hırvatistan Dışişleri", linkUrl: "https://mvep.gov.hr/tr" },
    { name: "Hollanda", id: "hollanda", flag: "🇳🇱", linkText: "Hollanda Dünyada", linkUrl: "https://www.netherlandsworldwide.nl/" },
    { name: "İspanya", id: "ispanya", flag: "🇪🇸", linkText: "İspanya Dışişleri", linkUrl: "https://www.exteriores.gob.es/en/Paginas/index.aspx" },
    { name: "İsveç", id: "isvec", flag: "🇸🇪", linkText: "İsveç Başkonsolosluğu", linkUrl: "https://www.swedenabroad.se/" },
    { name: "İsviçre", id: "isvicre", flag: "🇨🇭", linkText: "İsviçre Elçiliği", linkUrl: "https://www.eda.admin.ch/ankara" },
    { name: "İtalya", id: "italya", flag: "🇮🇹", linkText: "İtalya Büyükelçiliği", linkUrl: "https://ambankara.esteri.it/it/" },
    { name: "İzlanda", id: "izlanda", flag: "🇮🇸", linkText: "İzlanda Hükümeti", linkUrl: "https://www.government.is/" },
    { name: "Letonya", id: "letonya", flag: "🇱🇻", linkText: "Letonya Elçiliği", linkUrl: "https://www2.mfa.gov.lv/turkey/vestnieciba" },
    { name: "Litvanya", id: "litvanya", flag: "🇱🇹", linkText: "Litvanya Elçiliği", linkUrl: "https://tr.mfa.lt/" },
    { name: "Lüksemburg", id: "luksemburg", flag: "🇱🇺", linkText: "Lüksemburg Ankara", linkUrl: "https://ankara.mae.lu/tr.html" },
    { name: "Macaristan", id: "macaristan", flag: "🇭🇺", linkText: "Macaristan Elçiliği", linkUrl: "https://ankara.mfa.gov.hu/tr" },
    { name: "Malta", id: "malta", flag: "🇲🇹", linkText: "Malta Dışişleri", linkUrl: "https://foreign.gov.mt/" },
    { name: "Norveç", id: "norvec", flag: "🇳🇴", linkText: "Norveç Elçiliği", linkUrl: "https://www.norway.no/en/turkiye/" },
    { name: "Polonya", id: "polonya", flag: "🇵🇱", linkText: "Polonya Elçiliği", linkUrl: "https://www.gov.pl/web/turkiye" },
    { name: "Portekiz", id: "portekiz", flag: "🇵🇹", linkText: "Portekiz Elçiliği", linkUrl: "https://ancara.embaixadaportugal.mne.gov.pt/pt/" },
    { name: "Romanya", id: "romanya", flag: "🇷🇴", linkText: "Romanya E-Viza", linkUrl: "https://eviza.mae.ro/" },
    { name: "Slovakya", id: "slovakya", flag: "🇸🇰", linkText: "Slovakya Elçiliği", linkUrl: "https://www.mzv.sk/web/ankara-en" },
    { name: "Slovenya", id: "slovenya", flag: "🇸🇮", linkText: "Slovenya Elçiliği", linkUrl: "https://www.gov.si/en/representations/embassy-ankara/" },
    { name: "Yunanistan", id: "yunanistan", flag: "🇬🇷", linkText: "Yunanistan Dışişleri", linkUrl: "https://www.mfa.gr/turkey/tr/" },
    { name: "Lihtenştayn", id: "lihtenstayn", flag: "🇱🇮", linkText: "Lihtenştayn Portalı", linkUrl: "https://www.liechtenstein.li/" }
];

// Content for USA
const usaContent = {
    "title": "Amerika Birleşik Devletleri (ABD) Vizesi",
    "flag": "🇺🇸",
    "hero_image": "hero-bg",
    "description": "ABD vize başvurularınızda uzman desteği! Randevu, evrak hazırlığı ve süreç takibi ile vizenizi şansa bırakmayın. Hemen profesyonel danışmanlık alın.",
    "page_content": "<div class=\"space-y-6\"> <section> <h2 class=\"text-2xl font-bold text-blue-950 mb-4\">Amerika Vize Süreci</h2> <p class=\"text-slate-600\">ABD vizeleri (genellikle B1/B2 Turistik/Ticari) mülakat odaklıdır ve evraklardan ziyade başvuru sahibinin niyetine önem verilir.</p> </section> <section> <h2 class=\"text-2xl font-bold text-blue-950 mb-4\">İzlenmesi Gereken Adımlar</h2> <ol class=\"space-y-3 list-decimal list-inside text-slate-700\"> <li><strong>DS-160 Formu:</strong> Online olarak İngilizce doldurulur. Bu form başvurunun en kritik parçasıdır.</li> <li><strong>Hesap Oluşturma ve Ücret:</strong> usvisa-info.com üzerinden hesap açılır ve vize ücreti (MRV fee) ödenir.</li> <li><strong>Randevu:</strong> Uygun tarih seçilir (Randevu yoğunluğu nedeniyle en az 6-8 ay önceden planlanmalıdır).</li> <li><strong>Konsolosluk Mülakatı:</strong> Ankara Büyükelçiliği veya İstanbul Başkonsolosluğu'nda yüz yüze görüşme yapılır.</li> </ol> </section> <div class=\"mt-6 p-4 bg-slate-50 border-l-4 border-blue-600 rounded-r-xl\"> <p class=\"font-semibold text-blue-950\">Dikkat Edilmesi Gerekenler:</p> <ul class=\"mt-2 space-y-2 text-sm text-slate-600\"> <li><strong>Güçlü Bağlar:</strong> Mülakatta Türkiye'ye geri döneceğinize dair ailevi, mesleki veya maddi bağları kanıtlamak esastır.</li> <li><strong>Netlik:</strong> Mülakatta verilen cevaplar DS-160 formuyla birebir örtüşmelidir.</li> </ul> </div> <div class=\"mt-4 text-sm text-slate-500\"> <p>Resmi Link: <a href=\"https://ais.usvisa-info.com/tr-tr/niv/not_in_operation\" target=\"_blank\" class=\"text-blue-600 underline hover:text-blue-800\">ABD Büyükelçiliği Vize Bilgi Sistemi</a></p> </div> </div>",
    "duration": "Ortalama 2-12 Ay",
    "types": ["B1/B2 (Turistik/Ticari)", "F1 (Öğrenci)", "J1 (Değişim)"],
    "requirements": ["DS-160 Onay Sayfası", "Randevu Onay Belgesi", "Pasaport", "Biyometrik Fotoğraf"]
};

// Content for UK
const ukContent = {
    "title": "İngiltere Vizesi",
    "flag": "🇬🇧",
    "hero_image": "hero-bg",
    "description": "İngiltere vize başvurularınızda uzman desteği! Randevu, evrak hazırlığı ve süreç takibi ile vizenizi şansa bırakmayın. Hemen profesyonel danışmanlık alın.",
    "page_content": "<div class=\"space-y-6\"> <section> <h2 class=\"text-2xl font-bold text-blue-950 mb-4\">İngiltere Vize Süreci</h2> <p class=\"text-slate-600\">İngiltere, Schengen bölgesinde değildir ve kendine özgü bir online puanlama/değerlendirme sistemi kullanır.</p> </section> <section> <h2 class=\"text-2xl font-bold text-blue-950 mb-4\">İzlenmesi Gereken Adımlar</h2> <ol class=\"space-y-3 list-decimal list-inside text-slate-700\"> <li><strong>GOV.UK Kaydı:</strong> Resmi web sitesi üzerinden form doldurulur ve ücret ödenir.</li> <li><strong>Belge Yükleme:</strong> Tüm destekleyici belgeler sisteme dijital olarak yüklenir veya randevu günü taranması için götürülür.</li> </ol> </section> <div class=\"mt-6 p-4 bg-slate-50 border-l-4 border-blue-600 rounded-r-xl\"> <p class=\"font-semibold text-blue-950\">Dikkat Edilmesi Gerekenler:</p> <ul class=\"mt-2 space-y-2 text-sm text-slate-600\"> <li><strong>Çeviriler:</strong> İngilizce olmayan tüm resmi belgelerin (tapu, ruhsat vb.) yeminli tercümesi eklenmelidir.</li> <li><strong>Maddi Kaynak:</strong> Birikim miktarının kaynağı (maaş, satış vb.) açıklanabilir olmalıdır.</li> </ul> </div> <div class=\"mt-4 text-sm text-slate-500\"> <p>Resmi Link: <a href=\"https://www.gov.uk/apply-to-come-to-the-uk\" target=\"_blank\" class=\"text-blue-600 underline hover:text-blue-800\">GOV.UK - Apply for a UK Visa</a></p> </div> </div>",
    "duration": "Ortalama 3-12 Hafta",
    "types": ["Standard Visitor", "Student Visa", "Skilled Worker"],
    "requirements": ["Pasaport", "Finansal Kanıtlar", "Adres Beyanı", "Çeviri Belgeleri"]
};

// Content for Canada
const canadaContent = {
    "title": "Kanada Vizesi",
    "flag": "🇨🇦",
    "hero_image": "hero-bg",
    "description": "Kanada vize başvurularınızda uzman desteği! Randevu, evrak hazırlığı ve süreç takibi ile vizenizi şansa bırakmayın. Hemen profesyonel danışmanlık alın.",
    "page_content": "<div class=\"space-y-6\"> <section> <h2 class=\"text-2xl font-bold text-blue-950 mb-4\">Kanada Vize Süreci</h2> <p class=\"text-slate-600\">Kanada vizesi tamamen online bir süreçtir ve genellikle pasaportun geçerlilik süresi kadar (10 yıla kadar) verilir.</p> </section> <section> <h2 class=\"text-2xl font-bold text-blue-950 mb-4\">İzlenmesi Gereken Adımlar</h2> <ol class=\"space-y-3 list-decimal list-inside text-slate-700\"> <li><strong>IRCC Portalı:</strong> Bir IRCC hesabı (GCKey) oluşturulur.</li> <li><strong>Online Formlar:</strong> IMM 5257 ve IMM 5645 gibi formlar dijital olarak doldurulur.</li> <li><strong>Biyometri Talimatı:</strong> Başvuru sonrası gelen mektup ile VFS Global'den parmak izi randevusu alınır.</li> <li><strong>Pasaport Gönderimi:</strong> Onay durumunda pasaport kargo ile gönderilir ve vize basılır.</li> </ol> </section> <div class=\"mt-6 p-4 bg-slate-50 border-l-4 border-blue-600 rounded-r-xl\"> <p class=\"font-semibold text-blue-950\">Dikkat Edilmesi Gerekenler:</p> <ul class=\"mt-2 space-y-2 text-sm text-slate-600\"> <li><strong>Niyet Mektubu (Statement of Purpose):</strong> Kanada hükümeti, neden Kanada'yı seçtiğinizi ve mutlaka döneceğinizi anlatan detaylı bir niyet mektubu bekler.</li> <li><strong>Mülakat Yoktur:</strong> Tüm karar yüklediğiniz belgeler üzerinden verilir, bu yüzden dosya kusursuz olmalıdır.</li> </ul> </div> <div class=\"mt-4 text-sm text-slate-500\"> <p>Resmi Link: <a href=\"https://www.canada.ca/en/services/immigration-citizenship.html\" target=\"_blank\" class=\"text-blue-600 underline hover:text-blue-800\">Canada.ca - Immigration and Citizenship</a></p> </div> </div>",
    "duration": "Ortalama 2-6 Ay",
    "types": ["Visitor Visa", "Study Permit", "Work Permit"],
    "requirements": ["Pasaport", "IMM Formları", "Niyet Mektubu", "Finansal Belgeler"]
};

// --- BUILD FINAL OBJECT ---
const finalCountries = {};

// 1. Add Schengen Countries
schengenCountries.forEach(c => {
    let content = JSON.stringify(schengenTemplate);
    content = content.replace(/{COUNTRY_NAME}/g, c.name)
        .replace(/{FLAG}/g, c.flag)
        .replace(/{LINK_TEXT}/g, c.linkText)
        .replace(/{LINK_URL}/g, c.linkUrl);
    finalCountries[c.id] = JSON.parse(content);
});

// 2. Add Special Countries
finalCountries["amerika"] = usaContent;
finalCountries["ingiltere"] = ukContent;
finalCountries["kanada"] = canadaContent;

// 3. Read existing data.json to keep services intact
const dataPath = 'assets/data/data.json';
const rawData = fs.readFileSync(dataPath);
const json = JSON.parse(rawData);

// 4. Update countries
json.countries = finalCountries;

// 5. Write back
fs.writeFileSync(dataPath, JSON.stringify(json, null, 4));
console.log("Successfully updated all 32 countries in data.json!");
