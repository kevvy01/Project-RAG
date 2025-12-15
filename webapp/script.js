const WEBHOOK_URL = "https://unethical-tamica-prefriendly.ngrok-free.dev/webhook/chat"; 

// --- 1. CONFIG & STATE ---
let chatHistoryData = JSON.parse(localStorage.getItem('chatHistory')) || [];
let isFirstChat = chatHistoryData.length === 0;

// --- 2. ON LOAD EVENT ---
window.onload = function() {
    if (!isFirstChat) {
        aktifkanModeChat();
        chatHistoryData.forEach(item => {
            renderBubble(item.text, item.sender, false);
        });
    }
};

// --- 3. CORE FUNCTIONS ---
async function kirimPesan() {
    const inputField = document.getElementById('userInput');
    const txt = inputField.value;

    if (txt.trim() === "") return;

    if (isFirstChat) {
        aktifkanModeChat();
        isFirstChat = false;
    }

    renderBubble(txt, 'user', true);
    inputField.value = ''; 

    const loadingId = renderBubble("Thinking...", 'bot', false, true);

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: txt })
        });

        const data = await response.json();
        const reply = data.reply || data.text || data.output || JSON.stringify(data);

        const bubbleLoading = document.getElementById(loadingId);
        if (bubbleLoading) {
            bubbleLoading.innerText = reply;
            bubbleLoading.removeAttribute('id'); 
            simpanKeStorage('bot', reply);
        }

    } catch (error) {
        console.error(error);
        const bubbleLoading = document.getElementById(loadingId);
        if(bubbleLoading) bubbleLoading.innerText = "Error: Gagal terhubung.";
    }
}

function renderBubble(text, sender, saveToStorage = true, isLoading = false) {
    const wadah = document.getElementById('chatHistory');
    const div = document.createElement('div');
    
    div.className = `bubble ${sender}`;
    div.innerText = text;
    
    if (isLoading) div.id = 'loading-' + Date.now();

    wadah.appendChild(div);
    wadah.scrollTop = wadah.scrollHeight;

    if (saveToStorage) {
        simpanKeStorage(sender, text);
    }

    return div.id;
}

function simpanKeStorage(sender, text) {
    chatHistoryData.push({ sender: sender, text: text });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistoryData));
}

function hapusHistory() {
    localStorage.removeItem('chatHistory');
    location.reload(); 
}

function aktifkanModeChat() {
    const card = document.getElementById('mainCard');
    card.classList.remove('initial-view');
    card.classList.add('active-view');

    const welcome = document.getElementById('welcomeText');
    if(welcome) welcome.style.display = 'none';

    const inputField = document.getElementById('userInput');
    inputField.placeholder = "Ketik pesan...";
    inputField.style.textAlign = "left"; 
    
    // Pastikan header muncul
    document.querySelector('.header').style.display = 'flex';
}

document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        kirimPesan();
    }
});