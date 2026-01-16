/* ============================ */
/* 📖 SISTEMA DE VERSÍCULOS MEJORADO */
/* ============================ */

const verses = [
    { text: 'Todo lo puedo en Cristo que me fortalece.', ref: 'Filipenses 4:13', theme: 'fortaleza' },
    { text: 'Jehová es mi pastor; nada me faltará.', ref: 'Salmos 23:1', theme: 'provisión' },
    { text: 'Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.', ref: 'Mateo 6:33', theme: 'prioridades' },
    { text: 'Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo, porque Jehová tu Dios estará contigo dondequiera que vayas.', ref: 'Josué 1:9', theme: 'valor' },
    { text: 'Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces.', ref: 'Jeremías 33:3', theme: 'oración' },
    { text: 'Encomienda a Jehová tu camino, y confía en él; y él hará.', ref: 'Salmos 37:5', theme: 'confianza' },
    { text: 'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente.', ref: 'Salmos 91:1', theme: 'protección' },
    { text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.', ref: 'Juan 3:16', theme: 'amor' },
    { text: 'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.', ref: 'Romanos 8:28', theme: 'propósito' },
    { text: 'Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.', ref: 'Isaías 40:31', theme: 'esperanza' }
];

function loadVerse() {
    const randomIndex = Math.floor(Math.random() * verses.length);
    const verse = verses[randomIndex];
    
    const verseTextEl = document.getElementById('verse-text');
    const verseRefEl = document.getElementById('verse-ref');
    const verseThemeEl = document.getElementById('verse-theme');
    
    if (verseTextEl) verseTextEl.textContent = `"${verse.text}"`;
    if (verseRefEl) verseRefEl.textContent = verse.ref;
    if (verseThemeEl) verseThemeEl.textContent = verse.theme.toUpperCase();
    
    // Guardar versículo del día
    const today = new Date().toDateString();
    localStorage.setItem('dailyVerse', JSON.stringify({
        date: today,
        verse: verse
    }));
}

function copyVerse() {
    const text = document.getElementById('verse-text')?.textContent || '';
    const ref = document.getElementById('verse-ref')?.textContent || '';
    const message = `${text} ${ref}`;
    
    navigator.clipboard.writeText(message).then(() => {
        showNotification('Versículo copiado al portapapeles 📋', '✅');
    }).catch(err => {
        console.error('Error al copiar:', err);
        showNotification('Error al copiar el versículo', '❌');
    });
}

function shareVerse() {
    const text = document.getElementById('verse-text')?.textContent || '';
    const ref = document.getElementById('verse-ref')?.textContent || '';
    const message = `${text} ${ref}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Versículo del día - Jóvenes en Cristo',
            text: message,
            url: window.location.href
        }).then(() => {
            showNotification('Versículo compartido con éxito 🚀', '✅');
        }).catch(err => {
            console.error('Error al compartir:', err);
            copyVerse();
        });
    } else {
        copyVerse();
    }
}

/* ============================ */
/* 🔥 SISTEMA DE RACHAS MEJORADO */
/* ============================ */

function initializeStreakSystem() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    let streakData = JSON.parse(localStorage.getItem('streakData') || '{}');
    let streak = streakData.streak || 0;
    const lastDay = streakData.lastDay;
    
    // Verificar si ya completó hoy
    const todayCompleted = streakData.todayCompleted === today;
    
    // Resetear racha si pasó más de un día
    if (lastDay) {
        const lastDate = new Date(lastDay);
        const diffTime = Math.abs(new Date(today) - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 2) {
            streak = 0;
        }
    }
    
    // Actualizar display
    updateStreakDisplay(streak);
    updateTodayStatus(todayCompleted);
}

function updateStreakDisplay(streak) {
    const streakEl = document.getElementById('streak');
    const streakDisplay = document.getElementById('streak-display');
    
    if (streakEl) {
        const countSpan = streakEl.querySelector('.streak-count');
        if (countSpan) {
            countSpan.textContent = streak;
        } else {
            streakEl.innerHTML = `<span class="fire-icon">🔥</span><span class="streak-count">${streak}</span>`;
        }
        
        // Efectos visuales basados en la racha
        if (streak >= 7) {
            streakEl.style.background = 'linear-gradient(135deg, #f59e0b, #dc2626)';
            streakEl.style.animation = 'gentlePulse 2s infinite';
        }
        if (streak >= 30) {
            streakEl.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b, #dc2626)';
            streakEl.style.animation = 'pulse 1s infinite, rainbow 3s infinite';
        }
    }
    
    if (streakDisplay) {
        streakDisplay.textContent = `${streak} día${streak !== 1 ? 's' : ''} consecutivo${streak !== 1 ? 's' : ''}`;
    }
    
    // Actualizar días de la semana
    updateWeekDays(streak);
}

function updateWeekDays(streak) {
    const streakDays = document.querySelector('.streak-days');
    if (!streakDays) return;
    
    const days = streakDays.querySelectorAll('.day');
    const today = new Date().getDay();
    const adjustedToday = today === 0 ? 6 : today - 1; // Ajustar para L=0, D=6
    
    days.forEach((day, index) => {
        // Los días pasados (hasta hoy) están activos si hay racha
        if (index <= adjustedToday) {
            day.classList.add('active');
            // Para días anteriores a hoy, verificar si estaban activos
            if (index < adjustedToday) {
                // Esto se podría mejorar con historial
            }
        } else {
            day.classList.remove('active');
        }
    });
}

function updateTodayStatus(completed) {
    const completeBtn = document.getElementById('complete-devotional');
    if (!completeBtn) return;
    
    if (completed) {
        completeBtn.innerHTML = '<span class="btn-icon">✅</span>Devocional Completado';
        completeBtn.classList.add('completed');
        completeBtn.disabled = true;
        completeBtn.style.opacity = '0.7';
    } else {
        completeBtn.innerHTML = '<span class="btn-icon">🙏</span>Completar Devocional Hoy';
        completeBtn.classList.remove('completed');
        completeBtn.disabled = false;
        completeBtn.style.opacity = '1';
    }
}

function completeDay() {
    const today = new Date().toDateString();
    let streakData = JSON.parse(localStorage.getItem('streakData') || '{}');
    
    // Verificar si ya completó hoy
    if (streakData.todayCompleted === today) {
        showNotification('Ya completaste tu devocional hoy 🙌', '✅');
        return;
    }
    
    // Actualizar racha
    const lastDay = streakData.lastDay;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    let streak = streakData.streak || 0;
    streak = (lastDay === yesterday) ? streak + 1 : 1;
    
    // Guardar datos
    streakData = {
        streak: streak,
        lastDay: today,
        todayCompleted: today,
        history: streakData.history || []
    };
    
    streakData.history.push({
        date: today,
        streak: streak
    });
    
    localStorage.setItem('streakData', JSON.stringify(streakData));
    
    // Actualizar estadísticas
    updateStatsOnComplete();
    
    // Actualizar display
    updateStreakDisplay(streak);
    updateTodayStatus(true);
    
    // Mostrar mensaje motivacional
    const messages = [
        `¡Día ${streak} completado! 💪`,
        `¡Excelente trabajo! Tu fe crece día a día 🌱`,
        `¡Bendiciones! Dios te recompensa por tu fidelidad 🙏`,
        `¡Sigue así! Cada día te acerca más a Dios ✨`,
        `¡Increíble! Tu consistencia es inspiradora 🚀`
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showNotification(randomMessage, streak >= 7 ? '🔥' : '🎯');
    
    // Efecto visual
    const badge = document.getElementById('streak');
    if (badge) {
        badge.style.transform = 'scale(1.3)';
        setTimeout(() => badge.style.transform = 'scale(1)', 300);
    }
    
    // Verificar logros
    checkAchievements(streak);
}

function updateStatsOnComplete() {
    // Actualizar versículos leídos
    let versesRead = parseInt(localStorage.getItem('versesRead') || '0');
    versesRead++;
    localStorage.setItem('versesRead', versesRead);
    
    // Actualizar tiempo de oración (simulado)
    let prayerTime = parseInt(localStorage.getItem('prayerTime') || '0');
    prayerTime += 10; // 10 minutos por devocional
    localStorage.setItem('prayerTime', prayerTime);
    
    // Actualizar display en página de inicio
    updateHomeStats();
}

function updateHomeStats() {
    const streakData = JSON.parse(localStorage.getItem('streakData') || '{}');
    const streak = streakData.streak || 0;
    const versesRead = parseInt(localStorage.getItem('versesRead') || '0');
    
    // Actualizar en página de inicio si existe
    const currentStreakEl = document.getElementById('current-streak');
    const versesReadEl = document.getElementById('verses-read');
    const completedGoalsEl = document.getElementById('completed-goals');
    
    if (currentStreakEl) currentStreakEl.textContent = streak;
    if (versesReadEl) versesReadEl.textContent = versesRead;
    
    // Calcular metas completadas
    if (completedGoalsEl) {
        let goalsCompleted = 0;
        ['bronze', 'silver', 'gold'].forEach(level => {
            for (let i = 1; i <= 5; i++) {
                if (localStorage.getItem(`${level}${i}`) === 'true') {
                    goalsCompleted++;
                }
            }
        });
        completedGoalsEl.textContent = goalsCompleted;
        localStorage.setItem('goalsCompleted', goalsCompleted);
    }
}

function checkAchievements(streak) {
    const achievements = {
        7: { title: 'Racha Semanal', message: '¡7 días consecutivos! 🏆' },
        30: { title: 'Racha Mensual', message: '¡30 días consecutivos! 🌟' },
        100: { title: 'Racha Centenaria', message: '¡100 días consecutivos! 🎊' }
    };
    
    if (achievements[streak]) {
        const achievement = achievements[streak];
        showNotification(`${achievement.message} ¡Felicidades!`, '🏅');
        
        // Guardar logro
        let userAchievements = JSON.parse(localStorage.getItem('achievements') || '[]');
        if (!userAchievements.includes(achievement.title)) {
            userAchievements.push(achievement.title);
            localStorage.setItem('achievements', JSON.stringify(userAchievements));
        }
    }
}

/* ============================ */
/* ⏱️ TEMPORIZADOR DE ORACIÓN */
/* ============================ */

let prayerTimer = null;
let prayerSeconds = 0;

function startTimer() {
    if (prayerTimer) {
        showNotification('El temporizador ya está en marcha ⏱️', '⚠️');
        return;
    }
    
    // Pedir duración
    const duration = prompt('¿Cuántos minutos quieres orar?', '10');
    if (!duration || isNaN(duration) || duration <= 0) return;
    
    prayerSeconds = duration * 60;
    
    // Iniciar temporizador
    prayerTimer = setInterval(() => {
        prayerSeconds--;
        
        // Actualizar display
        const minutes = Math.floor(prayerSeconds / 60);
        const seconds = prayerSeconds % 60;
        
        // Buscar elementos de display (podrían no existir en todas las páginas)
        const timeSpentEl = document.querySelector('.time-spent');
        const timeFillEl = document.querySelector('.time-fill');
        
        if (timeSpentEl) {
            timeSpentEl.textContent = `${duration - minutes - 1}/${duration} min`;
        }
        
        if (timeFillEl) {
            const percentage = 100 - (prayerSeconds / (duration * 60)) * 100;
            timeFillEl.style.width = `${percentage}%`;
        }
        
        // Cuando termine
        if (prayerSeconds <= 0) {
            clearInterval(prayerTimer);
            prayerTimer = null;
            
            // Guardar tiempo de oración
            let prayerTime = parseInt(localStorage.getItem('prayerTime') || '0');
            prayerTime += parseInt(duration);
            localStorage.setItem('prayerTime', prayerTime);
            
            showNotification(`¡Tiempo de oración completado! ${duration} minutos dedicados a Dios 🙏`, '🎉');
            
            // Resetear display
            if (timeSpentEl) timeSpentEl.textContent = `0/${duration} min`;
            if (timeFillEl) timeFillEl.style.width = '0%';
        }
    }, 1000);
    
    showNotification(`⏱️ Temporizador iniciado: ${duration} minutos`, '▶️');
}

function stopTimer() {
    if (prayerTimer) {
        clearInterval(prayerTimer);
        prayerTimer = null;
        showNotification('Temporizador detenido ⏹️', '⏹️');
    }
}

/* ============================ */
/* 🌙 MODO OSCURO MEJORADO */
/* ============================ */

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    const mobileThemeIcon = document.querySelector('.mobile-theme-icon');
    const mobileThemeText = document.querySelector('.mobile-theme-text');

    body.classList.toggle('dark-theme');

    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }

    if (mobileThemeIcon && mobileThemeText) {
        mobileThemeIcon.textContent = isDark ? '☀️' : '🌙';
        mobileThemeText.textContent = isDark ? 'Tema Claro' : 'Tema Oscuro';
    }

    // Aplicar tema a elementos específicos
    applyTheme();
}

function applyTheme() {
    const isDark = document.body.classList.contains('dark-theme');

    // Actualizar colores CSS variables si es necesario
    if (isDark) {
        document.documentElement.style.setProperty('--bg-main', '#1f2937');
        document.documentElement.style.setProperty('--bg-card', '#374151');
        document.documentElement.style.setProperty('--text-main', '#f9fafb');
        document.documentElement.style.setProperty('--text-muted', '#9ca3af');
    } else {
        document.documentElement.style.setProperty('--bg-main', '#f9fafb');
        document.documentElement.style.setProperty('--bg-card', '#ffffff');
        document.documentElement.style.setProperty('--text-main', '#111827');
        document.documentElement.style.setProperty('--text-muted', '#6b7280');
    }
}

// Cargar tema al iniciar
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        applyTheme();
    }
    updateMobileThemeIcon();
});

function updateMobileThemeIcon() {
    const mobileThemeIcon = document.querySelector('.mobile-theme-icon');
    const mobileThemeText = document.querySelector('.mobile-theme-text');

    if (mobileThemeIcon && mobileThemeText) {
        const isDark = document.body.classList.contains('dark-theme');
        mobileThemeIcon.textContent = isDark ? '☀️' : '🌙';
        mobileThemeText.textContent = isDark ? 'Tema Claro' : 'Tema Oscuro';
    }
}

// Event listener para el botón de tema móvil
const mobileThemeBtn = document.getElementById('mobile-theme-toggle');
if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener('click', function() {
        toggleTheme();
        updateMobileThemeIcon();
    });
}

function initializeThemeSystem() {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        applyTheme();
    }

    // Actualizar íconos
    updateMobileThemeIcon();

    // Actualizar ícono del botón principal
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        const isDark = document.body.classList.contains('dark');
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
}



/* ============================ */
/* 🎉 NOTIFICACIONES MEJORADAS */
/* ============================ */

function showNotification(message, icon = 'ℹ️') {
    // Remover notificaciones existentes
    const existing = document.querySelectorAll('.notification');
    existing.forEach(notif => notif.remove());
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    notification.innerHTML = `
        <span class="notification-icon">${icon}</span>
        <span class="notification-text">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Estilos
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'var(--card-bg)',
        color: 'var(--text-color)',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-xl)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease',
        maxWidth: '400px',
        border: '2px solid var(--nav-border)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
    });
    
    // Estilos para el botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    Object.assign(closeBtn.style, {
        background: 'none',
        border: 'none',
        color: 'var(--text-secondary)',
        fontSize: '1.5rem',
        cursor: 'pointer',
        padding: '0',
        marginLeft: '0.5rem',
        lineHeight: '1'
    });
    
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ============================ */
/* 🏠 FUNCIONALIDADES DE INDEX.HTML */
/* ============================ */

