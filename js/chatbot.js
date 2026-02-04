// Chatbot Logic with External Database
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CONFIGURATION ---
    const CONFIG = {
        primaryColor: '#6B46C1',
        secondaryColor: '#553C9A',
        botName: 'Assistant Onyx',
        dataFile: 'data/chatbot_data.json'
    };

    let knowledgeBase = [];

    // --- 2. STYLES & UI INJECTION ---
    const injectStyles = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .chat-widget { position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: 'Inter', sans-serif; }
            .chat-btn { width: 60px; height: 60px; border-radius: 50%; background: ${CONFIG.primaryColor}; color: white; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; align-items: center; justify-content: center; font-size: 24px; }
            .chat-btn:hover { transform: scale(1.1); }
            .chat-window { position: absolute; bottom: 80px; right: 0; width: 350px; height: 500px; background: white; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); display: flex; flex-direction: column; overflow: hidden; opacity: 0; pointer-events: none; transform: translateY(20px) scale(0.95); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); border: 1px solid #E2E8F0; }
            .chat-window.active { opacity: 1; pointer-events: all; transform: translateY(0) scale(1); }
            .chat-header { background: linear-gradient(135deg, ${CONFIG.primaryColor}, ${CONFIG.secondaryColor}); padding: 16px 20px; color: white; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .chat-messages { flex: 1; padding: 20px; overflow-y: auto; background: #F7FAFC; scroll-behavior: smooth; }
            .message { margin-bottom: 12px; max-width: 85%; padding: 12px 16px; border-radius: 12px; font-size: 14px; line-height: 1.5; animation: fadeIn 0.3s ease; word-wrap: break-word; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
            .bot { background: white; color: #2D3748; border-bottom-left-radius: 2px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); align-self: flex-start; margin-right: auto; }
            .user { background: ${CONFIG.primaryColor}; color: white; border-bottom-right-radius: 2px; align-self: flex-end; margin-left: auto; }
            .chat-input-area { padding: 15px; background: white; border-top: 1px solid #E2E8F0; display: flex; gap: 10px; }
            .chat-input { flex: 1; padding: 12px 15px; border: 1px solid #E2E8F0; border-radius: 25px; outline: none; font-size: 14px; transition: border-color 0.2s; }
            .chat-input:focus { border-color: ${CONFIG.primaryColor}; }
            .chat-send { background: ${CONFIG.primaryColor}; color: white; border: none; width: 42px; height: 42px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
            .chat-send:hover { background: ${CONFIG.secondaryColor}; }
            @media (max-width: 480px) { .chat-window { width: calc(100vw - 40px); height: 60vh; bottom: 85px; right: 0; } }
        `;
        document.head.appendChild(style);
    };

    const injectHTML = () => {
        const widget = document.createElement('div');
        widget.className = 'chat-widget';
        widget.innerHTML = `
            <div class="chat-window">
                <div class="chat-header">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 shadow-sm">
                            <img src="img/expert-nurse.png" alt="Assistant" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <h4 class="font-bold text-sm text-white">${CONFIG.botName}</h4>
                            <span class="text-xs text-green-200 flex items-center gap-1">
                                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> En ligne
                            </span>
                        </div>
                    </div>
                    <button class="chat-close text-white/80 hover:text-white transition-colors"><i class="fa-solid fa-times text-lg"></i></button>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="message bot">
                        Bonjour ! 👋<br>Je m'initialise... un instant s'il vous plaît.
                    </div>
                </div>
                <form class="chat-input-area" id="chatForm">
                    <input type="text" class="chat-input" placeholder="Écrivez votre message..." id="userInput" autocomplete="off" disabled>
                    <button type="submit" class="chat-send" disabled>
                        <i class="fa-solid fa-paper-plane text-sm"></i>
                    </button>
                </form>
            </div>
            <button class="chat-btn">
                <i class="fa-solid fa-comment-dots"></i>
            </button>
        `;
        document.body.appendChild(widget);
        return widget;
    };

    // --- 3. LOGIC & INITIALIZATION ---
    injectStyles();
    const widget = injectHTML();

    // DOM Elements
    const chatBtn = widget.querySelector('.chat-btn');
    const chatWindow = widget.querySelector('.chat-window');
    const closeBtn = widget.querySelector('.chat-close');
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const sendBtn = widget.querySelector('.chat-send');
    const messagesContainer = document.getElementById('chatMessages');

    // UI Logic
    const toggleChat = () => {
        chatWindow.classList.toggle('active');
    };

    const addMessage = (text, sender) => {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.innerHTML = text;
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    // Load Data
    fetch(CONFIG.dataFile)
        .then(response => response.json())
        .then(data => {
            knowledgeBase = data;
            // Enable input
            userInput.disabled = false;
            sendBtn.disabled = false;
            // Update welcome message
            const welcomeMsg = messagesContainer.querySelector('.message.bot');
            if (welcomeMsg) {
                welcomeMsg.innerHTML = "Bonjour ! 👋<br>Je suis connecté à ma base de connaissances. Je peux répondre à toutes vos questions sur la clinique.<br>Comment puis-je vous aider ?";
            }
        })
        .catch(err => {
            console.error('Error loading chatbot data:', err);
            userInput.disabled = false; // Enable anyway to show error if user tries
            addMessage("Désolé, je rencontre un problème de connexion à ma mémoire. 😓", "bot");
        });

    // Core Analytics Logic
    const normalize = (text) => {
        return text.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ");
    };

    const findBestResponse = (userInput) => {
        const normalizedInput = normalize(userInput);
        const inputWords = normalizedInput.split(/\s+/).filter(w => w.length > 2);

        let bestMatch = null;
        let maxScore = 0;

        knowledgeBase.forEach(topic => {
            let score = 0;
            topic.keywords.forEach(keyword => {
                const normKeyword = normalize(keyword);
                if (normalizedInput.includes(normKeyword)) {
                    score += 5; // Direct phrase match
                }
                if (inputWords.some(w => w.includes(normKeyword) || normKeyword.includes(w))) {
                    score += 2; // Word match
                }
            });

            if (score > maxScore) {
                maxScore = score;
                bestMatch = topic;
            }
        });

        if (maxScore < 2) {
            return "Je ne suis pas sûr de comprendre. 🤔<br>Essayez de reformuler ou appelez-nous au <strong>081 33 76 119</strong> pour parler à un humain.";
        }

        return bestMatch.response;
    };

    // --- 4. MOBILE MENU INTEGRATION ---
    const mobileMenu = document.querySelector(".mobile-menu");
    if (mobileMenu) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!mobileMenu.classList.contains('hidden')) {
                        // Menu is OPEN -> Close chat & Hide widget
                        chatWindow.classList.remove('active');
                        widget.style.display = 'none';
                    } else {
                        // Menu is CLOSED -> Show widget
                        widget.style.display = 'block';
                    }
                }
            });
        });
        observer.observe(mobileMenu, { attributes: true });
    }

    // Events
    chatBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        userInput.value = '';

        const typingDelay = Math.min(1000, 500 + text.length * 20);

        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message bot';
        loadingDiv.innerHTML = '<i class="fa-solid fa-ellipsis fa-fade"></i>';
        messagesContainer.appendChild(loadingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        setTimeout(() => {
            loadingDiv.remove();
            const response = findBestResponse(text);
            addMessage(response, 'bot');
        }, typingDelay);
    });
});
