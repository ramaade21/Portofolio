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
```

## Cara upload ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `portfolio-ade`.
2. Upload ketiga file di atas (`index.html`, `style.css`, `main.js`) ke root
   repository tersebut — bisa lewat web (Add file → Upload files) atau lewat
   git:
   ```bash
   git init
   git add index.html style.css main.js
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
- **Avatar foto profil**: di data aslinya avatar belum diupload (masih `null`,
  diisi lewat dashboard admin), jadi versi statis ini menampilkan inisial
  "AR" sebagai pengganti foto. Kalau kamu punya foto, tinggal ganti elemen
  `<span class="font-display"...>AR</span>` di bagian hero dengan tag
  `<img src="foto-kamu.jpg">`.
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
