/* =========================================================
   CONFIG.JS — TEMPLATE: BIRTHDAY ROMANTIC
   =========================================================
   INI SATU-SATUNYA FILE YANG PERLU DIEDIT SETIAP ADA PESANAN.
   Jangan edit index.html, theme.css, atau file di folder shared/.

   Cara pakai:
   1. Ganti nilai di dalam tanda kutip " " sesuai data pembeli.
   2. Taruh foto pembeli di folder assets/images/ (bisa lebih
      atau kurang dari 4 foto, tinggal tambah/kurangi baris
      di galeriFoto).
   3. Taruh file musik (mp3) di folder assets/music/ kalau
      pembeli minta musik, lalu isi musikFile di bawah.
   4. Simpan file ini, lalu upload seluruh folder template
      ini ke hosting (lihat PANDUAN-ORDER.md).
   ========================================================= */

window.CONFIG = {

  // Nama orang yang berulang tahun (tampil besar di layar pembuka)
  namaPenerima: "Sarah",

  // Kalimat kecil di atas nama, di layar pembuka
  labelAtas: "Sebuah kejutan kecil untuk",

  // Kalimat kecil di atas judul utama (setelah dibuka)
  eyebrowHero: "25 Tahun yang Penuh Cerita",

  // Judul utama (nama akan otomatis ditambahkan setelah ini)
  judulHero: "Selamat Ulang Tahun,",

  // Paragraf pembuka setelah judul
  teksHero: "Setiap tahun yang kamu lewati adalah bukti betapa berharganya kamu. Semoga tahun ini membawa lebih banyak tawa, kehangatan, dan cinta yang tulus.",

  // Pesan / surat ucapan utama (boleh panjang, tampil di dalam kartu)
  pesanUcapan: "\"Terima kasih sudah jadi kamu yang selalu hangat dan penuh cinta. Semoga hari ini terasa seistimewa dirimu. Selamat merayakan hidup — aku bersyukur bisa merayakannya bersamamu.\"",

  // Nama pengirim ucapan (tampil di bawah pesan)
  pengirim: "— Dari orang yang selalu menyayangimu",

  // Daftar foto galeri kenangan. Tambah/kurangi sesuai kebutuhan.
  // Taruh file fotonya di folder assets/images/
  galeriFoto: [
    "assets/images/foto-1.jpg",
    "assets/images/foto-2.jpg",
    "assets/images/foto-3.jpg",
    "assets/images/foto-4.jpg"
  ],

  // Musik latar (opsional). Set musikAktif ke false kalau tidak pakai musik.
  musikAktif: true,
  musikFile: "assets/music/musik.mp3",

  // Nomor WhatsApp kamu (penjual) untuk tombol "Pesan Template Ini" di halaman ini
  nomorWhatsapp: "6285733745044",
  pesanWhatsapp: "Halo, saya juga ingin membuat website ucapan ulang tahun seperti ini",

  // Pengaturan efek confetti saat ucapan dibuka
  confetti: {
    aktif: true,
    warna: ["#C9A24B", "#E7C97A", "#E8A7B3", "#F7F1E6"]
  }

};
