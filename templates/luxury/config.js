/* =========================================================
   CONFIG.JS — TEMPLATE: BIRTHDAY LUXURY
   =========================================================
   INI SATU-SATUNYA FILE YANG PERLU DIEDIT SETIAP ADA PESANAN.
   Jangan edit index.html, theme.css, atau file di folder shared/.
   ========================================================= */

window.CONFIG = {

  namaPenerima: "Alexander",
  labelAtas: "Dipersembahkan secara khusus untuk",
  eyebrowHero: "Sebuah Perayaan yang Berkelas",
  judulHero: "Selamat Ulang Tahun,",
  teksHero: "Kesuksesan dan kebahagiaan datang kepada mereka yang pantas mendapatkannya — dan tidak ada yang lebih pantas dari dirimu.",

  pesanUcapan: "\"Semoga tahun barumu dipenuhi pencapaian besar, relasi berharga, dan momen-momen yang layak dikenang selamanya. Selamat merayakan hari istimewamu.\"",
  pengirim: "— Dengan hormat dan kekaguman",

  galeriFoto: [
    "assets/images/foto-1.jpg",
    "assets/images/foto-2.jpg",
    "assets/images/foto-3.jpg",
    "assets/images/foto-4.jpg"
  ],

  musikAktif: true,
  musikFile: "assets/music/musik.mp3",

  nomorWhatsapp: "6285733745044",
  pesanWhatsapp: "Halo, saya juga ingin membuat website ucapan ulang tahun seperti ini",

  // Tingkatan EKSKLUSIF: paling lengkap — timeline, reasons, dan video aktif
  timelineAktif: true,
  timeline: [
    {
      judul: "Awal Perjalanan",
      tanggal: "Bertahun-tahun Lalu",
      cerita: "Langkah pertama yang penuh keberanian, meletakkan dasar dari semua pencapaian yang ada hari ini."
    },
    {
      judul: "Kerja Keras Membuahkan Hasil",
      tanggal: "Beberapa Tahun Terakhir",
      cerita: "Melewati banyak tantangan dengan kepala tegak, membuktikan bahwa kerja keras tidak pernah mengkhianati hasil."
    },
    {
      judul: "Menjadi Panutan",
      tanggal: "Saat Ini",
      cerita: "Kini menjadi sosok yang dihormati dan dijadikan panutan oleh banyak orang di sekitarnya."
    },
    {
      judul: "Hari Ini",
      tanggal: "Sekarang",
      cerita: "Sebuah perayaan kecil untuk menghormati perjalanan panjang dan pencapaian besar yang telah diraih."
    }
  ],

  reasonsAktif: true,
  judulAlasan: "Alasan Kehadiranmu Begitu Berarti",
  alasanList: [
    "Kepemimpinan yang menginspirasi banyak orang",
    "Integritas yang tidak pernah goyah dalam keadaan apa pun",
    "Dedikasi yang selalu menjadi teladan bagi sekitarnya",
    "Kebijaksanaan dalam mengambil setiap keputusan penting",
    "Kerendahan hati meski telah mencapai begitu banyak hal",
    "Pengaruh positif yang dirasakan oleh semua orang di sekitarnya"
  ],

  videoAktif: true,
  videoFile: "assets/videos/video.mp4",

  confetti: {
    aktif: true,
    warna: ["#C9A24B", "#F0D68A"]
  },

  // Efek background bergerak: partikel cahaya keemasan yang naik perlahan
  backgroundEffect: {
    aktif: true,
    tipe: "shimmer",
    warna: ["#C9A24B", "#F0D68A", "#F7F1E6"],
    jumlah: 30
  }

};
