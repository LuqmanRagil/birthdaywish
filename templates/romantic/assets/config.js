/* =========================================================
   CONFIG.JS — TEMPLATE: BIRTHDAY ROMANTIC (Edisi Lengkap)
   =========================================================
   INI SATU-SATUNYA FILE YANG PERLU DIEDIT SETIAP ADA PESANAN.
   Jangan edit index.html, style.css, atau script.js.

   Cara pakai singkat:
   1. Ganti semua teks di dalam tanda kutip " " sesuai pesanan pembeli.
   2. Ganti path foto (yang sekarang menunjuk ke folder
      "assets/images-contoh/") dengan foto asli pembeli yang
      sudah kamu taruh di folder "assets/images/".
   3. Kalau pembeli kirim lagu, taruh file mp3 di "assets/music/"
      dan sesuaikan musikFile, musikJudul, musikArtis, musikCover.
   4. Simpan file ini, lalu upload seluruh folder ke hosting
      (lihat PANDUAN-ORDER.md di folder utama BirthdayWish).
   ========================================================= */

window.CONFIG = {

  /* ============ 1. OPENING / HALAMAN PEMBUKA ============ */
  namaPenerima: "Aisyah",
  fotoPembuka: "assets/images-contoh/romantic-illustration.svg",
  kalimatPembuka1: "Untuk seseorang yang paling istimewa...",
  kalimatPembuka2: "Klik untuk membuka hadiah kecil dariku ❤️",
  tombolPembuka: "Buka Kejutan ✨",

  /* ============ 2. HERO SECTION (UCAPAN UTAMA) ============ */
  fotoHero: "assets/images-contoh/romantic-illustration.svg",
  // Kosongkan umur jadi "" kalau tidak ingin menampilkan umur
  umur: "18",
  judulHero: "Happy Birthday",
  subjudulHero: "Years of Beautiful Journey",

  /* ============ 3. LOVE LETTER / SURAT CINTA ============ */
  suratPembuka: "Dear Aisyah,",
  suratIsi: [
    "Hari ini bukan hanya tentang bertambahnya usiamu, tapi tentang merayakan seseorang yang telah membuat dunia terasa lebih indah.",
    "Setiap momen bersamamu adalah hadiah yang tidak pernah aku minta, tapi selalu aku syukuri setiap harinya.",
    "Semoga di usia yang baru ini, kamu semakin bahagia, semakin dicintai, dan semakin menjadi dirimu sendiri yang paling indah."
  ],

  /* ============ 4. TIMELINE KENANGAN ============ */
  // Tambah/kurangi objek di array ini sesuai jumlah momen yang diinginkan
  timeline: [
    {
      judul: "Pertama Bertemu",
      tanggal: "12 Februari 2021",
      cerita: "Hari dimana aku pertama kali mengenalmu, dan dunia terasa sedikit lebih berwarna.",
      foto: "assets/images-contoh/photo-placeholder.svg"
    },
    {
      judul: "Momen Terindah",
      tanggal: "8 Agustus 2022",
      cerita: "Saat kita menghabiskan waktu bersama, dan aku sadar aku ingin lebih banyak momen sepertinya.",
      foto: "assets/images-contoh/photo-placeholder.svg"
    },
    {
      judul: "Hari Ini",
      tanggal: "Sekarang",
      cerita: "Aku berharap kita terus membuat cerita baru, satu demi satu, sampai nanti.",
      foto: "assets/images-contoh/photo-placeholder.svg"
    }
  ],

  /* ============ 5. GALERI FOTO KENANGAN ============ */
  // Tambah/kurangi baris sesuai jumlah foto
  galeriFoto: [
    "assets/images-contoh/photo-placeholder.svg",
    "assets/images-contoh/photo-placeholder.svg",
    "assets/images-contoh/photo-placeholder.svg",
    "assets/images-contoh/photo-placeholder.svg"
  ],

  /* ============ 6. REASONS WHY I LOVE YOU ============ */
  judulAlasan: "10 Alasan Aku Bersyukur Memilikimu",
  alasanCinta: [
    "Senyummu selalu membuat hariku lebih baik",
    "Kamu selalu menjadi tempat nyaman untuk bercerita",
    "Kamu membuat hal sederhana menjadi berharga",
    "Kamu mendengarkan tanpa menghakimi",
    "Kamu selalu percaya padaku, bahkan saat aku ragu pada diriku sendiri",
    "Caramu memperhatikan hal-hal kecil tentangku",
    "Kesabaranmu yang tak pernah habis",
    "Tawamu yang selalu menular",
    "Kamu selalu ada, di hari baik maupun buruk",
    "Kamu adalah rumah, di manapun kita berada"
  ],

  /* ============ 7. BIRTHDAY WISHES / DOA ============ */
  doaUcapan: "Semoga langkahmu selalu dipenuhi kebahagiaan, semoga semua impianmu tercapai, dan semoga kamu selalu menjadi versi terbaik dari dirimu.",

  /* ============ 8. SURPRISE SECTION ============ */
  tombolRahasia: "Ada satu pesan rahasia untukmu...",
  pesanRahasia: "Aku menyayangimu lebih dari yang bisa aku ungkapkan dengan kata-kata. Terima kasih sudah menjadi kamu. Selamat ulang tahun, sayang. ❤️",

  /* ============ 9. MUSIC PLAYER ============ */
  // PENTING: file lagu asli (mp3) TIDAK disertakan karena hak cipta.
  // Isi musikFile dengan lagu yang pembeli punya hak untuk pakai,
  // taruh filenya di folder assets/music/. Set musikAktif ke false
  // untuk menyembunyikan player kalau pembeli tidak minta musik.
  musikAktif: true,
  musikJudul: "Perfect",
  musikArtis: "Ed Sheeran (contoh — ganti sesuai lagu pilihan pembeli)",
  musikCover: "assets/images-contoh/music-cover-placeholder.svg",
  musikFile: "assets/music/Virgoun - Bukti.mp3",

  /* ============ 10. CLOSING SECTION ============ */
  penutupTeks: "Terima kasih sudah hadir di dunia ini. Terima kasih sudah menjadi bagian dari cerita hidupku.",
  penutupSubteks: "Selamat ulang tahun, seseorang yang selalu punya tempat spesial di hatiku ❤️",
  pengirim: "— Dari Rangga, dengan segenap hati",
  tanggalDibuat: "14 Juli 2026",

  /* ============ KONTAK PENJUAL (tombol "Pesan Template Ini") ============ */
  nomorWhatsapp: "6285733745044",
  pesanWhatsapp: "Halo, saya juga ingin membuat website ucapan seperti ini",

  /* ============ EFEK BACKGROUND BERGERAK (ambient, seluruh halaman) ============ */
  backgroundEffect: {
    aktif: true,
    warna: ["#E8A7B3", "#E7C97A"],
    jumlah: 20
  }

};
