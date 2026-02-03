/**
 * Data Service for Clinique Onyx
 * Manages mock data for the dashboard with LocalStorage persistence
 */

const DataService = {
    init() {
        if (!localStorage.getItem('onyx_appointments')) {
            this.seedData();
        }
    },

    seedData() {
        // Seed Patient Appointments
        const appointments = [
            {
                id: 1,
                title: "Consultation Psychologique",
                doctor: "Dr. Kabedi",
                date: "24 Déc",
                time: "10:00 - 11:00",
                type: "Psychiatrie",
                status: "confirmed",
                description: "Suivi mensuel habituel."
            },
            {
                id: 2,
                title: "Suivi Médical",
                doctor: "Dr. Mbemba",
                date: "05 Jan",
                time: "14:30 - 15:00",
                type: "Général",
                status: "pending",
                description: "Renouvellement d'ordonnance."
            }
        ];
        localStorage.setItem('onyx_appointments', JSON.stringify(appointments));

        // Seed Doctor Schedule (Patients for the doctor)
        const doctorSchedule = [
            {
                id: 101,
                patient: "Jean Dupont",
                date: "Aujourd'hui",
                time: "09:00",
                type: "Consultation Initiale",
                status: "confirmed"
            },
            {
                id: 102,
                patient: "Marie Claire",
                date: "Aujourd'hui",
                time: "10:30",
                type: "Suivi",
                status: "confirmed"
            },
            {
                id: 103,
                patient: "Paul Martin",
                date: "Demain",
                time: "14:00",
                type: "Urgence",
                status: "pending"
            }
        ];
        localStorage.setItem('onyx_doctor_schedule', JSON.stringify(doctorSchedule));

        // Seed Doctor Messages (Messages from Patients)
        const doctorMessages = [
            {
                id: 201,
                from: "Jean Dupont",
                subject: "Question sur le traitement",
                date: "Auj, 08:15",
                preview: "Bonjour Docteur, j'ai une question concernant la posologie...",
                unread: true
            },
            {
                id: 202,
                from: "Sophie Martin",
                subject: "Demande de RDV urgent",
                date: "Hier, 18:30",
                preview: "Est-il possible de passer vous voir demain ?",
                unread: false
            }
        ];
        localStorage.setItem('onyx_doctor_messages', JSON.stringify(doctorMessages));

        // Seed Messages
        const messages = [
            {
                id: 1,
                from: "Dr. Kabedi",
                subject: "Compte rendu séance",
                date: "Auj, 09:30",
                preview: "Bonjour, voici le résumé de notre..."
            }
        ];
        localStorage.setItem('onyx_messages', JSON.stringify(messages));
    },

    getAppointments() {
        return JSON.parse(localStorage.getItem('onyx_appointments') || '[]');
    },

    getDoctorSchedule() {
        return JSON.parse(localStorage.getItem('onyx_doctor_schedule') || '[]');
    },

    getMessages() {
        return JSON.parse(localStorage.getItem('onyx_messages') || '[]');
    },

    getDoctorMessages() {
        return JSON.parse(localStorage.getItem('onyx_doctor_messages') || '[]');
    },

    getPatients() {
        return [
            { id: 1, name: "Jean Dupont", age: 45, lastVisit: "20 Dec 2024", status: "Actif", condition: "Dépression sévère" },
            { id: 2, name: "Marie Claire", age: 32, lastVisit: "15 Dec 2024", status: "Suivi", condition: "Troubles anxieux" },
            { id: 3, name: "Paul Martin", age: 28, lastVisit: "10 Nov 2024", status: "En attente", condition: "Insomnie" },
            { id: 4, name: "Sophie Martin", age: 35, lastVisit: "02 Dec 2024", status: "Actif", condition: "Bipolarité" }
        ];
    },

    getDoctorStats() {
        return {
            patientsTotal: 124,
            consultationsMonth: 45,
            newPatients: 12,
            satisfaction: 4.8
        };
    },

    getPrescriptions() {
        return [
            { id: 'ORD-001', patient: "Jean Dupont", date: "20 Dec 2024", meds: "Alprazolam 0.5mg, Sertraline 50mg", status: "Délivrée" },
            { id: 'ORD-002', patient: "Marie Claire", date: "15 Dec 2024", meds: "Diazépam 10mg", status: "En cours" },
            { id: 'ORD-003', patient: "Sophie Martin", date: "02 Dec 2024", meds: "Lithium 400mg", status: "Renouvellement" }
        ];
    },

    getInvoices() {
        return [
            { id: 'FACT-2024-089', patient: "Jean Dupont", date: "20 Dec 2024", amount: "50.00 $", status: "Payée" },
            { id: 'FACT-2024-088', patient: "Marie Claire", date: "15 Dec 2024", amount: "45.00 $", status: "En attente" },
            { id: 'FACT-2024-075', patient: "Paul Martin", date: "10 Nov 2024", amount: "60.00 $", status: "Payée" }
        ];
    },

    getMedicalRecords() {
        return [
            { id: 'DOS-001', patient: "Jean Dupont", bloodGroup: "A+", allergies: "Pénicilline", history: "Hypertension, Diabète Type 2", lastConsult: "20 Dec 2024" },
            { id: 'DOS-002', patient: "Marie Claire", bloodGroup: "O+", allergies: "Aucune", history: "Asthme léger", lastConsult: "15 Dec 2024" },
            { id: 'DOS-003', patient: "Paul Martin", bloodGroup: "B-", allergies: "Arachides", history: "Fracture Tibia (2020)", lastConsult: "10 Nov 2024" },
            { id: 'DOS-004', patient: "Sophie Martin", bloodGroup: "AB+", allergies: "Aspirine", history: "Migraines chroniques", lastConsult: "02 Dec 2024" }
        ];
    }
};

// Initialize on load
DataService.init();
