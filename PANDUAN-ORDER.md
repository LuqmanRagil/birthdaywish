# 📦 Panduan Memproses Pesanan — BirthdayWish

Panduan ini menjelaskan langkah demi langkah: dari pesan masuk lewat WhatsApp,
sampai pembeli menerima link website ucapan yang sudah jadi.

---

## 🗂️ Struktur Folder Template

```
BirthdayWish/
└── templates/
    ├── shared/              → "Mesin" bersama (JANGAN diedit per pesanan)
    │   ├── engine.css
    │   └── engine.js
    │
    ├── romantic/            → Paket produk "Birthday Romantic"
    │   ├── index.html
    │   ├── theme.css
    │   ├── config.js        → EDIT FILE INI tiap ada pesanan
    │   └── assets/
    │       ├── images/      → taruh foto pembeli di sini
    │       └── music/       → taruh musik pembeli di sini (opsional)
    │
    ├── minimalist/           (struktur sama seperti di atas)
    ├── luxury/                (struktur sama seperti di atas)
    └── anime/                  (struktur sama seperti di atas)
```

**Prinsip pentingnya:** tiap template punya "mesin" yang sama (di folder `shared/`)
supaya tampilan dan animasinya konsisten & sudah teruji. Yang membedakan tiap
pesanan hanya isi file **`config.js`** — nama, pesan, foto, musik. Kamu tidak
perlu menyentuh HTML/CSS/JS lain sama sekali untuk memenuhi pesanan biasa.

---

> 📌 **Khusus template Romantic:** template ini punya struktur yang lebih lengkap
> (10 bagian: opening, hero, love letter, timeline, galeri, alasan cinta, doa,
> surprise, music player, closing) dan **tidak** memakai mesin `shared/` —
> ia berdiri sendiri dengan `style.css` & `script.js` miliknya sendiri di
> dalam foldernya. Field di `config.js`-nya juga jauh lebih banyak, tapi
> prinsipnya sama: satu-satunya file yang perlu diedit tiap pesanan.
> Template Minimalist, Luxury, dan Anime Style masih memakai struktur
> sederhana seperti sebelumnya.

## 🔄 Alur Lengkap Memproses 1 Pesanan

### 1. Terima detail dari pembeli via WhatsApp
Setelah pembeli klik tombol "Beli", mereka akan chat kamu. Tanyakan:
- Nama yang berulang tahun
- Pesan/ucapan yang ingin ditampilkan
- Nama pengirim ucapan (mis. "Dari Sahabatmu")
- 3–6 foto kenangan
- (Opsional) lagu favorit untuk musik latar

### 2. Salin folder template sesuai yang dibeli
Di komputer kamu, **duplikat** folder template yang dipesan. Contoh, kalau pembeli
beli **Birthday Romantic** untuk "Sarah":

- Salin folder `templates/romantic/`
- Rename hasil salinannya menjadi sesuatu yang mudah dikenali, misalnya `sarah-ulang-tahun/`

> 💡 Tips: jangan edit folder asli di `templates/romantic/` — folder itu biarkan jadi
> "master" bersih yang bisa dipakai berkali-kali untuk pesanan berikutnya.

### 3. Edit `config.js`
Buka file `config.js` di dalam folder salinan tadi (`sarah-ulang-tahun/config.js`),
lalu ganti nilai-nilai di dalamnya sesuai data pembeli:

```javascript
window.CONFIG = {
  namaPenerima: "Sarah",              // ganti dengan nama pembeli
  pesanUcapan: "\"...\"",              // ganti dengan ucapan yang diminta
  pengirim: "— Dari Kekasihmu",        // ganti nama pengirim
  galeriFoto: [
    "assets/images/foto-1.jpg",
    "assets/images/foto-2.jpg"
    // tambah/kurangi baris sesuai jumlah foto
  ],
  musikAktif: true,
  musikFile: "assets/music/musik.mp3",
  // ...dst
};
```

Semua field sudah diberi komentar penjelasan di dalam file, jadi tinggal ikuti saja.

### 4. Masukkan foto & musik pembeli
- Taruh foto-foto pembeli ke folder `assets/images/` di dalam folder salinan.
- Kalau ada musik, taruh file `.mp3` ke `assets/music/`.
- Pastikan nama file yang kamu taruh **sama persis** dengan yang ditulis di `galeriFoto`
  dan `musikFile` pada `config.js`.

### 5. Cek dulu di komputer sebelum dikirim
Buka `sarah-ulang-tahun/index.html` langsung di browser (atau pakai Live Server
di VS Code) untuk memastikan semua tampil dengan benar sebelum di-upload.

