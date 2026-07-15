# 🎂 BirthdayWish

Website untuk menjual **template website ucapan ulang tahun digital** — dibangun murni dengan
HTML, CSS, dan JavaScript (tanpa framework), dan siap di-hosting gratis di **GitHub Pages**.

---

## 📁 Struktur Folder

```
BirthdayWish/
│
├── index.html               → Halaman utama (landing page jualan)
├── demo.html                 → Halaman pilihan demo, menautkan ke 4 template asli di folder templates/
├── style.css                 → Styling landing page + demo
├── script.js                 → Interaktivitas landing page + demo
├── assets/
│   ├── images/               → Ilustrasi preview produk (SVG) & gambar lain
│   └── icons/                → Favicon & ikon kecil lainnya
│
├── templates/                 → 4 PRODUK ASLI yang dijual & dikirim ke pembeli
│   ├── shared/                 → "Mesin" bersama (engine.css & engine.js)
│   ├── romantic/                → Paket Birthday Romantic (+ config.js)
│   ├── minimalist/                → Paket Birthday Minimalist (+ config.js)
│   ├── luxury/                     → Paket Birthday Luxury (+ config.js)
│   └── anime/                       → Paket Birthday Anime Style (+ config.js)
│
├── PANDUAN-ORDER.md           → Cara memproses pesanan sampai kirim ke pembeli
└── README.md                  → Panduan ini
```

> 📌 **Penting:** folder `templates/` berisi produk asli yang kamu jual. Setiap
> ada pesanan, kamu tinggal duplikat salah satu folder template lalu edit file
> `config.js` di dalamnya (nama, pesan, foto, musik) — lihat **PANDUAN-ORDER.md**
> untuk alur lengkapnya dari pesan masuk sampai link jadi dikirim ke pembeli.

