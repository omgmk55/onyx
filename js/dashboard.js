/**
 * Dashboard Logic
 * Handles UI interactions, tabs, and data rendering
 */

document.addEventListener('DOMContentLoaded', () => {
    Dashboard.init();
});

const Dashboard = {
    init() {
        const user = Auth.getCurrentUser();
        if (!user) return;

        if (user.role === 'doctor') {
            this.renderDoctorView(user);
        } else {
            this.renderPatientView(user);
        }

        this.setupInteractions();
    },

    renderPatientView(user) {
        // Standard Patient Logic
        this.renderAppointments();
        this.renderStats(); // Patient stats
        this.setupNavigation('patient');
    },

    renderDoctorView(user) {
        // Update Sidebar for Doctor
        const nav = document.getElementById('sidebar-nav');
        if (nav) {
            nav.innerHTML = `
                <a href="#" data-target="view-dashboard" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold transition-all">
                    <i class="fa-solid fa-chart-line w-5"></i>
                    Tableau de bord
                </a>
                <a href="#" data-target="view-patients" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                    <i class="fa-solid fa-users w-5"></i>
                    Mes Patients
                </a>
                <a href="#" data-target="view-schedule" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                    <i class="fa-solid fa-calendar-day w-5"></i>
                    Planning
                </a>
                <a href="#" data-target="view-doctor-messages" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                    <i class="fa-solid fa-envelope w-5"></i>
                    Messages
                    <span class="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">2</span>
                </a>
                 <a href="#" data-target="view-stats" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                    <i class="fa-solid fa-chart-pie w-5"></i>
                    Statistiques
                </a>
                <a href="#" data-target="view-prescriptions" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                    <i class="fa-solid fa-file-prescription w-5"></i>
                    Ordonnances
                </a>
                <a href="#" data-target="view-medical-records" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                    <i class="fa-solid fa-file-medical w-5"></i>
                    Dossiers Médicaux
                </a>
                 <a href="#" data-target="view-invoices" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                    <i class="fa-solid fa-file-invoice-dollar w-5"></i>
                    Factures
                </a>
                <a href="#" data-target="view-expenses" class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                    <i class="fa-solid fa-wallet w-5"></i>
                    Dépenses
                </a>
            `;
        }

        // Validate if view-dashboard exists before modifying it
        const dashboardView = document.getElementById('view-dashboard');
        // We will inject other views dynamically if they don't exist in the HTML structure

        if (dashboardView) {
            // ... (keep existing dashboard overview code unchanged, but re-injecting it here would be redundant if we only update the sidebar)
            // Ideally we only update the sidebar and append the NEW views.
            // But since I am inside renderDoctorView which executes completely, I need to make sure I don't break existing logic.
            // I will assume the previous content injection for dashboardView is fine or I would need to re-declare it if I was replacing the WHOLE function.
            // Wait, I am using replace_content on a block.
            // Let's look at where I am inserting.

            // Actually, simply appending the new Views at the end of the existing View creation blocks is safer.
            // And updating the sidebar HTML at the top.

            // I will split this into two edits for safety: 1. Sidebar, 2. Views.
            // This replace_call is doing Sidebar Update + Adding Views logic? No, let's just do Sidebar first.
        }

        // We will inject other views dynamically if they don't exist in the HTML structure

        if (dashboardView) {
            // Update Dashboard Content for Doctor (Overview)
            dashboardView.innerHTML = `
                <!-- Doctor Stats -->
                <div class="grid md:grid-cols-4 gap-6 mb-8 animate-fade-in">
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 text-xl"><i class="fa-solid fa-users"></i></div>
                        </div>
                        <h3 class="text-gray-500 text-sm font-medium">Total Patients</h3>
                        <p class="text-dark font-bold text-2xl mt-1">124</p>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div class="flex items-center justify-between mb-4">
                            <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-xl"><i class="fa-solid fa-calendar-check"></i></div>
                        </div>
                        <h3 class="text-gray-500 text-sm font-medium">RDV Aujourd'hui</h3>
                        <p class="text-dark font-bold text-2xl mt-1">5</p>
                    </div>
                     <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div class="flex items-center justify-between mb-4">
                             <div class="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-yellow-600 text-xl"><i class="fa-solid fa-star"></i></div>
                        </div>
                        <h3 class="text-gray-500 text-sm font-medium">Note Moyenne</h3>
                        <p class="text-dark font-bold text-2xl mt-1">4.9/5</p>
                    </div>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div class="flex items-center justify-between mb-4">
                             <div class="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-xl"><i class="fa-solid fa-envelope-open-text"></i></div>
                        </div>
                        <h3 class="text-gray-500 text-sm font-medium">Nouveaux Messages</h3>
                        <p class="text-dark font-bold text-2xl mt-1">2</p>
                    </div>
                </div>

                <div class="grid lg:grid-cols-3 gap-8">
                    <!-- Schedule Small -->
                    <div class="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 animate-fade-in">
                        <h2 class="font-display font-bold text-xl text-dark mb-6">Planning du jour</h2>
                        <div class="space-y-4">
                            ${DataService.getDoctorSchedule().slice(0, 3).map(appt => `
                                <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                    <div class="flex items-center gap-4">
                                         <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                            ${appt.patient.charAt(0)}
                                         </div>
                                         <div>
                                            <h4 class="font-bold text-dark">${appt.patient}</h4>
                                            <p class="text-sm text-gray-500">${appt.type} • ${appt.time}</p>
                                         </div>
                                    </div>
                                    <span class="px-3 py-1 rounded-full text-xs font-bold ${appt.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}">
                                        ${appt.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                         <button class="w-full mt-4 py-2 text-primary font-bold hover:underline" data-target="view-schedule">Voir tout le planning</button>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div class="bg-gradient-to-br from-primary to-purple-800 rounded-3xl shadow-lg p-6 text-white relative overflow-hidden">
                        <h2 class="font-display font-bold text-xl mb-6 relative z-10">Actions Rapides</h2>
                        <div class="space-y-3 relative z-10">
                            <button data-action="new-patient" class="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center px-4 gap-3 text-left">
                                <i class="fa-solid fa-plus-circle"></i> Nouveau Patient
                            </button>
                             <button data-action="new-appointment" class="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center px-4 gap-3 text-left">
                                <i class="fa-solid fa-calendar-plus"></i> Ajouter RDV
                            </button>
                             <button data-action="new-prescription" class="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center px-4 gap-3 text-left">
                                <i class="fa-solid fa-file-medical"></i> Créer Ordonnance
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Create container for Patients View
            if (!document.getElementById('view-patients')) {
                const patientsView = document.createElement('div');
                patientsView.id = 'view-patients';
                patientsView.className = 'dashboard-section hidden animate-fade-in';
                patientsView.innerHTML = `
                    <h2 class="font-display font-bold text-3xl text-dark mb-6">Liste des Patients</h2>
                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <table class="w-full text-left border-collapse">
                            <thead class="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Nom</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Âge</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Dernière Visite</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Pathologie</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Statut</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${DataService.getPatients().map(p => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="p-6 font-bold text-dark flex items-center gap-3">
                                            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">${p.name.charAt(0)}</div>
                                            ${p.name}
                                        </td>
                                        <td class="p-6 text-gray-600">${p.age} ans</td>
                                        <td class="p-6 text-gray-600">${p.lastVisit}</td>
                                        <td class="p-6 text-gray-600"><span class="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-sm">${p.condition}</span></td>
                                        <td class="p-6"><span class="text-green-600 font-bold text-sm bg-green-50 px-2 py-1 rounded-full">Actif</span></td>
                                        <td class="p-6">
                                            <button class="text-gray-400 hover:text-primary"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
                dashboardView.parentNode.appendChild(patientsView);
            }

            // Create container for Schedule View
            if (!document.getElementById('view-schedule')) {
                const scheduleView = document.createElement('div');
                scheduleView.id = 'view-schedule';
                scheduleView.className = 'dashboard-section hidden animate-fade-in';
                scheduleView.innerHTML = `
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="font-display font-bold text-3xl text-dark">Planning Complet</h2>
                        <button data-action="new-appointment" class="bg-primary hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition-colors font-bold"><i class="fa-solid fa-plus mr-2"></i> Ajouter RDV</button>
                    </div>
                    <div class="space-y-4">
                        ${DataService.getDoctorSchedule().map(appt => `
                            <div class="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                <div class="flex items-center gap-6">
                                     <div class="flex flex-col items-center justify-center w-16 h-16 bg-primary/5 rounded-xl text-primary font-bold border border-primary/10">
                                        <span class="text-xl">${appt.time.split(':')[0]}</span>
                                        <span class="text-xs uppercase">H</span>
                                     </div>
                                     <div>
                                        <h4 class="font-bold text-xl text-dark">${appt.patient}</h4>
                                        <div class="flex items-center gap-4 mt-1">
                                            <p class="text-sm text-gray-500"><i class="fa-regular fa-clock mr-1"></i> ${appt.time}</p>
                                            <p class="text-sm text-gray-500"><i class="fa-solid fa-tag mr-1"></i> ${appt.type}</p>
                                        </div>
                                     </div>
                                </div>
                                <div class="flex gap-3">
                                    <button class="p-2 text-gray-400 hover:text-red-500 tooltip" title="Annuler"><i class="fa-solid fa-xmark"></i></button>
                                    <button class="p-2 text-gray-400 hover:text-green-500 tooltip" title="Valider"><i class="fa-solid fa-check"></i></button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
                dashboardView.parentNode.appendChild(scheduleView);
            }

            // Create container for Messages View
            if (!document.getElementById('view-doctor-messages')) {
                const messagesView = document.createElement('div');
                messagesView.id = 'view-doctor-messages';
                messagesView.className = 'dashboard-section hidden animate-fade-in';
                messagesView.innerHTML = `
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="font-display font-bold text-3xl text-dark">Messagerie</h2>
                        <button class="bg-white border border-gray-200 text-gray-600 hover:text-primary px-4 py-2 rounded-xl transition-colors font-bold"><i class="fa-solid fa-pen-to-square mr-2"></i> Nouveau message</button>
                    </div>
                     <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                        ${DataService.getDoctorMessages().map(msg => `
                            <div class="p-6 hover:bg-gray-50 cursor-pointer transition-colors relative group ${msg.unread ? 'bg-purple-50/50' : ''}">
                                <div class="flex justify-between items-start mb-2">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                                            ${msg.from.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 class="font-bold text-dark text-lg">${msg.from}</h4>
                                            <p class="text-sm text-gray-500 font-medium">${msg.subject}</p>
                                        </div>
                                    </div>
                                    <span class="text-sm text-gray-400">${msg.date}</span>
                                </div>
                                <p class="text-gray-600 pl-16 leading-relaxed">${msg.preview} <span class="text-gray-400 text-sm">(Cliquez pour lire la suite)</span></p>
                            </div>
                        `).join('')}
                    </div>
                 `;
                dashboardView.parentNode.appendChild(messagesView);
            }

            // Create container for Stats View
            if (!document.getElementById('view-stats')) {
                const statsView = document.createElement('div');
                statsView.id = 'view-stats';
                statsView.className = 'dashboard-section hidden animate-fade-in';
                statsView.innerHTML = `
                    <h2 class="font-display font-bold text-3xl text-dark mb-6">Statistiques Détaillées</h2>
                    
                    <!-- Summary Statistics Cards -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <!-- Patients Card -->
                        <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-3xl shadow-lg text-white">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <i class="fa-solid fa-users text-2xl"></i>
                                </div>
                                <span class="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Total</span>
                            </div>
                            <p class="text-sm font-medium mb-1 opacity-90">Nombre de Patients</p>
                            <p class="text-4xl font-black mb-2">${DataService.getPatients().length}</p>
                            <p class="text-xs opacity-75">Patients enregistrés</p>
                        </div>

                        <!-- Invoices Card -->
                        <div class="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-3xl shadow-lg text-white">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <i class="fa-solid fa-file-invoice-dollar text-2xl"></i>
                                </div>
                                <span class="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Total</span>
                            </div>
                            <p class="text-sm font-medium mb-1 opacity-90">Nombre de Factures</p>
                            <p class="text-4xl font-black mb-2">${DataService.getInvoices().length}</p>
                            <p class="text-xs opacity-75">
                                <span class="font-bold">${DataService.getInvoices().filter(inv => inv.status === 'Payée').length}</span> payées • 
                                <span class="font-bold">${DataService.getInvoices().filter(inv => inv.status === 'En attente').length}</span> en attente
                            </p>
                        </div>

                        <!-- Expenses Card -->
                        <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-3xl shadow-lg text-white">
                            <div class="flex items-center justify-between mb-4">
                                <div class="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <i class="fa-solid fa-receipt text-2xl"></i>
                                </div>
                                <span class="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Total</span>
                            </div>
                            <p class="text-sm font-medium mb-1 opacity-90">Nombre de Dépenses</p>
                            <p class="text-4xl font-black mb-2">${DataService.getExpenses().length}</p>
                            <p class="text-xs opacity-75">
                                Total: <span class="font-bold">${DataService.getExpenses().reduce((sum, exp) => sum + parseFloat(exp.amount.replace(' $', '')), 0).toFixed(2)} $</span>
                            </p>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-8">
                         <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h3 class="font-bold text-xl mb-6">Aperçu Mensuel</h3>
                            <div class="h-64 flex items-end justify-between px-4 gap-2">
                                <div class="w-full bg-purple-100 rounded-t-lg relative group h-[40%]">
                                    <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">40%</div>
                                </div>
                                <div class="w-full bg-purple-200 rounded-t-lg relative group h-[60%]">
                                     <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">60%</div>
                                </div>
                                <div class="w-full bg-primary rounded-t-lg relative group h-[85%]">
                                     <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">85%</div>
                                </div>
                                <div class="w-full bg-purple-300 rounded-t-lg relative group h-[55%]"></div>
                                <div class="w-full bg-purple-100 rounded-t-lg relative group h-[45%]"></div>
                            </div>
                            <div class="flex justify-between mt-4 text-xs text-gray-400 font-bold uppercase tracking-wider">
                                <span>Sem 1</span><span>Sem 2</span><span>Sem 3</span><span>Sem 4</span><span>Sem 5</span>
                            </div>
                         </div>

                          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h3 class="font-bold text-xl mb-6">Répartition par Pathologie</h3>
                             <div class="space-y-4">
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="font-medium text-gray-700">Dépression</span>
                                        <span class="font-bold text-primary">35%</span>
                                    </div>
                                    <div class="w-full bg-gray-100 rounded-full h-2">
                                        <div class="bg-primary h-2 rounded-full" style="width: 35%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="font-medium text-gray-700">Anxiété</span>
                                        <span class="font-bold text-blue-500">28%</span>
                                    </div>
                                    <div class="w-full bg-gray-100 rounded-full h-2">
                                        <div class="bg-blue-500 h-2 rounded-full" style="width: 28%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="font-medium text-gray-700">Troubles Bipolaires</span>
                                        <span class="font-bold text-purple-500">15%</span>
                                    </div>
                                    <div class="w-full bg-gray-100 rounded-full h-2">
                                        <div class="bg-purple-500 h-2 rounded-full" style="width: 15%"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex justify-between text-sm mb-1">
                                        <span class="font-medium text-gray-700">Addictions</span>
                                        <span class="font-bold text-yellow-500">12%</span>
                                    </div>
                                    <div class="w-full bg-gray-100 rounded-full h-2">
                                        <div class="bg-yellow-500 h-2 rounded-full" style="width: 12%"></div>
                                    </div>
                                </div>
                             </div>
                         </div>
                    </div>
                 `;
                dashboardView.parentNode.appendChild(statsView);
            }

            // Create container for Prescriptions View
            if (!document.getElementById('view-prescriptions')) {
                const prescriptionsView = document.createElement('div');
                prescriptionsView.id = 'view-prescriptions';
                prescriptionsView.className = 'dashboard-section hidden animate-fade-in';
                prescriptionsView.innerHTML = `
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="font-display font-bold text-3xl text-dark">Ordonnances</h2>
                        <button class="bg-primary text-white px-4 py-2 rounded-xl transition-colors font-bold hover:bg-purple-700"><i class="fa-solid fa-plus mr-2"></i> Nouvelle Ordonnance</button>
                    </div>
                     <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <table class="w-full text-left border-collapse">
                            <thead class="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">N°</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Patient</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Date</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Médicaments</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Statut</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase"></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${DataService.getPrescriptions().map(ord => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="p-6 font-mono text-sm text-gray-500">${ord.id}</td>
                                        <td class="p-6 font-bold text-dark">${ord.patient}</td>
                                        <td class="p-6 text-gray-600">${ord.date}</td>
                                        <td class="p-6 text-gray-600 text-sm">${ord.meds}</td>
                                        <td class="p-6"><span class="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-bold uppercase">${ord.status}</span></td>
                                        <td class="p-6 text-right">
                                            <button class="text-gray-400 hover:text-primary tooltip" title="Imprimer"><i class="fa-solid fa-print"></i></button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                 `;
                dashboardView.parentNode.appendChild(prescriptionsView);
            }

            // Create container for Medical Records View
            if (!document.getElementById('view-medical-records')) {
                const recordsView = document.createElement('div');
                recordsView.id = 'view-medical-records';
                recordsView.className = 'dashboard-section hidden animate-fade-in';
                recordsView.innerHTML = `
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 class="font-display font-bold text-3xl text-dark">Dossiers Médicaux</h2>
                        <div class="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                             <div class="relative w-full md:w-auto">
                                <input type="text" placeholder="Rechercher un patient..." class="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-primary w-full md:w-64">
                                <i class="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                             </div>
                            <button data-action="new-record" class="bg-primary text-white px-4 py-2 rounded-xl transition-colors font-bold hover:bg-purple-700 w-full md:w-auto flex justify-center items-center"><i class="fa-solid fa-folder-plus mr-2"></i> Nouveau Dossier</button>
                        </div>
                    </div>
                     <div class="grid md:grid-cols-2 gap-6 pb-24 md:pb-0">
                        ${DataService.getMedicalRecords().map(rec => `
                            <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group">
                                <button class="absolute top-6 right-6 text-gray-400 hover:text-primary"><i class="fa-solid fa-pen-to-square"></i></button>
                                <div class="flex items-center gap-4 mb-4">
                                    <div class="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl font-bold">
                                        ${rec.patient.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 class="font-bold text-lg text-dark">${rec.patient}</h4>
                                        <p class="text-sm text-gray-500">Dossier #${rec.id}</p>
                                    </div>
                                </div>
                                <div class="space-y-3 mb-4">
                                    <div class="flex justify-between text-sm">
                                        <span class="text-gray-500">Groupe Sanguin</span>
                                        <span class="font-bold text-dark">${rec.bloodGroup}</span>
                                    </div>
                                    <div class="flex justify-between text-sm">
                                        <span class="text-gray-500">Allergies</span>
                                        <span class="font-bold text-red-500">${rec.allergies}</span>
                                    </div>
                                    <div class="flex justify-between text-sm">
                                        <span class="text-gray-500">Dernière Consultation</span>
                                        <span class="font-bold text-dark">${rec.lastConsult}</span>
                                    </div>
                                </div>
                                <div class="bg-gray-50 p-3 rounded-xl">
                                    <p class="text-xs text-gray-500 uppercase font-bold mb-1">Antécédents</p>
                                    <p class="text-sm text-gray-700">${rec.history}</p>
                                </div>
                                <button class="w-full mt-4 py-2 border border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-colors">
                                    Voir le dossier complet
                                </button>
                            </div>
                        `).join('')}
                    </div>
                 `;
                dashboardView.parentNode.appendChild(recordsView);
            }

            // Create container for Invoices View
            if (!document.getElementById('view-invoices')) {
                const invoicesView = document.createElement('div');
                invoicesView.id = 'view-invoices';
                invoicesView.className = 'dashboard-section hidden animate-fade-in';
                invoicesView.innerHTML = `
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 class="font-display font-bold text-3xl text-dark">Factures</h2>
                        <div class="relative">
                            <button id="invoice-filter-btn" class="bg-white border border-gray-200 text-gray-600 hover:text-primary px-4 py-2 rounded-xl transition-colors font-bold flex items-center gap-2">
                                <i class="fa-solid fa-filter"></i>
                                <span id="invoice-filter-label">Toutes</span>
                                <i class="fa-solid fa-chevron-down text-xs"></i>
                            </button>
                            <div id="invoice-filter-menu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                <button data-filter="all" class="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-gray-700 font-medium">
                                    <i class="fa-solid fa-list w-5 mr-2"></i>Toutes
                                </button>
                                <button data-filter="paid" class="w-full text-left px-4 py-2 hover:bg-green-50 transition-colors text-gray-700 font-medium">
                                    <i class="fa-solid fa-check-circle w-5 mr-2 text-green-600"></i>Payé
                                </button>
                                <button data-filter="unpaid" class="w-full text-left px-4 py-2 hover:bg-yellow-50 transition-colors text-gray-700 font-medium">
                                    <i class="fa-solid fa-clock w-5 mr-2 text-yellow-600"></i>Impayé
                                </button>
                                <button data-filter="expense" class="w-full text-left px-4 py-2 hover:bg-red-50 transition-colors text-gray-700 font-medium">
                                    <i class="fa-solid fa-receipt w-5 mr-2 text-red-600"></i>Dépense
                                </button>
                                <div class="border-t border-gray-100 my-2"></div>
                                <button data-filter="total" class="w-full text-left px-4 py-2 hover:bg-purple-50 transition-colors text-gray-700 font-bold">
                                    <i class="fa-solid fa-calculator w-5 mr-2 text-purple-600"></i>Total
                                </button>
                            </div>
                        </div>
                    </div>
                     <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <table class="w-full text-left border-collapse">
                            <thead class="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">N° Facture</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Patient</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Date</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Montant</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Statut</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase"></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${DataService.getInvoices().map(inv => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="p-6 font-mono text-sm text-gray-500">${inv.id}</td>
                                        <td class="p-6 font-bold text-dark">${inv.patient}</td>
                                        <td class="p-6 text-gray-600">${inv.date}</td>
                                        <td class="p-6 font-bold text-dark">${inv.amount}</td>
                                        <td class="p-6">
                                            <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${inv.status === 'Payée' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}">
                                                ${inv.status}
                                            </span>
                                        </td>
                                        <td class="p-6 text-right">
                                            <button class="text-gray-400 hover:text-primary tooltip" title="Télécharger"><i class="fa-solid fa-download"></i></button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                 `;
                dashboardView.parentNode.appendChild(invoicesView);
            }

            // Create container for Expenses View
            if (!document.getElementById('view-expenses')) {
                const expensesView = document.createElement('div');
                expensesView.id = 'view-expenses';
                expensesView.className = 'dashboard-section hidden animate-fade-in';
                expensesView.innerHTML = `
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 class="font-display font-bold text-3xl text-dark">Dépenses</h2>
                        <div class="flex gap-3 w-full md:w-auto flex-wrap">
                            <div class="relative flex-1 md:flex-none">
                                <button id="expense-filter-btn" class="bg-white border border-gray-200 text-gray-600 hover:text-primary px-4 py-2 rounded-xl transition-colors font-bold flex items-center gap-2 w-full md:w-auto justify-center">
                                    <i class="fa-solid fa-filter"></i>
                                    <span id="expense-filter-label">Toutes</span>
                                    <i class="fa-solid fa-chevron-down text-xs"></i>
                                </button>
                                <div id="expense-filter-menu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                    <button data-expense-filter="all" class="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-gray-700 font-medium">
                                        <i class="fa-solid fa-list w-5 mr-2"></i>Toutes
                                    </button>
                                    <div class="border-t border-gray-100 my-2"></div>
                                    <button data-expense-filter="today" class="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors text-gray-700 font-medium">
                                        <i class="fa-solid fa-calendar-day w-5 mr-2 text-blue-600"></i>Aujourd'hui
                                    </button>
                                    <button data-expense-filter="month" class="w-full text-left px-4 py-2 hover:bg-indigo-50 transition-colors text-gray-700 font-medium">
                                        <i class="fa-solid fa-calendar-week w-5 mr-2 text-indigo-600"></i>Ce mois
                                    </button>
                                    <div class="border-t border-gray-100 my-2"></div>
                                    <button data-expense-filter="paid" class="w-full text-left px-4 py-2 hover:bg-green-50 transition-colors text-gray-700 font-medium">
                                        <i class="fa-solid fa-check-circle w-5 mr-2 text-green-600"></i>Payé
                                    </button>
                                    <button data-expense-filter="pending" class="w-full text-left px-4 py-2 hover:bg-yellow-50 transition-colors text-gray-700 font-medium">
                                        <i class="fa-solid fa-clock w-5 mr-2 text-yellow-600"></i>En attente
                                    </button>
                                    <button data-expense-filter="unpaid" class="w-full text-left px-4 py-2 hover:bg-orange-50 transition-colors text-gray-700 font-medium">
                                        <i class="fa-solid fa-exclamation-circle w-5 mr-2 text-orange-600"></i>Impayé
                                    </button>
                                    <div class="border-t border-gray-100 my-2"></div>
                                    <button data-expense-filter="total" class="w-full text-left px-4 py-2 hover:bg-purple-50 transition-colors text-gray-700 font-bold">
                                        <i class="fa-solid fa-calculator w-5 mr-2 text-purple-600"></i>Total
                                    </button>
                                </div>
                            </div>
                            <div class="relative flex-1 md:flex-none">
                                <input type="date" id="expense-date-picker" class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl transition-colors font-medium w-full md:w-auto focus:border-primary focus:outline-none" placeholder="Date personnalisée">
                            </div>
                            <button data-action="new-expense" class="bg-primary text-white px-4 py-2 rounded-xl transition-colors font-bold hover:bg-purple-700 flex-1 md:flex-none flex justify-center items-center">
                                <i class="fa-solid fa-plus mr-2"></i> Nouvelle
                            </button>
                        </div>
                    </div>
                    
                    <!-- Desktop Table View (hidden on mobile) -->
                    <div class="hidden md:block bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <table class="w-full text-left border-collapse">
                            <thead class="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Date</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Catégorie</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Description</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Montant</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase">Statut</th>
                                    <th class="p-6 font-bold text-gray-500 text-sm uppercase"></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${DataService.getExpenses().map(exp => `
                                    <tr class="hover:bg-gray-50 transition-colors">
                                        <td class="p-6 text-gray-600">${exp.date}</td>
                                        <td class="p-6">
                                            <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${exp.category === 'Matériel' ? 'bg-blue-50 text-blue-600' : exp.category === 'Salaires' ? 'bg-purple-50 text-purple-600' : 'bg-gray-50 text-gray-600'}">
                                                ${exp.category}
                                            </span>
                                        </td>
                                        <td class="p-6 text-gray-700">${exp.description}</td>
                                        <td class="p-6 font-bold text-red-600">${exp.amount}</td>
                                        <td class="p-6">
                                            <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${exp.status === 'Payée' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}">
                                                ${exp.status}
                                            </span>
                                        </td>
                                        <td class="p-6 text-right">
                                            <button class="text-gray-400 hover:text-primary tooltip" title="Modifier"><i class="fa-solid fa-pen-to-square"></i></button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Mobile Card View (visible only on mobile) -->
                    <div class="md:hidden space-y-4 pb-24">
                        ${DataService.getExpenses().map(exp => `
                            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                <div class="flex justify-between items-start mb-3">
                                    <div>
                                        <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${exp.category === 'Matériel' ? 'bg-blue-50 text-blue-600' : exp.category === 'Salaires' ? 'bg-purple-50 text-purple-600' : 'bg-gray-50 text-gray-600'}">
                                            ${exp.category}
                                        </span>
                                    </div>
                                    <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${exp.status === 'Payée' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}">
                                        ${exp.status}
                                    </span>
                                </div>
                                <p class="text-gray-700 font-medium mb-2">${exp.description}</p>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-gray-500"><i class="fa-regular fa-calendar mr-1"></i>${exp.date}</span>
                                    <span class="text-xl font-bold text-red-600">${exp.amount}</span>
                                </div>
                                <button class="w-full mt-3 py-2 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                                    <i class="fa-solid fa-pen-to-square mr-2"></i>Modifier
                                </button>
                            </div>
                        `).join('')}
                    </div>
                 `;
                dashboardView.parentNode.appendChild(expensesView);
            }
        }

        // Setup navigation AFTER creating all views
        this.setupNavigation('doctor');
    },

    // Handle Sidebar Navigation (Tab Switching)
    setupNavigation(role) {
        const links = document.querySelectorAll('.sidebar-link');
        const sections = document.querySelectorAll('.dashboard-section');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');

                // Update specific section title if needed

                // Active State for Links
                links.forEach(l => {
                    l.classList.remove('bg-primary/10', 'text-primary', 'font-bold');
                    l.classList.add('text-gray-600', 'hover:bg-gray-50');
                });
                link.classList.remove('text-gray-600', 'hover:bg-gray-50');
                link.classList.add('bg-primary/10', 'text-primary', 'font-bold');

                // Show Target Section
                sections.forEach(s => s.classList.add('hidden'));
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.remove('hidden');
                } else if (role === 'doctor') {
                    // Keep dashboard visible if other sections don't exist
                    document.getElementById('view-dashboard').classList.remove('hidden');
                }
            });
        });
    },

    renderStats() {
        // Patient stats logic (kept simple)
        // In a real app, calculate from data
        const appointments = DataService.getAppointments();
        const pending = appointments.filter(a => a.status === 'confirmed').length;
        // Update UI counters if they existed with specific IDs
    },

    renderAppointments() {
        const appointments = DataService.getAppointments();
        const listContainer = document.getElementById('appointments-list');
        const fullListContainer = document.getElementById('all-appointments-list'); // For the full view tab

        if (listContainer) {
            listContainer.innerHTML = appointments.slice(0, 2).map(appt => this.createAppointmentCard(appt)).join('');
        }

        if (fullListContainer) {
            fullListContainer.innerHTML = appointments.map(appt => this.createAppointmentCard(appt, true)).join('');
        }
    },

    createAppointmentCard(appt, detailed = false) {
        return `
        <div class="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all mb-3">
            <div class="w-14 h-14 bg-white rounded-xl flex flex-col items-center justify-center shadow-sm text-center border border-gray-100">
                <span class="text-xs font-bold text-gray-400 uppercase">${appt.date.split(' ')[1]}</span>
                <span class="text-xl font-black text-dark">${appt.date.split(' ')[0]}</span>
            </div>
            <div class="flex-1">
                <h4 class="font-bold text-dark">${appt.title}</h4>
                <p class="text-sm text-gray-500"><i class="fa-regular fa-clock mr-1"></i> ${appt.time} • ${appt.doctor}</p>
                ${detailed ? `<p class="text-xs text-gray-400 mt-1">${appt.description}</p>` : ''}
            </div>
            <button onclick="Dashboard.showAppointmentDetails(${appt.id})" class="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-all">
                Détails
            </button>
        </div>
        `;
    },

    setupInteractions() {
        // Event Delegation for all dashboard actions
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-action]');
            const navTarget = e.target.closest('[data-target]');

            // Handle Navigation (In-content links)
            if (navTarget && !navTarget.classList.contains('sidebar-link')) {
                e.preventDefault();
                const targetId = navTarget.dataset.target;
                const sidebarLink = document.querySelector(`.sidebar-link[data-target="${targetId}"]`);
                if (sidebarLink) sidebarLink.click();
            }

            // Handle Actions
            if (target) {
                e.preventDefault();
                e.stopPropagation(); // Prevent bubbling issues
                const action = target.dataset.action;
                const payload = target.dataset.payload;
                this.handleAction(action, payload, target);
            }

            // Handle Invoice Filter Menu Toggle
            const invoiceFilterBtn = document.getElementById('invoice-filter-btn');
            const invoiceFilterMenu = document.getElementById('invoice-filter-menu');

            if (invoiceFilterBtn && e.target.closest('#invoice-filter-btn')) {
                e.stopPropagation();
                invoiceFilterMenu.classList.toggle('hidden');
            } else if (invoiceFilterMenu && !invoiceFilterMenu.classList.contains('hidden')) {
                // Handle filter selection
                const filterBtn = e.target.closest('[data-filter]');
                if (filterBtn) {
                    const filter = filterBtn.dataset.filter;
                    this.filterInvoices(filter);
                    document.getElementById('invoice-filter-label').textContent = filterBtn.textContent.trim();
                    invoiceFilterMenu.classList.add('hidden');
                } else if (!e.target.closest('#invoice-filter-menu')) {
                    invoiceFilterMenu.classList.add('hidden');
                }
            }

            // Handle Expense Filter Menu Toggle
            const expenseFilterBtn = document.getElementById('expense-filter-btn');
            const expenseFilterMenu = document.getElementById('expense-filter-menu');

            if (expenseFilterBtn && e.target.closest('#expense-filter-btn')) {
                e.stopPropagation();
                expenseFilterMenu.classList.toggle('hidden');
            } else if (expenseFilterMenu && !expenseFilterMenu.classList.contains('hidden')) {
                // Handle filter selection
                const filterBtn = e.target.closest('[data-expense-filter]');
                if (filterBtn) {
                    const filter = filterBtn.dataset.expenseFilter;
                    this.filterExpenses(filter);
                    document.getElementById('expense-filter-label').textContent = filterBtn.textContent.trim();
                    expenseFilterMenu.classList.add('hidden');
                } else if (!e.target.closest('#expense-filter-menu')) {
                    expenseFilterMenu.classList.add('hidden');
                }
            }
        });

        // Handle Expense Date Picker
        const expenseDatePicker = document.getElementById('expense-date-picker');
        if (expenseDatePicker) {
            expenseDatePicker.addEventListener('change', (e) => {
                const selectedDate = e.target.value; // Format: YYYY-MM-DD
                if (selectedDate) {
                    this.filterExpensesByCustomDate(selectedDate);
                    // Update filter label
                    const dateParts = selectedDate.split('-');
                    const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
                    const formattedDate = dateObj.getDate() + ' ' + dateObj.toLocaleString('fr-FR', { month: 'short' });
                    document.getElementById('expense-filter-label').textContent = formattedDate;
                }
            });
        }
    },

    handleAction(action, payload, element) {
        switch (action) {
            // --- PATIENTS ---
            case 'new-patient':
                this.showModal('Nouveau Patient', `
                    <div class="space-y-4">
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label><input type="text" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"></div>
                        <div class="grid grid-cols-2 gap-4">
                             <div><label class="block text-sm font-medium text-gray-700 mb-1">Âge</label><input type="number" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"></div>
                             <div><label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label><input type="tel" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"></div>
                        </div>
                    </div>
                `, () => this.showToast('Patient ajouté avec succès !'));
                break;

            case 'view-patient-details':
                this.showModal('Détails Patient', `
                    <div class="text-center mb-6">
                        <div class="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center text-2xl text-gray-500"><i class="fa-solid fa-user"></i></div>
                        <h3 class="font-bold text-xl text-dark">Jean Dupont</h3>
                        <p class="text-sm text-gray-500">45 ans • Dépression sévère</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div class="bg-gray-50 p-3 rounded-xl"><span class="block text-gray-400 text-xs uppercase font-bold">Dernière visite</span>20 Dec 2024</div>
                        <div class="bg-gray-50 p-3 rounded-xl"><span class="block text-gray-400 text-xs uppercase font-bold">Prochain RDV</span>05 Jan 2025</div>
                    </div>
                `);
                break;

            // --- APPOINTMENTS ---
            case 'new-appointment':
                this.showModal('Nouveau Rendez-vous', `
                     <div class="space-y-4">
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Patient <span class="text-red-500">*</span></label><input id="appt-patient" type="text" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none" required></div>
                        <div class="grid grid-cols-2 gap-4">
                             <div><label class="block text-sm font-medium text-gray-700 mb-1">Date</label><input id="appt-date" type="text" placeholder="Aujourd'hui" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"></div>
                             <div><label class="block text-sm font-medium text-gray-700 mb-1">Heure <span class="text-red-500">*</span></label><input id="appt-time" type="time" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none" required></div>
                        </div>
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Type de consultation</label><select id="appt-type" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"><option>Consultation Initiale</option><option>Suivi</option><option>Urgence</option><option>Contrôle</option></select></div>
                    </div>
                `, () => {
                    const patient = document.getElementById('appt-patient').value.trim();
                    const date = document.getElementById('appt-date').value.trim();
                    const time = document.getElementById('appt-time').value.trim();
                    const type = document.getElementById('appt-type').value;

                    if (!patient || !time) {
                        alert('Le nom du patient et l\'heure sont obligatoires.');
                        return;
                    }

                    const newAppointment = DataService.addAppointment({
                        patient,
                        date: date || "Aujourd'hui",
                        time,
                        type
                    });

                    // Refresh the schedule view
                    this.refreshScheduleView();

                    this.showToast(`RDV ajouté : ${patient} à ${time}`);
                });
                break;

            case 'validate-appt':
                element.closest('.flex.justify-between').querySelector('.min-w-fit').innerHTML = `<span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">Confirmé</span>`;
                this.showToast('Rendez-vous confirmé');
                break;

            case 'cancel-appt':
                if (confirm('Annuler ce rendez-vous ?')) {
                    element.closest('.flex.items-center.justify-between').remove();
                    this.showToast('Rendez-vous annulé');
                }
                break;

            // --- PRESCRIPTIONS ---
            case 'new-prescription':
                this.showModal('Nouvelle Ordonnance', `
                     <div class="space-y-4">
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Patient</label><input type="text" placeholder="Rechercher..." class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"></div>
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Médicaments</label><textarea rows="3" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"></textarea></div>
                    </div>
                `, () => this.showToast('Ordonnance créée !'));
                break;

            case 'print-prescription':
                this.showToast('🖨️ Impression en cours...');
                break;

            // --- MESSAGES ---
            case 'new-message':
                this.showModal('Nouveau Message', `
                    <div class="space-y-4">
                         <div><label class="block text-sm font-medium text-gray-700 mb-1">Destinataire</label><select class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"><option>Jean Dupont</option><option>Marie Claire</option></select></div>
                         <div><label class="block text-sm font-medium text-gray-700 mb-1">Message</label><textarea rows="4" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"></textarea></div>
                    </div>
                `, () => this.showToast('Message envoyé !'));
                break;

            case 'read-message':
                // Expand handling or show modal
                const msgCard = element;
                const preview = msgCard.querySelector('.line-clamp-1');
                if (preview) {
                    alert("Contenu complet du message : \n\n" + preview.textContent + "...");
                    // In real app, open full view
                }
                break;

            // --- MEDICAL RECORDS ---
            case 'new-record':
                this.showModal('Nouveau Dossier Médical', `
                    <div class="space-y-4">
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Nom du Patient <span class="text-red-500">*</span></label><input id="record-patient" type="text" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none" required></div>
                        <div class="grid grid-cols-2 gap-4">
                            <div><label class="block text-sm font-medium text-gray-700 mb-1">Groupe Sanguin</label><input id="record-blood" type="text" placeholder="ex: A+" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"></div>
                            <div><label class="block text-sm font-medium text-gray-700 mb-1">Allergies</label><input id="record-allergies" type="text" placeholder="ex: Pénicilline" class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"></div>
                        </div>
                        <div><label class="block text-sm font-medium text-gray-700 mb-1">Antécédents Médicaux</label><textarea id="record-history" rows="3" placeholder="Historique médical du patient..." class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary focus:outline-none"></textarea></div>
                    </div>
                `, () => {
                    const patient = document.getElementById('record-patient').value.trim();
                    const bloodGroup = document.getElementById('record-blood').value.trim();
                    const allergies = document.getElementById('record-allergies').value.trim();
                    const history = document.getElementById('record-history').value.trim();

                    if (!patient) {
                        alert('Le nom du patient est obligatoire.');
                        return;
                    }

                    const newRecord = DataService.addMedicalRecord({
                        patient,
                        bloodGroup,
                        allergies,
                        history
                    });

                    // Refresh the medical records view
                    this.refreshMedicalRecordsView();

                    this.showToast(`Dossier ${newRecord.id} créé pour ${patient} !`);
                });
                break;

            case 'view-record-full':
                this.showModal('Dossier Médical Complet', `
                    <div class="space-y-4 max-h-[60vh] overflow-y-auto">
                        <div class="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-4 items-center">
                             <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">JD</div>
                             <div><h3 class="font-bold text-dark">Jean Dupont</h3><p class="text-sm text-blue-600">Né le 12/05/1980</p></div>
                        </div>
                        <div><h4 class="font-bold text-gray-700 mb-2 border-b pb-1">Antécédents</h4><p class="text-sm text-gray-600">Hypertension artérielle, Diabète de type 2 (stabilisé).</p></div>
                        <div><h4 class="font-bold text-gray-700 mb-2 border-b pb-1">Allergies</h4><p class="text-sm text-red-500 font-bold">Pénicilline (Choc anaphylactique)</p></div>
                         <div><h4 class="font-bold text-gray-700 mb-2 border-b pb-1">Consultations Récentes</h4>
                            <ul class="text-sm space-y-2">
                                <li class="flex justify-between"><span>20 Dec 2024</span><span class="font-medium">Suivi semestriel</span></li>
                                <li class="flex justify-between"><span>10 Jun 2024</span><span class="font-medium">Urgence (Vertiges)</span></li>
                            </ul>
                         </div>
                    </div>
                `);
                break;

            // --- INVOICES ---
            case 'download-invoice':
                this.showToast('📥 Téléchargement de la facture...');
                break;

            case 'filter-invoices':
                this.showToast('Filtres affichés (Simulation)');
                break;
        }
    },

    showModal(title, content, onConfirm) {
        const modalId = 'dashboard-modal';
        let modal = document.getElementById(modalId);

        if (!modal) {
            modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300';
            modal.innerHTML = `
                <div class="bg-white rounded-3xl w-full max-w-md p-6 transform scale-95 transition-transform duration-300 shadow-2xl">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="font-display font-bold text-xl text-dark" id="modal-title"></h3>
                        <button onclick="document.getElementById('${modalId}').classList.add('opacity-0', 'pointer-events-none');" class="text-gray-400 hover:text-red-500 transition-colors"><i class="fa-solid fa-xmark text-xl"></i></button>
                    </div>
                    <div id="modal-content" class="mb-6"></div>
                    <div class="flex justify-end gap-3">
                         <button onclick="document.getElementById('${modalId}').classList.add('opacity-0', 'pointer-events-none');" class="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors">Fermer</button>
                         <button id="modal-confirm" class="px-6 py-2 rounded-xl bg-primary text-white font-bold hover:bg-purple-700 transition-colors hidden">Valider</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        modal.querySelector('#modal-title').textContent = title;
        modal.querySelector('#modal-content').innerHTML = content;

        const confirmBtn = modal.querySelector('#modal-confirm');
        if (onConfirm) {
            confirmBtn.classList.remove('hidden');
            confirmBtn.onclick = () => {
                onConfirm();
                modal.classList.add('opacity-0', 'pointer-events-none');
            };
        } else {
            confirmBtn.classList.add('hidden');
        }

        // Show
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.querySelector('.transform').classList.remove('scale-95');
        modal.querySelector('.transform').classList.add('scale-100');
    },

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-xl transform translate-y-10 opacity-0 transition-all duration-300 z-50 flex items-center gap-3 font-medium';
        toast.innerHTML = `<i class="fa-solid fa-circle-check text-green-400 text-xl"></i> ${message}`;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
        });

        setTimeout(() => {
            toast.classList.add('translate-y-10', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    showAppointmentDetails(id) {
        // Legacy support or redirect to new modal logic
        const appt = DataService.getAppointments().find(a => a.id === id);
        if (appt) {
            this.showModal('Détails RDV', `<p><strong>Objet:</strong> ${appt.title}</p><p>${appt.description}</p>`);
        }
    },

    refreshScheduleView() {
        const scheduleView = document.getElementById('view-schedule');
        if (!scheduleView) return;

        const scheduleList = scheduleView.querySelector('.space-y-4');
        if (scheduleList) {
            scheduleList.innerHTML = DataService.getDoctorSchedule().map(appt => `
                <div class="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div class="flex items-center gap-6">
                         <div class="flex flex-col items-center justify-center w-16 h-16 bg-primary/5 rounded-xl text-primary font-bold border border-primary/10">
                            <span class="text-xl">${appt.time.split(':')[0]}</span>
                            <span class="text-xs uppercase">H</span>
                         </div>
                         <div>
                            <h4 class="font-bold text-xl text-dark">${appt.patient}</h4>
                            <div class="flex items-center gap-4 mt-1">
                                <p class="text-sm text-gray-500"><i class="fa-regular fa-clock mr-1"></i> ${appt.time}</p>
                                <p class="text-sm text-gray-500"><i class="fa-solid fa-tag mr-1"></i> ${appt.type}</p>
                            </div>
                         </div>
                    </div>
                    <div class="flex gap-3">
                        <button class="p-2 text-gray-400 hover:text-red-500 tooltip" title="Annuler"><i class="fa-solid fa-xmark"></i></button>
                        <button class="p-2 text-gray-400 hover:text-green-500 tooltip" title="Valider"><i class="fa-solid fa-check"></i></button>
                    </div>
                </div>
            `).join('');
        }
    },

    refreshMedicalRecordsView() {
        const recordsView = document.getElementById('view-medical-records');
        if (!recordsView) return;

        const recordsGrid = recordsView.querySelector('.grid');
        if (recordsGrid) {
            recordsGrid.innerHTML = DataService.getMedicalRecords().map(rec => `
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group">
                    <button class="absolute top-6 right-6 text-gray-400 hover:text-primary"><i class="fa-solid fa-pen-to-square"></i></button>
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl font-bold">
                            ${rec.patient.charAt(0)}
                        </div>
                        <div>
                            <h4 class="font-bold text-lg text-dark">${rec.patient}</h4>
                            <p class="text-sm text-gray-500">Dossier #${rec.id}</p>
                        </div>
                    </div>
                    <div class="space-y-3 mb-4">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500">Groupe Sanguin</span>
                            <span class="font-bold text-dark">${rec.bloodGroup}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500">Allergies</span>
                            <span class="font-bold text-red-500">${rec.allergies}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-500">Dernière Consultation</span>
                            <span class="font-bold text-dark">${rec.lastConsult}</span>
                        </div>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-xl">
                        <p class="text-xs text-gray-500 uppercase font-bold mb-1">Antécédents</p>
                        <p class="text-sm text-gray-700">${rec.history}</p>
                    </div>
                    <button class="w-full mt-4 py-2 border border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-colors">
                        Voir le dossier complet
                    </button>
                </div>
            `).join('');
        }
    },

    filterInvoices(filter) {
        const invoicesView = document.getElementById('view-invoices');
        if (!invoicesView) return;

        const tbody = invoicesView.querySelector('tbody');
        if (!tbody) return;

        const invoices = DataService.getInvoices();

        if (filter === 'total') {
            // Calculate and show totals
            const paid = invoices.filter(inv => inv.status === 'Payée').reduce((sum, inv) => sum + parseFloat(inv.amount.replace(' $', '')), 0);
            const unpaid = invoices.filter(inv => inv.status === 'En attente').reduce((sum, inv) => sum + parseFloat(inv.amount.replace(' $', '')), 0);
            const total = paid + unpaid;

            tbody.innerHTML = `
                <tr class="bg-green-50">
                    <td colspan="3" class="p-6 font-bold text-green-700">Total Payé</td>
                    <td class="p-6 font-bold text-green-700 text-xl">${paid.toFixed(2)} $</td>
                    <td colspan="2"></td>
                </tr>
                <tr class="bg-yellow-50">
                    <td colspan="3" class="p-6 font-bold text-yellow-700">Total Impayé</td>
                    <td class="p-6 font-bold text-yellow-700 text-xl">${unpaid.toFixed(2)} $</td>
                    <td colspan="2"></td>
                </tr>
                <tr class="bg-purple-50">
                    <td colspan="3" class="p-6 font-bold text-purple-700 text-lg">TOTAL GÉNÉRAL</td>
                    <td class="p-6 font-bold text-purple-700 text-2xl">${total.toFixed(2)} $</td>
                    <td colspan="2"></td>
                </tr>
            `;
        } else {
            // Filter invoices
            let filtered = invoices;
            if (filter === 'paid') {
                filtered = invoices.filter(inv => inv.status === 'Payée');
            } else if (filter === 'unpaid') {
                filtered = invoices.filter(inv => inv.status === 'En attente');
            }

            tbody.innerHTML = filtered.map(inv => `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="p-6 font-mono text-sm text-gray-500">${inv.id}</td>
                    <td class="p-6 font-bold text-dark">${inv.patient}</td>
                    <td class="p-6 text-gray-600">${inv.date}</td>
                    <td class="p-6 font-bold text-dark">${inv.amount}</td>
                    <td class="p-6">
                        <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${inv.status === 'Payée' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}">
                            ${inv.status}
                        </span>
                    </td>
                    <td class="p-6 text-right">
                        <button class="text-gray-400 hover:text-primary tooltip" title="Télécharger"><i class="fa-solid fa-download"></i></button>
                    </td>
                </tr>
            `).join('');
        }
    },

    filterExpenses(filter) {
        const expensesView = document.getElementById('view-expenses');
        if (!expensesView) return;

        const expenses = DataService.getExpenses();
        const desktopTbody = expensesView.querySelector('.hidden.md\\:block tbody');
        const mobileContainer = expensesView.querySelector('.md\\:hidden');

        if (filter === 'total') {
            // Calculate totals
            const paid = expenses.filter(exp => exp.status === 'Payée').reduce((sum, exp) => sum + parseFloat(exp.amount.replace(' $', '')), 0);
            const pending = expenses.filter(exp => exp.status === 'En attente').reduce((sum, exp) => sum + parseFloat(exp.amount.replace(' $', '')), 0);
            const total = paid + pending;

            // Desktop view
            if (desktopTbody) {
                desktopTbody.innerHTML = `
                    <tr class="bg-green-50">
                        <td colspan="3" class="p-6 font-bold text-green-700">Total Payé</td>
                        <td class="p-6 font-bold text-green-700 text-xl">${paid.toFixed(2)} $</td>
                        <td colspan="2"></td>
                    </tr>
                    <tr class="bg-yellow-50">
                        <td colspan="3" class="p-6 font-bold text-yellow-700">Total En attente</td>
                        <td class="p-6 font-bold text-yellow-700 text-xl">${pending.toFixed(2)} $</td>
                        <td colspan="2"></td>
                    </tr>
                    <tr class="bg-purple-50">
                        <td colspan="3" class="p-6 font-bold text-purple-700 text-lg">TOTAL DÉPENSES</td>
                        <td class="p-6 font-bold text-purple-700 text-2xl">${total.toFixed(2)} $</td>
                        <td colspan="2"></td>
                    </tr>
                `;
            }

            // Mobile view
            if (mobileContainer) {
                mobileContainer.innerHTML = `
                    <div class="bg-green-50 p-5 rounded-2xl border border-green-100">
                        <p class="text-sm text-green-600 font-medium mb-1">Total Payé</p>
                        <p class="text-3xl font-bold text-green-700">${paid.toFixed(2)} $</p>
                    </div>
                    <div class="bg-yellow-50 p-5 rounded-2xl border border-yellow-100">
                        <p class="text-sm text-yellow-600 font-medium mb-1">Total En attente</p>
                        <p class="text-3xl font-bold text-yellow-700">${pending.toFixed(2)} $</p>
                    </div>
                    <div class="bg-purple-50 p-5 rounded-2xl border border-purple-100">
                        <p class="text-sm text-purple-600 font-bold mb-1">TOTAL DÉPENSES</p>
                        <p class="text-4xl font-bold text-purple-700">${total.toFixed(2)} $</p>
                    </div>
                `;
            }
        } else {
            // Filter expenses
            let filtered = expenses;
            const today = new Date();
            const currentMonth = today.toLocaleString('fr-FR', { month: 'short' });
            const currentYear = today.getFullYear();

            if (filter === 'paid') {
                filtered = expenses.filter(exp => exp.status === 'Payée');
            } else if (filter === 'pending') {
                filtered = expenses.filter(exp => exp.status === 'En attente');
            } else if (filter === 'unpaid') {
                filtered = expenses.filter(exp => exp.status === 'En attente');
            } else if (filter === 'today') {
                // Filter by today's date (for demo, filtering by "20 Jan")
                const todayStr = today.getDate() + ' ' + today.toLocaleString('fr-FR', { month: 'short' });
                filtered = expenses.filter(exp => exp.date.startsWith(todayStr));
            } else if (filter === 'month') {
                // Filter by current month
                filtered = expenses.filter(exp => {
                    const expMonth = exp.date.split(' ')[1]; // Extract month from "20 Jan 2025"
                    return expMonth === currentMonth || expMonth === 'Jan'; // Include Jan for demo
                });
            }

            // Desktop view
            if (desktopTbody) {
                if (filtered.length === 0) {
                    desktopTbody.innerHTML = `
                        <tr>
                            <td colspan="6" class="p-6 text-center text-gray-500">
                                <i class="fa-solid fa-inbox text-4xl mb-2"></i>
                                <p class="font-medium">Aucune dépense trouvée pour ce filtre</p>
                            </td>
                        </tr>
                    `;
                } else {
                    desktopTbody.innerHTML = filtered.map(exp => `
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="p-6 text-gray-600">${exp.date}</td>
                            <td class="p-6">
                                <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${exp.category === 'Matériel' ? 'bg-blue-50 text-blue-600' : exp.category === 'Salaires' ? 'bg-purple-50 text-purple-600' : 'bg-gray-50 text-gray-600'}">
                                    ${exp.category}
                                </span>
                            </td>
                            <td class="p-6 text-gray-700">${exp.description}</td>
                            <td class="p-6 font-bold text-red-600">${exp.amount}</td>
                            <td class="p-6">
                                <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${exp.status === 'Payée' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}">
                                    ${exp.status}
                                </span>
                            </td>
                            <td class="p-6 text-right">
                                <button class="text-gray-400 hover:text-primary tooltip" title="Modifier"><i class="fa-solid fa-pen-to-square"></i></button>
                            </td>
                        </tr>
                    `).join('');
                }
            }

            // Mobile view
            if (mobileContainer) {
                if (filtered.length === 0) {
                    mobileContainer.innerHTML = `
                        <div class="text-center py-12 text-gray-500">
                            <i class="fa-solid fa-inbox text-6xl mb-4"></i>
                            <p class="font-medium text-lg">Aucune dépense trouvée</p>
                            <p class="text-sm">Essayez un autre filtre</p>
                        </div>
                    `;
                } else {
                    mobileContainer.innerHTML = filtered.map(exp => `
                        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                            <div class="flex justify-between items-start mb-3">
                                <div>
                                    <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${exp.category === 'Matériel' ? 'bg-blue-50 text-blue-600' : exp.category === 'Salaires' ? 'bg-purple-50 text-purple-600' : 'bg-gray-50 text-gray-600'}">
                                        ${exp.category}
                                    </span>
                                </div>
                                <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${exp.status === 'Payée' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}">
                                    ${exp.status}
                                </span>
                            </div>
                            <p class="text-gray-700 font-medium mb-2">${exp.description}</p>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-500"><i class="fa-regular fa-calendar mr-1"></i>${exp.date}</span>
                                <span class="text-xl font-bold text-red-600">${exp.amount}</span>
                            </div>
                            <button class="w-full mt-3 py-2 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                                <i class="fa-solid fa-pen-to-square mr-2"></i>Modifier
                            </button>
                        </div>
                    `).join('');
                }
            }
        }
    },

    filterExpensesByCustomDate(selectedDate) {
        const expensesView = document.getElementById('view-expenses');
        if (!expensesView) return;

        const expenses = DataService.getExpenses();
        const desktopTbody = expensesView.querySelector('.hidden.md\\:block tbody');
        const mobileContainer = expensesView.querySelector('.md\\:hidden');

        // Convert YYYY-MM-DD to "20 Jan 2025" format for comparison
        const dateParts = selectedDate.split('-');
        const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        const formattedSearchDate = dateObj.getDate() + ' ' + dateObj.toLocaleString('fr-FR', { month: 'short' }) + ' ' + dateParts[0];

        // Filter expenses by the selected date
        const filtered = expenses.filter(exp => exp.date === formattedSearchDate);

        // Desktop view
        if (desktopTbody) {
            if (filtered.length === 0) {
                desktopTbody.innerHTML = `
                    <tr>
                        <td colspan="6" class="p-6 text-center text-gray-500">
                            <i class="fa-solid fa-calendar-xmark text-4xl mb-2"></i>
                            <p class="font-medium">Aucune dépense pour le ${formattedSearchDate}</p>
                        </td>
                    </tr>
                `;
            } else {
                desktopTbody.innerHTML = filtered.map(exp => `
                    <tr class="hover:bg-gray-50 transition-colors">
                        <td class="p-6 text-gray-600">${exp.date}</td>
                        <td class="p-6">
                            <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${exp.category === 'Matériel' ? 'bg-blue-50 text-blue-600' : exp.category === 'Salaires' ? 'bg-purple-50 text-purple-600' : 'bg-gray-50 text-gray-600'}">
                                ${exp.category}
                            </span>
                        </td>
                        <td class="p-6 text-gray-700">${exp.description}</td>
                        <td class="p-6 font-bold text-red-600">${exp.amount}</td>
                        <td class="p-6">
                            <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${exp.status === 'Payée' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}">
                                ${exp.status}
                            </span>
                        </td>
                        <td class="p-6 text-right">
                            <button class="text-gray-400 hover:text-primary tooltip" title="Modifier"><i class="fa-solid fa-pen-to-square"></i></button>
                        </td>
                    </tr>
                `).join('');
            }
        }

        // Mobile view
        if (mobileContainer) {
            if (filtered.length === 0) {
                mobileContainer.innerHTML = `
                    <div class="text-center py-12 text-gray-500">
                        <i class="fa-solid fa-calendar-xmark text-6xl mb-4"></i>
                        <p class="font-medium text-lg">Aucune dépense trouvée</p>
                        <p class="text-sm">pour le ${formattedSearchDate}</p>
                    </div>
                `;
            } else {
                mobileContainer.innerHTML = filtered.map(exp => `
                    <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${exp.category === 'Matériel' ? 'bg-blue-50 text-blue-600' : exp.category === 'Salaires' ? 'bg-purple-50 text-purple-600' : 'bg-gray-50 text-gray-600'}">
                                    ${exp.category}
                                </span>
                            </div>
                            <span class="px-2 py-1 rounded-md text-xs font-bold uppercase ${exp.status === 'Payée' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}">
                                ${exp.status}
                            </span>
                        </div>
                        <p class="text-gray-700 font-medium mb-2">${exp.description}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500"><i class="fa-regular fa-calendar mr-1"></i>${exp.date}</span>
                            <span class="text-xl font-bold text-red-600">${exp.amount}</span>
                        </div>
                        <button class="w-full mt-3 py-2 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                            <i class="fa-solid fa-pen-to-square mr-2"></i>Modifier
                        </button>
                    </div>
                `).join('');
            }
        }
    }
};
