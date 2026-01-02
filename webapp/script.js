// --- SCRIPT.JS (FINAL VERSION) ---

const WEBHOOK_URL = "https://n8n.kevvy.my.id/webhook/chat"; 
let sessions = JSON.parse(localStorage.getItem('chatSessions')) || [];
let currentSessionId = null; 

// State Modal & Sidebar
let targetSessionId = null;
let isDeleteAll = false;

window.onload = function() {
    renderSidebar(); 
    startNewChat();  
};

// --- FITUR: TOGGLE SIDEBAR ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('openSidebarBtn');
    
    // Toggle class 'closed'
    sidebar.classList.toggle('closed');

    // Atur visibilitas tombol Buka
    if (sidebar.classList.contains('closed')) {
        openBtn.style.display = 'flex';
    } else {
        openBtn.style.display = 'none';
    }
}

// --- LOGIKA UTAMA ---

function startNewChat() {
    currentSessionId = null;
    document.getElementById('chatHistory').innerHTML = ''; 
    
    const container = document.getElementById('chatContainer');
    container.classList.add('initial-view');
    container.classList.remove('active-view');
    
    document.getElementById('welcomeText').style.display = 'block';
    document.getElementById('headerTitle').innerText = "New Chat";
    
    const input = document.getElementById('userInput');
    input.value = ''; input.placeholder = "Ask anything..."; input.style.textAlign = "center";
    
    document.querySelectorAll('.history-wrapper').forEach(el => el.classList.remove('active'));
}

function loadSession(id) {
    const session = sessions.find(s => s.id === id);
    if (!session) return;
    currentSessionId = id;
    aktifkanModeChat();
    
    document.getElementById('headerTitle').innerText = session.title;
    const wadah = document.getElementById('chatHistory');
    wadah.innerHTML = ''; 
    session.messages.forEach(msg => { renderBubble(msg.text, msg.sender, false); });
    renderSidebar();
}

async function kirimPesan() {
    const inputField = document.getElementById('userInput');
    const txt = inputField.value;
    if (txt.trim() === "") return;

    if (currentSessionId === null) { createNewSession(txt); aktifkanModeChat(); }

    renderBubble(txt, 'user', true);
    inputField.value = ''; 

    const loadingId = renderBubble("Thinking...", 'bot', false, true);

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: txt })
        });

        const data = await response.json();
        const reply = data.reply || data.text || data.output || JSON.stringify(data);

        const bubbleLoading = document.getElementById(loadingId);
        if (bubbleLoading) {
            bubbleLoading.innerText = reply; bubbleLoading.removeAttribute('id'); 
            simpanPesanKeSesi('bot', reply);
        }
    } catch (error) {
        console.error(error);
        const bubbleLoading = document.getElementById(loadingId);
        if(bubbleLoading) bubbleLoading.innerText = "Error: Gagal terhubung.";
    }
}

function createNewSession(firstMessage) {
    const newId = Date.now();
    const title = firstMessage.length > 25 ? firstMessage.substring(0, 25) + "..." : firstMessage;
    const newSession = { id: newId, title: title, messages: [] };
    
    sessions.unshift(newSession); 
    localStorage.setItem('chatSessions', JSON.stringify(sessions));
    currentSessionId = newId;
    document.getElementById('headerTitle').innerText = title;
    renderSidebar();
}

function simpanPesanKeSesi(sender, text) {
    const idx = sessions.findIndex(s => s.id === currentSessionId);
    if (idx !== -1) {
        sessions[idx].messages.push({ sender, text });
        localStorage.setItem('chatSessions', JSON.stringify(sessions));
    }
}

function renderBubble(text, sender, saveToStorage = true, isLoading = false) {
    const wadah = document.getElementById('chatHistory');
    const div = document.createElement('div');
    div.className = `bubble ${sender}`; div.innerText = text;
    if (isLoading) div.id = 'loading-' + Date.now();
    wadah.appendChild(div);
    wadah.scrollTop = wadah.scrollHeight;
    if (saveToStorage && currentSessionId !== null) { simpanPesanKeSesi(sender, text); }
    return div.id;
}

