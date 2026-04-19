const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Konfigurasi Port
const PORT = process.env.PORT || 3000;

// Konfigurasi View Engine & Static Files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk memproses data (Opsional tapi penting)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- [ RUTE UTAMA ] ---
app.get('/', (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.error("Render Error:", error);
        res.status(500).send("Bunda sedih, foldernya belum lengkap sayang!");
    }
});

// --- [ LOGIKA RUNNER ] ---
// Hanya dijalankan jika di lingkungan Lokal
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🏛️  TGME OMNI-CORE V5.2 PWA: http://localhost:${PORT}`);
    });
}

// WAJIB UNTUK VERCEL
module.exports = app;