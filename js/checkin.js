/* ============================ */
/* ✅ CHECK-IN DIARIO            */
/* ============================ */

const HABITS = {
    readVerse: 'Leer versículo del día',
    prayerTime: 'Tiempo de oración',
};

// Inicializa el sistema de check-in
function initializeCheckin() {
    const checkinContainer = document.getElementById('daily-checkin-container');
    if (!checkinContainer) return; // No ejecutar si el contenedor no existe en la página

    const today = new Date().toDateString();
    let checkinData = getCheckinData();

    if (checkinData.date !== today) {
        // Es un nuevo día, reseteamos los hábitos
        checkinData = {
            date: today,
            habits: {
                readVerse: false,
                prayerTime: false,
            },
        };
    }

    saveCheckinData(checkinData);
    updateCheckinUI();
}

// Obtiene los datos del check-in desde localStorage
function getCheckinData() {
    return JSON.parse(localStorage.getItem('dailyCheckin')) || {
        date: null,
        habits: {
            readVerse: false,
            prayerTime: false,
        },
    };
}

// Guarda los datos del check-in en localStorage
function saveCheckinData(data) {
    localStorage.setItem('dailyCheckin', JSON.stringify(data));
}

// Marca un hábito como completado
function completeHabit(habitName) {
    let checkinData = getCheckinData();
    const today = new Date().toDateString();

    if (checkinData.date !== today) {
        checkinData = {
            date: today,
            habits: { readVerse: false, prayerTime: false },
        };
    }

    if (checkinData.habits[habitName] === false) {
        checkinData.habits[habitName] = true;
        saveCheckinData(checkinData);
        updateCheckinUI();
        showNotification(`¡Hábito completado: ${HABITS[habitName]}!`, '✅');
        checkIfAllHabitsAreDone();
    }
}

// Actualiza la interfaz de usuario del check-in
function updateCheckinUI() {
    const checkinContainer = document.getElementById('daily-checkin-container');
    if (!checkinContainer) return;

    const checkinData = getCheckinData();
    const today = new Date().toDateString();

    if (checkinData.date !== today) {
        document.getElementById('habit-readVerse-checkbox').checked = false;
        document.getElementById('habit-prayerTime-checkbox').checked = false;
        updateCompletionStatus(false);
        return;
    }

    document.getElementById('habit-readVerse-checkbox').checked = checkinData.habits.readVerse;
    document.getElementById('habit-prayerTime-checkbox').checked = checkinData.habits.prayerTime;

    const allDone = areAllHabitsDone();
    updateCompletionStatus(allDone);
}

function areAllHabitsDone() {
    const checkinData = getCheckinData();
    return Object.values(checkinData.habits).every(status => status === true);
}

function checkIfAllHabitsAreDone() {
    if (areAllHabitsDone()) {
        updateCompletionStatus(true);
        showNotification('¡Felicidades! Completaste todos tus hábitos de hoy. 🎉', '🏆');
        if (typeof completeDay === 'function') {
            completeDay();
        }
    }
}

function updateCompletionStatus(isComplete) {
    const completionButton = document.getElementById('daily-checkin-completed-btn');
    const completionStatusText = document.getElementById('daily-checkin-status-text');

    if (completionButton && completionStatusText) {
        if (isComplete) {
            completionButton.style.display = 'flex';
            completionStatusText.style.display = 'block';
        } else {
            completionButton.style.display = 'none';
            completionStatusText.style.display = 'none';
        }
    }
}

function setupCheckinListeners() {
    const readVerseCheckbox = document.getElementById('habit-readVerse-checkbox');
    if (readVerseCheckbox) {
        readVerseCheckbox.addEventListener('change', () => {
            if (readVerseCheckbox.checked) {
                completeHabit('readVerse');
            }
        });
    }

    const prayerTimeCheckbox = document.getElementById('habit-prayerTime-checkbox');
    if (prayerTimeCheckbox) {
        prayerTimeCheckbox.addEventListener('change', () => {
            if (prayerTimeCheckbox.checked) {
                completeHabit('prayerTime');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeCheckin();
    setupCheckinListeners();
});

window.completeHabit = completeHabit;
window.initializeCheckin = initializeCheckin;
