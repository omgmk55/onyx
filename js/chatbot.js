// Chatbot Logic with Smart Analysis
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CONFIGURATION & DATA ---
    const CONFIG = {
        primaryColor: '#6B46C1',
        secondaryColor: '#553C9A',
        botName: 'Assistant Onyx'
    };

    // Knowledge Base: The 'Brain' of the chatbot
    const knowledgeBase = [
        {
            id: 'greetings',
            keywords: ['bonjour', 'salut', 'hello', 'coucou', 'yo', 'hey', 'holla', 'bonsoir'],
            response: "Bonjour ! 👋<br>Je suis l'IA de la Clinique Onyx. Je peux vous renseigner sur nos <strong>services</strong>, <strong>horaires</strong>, <strong>tarifs</strong> ou <strong>localisations</strong>.<br>Quelle est votre question ?"
        },
        {
            id: 'wellbeing',
            keywords: ['ca va', 'comment vas', 'forme', 'bien'],
            response: "Je suis une intelligence artificielle, donc je suis toujours opérationnelle ! 🤖<br>Et vous, comment puis-je vous aider aujourd'hui ?"
        },
        {
            id: 'thanks',
            keywords: ['merci', 'remercie', 'top', 'super', 'cool', 'genial'],
            response: "C'est un plaisir ! N'hésitez pas si vous avez d'autres questions. Prenez soin de vous. ✨"
        },
        {
            id: 'hours',
            keywords: ['horaire', 'heure', 'ouverture', 'fermeture', 'quand', 'ouvert', 'ferme', 'disponible', 'temps'],
            response: "🕒 <strong>Nos Horaires :</strong><br>• <strong>Consultations :</strong> 07h00 - 19h00 (Lundi au Dimanche)<br>• <strong>Urgences :</strong> Ouvert <strong>24h/24 et 7j/7</strong> pour les crises."
        },
        {
            id: 'location',
            keywords: ['adresse', 'ou', 'lieux', 'localisation', 'situe', 'trouve', 'venir', 'position', 'carte', 'chemin'],
            response: "📍 <strong>Nous trouver :</strong><br>Avenue Fermier no 5, Boulevard Lumumba.<br><em>Repère : Arrêt Banunu, près du Pont Matete.</em>"
        },
        {
            id: 'contact',
            keywords: ['telephone', 'phone', 'tel', 'numero', 'joindre', 'appeler', 'contact', 'mail', 'email'],
            response: "📞 <strong>Contactez-nous :</strong><br>• Réception : <a href='tel:0813376119' class='font-bold underline'>081 33 76 119</a><br>• Direction : <a href='tel:0814064939' class='font-bold underline'>081 406 49 39</a>"
        },
        {
            id: 'appointment',
            keywords: ['rdv', 'rendez', 'vous', 'consultation', 'voir', 'docteur', 'medecin', 'reserver'],
            response: "📅 <strong>Prendre Rendez-vous :</strong><br>Vous pouvez nous appeler au <strong>081 33 76 119</strong> ou venir directement sur place aux heures d'ouverture (07h-19h)."
        },
        {
            id: 'psychiatry',
            keywords: ['psychiatrie', 'psychiatre', 'mental', 'depression', 'anxiete', 'bipolaire', 'schizophrene', 'fou', 'folie', 'tete'],
            response: "🧠 <strong>Psychiatrie :</strong><br>Nous sommes experts dans le traitement des troubles mentaux : dépression, anxiété, troubles bipolaires, schizophrénie, etc. Nos neuropsychiatres sont là pour vous."
        },
        {
            id: 'neurology',
            keywords: ['neurologie', 'neurologue', 'nerf', 'cerveau', 'epilepsie', 'migraine', 'avc', 'tete', 'crise'],
            response: "⚡ <strong>Neurologie :</strong><br>Nous prenons en charge les pathologies du système nerveux : épilepsie, migraines chroniques, suites d'AVC et autres troubles neurologiques."
        },
        {
            id: 'addiction',
            keywords: ['drogue', 'alcool', 'fumer', 'chanvre', 'dependance', 'addiction', 'sevrage', 'toxico', 'desintoxication'],
            response: "🚫 <strong>Désintoxication :</strong><br>Nous avons un programme spécialisé pour le sevrage et la réhabilitation des dépendances (alcool, drogues) dans un environnement sécurisé."
        },
        {
            id: 'therapy',
            keywords: ['psychotherapie', 'psychologue', 'parler', 'ecoute', 'counselling', 'conseil', 'therapie', 'couple', 'famille'],
            response: "🗣️ <strong>Psychothérapie :</strong><br>Nos psychologues proposent des séances de Counselling pour vous écouter, vous soutenir et vous aider à surmonter les épreuves."
        },
        {
            id: 'urgency',
            keywords: ['urgence', 'grave', 'aide', 'secours', 'nuit', 'crise', 'suicide', 'danger'],
            response: "🚨 <strong>URGENCE :</strong><br>Si la situation est critique, <strong>venez immédiatement</strong>. Notre service d'urgence est ouvert <strong>24h/24</strong>. Appelez le <strong>081 33 76 119</strong> en route."
        },
        {
            id: 'accommodation',
            keywords: ['lit', 'chambre', 'dormir', 'hospitalisation', 'internement', 'vip', 'luxe', 'standard', 'confort'],
            response: "🛏️ <strong>Hébergement :</strong><br>• <strong>Standard :</strong> Chambres aérées et confortables.<br>• <strong>VIP :</strong> Chambres privées avec clim, TV, frigo, douche interne.<br>La restauration est incluse."
        },
        {
            id: 'exams',
            keywords: ['examen', 'test', 'analyse', 'sang', 'laboratoire', 'eeg', 'ecg', 'electro', 'coeur', 'scan'],
            response: "🔬 <strong>Examens Paracliniques :</strong><br>Nous réalisons sur place :<br>• EEG (Cerveau)<br>• ECG (Cœur)<br>• Analyses de Laboratoire (Biologie)<br>•Bilans Psychologiques."
        },
        {
            id: 'prices',
            keywords: ['prix', 'tarif', 'cout', 'combien', 'payer', 'argent', 'facture'],
            response: "💰 <strong>Tarifs :</strong><br>Les prix varient selon les soins et le type d'hébergement. Le mieux est de passer à la réception pour une estimation précise adaptée à vos besoins."
        },
        {
            id: 'team',
            keywords: ['equipe', 'qui', 'medecin', 'infirmier', 'directeur', 'personnel', 'specialiste', 'competence'],
            response: "👥 <strong>Notre Équipe :</strong><br>Sous la direction du Dr. Principal, nous avons 3 Médecins Spécialistes, 5 Infirmières qualifiées, 10 Administrateurs et un personnel de soutien dévoué."
        }
    ];

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
                        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <i class="fa-solid fa-robot text-lg"></i>
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
                        Bonjour ! 👋<br>Je suis là pour répondre à toutes vos questions sur la Clinique Onyx.<br>Comment puis-je vous aider ?
                    </div>
                </div>
                <form class="chat-input-area" id="chatForm">
                    <input type="text" class="chat-input" placeholder="Écrivez votre message..." id="userInput" autocomplete="off">
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
        return widget;
    };

    // --- 3. CORE ANALYTICS LOGIC ---

    // Normalize text: remove accents, lowercase, remove punctuation for better matching
    const normalize = (text) => {
        return text.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " "); // remove punctuation
    };

    const findBestResponse = (userInput) => {
        const normalizedInput = normalize(userInput);
        const inputWords = normalizedInput.split(/\s+/).filter(w => w.length > 2); // Ignore short words

        let bestMatch = null;
        let maxScore = 0;

        knowledgeBase.forEach(topic => {
            let score = 0;

            // Check for keyword matches
            topic.keywords.forEach(keyword => {
                const normKeyword = normalize(keyword);

                // Exact match gets high score
                if (normalizedInput.includes(normKeyword)) {
                    score += 5;
                }

                // Partial word match (e.g., 'psychiat' in 'psychiatrie') gets lower score
                // This helps with typos or conjugates
                if (inputWords.some(w => w.includes(normKeyword) || normKeyword.includes(w))) {
                    score += 2;
                }
            });

            if (score > maxScore) {
                maxScore = score;
                bestMatch = topic;
            }
        });

        // Threshold: If score is too low, return default
        if (maxScore < 2) {
            return "Je ne suis pas sûr de comprendre votre question. 🤔<br>Pouvez-vous reformuler ?<br>Sinon, appelez-nous au <strong>081 33 76 119</strong>.";
        }

        return bestMatch.response;
    };

    // --- 4. INITIALIZATION ---
    injectStyles();
    const widget = injectHTML();

    // DOM Elements
    const chatBtn = widget.querySelector('.chat-btn');
    const chatWindow = widget.querySelector('.chat-window');
    const closeBtn = widget.querySelector('.chat-close');
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const messagesContainer = document.getElementById('chatMessages');

    // UI Logic
    const toggleChat = () => {
        chatWindow.classList.toggle('active');
        // Optional: specific animation or sound here
    };

    const addMessage = (text, sender) => {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.innerHTML = text;
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    // Events
    chatBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        userInput.value = '';

        // Simulate typing delay for realism
        const typingDelay = Math.min(1000, 500 + text.length * 20);

        // Show typing indicator (optional simplified version)
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