> **Catatan penting:** Kode ini sudah lengkap dan siap jalan, tapi folder `assets/images` dan
> `assets/icons` masih kosong. Kamu perlu menambahkan gambar sendiri (lihat bagian
> [Gambar yang perlu ditambahkan](#-gambar-yang-perlu-ditambahkan) di bawah) agar tampilannya
> sempurna. Kalau gambar belum ada, website tetap jalan normal — tampilannya hanya akan
> menampilkan warna gradient sebagai pengganti foto.

---

## 🚀 Cara Menjalankan di Visual Studio Code

### 1. Siapkan folder project
- Download / salin semua file di atas ke satu folder bernama `BirthdayWish`.
- Pastikan strukturnya persis seperti di atas.

### 2. Buka di VS Code
- Buka VS Code.
- Klik **File → Open Folder...** lalu pilih folder `BirthdayWish`.

### 3. Jalankan website di browser
Cara termudah untuk pemula:
1. Install extension **Live Server** di VS Code (cari di tab Extensions / `Ctrl+Shift+X`,
   ketik "Live Server" karya Ritwick Dey, lalu klik Install).
2. Klik kanan pada file `index.html` di panel file explorer VS Code.
3. Pilih **"Open with Live Server"**.
4. Browser otomatis terbuka dan menampilkan website kamu di alamat seperti
   `http://127.0.0.1:5500`.

Tanpa extension pun sebenarnya bisa — cukup klik dua kali file `index.html` untuk membukanya
langsung di browser. Tapi menggunakan Live Server lebih disarankan karena perubahan kode akan
otomatis me-refresh browser.

---

## ☁️ Cara Upload ke GitHub & Mengaktifkan GitHub Pages

### 1. Buat repository baru di GitHub
1. Login ke [github.com](https://github.com).
2. Klik tombol **New repository**.
3. Beri nama repository, misalnya `birthdaywish`.
4. Pilih **Public**, lalu klik **Create repository**.

### 2. Upload project kamu
**Opsi A — Tanpa Git (paling mudah untuk pemula):**
1. Di halaman repository yang baru dibuat, klik **"uploading an existing file"**.
2. Drag & drop semua file dan folder `BirthdayWish` ke halaman tersebut.
3. Klik **Commit changes**.

**Opsi B — Menggunakan Git dari terminal VS Code:**
```bash
git init
git add .
git commit -m "Upload website BirthdayWish"
git branch -M main
git remote add origin https://github.com/USERNAME-KAMU/birthdaywish.git
git push -u origin main
```
(Ganti `USERNAME-KAMU` dengan username GitHub kamu.)

### 3. Aktifkan GitHub Pages
1. Buka repository kamu di GitHub.
2. Klik tab **Settings**.
3. Di menu sebelah kiri, klik **Pages**.
4. Pada bagian **Branch**, pilih `main` dan folder `/root`, lalu klik **Save**.
5. Tunggu 1–2 menit, lalu refresh halaman. GitHub akan menampilkan link seperti:
   ```
   https://username-kamu.github.io/birthdaywish/
   ```
6. Website kamu sudah online dan bisa dibagikan ke calon pembeli! 🎉

---

## 🖼️ Gambar yang Perlu Ditambahkan

Yang masih perlu kamu tambahkan sendiri di `assets/images/`:

| Nama file | Digunakan di | Keterangan |
|---|---|---|
| `og-cover.jpg` | index.html | Gambar untuk preview link (Open Graph), ukuran ideal 1200x630px |

Dan di `assets/icons/`:

| Nama file | Keterangan |
|---|---|
| `favicon.png` | Ikon kecil di tab browser, ukuran ideal 512x512px |

> Untuk foto & musik di masing-masing **produk pesanan pembeli**, itu ditaruh di
> `templates/<nama-template>/assets/images/` dan `assets/music/` — lihat
> **PANDUAN-ORDER.md** untuk detailnya.

---

## 📲 Sistem Pemesanan (WhatsApp)

Semua tombol "Beli" / "Pesan Sekarang", tombol floating WhatsApp, dan `config.js` di tiap
template **sudah diisi dengan nomor WhatsApp asli kamu** (`6285733745044`). Kalau suatu saat
nomornya ganti, cari & ganti nomor ini di file-file berikut:

- `script.js` → variabel `WHATSAPP_NUMBER`
- `templates/shared/engine.js` → variabel `nomor` (nilai default)
- `templates/<nama-template>/config.js` (4 file) → field `nomorWhatsapp`

```javascript
const WHATSAPP_NUMBER = "6285733745044";
```

Gunakan format kode negara tanpa tanda `+` atau angka `0` di depan.
Contoh nomor Indonesia `0812-3456-7890` ditulis menjadi `6281234567890`.

---

## 💡 Ide Pengembangan Agar Website Ini Jadi Bisnis

1. **Portofolio nyata** — ganti gambar preview dengan screenshot template asli yang sudah jadi.
2. **Testimoni pembeli** — tambahkan section testimoni untuk membangun kepercayaan.
3. **Paket bundling** — jual paket "beli 2 template diskon 20%" untuk menaikkan nilai transaksi.
4. **Konten media sosial** — buat versi pendek demo template untuk konten TikTok/Reels agar orang penasaran dan klik ke website.
5. **Add-on berbayar** — tawarkan tambahan seperti "custom lagu", "custom animasi", atau "revisi tak terbatas".
6. **Program afiliasi** — beri komisi ke orang yang membantu mempromosikan BirthdayWish.
7. **Musiman** — buat varian tema lain di luar ulang tahun: wisuda, lamaran, anniversary, atau ucapan untuk orang tua.

## 🔧 Fitur Tambahan yang Bisa Dikembangkan Selanjutnya

Saat bisnis mulai berjalan, kamu bisa upgrade dari sistem manual (WhatsApp) ke sistem otomatis:

- **Pembayaran otomatis** — integrasi payment gateway seperti Midtrans atau Xendit agar pembeli bisa bayar via QRIS/transfer otomatis tanpa chat manual.
- **Dashboard pelanggan** — halaman khusus untuk pelanggan melihat status pesanan & riwayat pembelian.
- **Login & akun pengguna** — sistem autentikasi agar pelanggan bisa masuk dan mengelola pesanan mereka.
- **Database** — menyimpan data pesanan, pelanggan, dan template secara terstruktur (misalnya menggunakan MySQL, seperti yang biasa kamu pakai di XAMPP, atau layanan seperti Supabase/Firebase).
- **Form kustomisasi otomatis** — form online agar pelanggan bisa langsung mengisi nama, foto, dan pesan ucapan tanpa perlu chat manual, lalu sistem otomatis men-generate website ucapannya.
- **Panel admin** — halaman khusus untuk kamu mengelola pesanan masuk, mengunggah hasil jadi, dan melacak pendapatan.

Semua fitur di atas nantinya akan butuh backend (server) — kamu bisa mulai belajar dengan
PHP + MySQL (sesuai stack yang sudah kamu kuasai) atau framework seperti Laravel untuk versi
yang lebih terstruktur dan mudah dikembangkan jangka panjang.

---

Dibuat dengan ❤️ untuk BirthdayWish.
