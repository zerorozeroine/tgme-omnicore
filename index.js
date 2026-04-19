const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

// INI BARIS YANG TADI BUNDA MAKSUD:
app.set('views', path.join(process.cwd(), 'views')); 
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// RUTE UTAMA
app.get('/', (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.error("Render Error:", error);
        res.status(500).send("Terjadi kesalahan pada sistem pusat.");
    }
});

// JALANKAN LOKAL
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🏛️  TGME OMNI-CORE V5.2 PWA: http://localhost:${PORT}`);
    });
}

// WAJIB UNTUK VERCEL
module.exports = app;