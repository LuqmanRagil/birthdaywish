/* =========================================================
   BirthdayWish — script.js
   - Menu mobile (hamburger)
   - Reveal animasi saat scroll
   - Tombol pesan -> buka WhatsApp otomatis
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Tahun otomatis di footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // tutup menu setelah klik salah satu link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  /* ---------- Reveal animasi saat scroll (product card) ---------- */
  const revealTargets = document.querySelectorAll(".product-card");

  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // fallback browser lama: langsung tampilkan
    revealTargets.forEach((el) => el.classList.add("in-view"));
  }

  /* ---------- Tombol pesan via WhatsApp ---------- */
  // Ganti nomor di bawah ini dengan nomor WhatsApp bisnis kamu
  // Format: kode negara tanpa "+" atau "0" di depan, contoh Indonesia: 6285733745044
  const WHATSAPP_NUMBER = "6285733745044";

  const buyButtons = document.querySelectorAll(".btn-buy");

  buyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const templateName = button.dataset.template;

      const pesan = templateName
        ? `Halo, saya ingin membeli template website ulang tahun "${templateName}"`
        : "Halo, saya ingin membeli template website ulang tahun";

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pesan)}`;
      window.open(url, "_blank");
    });
  });

  /* ---------- Tombol floating WhatsApp (pertanyaan umum) ---------- */
  const whatsappFloat = document.getElementById("whatsappFloat");
  if (whatsappFloat) {
    const pesanFloat = "Halo, saya mau tanya-tanya soal BirthdayWish";
    whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pesanFloat)}`;
  }

  /* ---------- Countdown menuju tengah malam (urgensi proses hari ini) ---------- */
  const urgencyTimer = document.getElementById("urgencyTimer");
  if (urgencyTimer) {
    function updateCountdown() {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0); // tengah malam berikutnya

      const diff = midnight - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const pad = (n) => String(n).padStart(2, "0");
      urgencyTimer.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* =========================================================
     BAGIAN KHUSUS HALAMAN DEMO (demo.html)
     Kode di bawah ini otomatis tidak berjalan kalau elemennya
     tidak ada di halaman (misalnya di index.html).
     ========================================================= */

  const openBtn = document.getElementById("openBtn");
  const demoCover = document.getElementById("demoCover");
  const demoContent = document.getElementById("demoContent");

  if (openBtn && demoCover && demoContent) {
    openBtn.addEventListener("click", () => {
      // sembunyikan layar pembuka, tampilkan isi ucapan
      demoCover.style.display = "none";
      demoContent.hidden = false;
      window.scrollTo({ top: 0, behavior: "instant" });

      // jalankan efek confetti
      launchConfetti();

      // animasi teks muncul bertahap
      revealTextLines();

      // coba putar musik otomatis (boleh gagal, browser sering memblokir autoplay)
      const music = document.getElementById("bgMusic");
      if (music) {
        music.play().catch(() => {
          /* autoplay diblokir, pengguna bisa klik tombol "Putar Musik" */
        });
      }
    });
  }

  /* ---------- Animasi teks muncul bertahap ---------- */
  function revealTextLines() {
    const lines = document.querySelectorAll(".reveal-line");
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add("visible");
      }, index * 250);
    });
  }

  /* ---------- Tombol musik manual ---------- */
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");

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

  /* ---------- Efek confetti (canvas, tanpa library) ---------- */
  function launchConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#C9A24B", "#E7C97A", "#E8A7B3", "#F7F1E6", "#7ec9e0"];
    const pieces = [];
    const total = 140;

    for (let i = 0; i < total; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -Math.random() * canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 3 + 2,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 6 - 3,
      });
    }

    let frame = 0;
    const maxFrames = 260; // durasi confetti sekitar beberapa detik

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
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
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