function initializeHomePage() {
    // Mostrar fecha actual
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = today.toLocaleDateString('es-ES', options);

    // Cargar cita motivacional
    loadMotivationalQuote();

    // Inicializar sistema de rachas
    initializeStreakSystem();

    // Cargar estadísticas
    loadQuickStats();

    // Verificar check-in diario
    checkDailyCheckin();

    // Cargar versículo del día
    loadVerse();

    // Mostrar notificación de bienvenida si es primera vez del día
    showWelcomeNotification();
}

function loadMotivationalQuote() {
    const quotes = [
        "¡Hoy es el día perfecto para ser la mejor versión de ti mismo!",
        "Cada día es una nueva oportunidad para glorificar a Dios",
        "Tu fe puede mover montañas, ¡comienza hoy!",
        "Dios tiene grandes planes para ti, ¡confía en Él!",
        "Un día a la vez, un paso hacia la victoria espiritual"
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('motivational-quote').textContent = randomQuote;
}

function loadQuickStats() {
    // Cargar estadísticas desde localStorage
    const versesRead = parseInt(localStorage.getItem('versesRead') || '0');
    const goalsCompleted = parseInt(localStorage.getItem('goalsCompleted') || '0');
    const prayerStreak = parseInt(localStorage.getItem('prayerStreak') || '0');
    const level = Math.floor((versesRead + goalsCompleted) / 10) + 1;

    document.getElementById('verses-read').textContent = versesRead;
    document.getElementById('goals-completed').textContent = goalsCompleted;
    document.getElementById('prayer-streak').textContent = prayerStreak;
    document.getElementById('level').textContent = level;
}

function checkDailyCheckin() {
    const today = new Date().toDateString();
    const lastCheckin = localStorage.getItem('lastCheckin');

    const checkinBtn = document.getElementById('checkin-btn');
    const checkinStatus = document.getElementById('checkin-status');

    if (lastCheckin === today) {
        // Ya hizo check-in hoy
        checkinBtn.classList.add('completed');
        checkinBtn.innerHTML = '<span class="checkin-icon">✅</span><span class="checkin-text">¡Completado hoy!</span>';
        checkinStatus.innerHTML = '<span class="status-icon">✅</span><span class="status-text">¡Excelente trabajo!</span>';
        checkinBtn.disabled = true;
    } else {
        // No ha hecho check-in hoy
        checkinBtn.addEventListener('click', performDailyCheckin);
    }
}

function performDailyCheckin() {
    const today = new Date().toDateString();
    localStorage.setItem('lastCheckin', today);

    // Actualizar rachas
    updateStreakAfterCheckin();

    // Actualizar estadísticas
    const currentExp = parseInt(localStorage.getItem('experience') || '0');
    localStorage.setItem('experience', currentExp + 10);

    // Actualizar UI
    const checkinBtn = document.getElementById('checkin-btn');
    const checkinStatus = document.getElementById('checkin-status');

    checkinBtn.classList.add('completed');
    checkinBtn.innerHTML = '<span class="checkin-icon">✅</span><span class="checkin-text">¡Completado hoy!</span>';
    checkinStatus.innerHTML = '<span class="status-icon">🎉</span><span class="status-text">¡Felicidades!</span>';
    checkinBtn.disabled = true;

    // Mostrar notificación de felicitación
    showNotification('¡Check-in diario completado! +10 EXP 🎉', '✅');

    // Actualizar estadísticas en pantalla
    loadQuickStats();
    updateStreakDisplay(parseInt(localStorage.getItem('streak') || '0'));
}

function updateStreakAfterCheckin() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    let streakData = JSON.parse(localStorage.getItem('streakData') || '{}');
    let streak = streakData.streak || 0;
    const lastDay = streakData.lastDay;

    // Si ya hizo check-in hoy, no hacer nada
    if (streakData.todayCompleted === today) return;

    // Verificar si es día consecutivo
    if (lastDay === yesterday || !lastDay) {
        streak++;
    } else if (lastDay !== today) {
        // Resetear racha si no es consecutivo
        streak = 1;
    }

    streakData = {
        streak: streak,
        lastDay: today,
        todayCompleted: today
    };

    localStorage.setItem('streakData', JSON.stringify(streakData));
}

