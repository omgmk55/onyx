/**
 * Auth System for Clinique Onyx
 * Uses LocalStorage to simulate backend session
 */

const Auth = {
    // Keys for LocalStorage
    USERS_KEY: 'onyx_users',
    CURRENT_USER_KEY: 'onyx_current_user',

    // Initialize
    init() {
        this.updateNavUI();
        this.protectRoutes();
    },

    // Get all users
    getUsers() {
        return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    },

    // Get current user
    getCurrentUser() {
        return JSON.parse(localStorage.getItem(this.CURRENT_USER_KEY));
    },

    // Set current user
    setCurrentUser(user) {
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
        this.updateNavUI();
    },

    // Register new user
    register(name, email, password) {
        const users = this.getUsers();

        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Cet email est déjà utilisé.' };
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password, // In a real app, this should be hashed!
            avatar: null,
            role: email === 'omgmk55@gmail.com' ? 'doctor' : 'patient' // Assign role on register
        };

        if (newUser.role === 'doctor') {
            newUser.name = 'Dr. Kapinga';
        }

        users.push(newUser);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

        this.setCurrentUser(newUser);
        return { success: true };
    },

    // Login user
    login(email, password) {
        const users = this.getUsers();
        let user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Force role update for specific email
            if (user.email === 'omgmk55@gmail.com') {
                user.role = 'doctor';
                user.name = 'Dr. Kapinga';

                // Update user in the main list to persist the role change
                const index = users.findIndex(u => u.email === email);
                users[index] = user;
                localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
            } else {
                // Ensure regular users are patients
                if (!user.role) user.role = 'patient';
            }

            this.setCurrentUser(user);
            return { success: true };
        }
        return { success: false, message: 'Email ou mot de passe incorrect.' };
    },

    // Logout
    logout() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
        window.location.href = 'index.html';
    },

    // Update Navigation UI based on auth state
    updateNavUI() {
        const user = this.getCurrentUser();
        const profileLinks = document.querySelectorAll('a[title="Espace Patient"], a[title="Connexion"]');
        const containers = document.querySelectorAll('.flex.items-center.gap-4.pl-4.border-l');

        if (user) {
            containers.forEach(container => {
                // Find existing link and remove/replace
                const authLink = container.querySelector('a[href="login.html"]');
                if (authLink) {
                    authLink.href = 'dashboard.html';
                    authLink.title = `Bonjour, ${user.name}`;
                    authLink.innerHTML = `
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white shadow-md relative">
                            <i class="fa-solid fa-user-check"></i>
                             <span class="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                    `;
                }
            });
        }
    },

    // Protect Dashboard Route
    protectRoutes() {
        const path = window.location.pathname;
        if (path.includes('dashboard.html') && !this.getCurrentUser()) {
            window.location.href = 'login.html';
        }
        if (path.includes('login.html') && this.getCurrentUser()) {
            window.location.href = 'dashboard.html';
        }
    }
};

// Auto-init on load
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});
