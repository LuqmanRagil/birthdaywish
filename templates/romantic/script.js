/* =========================================================
   BIRTHDAY ROMANTIC — script.js (self-contained)
   Membaca semua data dari config.js (window.CONFIG) dan
   merender ke dalam halaman. Jangan diedit saat memproses
   pesanan — cukup ubah config.js.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const CFG = window.CONFIG || {};

  /* ---------- mode Foto / Tanpa Foto (lewat ?foto=0 di URL) ---------- */
  const params = new URLSearchParams(window.location.search);
  const modeTanpaFoto = params.get("foto") === "0" || CFG.pakaiFoto === false;
  if (modeTanpaFoto) {
    document.body.classList.add("mode-tanpa-foto");
  }

  /* ============ 1. OPENING ============ */
  setText("openingName", CFG.namaPenerima);
  const openingBg = document.getElementById("openingBg");
  if (openingBg && CFG.fotoPembuka) openingBg.src = CFG.fotoPembuka;

  const btnPembuka = document.getElementById("openBtn");
  if (btnPembuka && CFG.tombolPembuka) btnPembuka.textContent = CFG.tombolPembuka;

  document.title = `Selamat Ulang Tahun, ${CFG.namaPenerima || ""}!`;

  typeLines(
    [
      { el: document.getElementById("openingLine1"), text: CFG.kalimatPembuka1 || "" },
      { el: document.getElementById("openingLine2"), text: CFG.kalimatPembuka2 || "" }
    ],
    30
  );

  /* ============ 2. HERO ============ */
  const heroPhoto = document.getElementById("heroPhoto");
  if (heroPhoto && CFG.fotoHero) heroPhoto.src = CFG.fotoHero;

  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle) {
    heroTitle.textContent = `${CFG.judulHero || "Happy Birthday"}, ${CFG.namaPenerima || ""} ❤️`;
  }
  const heroSub = document.getElementById("heroSub");
  if (heroSub) {
    heroSub.textContent = CFG.umur
      ? `${CFG.umur} ${CFG.subjudulHero || ""}`
      : (CFG.subjudulHero || "");
  }

  /* ============ 3. LOVE LETTER ============ */
  setText("letterOpening", CFG.suratPembuka);
  const letterBody = document.getElementById("letterBody");
  if (letterBody && Array.isArray(CFG.suratIsi)) {
    letterBody.innerHTML = "";
    CFG.suratIsi.forEach((paragraf) => {
      const p = document.createElement("p");
      p.className = "reveal-line";
      p.textContent = paragraf;
      letterBody.appendChild(p);
    });
  }
  const letterNextBtn = document.getElementById("letterNextBtn");
  if (letterNextBtn) {
    letterNextBtn.addEventListener("click", () => {
      const target = document.getElementById("timelineSection");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* ============ 4. TIMELINE ============ */
  const timelineList = document.getElementById("timelineList");
  if (timelineList && Array.isArray(CFG.timeline)) {
    timelineList.innerHTML = "";
    CFG.timeline.forEach((item) => {
      const div = document.createElement("div");
      div.className = "timeline-item";
      div.innerHTML = `
        ${item.foto ? `<img src="${item.foto}" alt="${item.judul || ""}" class="timeline-photo" loading="lazy">` : ""}
        <h3>${escapeHtml(item.judul || "")}</h3>
        <span class="timeline-date">${escapeHtml(item.tanggal || "")}</span>
        <p>${escapeHtml(item.cerita || "")}</p>
      `;
      timelineList.appendChild(div);
    });
  }

  /* ============ 5. GALERI FOTO (polaroid + lightbox) ============ */
  const polaroidGrid = document.getElementById("polaroidGrid");
  if (polaroidGrid && Array.isArray(CFG.galeriFoto)) {
    polaroidGrid.innerHTML = "";
    CFG.galeriFoto.forEach((src, i) => {
      const div = document.createElement("div");
      div.className = "polaroid";
      div.innerHTML = `<img src="${src}" alt="Foto kenangan ${i + 1}" loading="lazy">`;
      div.addEventListener("click", () => openLightbox(src));
      polaroidGrid.appendChild(div);
    });
  }

  /* ============ 6. REASONS WHY I LOVE YOU ============ */
  setText("reasonsTitle", CFG.judulAlasan);
  const reasonsList = document.getElementById("reasonsList");
  if (reasonsList && Array.isArray(CFG.alasanCinta)) {
    reasonsList.innerHTML = "";
    CFG.alasanCinta.forEach((alasan) => {
      const li = document.createElement("li");
      li.textContent = alasan;
      reasonsList.appendChild(li);
    });
  }

  /* ============ 7. WISHES / DOA ============ */
  setText("wishesText", CFG.doaUcapan);

  /* ============ 8. SURPRISE SECTION ============ */
  const secretBtn = document.getElementById("secretBtn");
  const secretMessage = document.getElementById("secretMessage");
  if (secretBtn && CFG.tombolRahasia) secretBtn.textContent = CFG.tombolRahasia;

  if (secretBtn && secretMessage) {
    secretBtn.addEventListener("click", () => {
      setText("secretMessageText", CFG.pesanRahasia);
      secretMessage.hidden = false;
      launchFireworks();
    }, { once: true });
  }

  /* ============ 9. MUSIC PLAYER ============ */
  const musicPlayer = document.getElementById("musicPlayer");
  const musicCover = document.getElementById("musicCover");
  const musicTitle = document.getElementById("musicTitle");
  const musicArtist = document.getElementById("musicArtist");
  const musicToggleBtn = document.getElementById("musicToggleBtn");
  const bgMusic = document.getElementById("bgMusic");

  if (CFG.musikAktif && musicPlayer) {
    musicPlayer.hidden = false;
    if (musicCover && CFG.musikCover) musicCover.src = CFG.musikCover;
    setText("musicTitle", CFG.musikJudul);
    setText("musicArtist", CFG.musikArtis);
    if (bgMusic && CFG.musikFile) {
      const source = document.createElement("source");
      source.src = CFG.musikFile;
      source.type = "audio/mpeg";
      bgMusic.appendChild(source);
    }
  }

  if (musicToggleBtn && bgMusic) {
    musicToggleBtn.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
        musicToggleBtn.textContent = "❚❚";
        musicPlayer.classList.add("playing");
      } else {
        bgMusic.pause();
        musicToggleBtn.textContent = "▶";
        musicPlayer.classList.remove("playing");
      }
    });
  }

  /* ============ 10. CLOSING ============ */
  setText("closingText", CFG.penutupTeks);
  setText("closingSubtext", CFG.penutupSubteks);
  setText("closingSender", CFG.pengirim);
  setText("closingDate", CFG.tanggalDibuat);

  const footerCtaBtn = document.getElementById("footerCtaBtn");
  if (footerCtaBtn) {
    footerCtaBtn.addEventListener("click", () => {
      const nomor = CFG.nomorWhatsapp || "6285733745044";
      const pesan = CFG.pesanWhatsapp || "Halo, saya ingin membuat website ucapan seperti ini";
      window.open(`https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`, "_blank");
    });
  }

  /* ============ BUKA KEJUTAN (opening -> content) ============ */
  const opening = document.getElementById("opening");
  const content = document.getElementById("content");

  if (btnPembuka && opening && content) {
    btnPembuka.addEventListener("click", () => {
      opening.style.display = "none";
      content.hidden = false;
      window.scrollTo({ top: 0, behavior: "instant" });

      revealHeroLines();
      startPetals();

      if (CFG.musikAktif && bgMusic) {
        bgMusic.play().then(() => {
          musicToggleBtn.textContent = "❚❚";
          musicPlayer.classList.add("playing");
        }).catch(() => {
          /* autoplay diblokir browser, pengguna bisa klik tombol musik manual */
        });
      }
    });
  }

  /* ============ Reveal animasi umum (scroll-triggered) ============ */
  setupScrollReveal();

  /* ============ Ambient background (berjalan sejak awal halaman) ============ */
  startAmbientBackground(CFG.backgroundEffect);

  /* =========================================================
     FUNGSI BANTUAN
     ========================================================= */

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value !== undefined) el.textContent = value;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  /* efek mengetik untuk beberapa baris teks berurutan */
  function typeLines(lines, speed) {
    let lineIndex = 0;

    function typeNext() {
      if (lineIndex >= lines.length) return;
      const { el, text } = lines[lineIndex];
      if (!el) { lineIndex++; typeNext(); return; }

      el.classList.add("typing-cursor");
      let charIndex = 0;

      const interval = setInterval(() => {
        el.textContent = text.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex >= text.length) {
          clearInterval(interval);
          el.classList.remove("typing-cursor");
          lineIndex++;
          setTimeout(typeNext, 400);
        }
      }, speed);
    }

    typeNext();
  }

  /* reveal judul & subjudul hero begitu konten dibuka */
  function revealHeroLines() {
    const lines = document.querySelectorAll(".hero-r .reveal-line");
    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add("visible"), i * 300 + 200);
    });
  }

  /* reveal umum berbasis scroll: surat, timeline, closing, dll */
  function setupScrollReveal() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal-line, .timeline-item").forEach((el) => {
        el.classList.add("visible", "in-view");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              entry.target.classList.contains("timeline-item") ? "in-view" : "visible"
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".letter-body .reveal-line, .closing-section .reveal-line, .timeline-item").forEach((el) => {
      observer.observe(el);
    });
  }

  /* kelopak bunga jatuh di hero section (ambient, terus berjalan) */
  /* kelopak bunga ambient melayang di SELURUH halaman (bukan cuma hero) */
  function startAmbientBackground(bgConfig) {
    const cfg = bgConfig || {};
    if (cfg.aktif === false) return;

    const canvas = document.getElementById("ambientCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const colors = cfg.warna || ["#E8A7B3", "#E7C97A"];
    const total = cfg.jumlah || 20;

    const petals = [];
    for (let i = 0; i < total; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 0.5 + 0.25,
        speedX: Math.random() * 0.4 - 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 0.8 - 0.4,
        alpha: Math.random() * 0.3 + 0.35,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height + 10) { p.y = -10; p.x = Math.random() * canvas.width; }
        if (p.y < -10) p.y = canvas.height + 10;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  function startPetals() {
    const canvas = document.getElementById("petalCanvas");
    if (!canvas) return;
    const hero = canvas.closest(".hero-r");
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const petals = [];
    for (let i = 0; i < 26; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 5,
        speedY: Math.random() * 0.6 + 0.4,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 1 - 0.5,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = "rgba(232,167,179,0.75)";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(draw);
    }
    draw();
  }

  /* efek kembang api untuk surprise section */
  function launchFireworks() {
    const canvas = document.getElementById("fxCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#E7C97A", "#E8A7B3", "#F7F1E6", "#C9A24B"];
    let particles = [];

    function burst(x, y) {
      const count = 46;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 4 + 2;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 60,
        });
      }
    }

    burst(canvas.width * 0.3, canvas.height * 0.35);
    setTimeout(() => burst(canvas.width * 0.7, canvas.height * 0.3), 300);
    setTimeout(() => burst(canvas.width * 0.5, canvas.height * 0.45), 600);

    let frame = 0;
    function animate() {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 1;

        ctx.globalAlpha = Math.max(p.life / 60, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      particles = particles.filter((p) => p.life > 0);

      if (frame < 200) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    animate();
  }

  /* lightbox sederhana untuk galeri foto */
  function openLightbox(src) {
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML = `
      <button class="lightbox-close" aria-label="Tutup">&times;</button>
      <img src="${src}" alt="Foto kenangan diperbesar">
    `;
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay || e.target.classList.contains("lightbox-close")) {
        overlay.remove();
      }
    });
    document.body.appendChild(overlay);
  }

});