function showWelcomeNotification() {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');

    if (lastVisit !== today) {
        // Primera visita del día
        setTimeout(() => {
            showNotification('¡Bienvenido de vuelta! ¿Listo para crecer espiritualmente hoy? 🌟', '👋');
        }, 1000);

        localStorage.setItem('lastVisit', today);
    }
}

// Actualizar funciones existentes para trabajar con index.html
function updateStreakDisplay(streak) {
    const streakElement = document.getElementById('streak-count');
    if (streakElement) {
        streakElement.textContent = streak;
    }
}

function updateTodayStatus(completed) {
    // Esta función se puede usar para actualizar otros elementos si es necesario
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Solo inicializar si estamos en index.html
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        initializeHomePage();
    }

    // Mostrar notificación de demo después de 2 segundos (solo para testing)
    setTimeout(() => {
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
            showNotification('¡Sistema de notificaciones funcionando! 🎉', '🚀');
        }
    }, 2000);

    // Funcionalidad del menú móvil
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileThemeBtn = document.getElementById('mobile-theme-toggle');

    if (mobileMenuBtn && mobileMenu) {
        // Toggle menú móvil
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        // Cerrar menú móvil
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        }

        // Cerrar menú al hacer clic en un enlace
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        // Tema móvil
        if (mobileThemeBtn) {
            mobileThemeBtn.addEventListener('click', function() {
                toggleTheme();
                updateMobileThemeIcon();
            });
        }
    }

    // Event listener para el botón de tema principal
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            toggleTheme();
            updateMobileThemeIcon();
        });
    }

    // Cerrar menú móvil al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.contains(e.target) && e.target !== mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Actualizar ícono del tema móvil
    updateMobileThemeIcon();

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        applyTheme();
    }

    // Saludo personalizado en todas las páginas
    setTimeout(() => {
        showPersonalizedGreeting();
    }, 2000);
});

