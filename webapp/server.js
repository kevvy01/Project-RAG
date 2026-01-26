const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors"); // 1. Tambahkan ini
const app = express();

app.use(cors()); // 2. Izinkan semua domain (Vercel) mengakses Node.js kamu

app.use(express.json());

// Melayani file statis dari folder public
app.use(express.static(path.join(__dirname, "public")));

// Endpoint API untuk Chat
app.post("/api/chat", async (req, res) => {
  try {
    // URL Webhook n8n kamu (Aman karena di sisi server)
    const n8nWebhookUrl = "https://n8n.kevvy.my.id/webhook/chat";

    const response = await axios.post(n8nWebhookUrl, {
      message: req.body.message,
    });

    // Teruskan jawaban dari n8n ke browser
    res.json(response.data);
  } catch (error) {
    console.error("Error n8n:", error.message);
    res.status(500).json({ error: "Gagal mendapatkan respon dari AI" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server WebApp jalan di http://localhost:${PORT}`);
});
