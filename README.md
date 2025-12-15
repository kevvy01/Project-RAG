# Project RAG

Repositori untuk project Retrieval Augmented Generation (RAG).
Berisi setup infrastruktur (Docker), workflow otomatisasi (n8n), serta dokumentasi progres pengembangan.

---

## ✔ Progress Status

- [x] **Progress 1 — Setup Infrastruktur Dasar**
- [x] **Progress 2 — Workflow Telegram Chatbot (Basic LLM)**
- [x] **Progress 3 — WebApp Chatbot (Local & Vercel)**
- [ ] Progress 4 — Embedding & Pinecone
- [ ] Progress 5 — Integrasi
- [ ] Progress 6 — Cloudflare

---

## 📸 Bukti & Dokumentasi

### Progress 3: WebApp Chatbot & Deployment
*Implementasi antarmuka web sederhana (HTML/CSS/JS) yang terhubung ke n8n melalui Webhook dan di-deploy menggunakan Vercel.*

| No | Screenshot | Deskripsi |
| --- | --- | --- |
| 1 | `webapp-chat-success.png` | Bukti WebApp berhasil mengirim pesan dan menerima balasan dari AI. |
| 2 | `vercel-deployment.png` | Tampilan WebApp saat diakses melalui domain publik Vercel. |
| 3 | `n8n-webhook-workflow.png` | Workflow n8n (Webhook Trigger → Gemini → Webhook Response). |

> **Catatan Teknis:** Frontend dibangun menggunakan Vanilla JS dan di-hosting di Vercel. Backend logika berjalan di n8n lokal yang diekspos menggunakan **Ngrok**.

### Progress 2: Workflow Telegram & Gemini AI
*Implementasi chatbot Telegram yang terhubung dengan Google Gemini API melalui n8n.*

| No | Screenshot | Deskripsi |
| --- | --- | --- |
| 1 | `telegram-chat-success.png` | Bukti chatbot berhasil membalas pertanyaan di Telegram. |
| 2 | `n8n-workflow-full.png` | Tampilan full workflow di n8n (Telegram Trigger → Gemini → Telegram Output). |
| 3 | `gemini-node-config.png` | (Opsional) Konfigurasi node Google Gemini di n8n. |

> **Catatan Teknis:** Menggunakan model **Google Gemini Pro** sebagai alternatif OpenAI untuk pemrosesan bahasa (LLM) dikarenakan efisiensi dan ketersediaan akses API.

### Progress 1: Setup Infrastruktur Dasar
*Instalasi tools wajib: Docker, Node.js, Git, n8n.*

| No | Screenshot | Deskripsi |
| --- | --- | --- |
| 1 | `docker-installed.png` | Bukti perintah `docker --version` berhasil — Docker terinstal. |
| 2 | `docker-compose-installed.png` | Bukti `docker compose version` berhasil — Docker Compose aktif. |
| 3 | `node-installed.png` | Bukti `node -v` & `npm -v` — Node.js & npm terinstal. |
| 4 | `git-installed.png` | Bukti `git --version` — Git terinstal. |
| 5 | `n8n-running.png` | Tampilan terminal atau browser menunjukkan n8n sedang berjalan. |
| 6 | `ngrok-running.png` | Terminal menunjukkan Ngrok berjalan dan menampilkan URL publik. |

📁 **Lihat seluruh screenshot:** 👉 [screenshots/](screenshots/)

---

## 📁 Struktur Folder

```text
RAG-Project/
│
├── webapp/                   # Frontend WebApp (Progress 3)
│   ├── image/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── workflows/                # Berisi file workflow n8n (.json)
│   ├── progress-2_telegram.json
│   └── progress-3_webapp.json
│
├── docs/                     # Dokumentasi dan laporan (.pdf / .docx)
│
├── screenshots/              # Bukti screenshot progress (png/jpg)
│
├── docker-compose.yaml       # Konfigurasi infrastruktur n8n
└── README.md                 # File ini