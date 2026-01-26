# Project RAG - AI Chatbot

> 🚀 **Live Demo:** [**Klik Disini untuk Mencoba Chatbot**](https://kevvy.vercel.app/)

Repositori ini berisi dokumentasi lengkap pengembangan proyek **Retrieval Augmented Generation (RAG)** Chatbot.
Mencakup setup infrastruktur (Docker & Cloudflare), orkestrasi workflow AI (n8n), integrasi Database Vektor (Pinecone), hingga deployment WebApp frontend.

---

## ✔ Progress Status

- [x] **Progress 1 — Setup Infrastruktur Dasar**
- [x] **Progress 2 — Workflow Telegram Chatbot (Basic LLM)**
- [x] **Progress 3 — WebApp Chatbot (Local & Vercel)**
- [x] **Progress 4 — Embedding & Pinecone**
- [x] **Progress 5 — Integrasi RAG (PDF Intelligence)**
- [x] **Progress 6 — Cloudflare Tunnel & Security**

---

## 📸 Bukti & Dokumentasi

### Progress 6: Cloudflare Tunnel & Network Security

_Migrasi infrastruktur dari Ngrok ke Cloudflare Tunnel (Zero Trust) untuk stabilitas koneksi, penggunaan domain kustom (`.my.id`), serta peningkatan keamanan dengan Firewall (WAF)._

| No  | Screenshot                         | Deskripsi                                                                                           |
| --- | ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1   | `p6-cloudflare-analytics.png`      | Laporan trafik yang menunjukkan filter keamanan bekerja pada jaringan Cloudflare.                   |
| 2   | `p6-cloudflare-tunnel-healthy.png` | Dashboard Zero Trust menunjukkan Tunnel aktif menghubungkan port `3000` (Node.js) dan `5678` (n8n). |
| 3   | `p6-cloudflare-waf-rules.png`      | **Bukti Keamanan:** Konfigurasi WAF untuk Method Filtering dan Trusted Origin Validation.           |
| 4   | `p6-routing-configuration.png`     | Konfigurasi Public Hostname: `n8n.kevvy.my.id` (Admin) dan `chat.kevvy.my.id` (User Access).        |
| 5   | `p6-waf-block-evidence.png`        | Bukti sistem memblokir akses langsung (unauthorized) ke API chat sesuai aturan firewall.            |

> **Catatan Teknis :**
>
> - **Infrastruktur:** Menggantikan Ngrok dengan **Cloudflare Tunnel (`cloudflared`)** dalam Docker untuk koneksi terenkripsi tanpa ekspos port publik secara terbuka.
> - **Secure Proxy:** Menggunakan Node.js Express sebagai layer perantara untuk menyembunyikan endpoint webhook n8n yang asli.
> - **Whitelisted Origins:** Menerapkan **Referer Validation** pada WAF; hanya permintaan dari domain resmi (Vercel & Chat Domain) yang diizinkan.

---

### Progress 5: Integrasi Total (RAG Chatbot)

_Menghubungkan Telegram Chatbot dan WebApp dengan database Pinecone sehingga AI menjawab berdasarkan referensi dokumen._

| No  | Screenshot                                 | Deskripsi                                                                        |
| --- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| 1   | `p5-n8n-integration-workflow.png`          | Workflow final n8n (Telegram/Web Trigger -> Q&A Chain -> Pinecone & Groq LLM).   |
| 2   | `p5-telegram-integration-chat-success.png` | Bukti chatbot Telegram menjawab pertanyaan spesifik berdasarkan isi dokumen PDF. |
| 3   | `p5-webapp-integration-chat-success.png`   | Bukti WebApp menjawab pertanyaan spesifik berdasarkan isi dokumen PDF.           |

> **Catatan Teknis:** Menggunakan logika `Question and Answer Chain` untuk menggabungkan konteks vektor dari Pinecone ke dalam prompt sistem model Groq secara otomatis sebelum menjawab user.

---

### Progress 4: Embedding & Pinecone (RAG Ingestion)

_Implementasi pipeline ETL (Extract, Transform, Load) untuk dokumen PDF ke Vector Database._

| No  | Screenshot                          | Deskripsi                                                                                                 |
| --- | ----------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 1   | `p4-n8n-embedding-output.png`       | Output node Gemini di n8n menampilkan data teks yang telah dikonversi menjadi array vektor.               |
| 2   | `p4-n8n-rag-ingestion-workflow.png` | Workflow Ingestion: Google Drive (Source) → Text Splitter → Gemini Embedding → Pinecone.                  |
| 3   | `p4-pinecone-dashboard.png`         | **Bukti Utama:** Dashboard Pinecone menunjukkan _Record Count_ bertambah (data vektor berhasil disimpan). |

> **Catatan Teknis:** Menggunakan **Google Gemini Embedding** (`models/embedding-004`) untuk konversi teks ke vektor 768 dimensi, dan **Pinecone** sebagai Vector Database Serverless.

---

### Progress 3: WebApp Chatbot & Deployment

_Implementasi antarmuka web (Frontend) yang terhubung ke n8n melalui Webhook._

**🔗 Link:** [Buka WebApp](https://kevvy.vercel.app/)

| No  | Screenshot                    | Deskripsi                                                          |
| --- | ----------------------------- | ------------------------------------------------------------------ |
| 1   | `p3-n8n-webhook-workflow.png` | Workflow n8n (Webhook Trigger → AI Agent → Webhook Response).      |
| 2   | `p3-vercel-deployment.png`    | Tampilan WebApp saat diakses melalui domain publik Vercel.         |
| 3   | `p3-webapp-chat-success.png`  | Bukti WebApp berhasil mengirim pesan dan menerima balasan dari AI. |

> **Catatan Teknis:** Frontend dibangun menggunakan Vanilla JS (Fetch API) dan di-hosting di Vercel. Backend logika berjalan di n8n lokal yang diekspos ke publik.

---

### Progress 2: Workflow Telegram & Groq AI

_Implementasi chatbot Telegram yang terhubung dengan Groq API (High-speed LLM)._

| No  | Screenshot                     | Deskripsi                                                                     |
| --- | ------------------------------ | ----------------------------------------------------------------------------- |
| 1   | `p2-n8n-workflow-full.png`     | Tampilan full workflow di n8n (Telegram Trigger → Groq AI → Telegram Output). |
| 2   | `p2-telegram-chat-success.png` | Bukti chatbot berhasil membalas pertanyaan user di Telegram.                  |

> **Catatan Teknis:** Menggunakan model **Groq (Llama 3)** sebagai alternatif OpenAI untuk inferensi yang jauh lebih cepat dan efisien.

---

### Progress 1: Setup Infrastruktur Dasar

_Instalasi tools development environment._

| No  | Screenshot                        | Deskripsi                                                              |
| --- | --------------------------------- | ---------------------------------------------------------------------- |
| 1   | `p1-docker-compose-installed.png` | Bukti `docker compose version` berhasil.                               |
| 2   | `p1-docker-environment-final.png` | Bukti semua "mesin" berjalan di latar belakang.                        |
| 3   | `p1-docker-installed.png`         | Bukti `docker --version` berhasil.                                     |
| 4   | `p1-git-installed.png`            | Bukti git berhasil di unduh                                            |
| 5   | `p1-n8n-running.png`              | Tampilan browser menunjukkan dashboard n8n berjalan di localhost:5678. |
| 6   | `p1-ngrok-running.png`            | Bukti ngrok berjalan                                                   |
| 7   | `p1-node-installed.png`           | Bukti node.js berhasil di unduh                                        |
| 5   | `p1-vscode-intalled.png`          | Bukti vs code berhasil di unduh                                        |

---

📁 **Lihat seluruh screenshot:** 👉 [screenshots/](screenshots/)

---

## 📁 Struktur Folder Project

```text
Project-RAG/
│
├── cloudflare/               # [NEW] Konfigurasi Tunnel & Keamanan
│   ├── tunnel-config.yaml    # Ingress routing n8n & webapp
│   └── firewall-rules.md     # Penjelasan teknis 2 Rule WAF
│
├── webapp/                   # Backend Proxy & Frontend
│   ├── server.js             # Express Proxy Server (Port 3000)
│   ├── Dockerfile            # Image build untuk webapp
│   └── public/               # Frontend (HTML, CSS, JS)
│
├── workflows/                # Backup Workflow n8n (.json)
│   ├── workflow-1-telegram.json
│   ├── workflow-2-webapp-rag.json
│   |── workflow-3-embedding.json
|   └── workflow-4-integration.json
│
├── screenshots/              # Kumpulan bukti screenshot progress 1-6
│
├── docker-compose.yaml       # Orchestrator (n8n, webapp, cloudflared)
└── README.md                 # Dokumentasi Project ini
```