### 6. Upload & dapatkan link
Ada dua cara, pilih salah satu:

#### Opsi A — Netlify Drop (paling cepat, direkomendasikan untuk per-pesanan)
1. Buka **https://app.netlify.com/drop** di browser.
2. Drag folder `sarah-ulang-tahun` (seluruh isinya) ke halaman tersebut.
3. Dalam beberapa detik, Netlify memberi link acak seperti
   `https://random-name-123.netlify.app`.
4. Link ini sudah bisa langsung dibuka dan dikirim ke pembeli.
5. Kalau kamu daftar akun Netlify (gratis), kamu bisa klaim & rename site itu
   supaya linknya lebih rapi, misalnya `sarah-ulangtahun.netlify.app`.

#### Opsi B — GitHub Pages (gratis, cocok kalau ingin semuanya tersimpan di GitHub)
1. Buat repository baru di GitHub, misal `sarah-ulang-tahun`.
2. Upload seluruh isi folder `sarah-ulang-tahun/` (bukan foldernya, isinya) ke
   repo tersebut — ingat, `index.html` harus ada langsung di root repo.
3. Aktifkan GitHub Pages di **Settings → Pages** (branch `main`, folder `/root`).
4. Link jadi: `https://username-kamu.github.io/sarah-ulang-tahun/`.

> Netlify Drop lebih cepat untuk kebutuhan sehari-hari karena tidak perlu bikin
> repo baru tiap pesanan. GitHub Pages lebih cocok kalau kamu ingin semua
> pesanan tersimpan rapi dalam akun GitHub kamu.

### 7. Kirim link ke pembeli
Chat pembeli via WhatsApp dengan link yang sudah jadi, misalnya:

```
Halo! Website ucapan ulang tahun untuk Sarah sudah jadi 🎉
Ini link-nya, silakan dibuka: https://sarah-ulangtahun.netlify.app
Selamat merayakan momen spesialnya! 💛
```

---

## ⏱️ Ringkasan Cepat (Checklist)

- [ ] Terima detail dari WhatsApp (nama, pesan, foto, musik)
- [ ] Salin folder template yang dibeli → rename sesuai nama pembeli
- [ ] Edit `config.js` (nama, pesan, pengirim, dll.)
- [ ] Masukkan foto ke `assets/images/` dan musik ke `assets/music/` (kalau ada)
- [ ] Cek tampilan di browser
- [ ] Upload lewat Netlify Drop atau GitHub Pages
- [ ] Kirim link jadi ke pembeli via WhatsApp

---

## 🔁 Kebijakan Revisi

Website menampilkan **"Revisi gratis sampai sesuai"** — artinya tidak ada batas jumlah
revisi selama permintaan pembeli masih wajar (typo, ganti foto, ganti sedikit kalimat, dll).
Kalau pembeli minta perubahan besar (ganti tema/warna total, tambah section baru di luar
template), itu wajar dianggap request khusus dan boleh dikenai biaya tambahan — komunikasikan
ini secara baik-baik lewat WhatsApp.

## ➕ Menangani Pesanan dengan Add-on

Ada 2 add-on yang ditawarkan di halaman utama:

| Add-on | Harga | Cara memenuhinya |
|---|---|---|
| Custom lagu/musik pilihan | +Rp15.000 | Minta pembeli kirim link lagu (YouTube/Spotify), lalu unduh versi mp3-nya dan taruh di `assets/music/` sesuai nama di `musikFile` pada `config.js` |
| Tambahan slot galeri foto (maks. +5 foto) | +Rp10.000 | Tambahkan baris foto ekstra di array `galeriFoto` pada `config.js`, dan taruh file fotonya di `assets/images/` |

Total harga yang diminta ke pembeli = harga template + harga add-on yang dipilih.

## 🚀 Kalau Sudah Banyak Pesanan

Kalau order mulai ramai dan proses manual di atas terasa berat, langkah upgrade
selanjutnya (lihat juga bagian "Fitur Tambahan" di `README.md`):
- Buat **form online sederhana** (Google Form atau form custom) supaya pembeli
  mengisi sendiri nama/pesan/upload foto, jadi kamu tinggal salin datanya ke `config.js`.
- Pertimbangkan **otomatisasi dengan backend** (PHP + MySQL, atau Laravel) yang
  otomatis men-generate file `config.js` dari data form dan meng-upload template-nya,
  supaya prosesnya tidak lagi manual satu-satu.