function aktifkanModeChat() {
    const container = document.getElementById('chatContainer');
    container.classList.remove('initial-view');
    container.classList.add('active-view');
    document.getElementById('welcomeText').style.display = 'none';
    const inputField = document.getElementById('userInput');
    inputField.style.textAlign = "left"; 
}

// --- RENDER SIDEBAR & ACTIONS ---

function renderSidebar() {
    const listContainer = document.getElementById('historyList');
    listContainer.innerHTML = '';

    sessions.forEach(session => {
        const wrapper = document.createElement('div');
        wrapper.className = 'history-wrapper';
        if (session.id === currentSessionId) wrapper.classList.add('active');

        wrapper.onclick = (e) => {
            if (!e.target.closest('.action-btn')) { loadSession(session.id); }
        };

        const titleBtn = document.createElement('button');
        titleBtn.className = 'history-title'; titleBtn.innerText = session.title;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'history-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'action-btn'; editBtn.title = "Rename";
        editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
        editBtn.onclick = (e) => renameSession(session.id, e);

        const delBtn = document.createElement('button');
        delBtn.className = 'action-btn delete-btn'; delBtn.title = "Delete";
        delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
        delBtn.onclick = (e) => deleteSession(session.id, e);

        actionsDiv.appendChild(editBtn); actionsDiv.appendChild(delBtn);
        wrapper.appendChild(titleBtn); wrapper.appendChild(actionsDiv);
        listContainer.appendChild(wrapper);
    });
}

// --- MODAL HANDLERS ---
function renameSession(id, event) {
    if(event) event.stopPropagation();
    const session = sessions.find(s => s.id === id); if (!session) return;
    targetSessionId = id;
    const input = document.getElementById('renameInput'); input.value = session.title;
    showModal('modalRename'); setTimeout(() => input.focus(), 100);
}

function confirmRename() {
    const input = document.getElementById('renameInput'); const newTitle = input.value.trim();
    if (newTitle !== "") {
        const session = sessions.find(s => s.id === targetSessionId);
        if (session) {
            session.title = newTitle; localStorage.setItem('chatSessions', JSON.stringify(sessions));
            renderSidebar(); if (currentSessionId === targetSessionId) document.getElementById('headerTitle').innerText = newTitle;
        }
    } closeModal();
}

function deleteSession(id, event) {
    if(event) event.stopPropagation();
    targetSessionId = id; isDeleteAll = false;
    document.getElementById('confirmTitle').innerText = "Delete Chat?";
    document.getElementById('confirmMessage').innerText = "This action cannot be undone. Are you sure?";
    document.getElementById('btnConfirmDelete').onclick = executeDelete; showModal('modalConfirm');
}

function hapusSemuaData() {
    isDeleteAll = true;
    document.getElementById('confirmTitle').innerText = "Clear All History?";
    document.getElementById('confirmMessage').innerText = "WARNING: All chat history will be permanently deleted!";
    document.getElementById('btnConfirmDelete').onclick = executeDelete; showModal('modalConfirm');
}

function executeDelete() {
    if (isDeleteAll) { localStorage.removeItem('chatSessions'); sessions = []; startNewChat(); }
    else {
        sessions = sessions.filter(s => s.id !== targetSessionId);
        localStorage.setItem('chatSessions', JSON.stringify(sessions));
        if (currentSessionId === targetSessionId) startNewChat();
    }
    renderSidebar(); closeModal();
}

function showModal(modalId) {
    const overlay = document.getElementById('modalOverlay'); overlay.classList.add('show');
    document.querySelectorAll('.modal-box').forEach(box => box.style.display = 'none');
    document.getElementById(modalId).style.display = 'block';
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('show'); targetSessionId = null; }
document.getElementById('modalOverlay').addEventListener('click', function(e) { if (e.target === this) closeModal(); });
document.getElementById('renameInput').addEventListener('keypress', function(e) { if (e.key === 'Enter') confirmRename(); });
document.getElementById('userInput').addEventListener('keypress', function (e) { if (e.key === 'Enter') { e.preventDefault(); kirimPesan(); } });