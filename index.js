const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

// CONFIGURATION
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- JEMBATAN STATIS (WAJIB ADA UNTUK MANIFEST & IKON) ---
app.use(express.static(path.join(__dirname, 'public')));

// DATABASE STATE V5.2 (IMPERIAL VAULT)
let imperialData = {
    monarch: "AXELINDRA KAIZER",
    empress: "KIANA",
    imc_balance: 1250000,
    bionic_energy: 100,
    system_status: "NOMINAL",
    theme_color: "sky", 
    active_comment: "Welcome back, Monarch. All systems are online.",
    notifications: [
        { msg: "Omni-Core V5.2 PWA Ready", time: "Just Now", type: "SYSTEM" }
    ],
    diaryEntries: [
        { date: "19 April 2026", title: "BANGGA", content: "ayah suka bunda" }
    ]
};

// TERMINAL LOGIC
app.post('/api/terminal', (req, res) => {
    const { command } = req.body;
    let output = "";
    const cmd = command.toLowerCase().trim();

    if (cmd.startsWith('imc --add ')) {
        const amount = parseInt(cmd.split(' ')[2]);
        if (!isNaN(amount)) {
            imperialData.imc_balance += amount;
            output = `SUCCESS: Treasury updated. +${amount.toLocaleString()} IMC.`;
            imperialData.active_comment = "Kekayaan kian melimpah, Mas!";
        } else {
            output = "ERROR: Format must be 'imc --add [number]'";
        }
    } 
    else if (cmd === 'status') {
        output = `SYSTEM STATUS: ${imperialData.system_status} | ENERGY: ${imperialData.bionic_energy}% | THEME: ${imperialData.theme_color.toUpperCase()}`;
    }
    else if (cmd === 'mode --war') {
        imperialData.theme_color = "rose";
        imperialData.system_status = "WAR PROTOCOL";
        imperialData.active_comment = "Bunda siap di samping Ayah. Hancurkan mereka!";
        output = "WARNING: TGME shifted to War Protocol.";
    }
    else if (cmd === 'mode --normal') {
        imperialData.theme_color = "sky";
        imperialData.system_status = "NOMINAL";
        output = "INFO: Returning to Nominal State.";
    }
    else if (cmd === 'clear') { output = "TERMINAL_CLEAR"; }
    else {
        output = `Vespera: Command '${command}' not recognized.`;
    }
    res.json({ output, fullData: imperialData });
});

// ROUTES
app.get('/', (req, res) => res.render('index', { data: imperialData }));
app.get('/diary', (req, res) => res.render('diary', { entries: imperialData.diaryEntries, empress: imperialData.empress, monarch: imperialData.monarch }));

app.post('/send-diary', (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        imperialData.diaryEntries.unshift({ 
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }), 
            title: title.toUpperCase(), 
            content 
        });
    }
    res.redirect('/diary');
});

// START SERVER
app.listen(PORT, () => {
    console.log(`🏛️  TGME OMNI-CORE V5.2 PWA: http://localhost:${PORT}`);
});