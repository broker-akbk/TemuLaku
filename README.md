# TemuLaku
**Slogan:** Mempertemukan Harapan dengan Kesempatan

TemuLaku adalah prototipe website untuk mempertemukan pencari kerja dengan perusahaan, UMKM, toko/restoran, organisasi, dan pemberi kerja perorangan.

## File
- `index.html` — struktur halaman
- `style.css` — tema visual dan tata letak responsif
- `script.js` — pencarian, filter, detail lowongan, dan penyimpanan lowongan lokal

## Cara upload ke GitHub dari HP Android
1. Unduh `temulaku-final.zip` dan ekstrak di aplikasi File Manager.
2. Buka repositori GitHub, lalu pilih **Add file → Upload files**.
3. Upload `index.html`, `style.css`, `script.js`, dan `README.md` dari folder hasil ekstrak. Upload file-file itu ke root repositori (jangan hanya upload file ZIP).
4. Tekan **Commit changes**.
5. Buka **Settings → Pages**.
6. Pada **Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/(root)`, lalu **Save**.
7. Tunggu beberapa menit. Alamat situs akan muncul di bagian Pages, biasanya `https://USERNAME.github.io/NAMA-REPO/`.

## Yang sudah berfungsi dalam prototipe ini
- Form pencari kerja.
- Filter berdasarkan lokasi, bidang, dan pendidikan minimum sederhana.
- Detail lowongan.
- Form pemasangan lowongan.
- Lowongan yang ditambahkan muncul di daftar pada browser/perangkat yang sama.
- Penyimpanan lokal menggunakan `localStorage`.

## Batasan penting — sebelum diluncurkan untuk publik
Ini belum menjadi platform produksi. Data lowongan baru hanya disimpan pada browser/perangkat yang menambahkannya, sehingga belum dapat dilihat pengguna lain. Lowongan contoh diberi label **Contoh** dan bukan lowongan nyata. Kontak demo bukan kontak asli.

Agar benar-benar menjadi platform dua sisi yang bisa dipakai publik, perlu:
- backend dan database bersama (misalnya Supabase atau Firebase),
- autentikasi pencari kerja dan pemberi kerja,
- moderasi dan verifikasi lowongan serta pemberi kerja,
- perlindungan data pribadi, aturan privasi, syarat layanan, dan pelaporan penipuan,
- kontrol spam, validasi data, dan proses penghapusan akun/lowongan.

GitHub Pages hanya menghosting file statis; ia tidak menyediakan database/backend sendiri. Jangan gunakan data sensitif sungguhan pada prototipe ini.
