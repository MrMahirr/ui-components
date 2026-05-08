# 🏗️ Component Manager (UI Platform)

Modern, dinamik ve yüksek performanslı bileşen (UI Component) yönetim platformu. Bu monorepo, web geliştiricilerinin premium arayüz bileşenlerini kaydetmesini, canlı olarak düzenlemesini (Live Code Editor), kategorize etmesini ve gerçek zamanlı olarak önizlemesini (Real-time Live Preview) sağlar.

## 🚀 Teknolojik Altyapı (Tech Stack)

### 🎨 Frontend ([ui-platform-frontend](file:///c:/Users/MrMahirr/Desktop/component-manager/ui-platform-frontend))
*   **Çekirdek:** React 19, TypeScript, Vite
*   **Durum Yönetimi (State Management):** Zustand (hafif ve yüksek performanslı)
*   **Veri Alma ve Önbellekleme:** TanStack Query (React Query v5)
*   **CSS & Styling:** Tailwind CSS v4 (Modern ve yüksek performanslı CSS motoru)
*   **Kod Düzenleyici & Renklendirme:** Shiki, PrismJS, React Simple Code Editor, React Syntax Highlighter
*   **Yönlendirme (Routing):** React Router DOM v7
*   **İletişim:** Axios & OpenAPI/TypeScript tip uyumu

### ⚙️ Backend ([ui-platform-backend](file:///c:/Users/MrMahirr/Desktop/component-manager/ui-platform-backend))
*   **Çekirdek:** NestJS (Modüler, IoC ve Dependency Injection yapısı)
*   **Veritabanı:** PostgreSQL (Doğrudan `pg` sürücüsü ile yüksek performanslı ham SQL erişimi)
*   **Veritabanı Göçleri (Migrations):** `node-pg-migrate` (Tip güvenli ve deklaratif SQL göçleri)
*   **Validasyon:** `class-validator`, `class-transformer`
*   **Dokümantasyon:** Swagger / OpenAPI Entegrasyonu

### 🐳 DevOps & Altyapı
*   **Docker & Docker Compose:** Yerel ve canlı (production) ortamlar için tam konteynerizasyon desteği.
*   **Nginx:** Frontend SPA uygulamasını yüksek performansla sunan ve proxy yönlendirmeleri yapan Nginx konfigürasyonu.

---

## 📐 Mimari Prensipler ve Kod Standartları

Bu proje, ölçeklenebilir ve sürdürülebilir bir yazılım mimarisi sağlamak amacıyla aşağıdaki prensiplere sıkı sıkıya bağlı kalınarak geliştirilmiştir:

1.  **SOLID Prensipleri:** Tüm bileşenler ve servisler tek bir sorumluluğa (Single Responsibility) sahiptir. Bağımlılıkların tersine çevrilmesi (Dependency Inversion) ve arayüz ayrımı (Interface Segregation) ilkeleri tam olarak uygulanır.
2.  **TypeORM Olmayan (TypeORM-free) Temiz Veritabanı Erişimi:** Backend katmanında hiçbir şekilde TypeORM kullanılmamaktadır. Veritabanı sorguları, parametreleştirilmiş (parameterized) güvenli ham SQL sorguları halinde `ComponentsRepository` katmanında yürütülür. Bu sayede hem SQL injection açıkları engellenir hem de maksimum sorgu performansı elde edilir.
3.  **IoC & Dependency Injection:** NestJS'in güçlü IoC Container altyapısı sayesinde servisler ve repolar gevşek bağlı (loosely coupled) bir mimaride yönetilir.
4.  **Custom Hooks Öncelikli Frontend:** Frontend tarafında iş mantığı (business logic) ile arayüz (UI) katmanı kesin olarak ayrılmıştır. Veri alma, filtreleme ve durum güncellemeleri özel olarak tasarlanmış **Custom Hook**'lar üzerinden yürütülür.
5.  **Bellek Yönetimi (Zero OOM):** Bellek sızıntılarını (memory leak) engellemek amacıyla, veritabanı bağlantı havuzu (pg Pool) yönetimi ve frontend tarafındaki abonelikler/dinamik render işlemleri titizlikle optimize edilmiştir.
6.  **Okunabilirlik ve Açıklık:** Kod yapısında sihirli çözümler (tricks) yerine her zaman en sağlıklı, standart ve deklaratif yazım yolları tercih edilmiştir. Karar mekanizmalarında switch-case yapıları tercih edilerek temiz kod okunabilirliği korunmuştur.

---

## 📁 Proje Klasör Yapısı

```bash
component-manager/
├── docker-compose.prod.yml       # Production ortamı için Docker konfigürasyonu
├── ui-platform-frontend/         # React SPA Frontend Uygulaması
│   ├── src/
│   │   ├── api/                  # API istekleri ve OpenAPI şemaları
│   │   ├── components/           # Ortak UI bileşenleri
│   │   ├── features/             # Özellik bazlı izole modüller
│   │   ├── hooks/                # İş mantığı için Custom Hook'lar
│   │   ├── pages/                # Sayfa seviyesindeki bileşenler
│   │   ├── store/                # Zustand global state mağazaları
│   │   └── styles/               # Global stil dosyaları ve Tailwind v4 tanımları
│   ├── Dockerfile                # Frontend için çok aşamalı Docker üretimi
│   └── package.json
└── ui-platform-backend/          # NestJS Backend Uygulaması
    ├── src/
    │   ├── components/           # Bileşen CRUD işlemlerini yürüten modül
    │   │   ├── dto/              # Veri transfer nesneleri (DTOs)
    │   │   ├── interfaces/       # Veritabanı entity ve API arayüz tanımları
    │   │   ├── components.controller.ts
    │   │   ├── components.service.ts
    │   │   └── components.repository.ts # PG Pool ile doğrudan SQL sorguları
    │   ├── database/             # Veritabanı bağlantı ve havuz yönetimi
    │   └── main.ts               # Uygulama başlangıç noktası ve Swagger kurulumu
    ├── migrations/               # Veritabanı şema göç dosyaları (node-pg-migrate)
    ├── Dockerfile                # Backend için optimize edilmiş Docker üretimi
    └── package.json
```

