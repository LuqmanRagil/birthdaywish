/* =========================================================
   CONFIG.JS — TEMPLATE: BIRTHDAY ANIME STYLE
   =========================================================
   INI SATU-SATUNYA FILE YANG PERLU DIEDIT SETIAP ADA PESANAN.
   Jangan edit index.html, theme.css, atau file di folder shared/.
   ========================================================= */

window.CONFIG = {

  namaPenerima: "Kirana",
  labelAtas: "Kejutan spesial untuk",
  eyebrowHero: "Hari Yang Ditunggu-tunggu",
  judulHero: "Selamat Ulang Tahun,",
  teksHero: "Semoga harimu penuh warna seperti dirimu — ceria, hangat, dan selalu bikin semua orang di sekitarmu tersenyum!",

  pesanUcapan: "\"Makasih udah jadi kamu yang selalu bikin ceria! Semoga tahun ini penuh keseruan baru, mimpi yang makin dekat, dan kebahagiaan yang gak ada habisnya. Happy birthday!\"",
  pengirim: "— Dari orang-orang yang sayang kamu",

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

  // Tingkatan PREMIUM: timeline, reasons, dan video diaktifkan
  timelineAktif: true,
  timeline: [
    {
      judul: "Pertama Nonton Bareng",
      tanggal: "2022",
      cerita: "Awal mula kita jadi squad, gara-gara ributin ending anime yang bikin baper bareng-bareng."
    },
    {
      judul: "Marathon Semalaman",
      tanggal: "2023",
      cerita: "Nonton satu season penuh sampai pagi, lupa waktu tapi gak nyesel sama sekali."
    },
    {
      judul: "Sekarang",
      tanggal: "Hari Ini",
      cerita: "Masih jadi circle yang paling rame, dan hari ini giliran kamu yang kita rayain!"
    }
  ],

  reasonsAktif: true,
  judulAlasan: "5 Alasan Kamu Legend Banget",
  alasanList: [
    "Selera anime kamu gak pernah salah",
    "Selalu jadi yang paling semangat kalau diajak seru-seruan",
    "Setia dengerin curhatan receh sampai yang serius",
    "Ketawamu bikin satu circle ikut ketawa",
    "Kamu teman yang gak pernah bikin drama, cuma bikin bahagia"
  ],

  videoAktif: true,
  videoFile: "assets/videos/video.mp4",

  // Confetti versi emoji supaya terasa lebih ceria & anime
  confetti: {
    aktif: true,
    emoji: ["🎉", "🎂", "✨", "🎈", "💖"],
    jumlah: 90
  },

  // Efek background bergerak: kelap-kelip ceria warna-warni
  backgroundEffect: {
    aktif: true,
    tipe: "sparkle",
    warna: ["#ff8fb1", "#7ec9e0", "#ffd166", "#F7F1E6"],
    jumlah: 36
  }

};
