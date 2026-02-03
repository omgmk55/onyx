// Chatbot Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: 'Inter', sans-serif;
        }
        .chat-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #6B46C1; /* Primary Purple */
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: transform 0.3s ease, background 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }
        .chat-btn:hover {
            transform: scale(1.1);
            background: #553C9A;
        }
        .chat-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            pointer-events: none;
            transform: translateY(20px);
            transition: all 0.3s ease;
            border: 1px solid #E2E8F0;
        }
        .chat-window.active {
            opacity: 1;
            pointer-events: all;
            transform: translateY(0);
        }
        .chat-header {
            background: linear-gradient(135deg, #6B46C1, #805AD5);
            padding: 20px;
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .chat-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 18px;
        }
        .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #F7FAFC;
        }
        .message {
            margin-bottom: 15px;
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.4;
        }
        .bot {
            background: white;
            color: #2D3748;
            border-top-left-radius: 2px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            align-self: flex-start;
        }
        .user {
            background: #6B46C1;
            color: white;
            border-top-right-radius: 2px;
            align-self: flex-end;
            margin-left: auto;
        }
        .chat-input-area {
            padding: 15px;
            background: white;
            border-top: 1px solid #E2E8F0;
            display: flex;
            gap: 10px;
        }
        .chat-input {
            flex: 1;
            padding: 10px 15px;
            border: 1px solid #E2E8F0;
            border-radius: 25px;
            outline: none;
            font-size: 14px;
        }
        .chat-input:focus {
            border-color: #6B46C1;
        }
        .chat-send {
            background: #6B46C1;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
        }
        .chat-send:hover {
            background: #553C9A;
        }
        
        /* Mobile responsive */
        @media (max-width: 480px) {
            .chat-window {
                width: calc(100vw - 40px);
                height: 60vh;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Inject Components
    const widget = document.createElement('div');
    widget.className = 'chat-widget';
    widget.innerHTML = `
        <div class="chat-window">
            <div class="chat-header">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <i class="fa-solid fa-robot text-lg"></i>
                    </div>
                    <div>
                        <h4 class="font-bold text-sm">Assistant Onyx</h4>
                        <span class="text-xs text-green-200 flex items-center gap-1">
                            <span class="w-2 h-2 bg-green-400 rounded-full"></span> En ligne
                        </span>
                    </div>
                </div>
                <button class="chat-close"><i class="fa-solid fa-times"></i></button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <!-- Welcome Message -->
                <div class="message bot">
                    Bonjour ! 👋<br>Je suis l'assistant virtuel de la Clinique Onyx. Comment puis-je vous aider aujourd'hui ?
                </div>
            </div>
            <form class="chat-input-area" id="chatForm">
                <input type="text" class="chat-input" placeholder="Posez votre question..." id="userInput" autocomplete="off">
                <button type="submit" class="chat-send">
                    <i class="fa-solid fa-paper-plane text-sm"></i>
                </button>
            </form>
        </div>
        <button class="chat-btn">
            <i class="fa-solid fa-comment-dots"></i>
        </button>
    `;
    document.body.appendChild(widget);

    // 3. Variables
    const chatBtn = widget.querySelector('.chat-btn');
    const chatWindow = widget.querySelector('.chat-window');
    const closeBtn = widget.querySelector('.chat-close');
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const messagesContainer = document.getElementById('chatMessages');

    // 4. Toggle Chat
    function toggleChat() {
        chatWindow.classList.toggle('active');
        const icon = chatWindow.classList.contains('active') ? 'fa-times' : 'fa-comment-dots';
        // Only change main button icon if we want to, but keep it simple for now
    }

    chatBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // 5. Logic
    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.innerHTML = text;
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function getBotResponse(text) {
        text = text.toLowerCase();
        
        if (text.includes('bonjour') || text.includes('salut') || text.includes('hello')) {
            return "Bonjour ! Comment allez-vous ? 😊";
        }
        
        if (text.includes('horaire') || text.includes('heure') || text.includes('ouverture')) {
            return "Nos bureaux sont ouverts tous les jours de <strong>07h00 à 19h00</strong>. Les urgences sont assurées <strong>24h/24</strong>. 🕒";
        }

        if (text.includes('adresse') || text.includes('localisation') || text.includes('où')) {
            return "Nous sommes situés :<br>📍 <strong>Avenue Fermier no 5, Boulevard Lumumba</strong><br>(Arrêt Banunu, Pont Matete)";
        }

        if (text.includes('contact') || text.includes('téléphone') || text.includes('tel')) {
            return "Vous pouvez nous joindre au :<br>📞 <a href='tel:0813376119' class='text-primary underline font-bold'>081 33 76 119</a><br>📞 <a href='tel:0814064939' class='text-primary underline font-bold'>081 406 49 39</a>";
        }

        if (text.includes('rdv') || text.includes('rendez-vous')) {
            return "Pour prendre rendez-vous, le plus simple est de nous appeler ou de passer par la page <a href='contact.html' class='text-primary underline font-bold'>Contact</a>.";
        }

        if (text.includes('soin') || text.includes('service') || text.includes('traitement')) {
            return "Nous proposons des soins en :<br>• Psychiatrie<br>• Neurologie<br>• Psychothérapie<br>• Hébergement et réhabilitation.<br><br>Consultez notre page <a href='services.html' class='text-primary underline font-bold'>Services</a> pour plus de détails.";
        }
        
        if (text.includes('merci')) {
            return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions. ✨";
        }

        return "Je ne suis pas sûr de comprendre. 🤔<br>Pour une réponse précise, n'hésitez pas à nous appeler directement au <strong>081 33 76 119</strong>.";
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        // User message
        addMessage(text, 'user');
        userInput.value = '';

        // Bot typing simulation (optional, instantaneous for now)
        setTimeout(() => {
            const response = getBotResponse(text);
            addMessage(response, 'bot');
        }, 500);
    });
});
