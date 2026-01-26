# Dokumentasi Keamanan Cloudflare (Firewall Rules)

### 1. Rule 1: HTTP Method Filtering

- **Nama Rule**: Block Bad Requests
- **Filter**: `(http.request.method not in {"GET" "POST" "OPTIONS"})`
- **Aksi**: Block
- **Deskripsi**:
  Aturan ini memastikan bahwa server hanya merespons metode HTTP yang diperlukan oleh aplikasi.
  - **GET**: Untuk memuat halaman statis.
  - **POST**: Untuk mengirimkan data chat dari WebApp ke n8n.
  - **OPTIONS**: Untuk mendukung mekanisme CORS (Cross-Origin Resource Sharing).
    Semua permintaan dengan metode lain (seperti PUT, DELETE, TRACE) akan diblokir secara otomatis untuk mencegah serangan manipulasi data.

### 2. Rule 2: Whitelisted Origins Only

- **Nama Rule**: Trusted Referer Enforcement
- **Filter**:
  `(http.request.uri.path contains "/api/chat" and not http.referer in {"https://kevvy.vercel.app/" "https://chat.kevvy.my.id/"})`
- **Aksi**: Block
- **Tujuan**: Mengamankan endpoint API dari penggunaan tidak sah oleh pihak luar. Hanya permintaan yang berasal dari domain frontend resmi yang diizinkan untuk berinteraksi dengan AI.

---

_Dokumentasi ini dibuat sebagai bagian dari Laporan Akhir Proyek RAG - Project Progress 6._