/* ============================ */
/* 📱 FUNCIONALIDAD DEL MENÚ MÓVIL */
/* ============================ */

function updateMobileThemeIcon() {
    const mobileThemeIcon = document.querySelector('.mobile-theme-icon');
    const mobileThemeText = document.querySelector('.mobile-theme-text');

    if (mobileThemeIcon && mobileThemeText) {
        const isDark = document.body.classList.contains('dark');
        mobileThemeIcon.textContent = isDark ? '☀️' : '🌙';
        mobileThemeText.textContent = isDark ? 'Tema Claro' : 'Tema Oscuro';
    }
}

// Actualizar la función toggleTheme para que también actualice el menú móvil
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    const mobileThemeIcon = document.querySelector('.mobile-theme-icon');
    const mobileThemeText = document.querySelector('.mobile-theme-text');

    body.classList.toggle('dark');

    const isDark = body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }

    if (mobileThemeIcon && mobileThemeText) {
        mobileThemeIcon.textContent = isDark ? '☀️' : '🌙';
        mobileThemeText.textContent = isDark ? 'Tema Claro' : 'Tema Oscuro';
    }

    // Aplicar tema a elementos específicos
    applyTheme();
}

function applyTheme() {
    const isDark = document.body.classList.contains('dark');

    // Actualizar colores CSS variables si es necesario
    if (isDark) {
        document.documentElement.style.setProperty('--bg-main', '#1f2937');
        document.documentElement.style.setProperty('--bg-card', '#374151');
        document.documentElement.style.setProperty('--text-main', '#f9fafb');
        document.documentElement.style.setProperty('--text-muted', '#9ca3af');
    } else {
        document.documentElement.style.setProperty('--bg-main', '#f9fafb');
        document.documentElement.style.setProperty('--bg-card', '#ffffff');
        document.documentElement.style.setProperty('--text-main', '#111827');
        document.documentElement.style.setProperty('--text-muted', '#6b7280');
    }
}

