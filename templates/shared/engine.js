/* =========================================================
   ENGINE.JS — logika bersama untuk semua template ucapan
   Jangan diedit saat memproses pesanan.
   Semua data pembeli (nama, pesan, foto, musik) diatur di
   file config.js pada folder template masing-masing.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const CFG = window.CONFIG || {};

  /* ---------- mode Foto / Tanpa Foto (lewat ?foto=0 di URL) ---------- */
  const params = new URLSearchParams(window.location.search);
  const modeTanpaFoto = params.get("foto") === "0" || CFG.pakaiFoto === false;
  if (modeTanpaFoto) {
    document.body.classList.add("mode-tanpa-foto");
  }

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

  /* ---------- timeline momen (opsional, Premium & Eksklusif) ---------- */
  const timelineSection = document.getElementById("timelineRSection");
  const timelineList = document.getElementById("timelineRList");
  if (CFG.timelineAktif && Array.isArray(CFG.timeline) && timelineList) {
    timelineList.innerHTML = "";
    CFG.timeline.forEach((item) => {
      const div = document.createElement("div");
      div.className = "timeline-r-item";
      div.innerHTML = `
        <h3>${escapeHtml(item.judul || "")}</h3>
        <span class="timeline-r-date">${escapeHtml(item.tanggal || "")}</span>
        <p>${escapeHtml(item.cerita || "")}</p>
      `;
      timelineList.appendChild(div);
    });
  } else if (timelineSection) {
    timelineSection.hidden = true;
  }

  /* ---------- alasan/wishes tambahan (opsional, Premium & Eksklusif) ---------- */
  const reasonsSection = document.getElementById("reasonsRSection");
  const reasonsList = document.getElementById("reasonsRList");
  if (CFG.reasonsAktif && Array.isArray(CFG.alasanList) && reasonsList) {
    setText("reasonsRTitle", CFG.judulAlasan);
    reasonsList.innerHTML = "";
    CFG.alasanList.forEach((alasan) => {
      const li = document.createElement("li");
      li.textContent = alasan;
      reasonsList.appendChild(li);
    });
  } else if (reasonsSection) {
    reasonsSection.hidden = true;
  }

  /* ---------- video (opsional, Premium & Eksklusif) ---------- */
  const videoSection = document.getElementById("videoRSection");
  const videoEl = document.getElementById("videoRPlayer");
  if (CFG.videoAktif && CFG.videoFile && videoEl) {
    const source = document.createElement("source");
    source.src = CFG.videoFile;
    source.type = "video/mp4";
    videoEl.appendChild(source);
  } else if (videoSection) {
    videoSection.hidden = true;
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
      setupTimelineReveal();

      if (CFG.musikAktif && bgMusic) {
        bgMusic.play().catch(() => {
          /* autoplay diblokir browser, pengguna bisa klik tombol musik manual */
        });
      }
    });
  }

  /* ---------- ambient background: berjalan terus dari awal halaman ---------- */
  startAmbientBackground(CFG.backgroundEffect);

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined) el.textContent = value;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function revealTextLines() {
    const lines = document.querySelectorAll(".reveal-line");
    lines.forEach((line, index) => {
      setTimeout(() => line.classList.add("visible"), index * 250);
    });
  }

  /* reveal timeline item saat discroll ke pandangan */
  function setupTimelineReveal() {
    const items = document.querySelectorAll(".timeline-r-item");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((el) => observer.observe(el));
  }

  /* =========================================================
     AMBIENT BACKGROUND — animasi bergerak terus-menerus,
     jenisnya beda tiap tema lewat config.js (backgroundEffect).
     tipe yang didukung: "bubbles", "sparkle", "shimmer",
     "stars", "petals", "confetti-soft".
     ========================================================= */
  function startAmbientBackground(bgConfig) {
    const cfg = bgConfig || {};
    if (cfg.aktif === false || !cfg.tipe) return;

    const canvas = document.getElementById("ambientCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const colors = cfg.warna || ["#C9A24B", "#E7C97A", "#F7F1E6"];
    const total = cfg.jumlah || 40;
    const tipe = cfg.tipe;

    const particles = [];
    for (let i = 0; i < total; i++) {
      particles.push(makeParticle());
    }

    function makeParticle() {
      const base = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      if (tipe === "bubbles") {
        return Object.assign(base, {
          size: Math.random() * 14 + 6,
          speedY: -(Math.random() * 0.5 + 0.2),
          speedX: Math.random() * 0.3 - 0.15,
          alpha: Math.random() * 0.35 + 0.15,
        });
      }
      if (tipe === "petals") {
        return Object.assign(base, {
          size: Math.random() * 6 + 4,
          speedY: Math.random() * 0.5 + 0.25,
          speedX: Math.random() * 0.4 - 0.2,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 0.8 - 0.4,
          alpha: Math.random() * 0.3 + 0.35,
        });
      }
      if (tipe === "shimmer") {
        return Object.assign(base, {
          size: Math.random() * 3 + 1.5,
          speedY: -(Math.random() * 0.3 + 0.1),
          speedX: 0,
          alpha: Math.random() * 0.5 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
      if (tipe === "stars") {
        return Object.assign(base, {
          size: Math.random() * 2 + 1,
          speedY: 0,
          speedX: 0,
          alpha: Math.random() * 0.6 + 0.2,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
      /* default: confetti-soft / sparkle */
      return Object.assign(base, {
        size: Math.random() * 5 + 3,
        speedY: Math.random() * 0.6 + 0.2,
        speedX: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 1 - 0.5,
        alpha: Math.random() * 0.4 + 0.25,
      });
    }

    let shootingStar = null;
    function maybeSpawnShootingStar() {
      if (tipe === "stars" && !shootingStar && Math.random() < 0.003) {
        shootingStar = {
          x: Math.random() * canvas.width * 0.5,
          y: Math.random() * canvas.height * 0.3,
          speedX: 6,
          speedY: 3,
          life: 40,
        };
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.rotation !== undefined) p.rotation += p.rotationSpeed;
        if (p.twinklePhase !== undefined) p.twinklePhase += p.twinkleSpeed;

        if (p.y < -20) p.y = canvas.height + 10;
        if (p.y > canvas.height + 20) p.y = -10;
        if (p.x < -20) p.x = canvas.width + 10;
        if (p.x > canvas.width + 20) p.x = -10;

        const alpha = p.twinklePhase !== undefined
          ? p.alpha * (0.5 + 0.5 * Math.sin(p.twinklePhase))
          : p.alpha;

        ctx.save();
        ctx.globalAlpha = Math.max(alpha, 0);
        ctx.translate(p.x, p.y);
        if (p.rotation !== undefined) ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (tipe === "petals") {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else if (tipe === "shimmer" || tipe === "stars") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (tipe === "bubbles") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        }
        ctx.restore();
      });

      maybeSpawnShootingStar();
      if (shootingStar) {
        const s = shootingStar;
        ctx.save();
        ctx.strokeStyle = "rgba(247,241,230,0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.speedX * 8, s.y - s.speedY * 8);
        ctx.stroke();
        ctx.restore();
        s.x += s.speedX * 6;
        s.y += s.speedY * 6;
        s.life--;
        if (s.life <= 0 || s.x > canvas.width || s.y > canvas.height) shootingStar = null;
      }

      requestAnimationFrame(draw);
    }
    draw();
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
