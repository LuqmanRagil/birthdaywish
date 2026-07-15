/* =========================================================
   ENGINE.JS — logika bersama untuk semua template ucapan
   Jangan diedit saat memproses pesanan.
   Semua data pembeli (nama, pesan, foto, musik) diatur di
   file config.js pada folder template masing-masing.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const CFG = window.CONFIG || {};

  /* ---------- isi teks dari config ---------- */
  setText("coverEyebrow", CFG.labelAtas);
  setText("coverTitle", CFG.namaPenerima);
  setText("heroEyebrow", CFG.eyebrowHero);
  setText("heroText", CFG.teksHero);
  setText("messageText", CFG.pesanUcapan);
  setText("messageSignature", CFG.pengirim);

  const heroTitleEl = document.getElementById("heroTitle");
  if (heroTitleEl && CFG.judulHero) {
    heroTitleEl.innerHTML = `${CFG.judulHero}<br><em>${CFG.namaPenerima || ""}</em> 🎂`;
  }

  document.title = `Selamat Ulang Tahun, ${CFG.namaPenerima || ""}!`;

  /* ---------- galeri foto (jumlah foto fleksibel) ---------- */
  const galleryGrid = document.getElementById("galleryGrid");
  if (galleryGrid && Array.isArray(CFG.galeriFoto)) {
    galleryGrid.innerHTML = "";
    CFG.galeriFoto.forEach((src, i) => {
      const item = document.createElement("div");
      item.className = "gallery-item";
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Momen kenangan ${i + 1}`;
      img.loading = "lazy";
      item.appendChild(img);
      galleryGrid.appendChild(item);
    });
  }

  /* ---------- musik (opsional, tergantung config) ---------- */
  const musicSection = document.getElementById("musicSection");
  const bgMusic = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");

  if (CFG.musikAktif && CFG.musikFile && bgMusic) {
    const source = document.createElement("source");
    source.src = CFG.musikFile;
    source.type = "audio/mpeg";
    bgMusic.appendChild(source);
  } else if (musicSection) {
    musicSection.hidden = true;
  }

  if (musicBtn && bgMusic) {
    musicBtn.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.textContent = "Jeda Musik";
      } else {
        bgMusic.pause();
        musicBtn.textContent = "Putar Musik";
      }
    });
  }

  /* ---------- tombol "pesan juga" di footer -> WhatsApp ---------- */
  const footerBtn = document.getElementById("footerCtaBtn");
  if (footerBtn) {
    footerBtn.addEventListener("click", () => {
      const nomor = CFG.nomorWhatsapp || "6285733745044";
      const pesan = CFG.pesanWhatsapp || "Halo, saya ingin membuat website ucapan seperti ini";
      window.open(`https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`, "_blank");
    });
  }

  /* ---------- buka ucapan: reveal + confetti + musik ---------- */
  const openBtn = document.getElementById("openBtn");
  const cover = document.getElementById("cover");
  const content = document.getElementById("content");

  if (openBtn && cover && content) {
    openBtn.addEventListener("click", () => {
      cover.style.display = "none";
      content.hidden = false;
      window.scrollTo({ top: 0, behavior: "instant" });

      launchConfetti(CFG.confetti);
      revealTextLines();

      if (CFG.musikAktif && bgMusic) {
        bgMusic.play().catch(() => {
          /* autoplay diblokir browser, pengguna bisa klik tombol musik manual */
        });
      }
    });
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined) el.textContent = value;
  }

  function revealTextLines() {
    const lines = document.querySelectorAll(".reveal-line");
    lines.forEach((line, index) => {
      setTimeout(() => line.classList.add("visible"), index * 250);
    });
  }

  /* ---------- confetti: bisa kotak warna-warni ATAU emoji, tergantung tema ---------- */
  function launchConfetti(confettiConfig) {
    const cfg = confettiConfig || {};
    if (cfg.aktif === false) return;

    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = cfg.warna || ["#C9A24B", "#E7C97A", "#E8A7B3", "#F7F1E6"];
    const emojis = cfg.emoji || null; // contoh: ["🎉","🎂","✨"]
    const total = cfg.jumlah || 130;

    const pieces = [];
    for (let i = 0; i < total; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -Math.random() * canvas.height,
        size: emojis ? Math.random() * 14 + 14 : Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        emoji: emojis ? emojis[Math.floor(Math.random() * emojis.length)] : null,
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 6 - 3,
      });
    }

    let frame = 0;
    const maxFrames = 260;

    function draw() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pieces.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.emoji) {
          ctx.font = `${p.size}px sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText(p.emoji, 0, 0);
        } else {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        }

        ctx.restore();
      });

      if (frame < maxFrames) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    draw();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
});