// Agregar animaciones CSS para las notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

/* ============================ */
/* 📱 FUNCIONALIDADES ADICIONALES */
/* ============================ */

function startDevotional() {
    // Simular un devocional
    showNotification('Iniciando devocional diario... 📖', '🙏');
    
    // Después de 2 segundos, marcar como completado
    setTimeout(() => {
        completeDay();
        
        // Cargar nuevo versículo
        loadVerse();
        
        // Mostrar contenido devocional
        showNotification('Devocional completado. ¡Dios te bendiga! ✨', '✅');
    }, 2000);
}

function setReminder() {
    if (!("Notification" in window)) {
        showNotification("Tu navegador no soporta notificaciones", "⚠️");
        return;
    }
    
    if (Notification.permission === "granted") {
        scheduleReminder();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                scheduleReminder();
            }
        });
    }
}

function scheduleReminder() {
    const now = new Date();
    const reminderTime = new Date(now);
    reminderTime.setHours(20, 0, 0, 0); // 8:00 PM
    
    if (now > reminderTime) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }
    
    const timeUntilReminder = reminderTime - now;
    
    setTimeout(() => {
        if (Notification.permission === "granted") {
            new Notification("⏰ Recordatorio de Jóvenes en Cristo", {
                body: "¿Ya pasaste tiempo con Dios hoy? 🙏",
                icon: "/icon.png",
                requireInteraction: true
            });
        }
    }, timeUntilReminder);
    
    showNotification(`Recordatorio programado para las 8:00 PM ⏰`, '✅');
}