---

## 🛠️ Kurulum ve Yerel Geliştirme (Local Development)

Proje paket yönetimi için yüksek performanslı ve disk dostu olan **pnpm** paket yöneticisini kullanır.

### Ön Gereksinimler
*   Node.js (v18 veya üzeri önerilir)
*   pnpm (`npm install -g pnpm`)
*   Docker ve Docker Compose (opsiyonel, veritabanı veya tüm sistemi ayağa kaldırmak için)

### 1. Veritabanının Hazırlanması
Yerel bilgisayarınızda PostgreSQL kurabilir veya Docker Compose ile PostgreSQL veritabanını anında hazır hale getirebilirsiniz.

**Docker ile PostgreSQL Başlatma:**
```bash
# Sadece PostgreSQL veritabanını başlatmak için root dizinde:
docker compose -f docker-compose.prod.yml up db -d
```
Bu işlem veritabanını localhost üzerinde `4566` portunda ayağa kaldıracaktır.

### 2. Backend Kurulumu (`ui-platform-backend`)
1.  Backend dizinine gidin:
    ```bash
    cd ui-platform-backend
    ```
2.  Çevre değişkenlerini ayarlayın (Örnek `.env` dosyasını oluşturun):
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=4566
    DB_USER=postgres
    DB_PASSWORD=admin123
    DB_NAME=ui_platform
    ```
3.  Bağımlılıkları kurun:
    ```bash
    pnpm install
    ```
4.  **Veritabanı Migrasyonlarını Çalıştırın:**
    Bileşen tablolarını ve gerekli şemayı PostgreSQL üzerinde oluşturmak için migrasyonları çalıştırın:
    ```bash
    pnpm run migrate:up
    ```
5.  Uygulamayı izleme modunda başlatın:
    ```bash
    pnpm run start:dev
    ```
    Uygulama başarıyla başladığında **Swagger API Dokümantasyonuna** `http://localhost:3000/api` adresinden erişebilirsiniz.

### 3. Frontend Kurulumu (`ui-platform-frontend`)
1.  Frontend dizinine gidin:
    ```bash
    cd ../ui-platform-frontend
    ```
2.  Çevre değişkenlerini ayarlayın (Örnek `.env` dosyasını oluşturun):
    ```env
    VITE_API_URL=http://localhost:3000
    ```
3.  Bağımlılıkları kurun:
    ```bash
    pnpm install
    ```
4.  Uygulamayı yerel geliştirme sunucusunda başlatın:
    ```bash
    pnpm run dev
    ```
    Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

---

## 🐳 Docker ile Üretim (Production) Ortamı Kurulumu

Tüm sistemi (PostgreSQL, NestJS Backend ve Vite+Nginx Frontend) tek bir komutla üretim standartlarında ayağa kaldırabilirsiniz. Root dizinde aşağıdaki komutu çalıştırmanız yeterlidir:

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

### Konteyner Port Haritası:
*   **Frontend SPA (Nginx):** `http://localhost:80` (veya doğrudan `http://localhost`)
*   **Backend API (NestJS):** `http://localhost:3000`
*   **PostgreSQL Veritabanı:** `localhost:4566` (Konteyner dışı bağlantılar için port haritası)

---

## 🗄️ Veritabanı Göç (Migration) Yönetimi

Veritabanı şemasında bir değişiklik yapmak istediğinizde NestJS projesi içerisindeki `node-pg-migrate` aracını kullanın:

*   **Yeni bir migrasyon dosyası oluşturma:**
    ```bash
    cd ui-platform-backend
    pnpm run migrate:create -- <migration-name>
    ```
*   **Migrasyonları ileriye yürütme (Up):**
    ```bash
    pnpm run migrate:up
    ```
*   **En son migrasyonu geri alma (Down):**
    ```bash
    pnpm run migrate:down
    ```

---

## 👨‍💻 Katkıda Bulunma Standartları

Bu projede kod geliştirirken lütfen şu kurallara riayet edin:
*   **SOLID & Clean Code:** Her sınıfın, fonksiyonun ve modülün tek ve net bir amacı olmalıdır.
*   **Type Safety:** `any` veri tipini kullanmaktan kaçının. Tip tanımlarını eksiksiz yapın.
*   **No TypeORM:** Veritabanına yeni bir tablo veya alan eklediğinizde bunu `ComponentsRepository` içerisindeki ham SQL sorgularını güncelleyerek yapın.
*   **Custom Hooks:** React bileşenlerinde büyük `useEffect` blokları veya veri alma mantığı barındırmayın; her zaman özel bir custom hook içerisine soyutlayın.
