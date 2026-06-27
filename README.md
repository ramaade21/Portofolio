# Portfolio Ade Ramadona — Versi Statis (HTML/CSS/JS)

Ini adalah versi **statis** dari project Laravel `portfolio-laravel-ade-ramadona`,
dikonversi agar bisa langsung di-host di **GitHub Pages** (atau hosting statis
apa pun) tanpa perlu server PHP, database, atau proses build.

Tampilan & konten dibuat seakurat mungkin berdasarkan data asli di project
Laravel kamu (seeder profile, experience, skills, projects) dan desain asli
(warna cyan/glassmorphism, font Orbitron/Rajdhani/JetBrains Mono, custom
cursor, particle background, typing effect, dll).

## Isi folder

```
index.html   → halaman utama (semua section: hero, about, experience, skills, projects, contact)
style.css    → semua styling (port dari resources/css/app.css)
main.js      → semua interaksi (port dari resources/js/app.js + modules/*)
avatar.jpg   → foto profil kamu
```

## Cara upload ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `portfolio-ade`.
2. Upload keempat file di atas (`index.html`, `style.css`, `main.js`, `avatar.jpg`) ke root
   repository tersebut — bisa lewat web (Add file → Upload files) atau lewat
   git:
   ```bash
   git init
   git add index.html style.css main.js avatar.jpg
   git commit -m "Portfolio statis"
   git branch -M main
   git remote add origin https://github.com/USERNAME/portfolio-ade.git
   git push -u origin main
   ```
3. Di repository, buka **Settings → Pages**.
4. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu **Save**.
5. Tunggu 1–2 menit, situs akan tersedia di:
   `https://USERNAME.github.io/portfolio-ade`

Tidak perlu langkah build apa pun — file-file ini sudah siap pakai langsung
di browser.

## Catatan tentang perbedaan dari versi Laravel

Karena versi Laravel aslinya menggunakan database, dashboard admin, dan kirim
form kontak lewat backend, beberapa hal disesuaikan untuk versi statis ini:

- **Form kontak** tidak mengirim ke server (karena tidak ada backend). Saat
  disubmit, form akan membuka aplikasi email kamu (`mailto:`) dengan isi
  pesan yang sudah terisi otomatis. Kalau mau form yang benar-benar mengirim
  email tanpa backend sendiri, kamu bisa pakai layanan pihak ketiga seperti
  [Formspree](https://formspree.io) atau [Web3Forms](https://web3forms.com) —
  cukup ganti `action` pada elemen `<form id="contact-form">` di `index.html`.
- **Efek "buku" (flipbook)**: tombol "Lihat Profil" di hero membuka tampilan
  buku 9 halaman (cover, about, pendidikan, pengalaman, skill, tech stack,
  proyek, sertifikat, kontak) dengan animasi membalik halaman 3D — dibuat
  murni dengan CSS 3D transform + vanilla JS (tanpa library/CDN eksternal),
  supaya selalu jalan dengan andal di GitHub Pages tanpa risiko gagal load.
  Navigasi: tombol ‹ › di pojok kanan atas, keyboard (←/→/Esc), atau swipe
  di HP.
- **Avatar foto profil**: foto asli kamu (`avatar.jpg`, hasil crop dari CV) sudah
  terpasang di cover hero dan cover flipbook — pastikan file `avatar.jpg` ikut
  diupload ke repo GitHub kamu di folder yang sama dengan `index.html`, atau
  foto tidak akan muncul.
- **Tombol "Download CV"** dihapus dari hero karena belum ada file CV yang
  diupload di project asli. Kalau sudah punya file CV (PDF), upload filenya
  ke repository lalu tambahkan tombol link ke file tersebut.
- **Multi-bahasa (ID/EN)** tetap berfungsi lewat tombol di kanan atas — semua
  teks diterjemahkan langsung di browser (JavaScript), tanpa perlu route
  Laravel.
- **Tema gelap/terang** tersimpan di browser (localStorage), sama seperti
  versi aslinya.

## Mengedit konten

Semua teks dan data ada langsung di dalam `index.html` (tidak ada database).
Untuk mengubah pengalaman kerja, skill, atau proyek, cari section yang sesuai
di `index.html` (ditandai komentar seperti `<!-- ABOUT -->`, `<!-- EXPERIENCE -->`,
dst.) dan edit teksnya langsung.