function showPersonalizedGreeting() {
    const hour = new Date().getHours();
    let greeting;

    if (hour < 12) greeting = "¡Buenos días! ☀️";
    else if (hour < 18) greeting = "¡Buenas tardes! 🌤️";
    else greeting = "¡Buenas noches! 🌙";

    // Función para intentar mostrar la notificación
    const tryShowNotification = () => {
        if (typeof showNotification === 'function') {
            showNotification(`${greeting} Que Dios te bendiga hoy 🙏`, '⛪');
        } else {
            console.log(`${greeting} Que Dios te bendiga hoy 🙏`);
            // Reintentar en 500ms si no está disponible
            setTimeout(tryShowNotification, 500);
        }
    };

    tryShowNotification();
}

document.addEventListener('DOMContentLoaded', () => {
    // Cargar versículo
    loadVerse();

    // Inicializar sistemas
    initializeStreakSystem();
    initializeThemeSystem();

    // Actualizar estadísticas
    updateHomeStats();

    // Configurar eventos
    const refreshVerseBtn = document.getElementById('refresh-verse');
    if (refreshVerseBtn) {
        refreshVerseBtn.addEventListener('click', loadVerse);
    }

    const completeDevotionalBtn = document.getElementById('complete-devotional');
    if (completeDevotionalBtn) {
        completeDevotionalBtn.addEventListener('click', startDevotional);
    }

    // Efecto de entrada suave
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

/* ============================ */
/* 📱 DETECCIÓN DE DISPOSITIVO */
/* ============================ */

function checkDevice() {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isTouch) {
        document.body.classList.add('touch-device');
    }
    if (isMobile) {
        document.body.classList.add('mobile-device');
    }
}

checkDevice();

/* ============================ */
/* 🔧 REGISTRO DEL SERVICE WORKER (PWA) */
/* ============================ */

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('Service Worker registrado exitosamente:', registration.scope);

                    // Verificar si hay una nueva versión disponible
                    registration.addEventListener('updatefound', function() {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', function() {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // Nueva versión disponible
                                showUpdateNotification();
                            }
                        });
                    });

                    // Manejar mensajes del service worker
                    navigator.serviceWorker.addEventListener('message', function(event) {
                        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
                            showUpdateNotification();
                        }
                    });
                })
                .catch(function(error) {
                    console.log('Error al registrar el Service Worker:', error);
                });
        });
    } else {
        console.log('Service Workers no soportados en este navegador');
    }
}

function showUpdateNotification() {
    showNotification(
        '¡Nueva versión disponible! Haz clic aquí para actualizar 🔄',
        '⬆️'
    );

    // Agregar funcionalidad al hacer clic en la notificación
    const notification = document.querySelector('.notification');
    if (notification) {
        notification.style.cursor = 'pointer';
        notification.addEventListener('click', function() {
            window.location.reload();
        });
    }
}

// Registrar service worker al cargar la página
registerServiceWorker();

/* ============================ */
/* 🌐 EXPORTAR FUNCIONES GLOBALES */
/* ============================ */

window.loadVerse = loadVerse;
window.copyVerse = copyVerse;
window.shareVerse = shareVerse;
window.completeDay = completeDay;
window.toggleTheme = toggleTheme;
window.startTimer = startTimer;
window.stopTimer = stopTimer;
window.startDevotional = startDevotional;
window.setReminder = setReminder;
window.showNotification = showNotification;
window.showPersonalizedGreeting = showPersonalizedGreeting;