# 💧 Lotion

**Lotion** adalah aplikasi catatan berbasis web, terinspirasi oleh Notion, Obsidian, Logseq, dan sejenisnya. Aplikasi ini memanfaatkan teknologi modern untuk pengalaman menulis dan manajemen catatan optimal.

🌐 Demo: https://lotion.restika.id/  
📂 GitHub: https://github.com/halonthe/lotion

---

## 🚀 Fitur Utama

- Buat, edit, dan atur catatan bebas—struktur fleksibel, kaya konten
- Autentikasi pengguna via **Clerk**
- Penyimpanan dan penyinkronan data real-time menggunakan **Convex**
- UI responsif & elegan dengan **Next.js**, **Tailwind CSS**, dan **Shadcn UI**
- State management efisien dengan **Zustand**
- Ekspor gambar/media via **ImageKit**
- Editor blok berbasis **BlockNote**
- Notifikasi interaktif menggunakan **Sonner**

---

## 🛠️ Teknologi

- **TypeScript** untuk type-safe
- **Next.js** untuk rendering efektif
- **Tailwind CSS** + **Shadcn UI** untuk kecepatan & konsistensi styling
- **Clerk** — manajemen otentikasi dan profile pengguna
- **Convex** — database & backend serverless real-time
- **Zustand** — global state management
- **BlockNote** — editor blok modern
- **ImageKit** — hosting dan optimasi gambar
- **Sonner** — toast notifications

---

## 🧩 Instalasi dari Source

1. **Clone repo**
   ```bash
   git clone https://github.com/halonthe/lotion.git
   cd lotion
   ```

2. **Instal dependencies**
   ```bash
   npm install
    ```
   
3. **Konfigurasi environment**
    - Rename `.env.example` → `.env`
    - Atur variabel sesuai kebutuhan (`CLERK_...`, `CONVEX_...`, `IMAGEKIT_...`, dll.)

4. **Jalankan server dev**
    ```bash
   npm run dev
    ```
5. **Build & production**
    ```bash
    npm run build
    npm run start
    ```
    Optimasi & jalankan versi produksi.

---

## 📁 Struktur Direktori
```markdown
/
├─ app/         → Routing, API dan layout Next.js  
├─ components/  → Komponen UI granular  
├─ hooks/       → Custom React hooks  
├─ lib/         → Modul utilitas
├─ convex/      → Skema database & function Convex  
└─ public/      → Aset statis  
```

---

## ✅ FAQ

**Apakah tersedia versi self‑hosted?**  
Iya! Cukup install, konfigurasi `.env`, dan build sendiri.

**Bagaimana backup data?**  
Data tersimpan di Convex — untuk backup, ekstrak dari dashboard Convex.

**Ingin deploy?**  
Cocok di Vercel atau platform serverless lain yang mendukung Next.js.

---

## 📜 Lisensi

Distribusi di bawah **MIT License** — silakan modifikasi dan gunakan 🤗.

---

## 📬 Kontak & Pengembang

**Yuda Dwi Restika**  
📧 Email: [yudhadwi@restika.id](mailto:yudhadwi@restika.id)  
🌐 Portofolio: [https://restika.id](https://restika.id)  
💻 GitHub: [https://github.com/halonthe](https://github.com/halonthe)

---

## ⭐ Dukungan

Jika kamu suka aplikasi ini, berikan **⭐ star** di GitHub. 😊  

Aku masih newbiew, tolong kasih saran bagaimana menyusun struktur folder yang rapi 😊 

Untuk dukungan lebih lanjut, jangan ragu kirimkan issue atau email langsung!