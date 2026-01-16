/* ============================
   👤 FUNCIONALIDAD DEL PERFIL
============================ */

function saveProfile() {
    const name = document.getElementById('user-name').value;
    const birthdate = document.getElementById('user-birthdate').value;
    const church = document.getElementById('user-church').value;

    // Validación básica
    if (!name) {
        if (typeof showNotification === 'function') {
        showNotification('Por favor ingresa tu nombre', '⚠️');
        } else {
            alert('Por favor ingresa tu nombre');
        }
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Actualizar el usuario actual
    const updatedUser = { ...currentUser, name, birthdate, church };

    // Actualizar en el array de usuarios
    const userIndex = users.findIndex(u => u.username === currentUser.username);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Actualizar currentUser
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    if (typeof showNotification === 'function') {
    showNotification('Perfil guardado exitosamente', '✅');
    } else {
        alert('Perfil guardado exitosamente');
    }
    displayProfile();
    toggleEditSection();
}

function loginUser() {
    const loginUsername = document.getElementById('login-username').value;
    const loginPassword = document.getElementById('login-password').value;

    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');

    if (profile.username === loginUsername && profile.password === loginPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        if (typeof showNotification === 'function') {
        showNotification('¡Bienvenido de vuelta!', '👋');
        }
        const loginSection = document.getElementById('login-section');
        const profileSection = document.getElementById('profile-section');
        if (loginSection) loginSection.style.display = 'none';
        if (profileSection) profileSection.style.display = 'block';
        loadProfile();
    } else {
        if (typeof showNotification === 'function') {
        showNotification('Usuario o contraseña incorrectos', '❌');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    }
}

function logoutUser() {
    localStorage.setItem('isLoggedIn', 'false');
    if (typeof showNotification === 'function') {
    showNotification('Sesión cerrada', '👋');
    }
    const profileSection = document.getElementById('profile-section');
    const loginSection = document.getElementById('login-section');
    if (profileSection) profileSection.style.display = 'none';
    if (loginSection) loginSection.style.display = 'block';
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const hasProfile = localStorage.getItem('userProfile');

    const loginSection = document.getElementById('login-section');
    const profileSection = document.getElementById('profile-section');

    if (isLoggedIn && hasProfile) {
        if (loginSection) loginSection.style.display = 'none';
        if (profileSection) profileSection.style.display = 'block';
    } else {
        if (profileSection) profileSection.style.display = 'none';
        if (loginSection) loginSection.style.display = 'block';
    }
}

function loadProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    const nameInput = document.getElementById('user-name');
    const birthdateInput = document.getElementById('user-birthdate');
    const churchInput = document.getElementById('user-church');
    
    if (nameInput) nameInput.value = currentUser.name || 'Usuario';
    if (birthdateInput) birthdateInput.value = currentUser.birthdate || '';
    if (churchInput) churchInput.value = currentUser.church || 'Jóvenes en Cristo';
}

function loadStats() {
    // Cargar estadísticas desde localStorage
    const currentStreak = parseInt(localStorage.getItem('streak') || '0');
    const versesRead = parseInt(localStorage.getItem('versesRead') || '0');
    const goalsCompleted = parseInt(localStorage.getItem('goalsCompleted') || '0');
    const prayerTime = parseInt(localStorage.getItem('prayerTime') || '0');

    const currentStreakEl = document.getElementById('current-streak');
    const versesReadEl = document.getElementById('verses-read');
    const goalsCompletedEl = document.getElementById('goals-completed');
    const prayerTimeEl = document.getElementById('prayer-time');
    
    if (currentStreakEl) currentStreakEl.textContent = currentStreak;
    if (versesReadEl) versesReadEl.textContent = versesRead;
    if (goalsCompletedEl) goalsCompletedEl.textContent = goalsCompleted;
    if (prayerTimeEl) prayerTimeEl.textContent = prayerTime;
}

// Funciones específicas para perfil.html
function displayProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const name = currentUser.name || 'Usuario Joven';
    const birthdate = currentUser.birthdate ? new Date(currentUser.birthdate) : null;
    const age = birthdate ? new Date().getFullYear() - birthdate.getFullYear() : null;
    const church = currentUser.church || 'Iglesia Bautista el Camino';

    const nameDisplay = document.getElementById('user-name-display');
    const detailsDisplay = document.getElementById('user-details');
    
    if (nameDisplay) {
        nameDisplay.textContent = name;
    }
    if (detailsDisplay) {
        if (age) {
            detailsDisplay.textContent = `Edad: ${age} años | Iglesia: ${church}`;
        } else {
            detailsDisplay.textContent = `Iglesia: ${church}`;
        }
    }
}

function toggleEditSection() {
    const editSection = document.getElementById('edit-section');
    if (!editSection) return;
    
    const isVisible = editSection.style.display !== 'none';
    editSection.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) {
        loadProfile(); // Cargar datos en el formulario
    }
}

function cancelEdit() {
    const editSection = document.getElementById('edit-section');
    if (editSection) editSection.style.display = 'none';
}

function updateStats() {
    const streakData = JSON.parse(localStorage.getItem('streakData') || '{}');
    const streak = streakData.streak || 0;
    const versesRead = parseInt(localStorage.getItem('versesRead') || '0');
    const goalsActive = parseInt(localStorage.getItem('goalsActive') || '0');
    const achievements = parseInt(localStorage.getItem('achievements') || '0');

    const streakCountEl = document.getElementById('streak-count');
    const lecturasCountEl = document.getElementById('lecturas-count');
    const metasCountEl = document.getElementById('metas-count');
    const logrosCountEl = document.getElementById('logros-count');
    
    if (streakCountEl) streakCountEl.textContent = `${streak} días seguidos`;
    if (lecturasCountEl) lecturasCountEl.textContent = `${versesRead} completadas`;
    if (metasCountEl) metasCountEl.textContent = `${goalsActive} activas`;
    if (logrosCountEl) logrosCountEl.textContent = `${achievements} obtenidos`;
}

function changeProfilePic() {
    const picInput = document.getElementById('profile-pic-input');
    if (picInput) picInput.click();
}

function handleProfilePicChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgSrc = e.target.result;
            const avatarImg = document.getElementById('user-avatar-img');
            const avatarEmoji = document.getElementById('user-avatar');
            
            if (avatarImg) {
                avatarImg.src = imgSrc;
                avatarImg.classList.remove('hidden');
                if (avatarEmoji) avatarEmoji.style.display = 'none';
            }
            
            const profilePic = document.getElementById('profile-pic');
            if (profilePic) profilePic.src = imgSrc;
            
            localStorage.setItem('profilePic', imgSrc);
        };
        reader.readAsDataURL(file);
    }
}

function loadProfilePic() {
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
        const avatarImg = document.getElementById('user-avatar-img');
        const avatarEmoji = document.getElementById('user-avatar');
        const profilePic = document.getElementById('profile-pic');
        
        if (avatarImg) {
            avatarImg.src = savedPic;
            avatarImg.classList.remove('hidden');
            if (avatarEmoji) {
                avatarEmoji.style.display = 'none';
            }
        }
        if (profilePic) {
            profilePic.src = savedPic;
        }
    }
}

// ========== NUEVAS FUNCIONES PARA EL DISEÑO MEJORADO ==========

// Calcular nivel basado en XP
function calculateLevel(xp) {
    return Math.floor(xp / 250) + 1;
}

// Calcular XP necesario para el siguiente nivel
function getXPForNextLevel(currentLevel) {
    return currentLevel * 250;
}

// Actualizar todas las estadísticas del perfil
function updateAllProfileStats() {
    // Obtener datos de localStorage
    const streakData = JSON.parse(localStorage.getItem('streakData') || '{}');
    const streak = streakData.streak || 0;
    const versesRead = parseInt(localStorage.getItem('versesRead') || '0');
    const goalsCompleted = parseInt(localStorage.getItem('goalsCompleted') || '0');
    
    // Calcular metas activas
    let goalsActive = 0;
    ['bronze', 'silver', 'gold'].forEach(level => {
        for (let i = 1; i <= 5; i++) {
            const goalKey = `${level}${i}`;
            const goalData = localStorage.getItem(goalKey);
            if (goalData) {
                try {
                    const goal = JSON.parse(goalData);
                    if (goal && !goal.completed) goalsActive++;
                } catch (e) {
                    // Si no es JSON, verificar si está marcado como completado
                    if (goalData !== 'true') goalsActive++;
                }
            }
        }
    });
    
    // Calcular XP total (aproximado)
    const totalXP = (versesRead * 5) + (goalsCompleted * 25) + (streak * 10);
    const level = calculateLevel(totalXP);
    const xpForNext = getXPForNextLevel(level);
    const xpProgress = ((totalXP % 250) / 250) * 100;
    
    // Actualizar header del perfil
    const streakDaysEl = document.getElementById('streak-days');
    const userXPEl = document.getElementById('user-xp');
    const totalXPDisplayEl = document.getElementById('total-xp-display');
    const userLevelEl = document.getElementById('user-level');
    const xpNextEl = document.getElementById('xp-next');
    const xpProgressEl = document.getElementById('xp-progress');
    
    if (streakDaysEl) streakDaysEl.textContent = streak;
    if (userXPEl) userXPEl.textContent = totalXP;
    if (totalXPDisplayEl) totalXPDisplayEl.textContent = totalXP;
    if (userLevelEl) userLevelEl.textContent = level;
    if (xpNextEl) xpNextEl.textContent = xpForNext;
    if (xpProgressEl) xpProgressEl.style.width = `${xpProgress}%`;
    
    // Actualizar fecha de miembro
    const memberSinceEl = document.getElementById('member-since');
    if (memberSinceEl) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (currentUser.createdAt) {
            const createdDate = new Date(currentUser.createdAt);
            const daysSince = Math.floor((new Date() - createdDate) / (1000 * 60 * 60 * 24));
            if (daysSince < 7) {
                memberSinceEl.textContent = 'Miembro reciente';
            } else if (daysSince < 30) {
                memberSinceEl.textContent = `Miembro hace ${Math.floor(daysSince / 7)} semanas`;
            } else {
                memberSinceEl.textContent = `Miembro hace ${Math.floor(daysSince / 30)} meses`;
            }
        } else {
            memberSinceEl.textContent = 'Miembro reciente';
        }
    }
    
    // Actualizar progreso espiritual
    updateSpiritualProgress(versesRead, streak, goalsCompleted, goalsActive, totalXP);
    
    // Actualizar hábitos diarios
    updateDailyHabits(streak);
    
    // Actualizar logros
    loadAchievements();
    
    // Actualizar actividad reciente
    loadRecentActivity();
}

// Actualizar progreso espiritual
function updateSpiritualProgress(versesRead, prayerDays, goalsCompleted, goalsActive, totalXP) {
    // Versículos leídos
    const totalVersesEl = document.getElementById('total-verses');
    const versesProgressEl = document.getElementById('verses-progress');
    const versesGoalEl = document.getElementById('verses-goal');
    const versesGoal = 100;
    
    if (totalVersesEl) totalVersesEl.textContent = versesRead;
    if (versesProgressEl) {
        const progress = Math.min((versesRead / versesGoal) * 100, 100);
        versesProgressEl.style.width = `${progress}%`;
    }
    if (versesGoalEl) versesGoalEl.textContent = versesGoal;
    
    // Días de oración
    const prayerDaysEl = document.getElementById('prayer-days');
    const prayerProgressEl = document.getElementById('prayer-progress');
    const prayerRecordEl = document.getElementById('prayer-record');
    const prayerRecord = Math.max(prayerDays, parseInt(localStorage.getItem('prayerRecord') || '7'));
    
    if (prayerDaysEl) prayerDaysEl.textContent = prayerDays;
    if (prayerProgressEl) {
        const progress = Math.min((prayerDays / 30) * 100, 100);
        prayerProgressEl.style.width = `${progress}%`;
    }
    if (prayerRecordEl) prayerRecordEl.textContent = prayerRecord;
    localStorage.setItem('prayerRecord', prayerRecord.toString());
    
    // Metas completadas
    const goalsAchievedEl = document.getElementById('goals-achieved');
    const goalsProgressEl = document.getElementById('goals-progress');
    const goalsActiveEl = document.getElementById('goals-active');
    
    if (goalsAchievedEl) goalsAchievedEl.textContent = goalsCompleted;
    if (goalsProgressEl) {
        const progress = Math.min((goalsCompleted / 10) * 100, 100);
        goalsProgressEl.style.width = `${progress}%`;
    }
    if (goalsActiveEl) goalsActiveEl.textContent = goalsActive;
    
    // XP
    const totalXPDisplayEl = document.getElementById('total-xp-display');
    const xpProgressEl = document.getElementById('xp-progress');
    const xpNextEl = document.getElementById('xp-next');
    const level = calculateLevel(totalXP);
    const xpForNext = getXPForNextLevel(level);
    const xpProgress = ((totalXP % 250) / 250) * 100;
    
    if (totalXPDisplayEl) totalXPDisplayEl.textContent = totalXP;
    if (xpProgressEl) xpProgressEl.style.width = `${xpProgress}%`;
    if (xpNextEl) xpNextEl.textContent = xpForNext;
}

// Actualizar hábitos diarios
function updateDailyHabits(streak) {
    // Obtener datos de la semana actual
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Lectura bíblica
    const bibleWeekData = JSON.parse(localStorage.getItem('bibleWeekData') || '[]');
    const bibleWeekCount = bibleWeekData.filter(date => {
        const dateObj = new Date(date);
        return dateObj >= startOfWeek;
    }).length;
    
    const bibleStreakEl = document.getElementById('bible-streak');
    const bibleWeekEl = document.getElementById('bible-week');
    const bibleWeekProgressEl = document.getElementById('bible-week-progress');
    
    if (bibleStreakEl) bibleStreakEl.textContent = `${streak} días`;
    if (bibleWeekEl) bibleWeekEl.textContent = bibleWeekCount;
    if (bibleWeekProgressEl) {
        const progress = (bibleWeekCount / 7) * 100;
        bibleWeekProgressEl.style.width = `${progress}%`;
    }
    
    // Oración
    const prayerWeekData = JSON.parse(localStorage.getItem('prayerWeekData') || '[]');
    const prayerWeekCount = prayerWeekData.filter(date => {
        const dateObj = new Date(date);
        return dateObj >= startOfWeek;
    }).length;
    
    const prayerStreakEl = document.getElementById('prayer-streak');
    const prayerWeekEl = document.getElementById('prayer-week');
    const prayerWeekProgressEl = document.getElementById('prayer-week-progress');
    
    if (prayerStreakEl) prayerStreakEl.textContent = `${streak} días`;
    if (prayerWeekEl) prayerWeekEl.textContent = prayerWeekCount;
    if (prayerWeekProgressEl) {
        const progress = (prayerWeekCount / 7) * 100;
        prayerWeekProgressEl.style.width = `${progress}%`;
    }
    
    // Reflexión
    const reflectionWeekData = JSON.parse(localStorage.getItem('reflectionWeekData') || '[]');
    const reflectionWeekCount = reflectionWeekData.filter(date => {
        const dateObj = new Date(date);
        return dateObj >= startOfWeek;
    }).length;
    
    const reflectionStreakEl = document.getElementById('reflection-streak');
    const reflectionWeekEl = document.getElementById('reflection-week');
    const reflectionWeekProgressEl = document.getElementById('reflection-week-progress');
    
    if (reflectionStreakEl) reflectionStreakEl.textContent = `${streak} días`;
    if (reflectionWeekEl) reflectionWeekEl.textContent = reflectionWeekCount;
    if (reflectionWeekProgressEl) {
        const progress = (reflectionWeekCount / 7) * 100;
        reflectionWeekProgressEl.style.width = `${progress}%`;
    }
}

// Cargar logros
function loadAchievements() {
    const achievements = [
        { id: 'first-goal', name: 'Principiante Espiritual', desc: 'Completa tu primera meta', icon: '🥉', condition: () => parseInt(localStorage.getItem('goalsCompleted') || '0') > 0 },
        { id: 'bible-reader', name: 'Lector Bíblico', desc: 'Lee 30 versículos', icon: '📖', condition: () => parseInt(localStorage.getItem('versesRead') || '0') >= 30 },
        { id: 'prayer-warrior', name: 'Orante Constante', desc: 'Ora por 7 días seguidos', icon: '🙏', condition: () => {
            const streakData = JSON.parse(localStorage.getItem('streakData') || '{}');
            return (streakData.streak || 0) >= 7;
        }},
        { id: 'fire-streak', name: 'Racha de Fuego', desc: 'Mantén una racha de 30 días', icon: '🔥', condition: () => {
            const streakData = JSON.parse(localStorage.getItem('streakData') || '{}');
            return (streakData.streak || 0) >= 30;
        }},
        { id: 'silver-level', name: 'Avanzado', desc: 'Completa el nivel Plata', icon: '🥈', condition: () => localStorage.getItem('congrats-silver') === 'true' },
        { id: 'gold-level', name: 'Maestro Espiritual', desc: 'Completa el nivel Oro', icon: '🥇', condition: () => localStorage.getItem('congrats-gold') === 'true' },
        { id: 'verses-100', name: 'Centenario', desc: 'Lee 100 versículos', icon: '📚', condition: () => parseInt(localStorage.getItem('versesRead') || '0') >= 100 },
        { id: 'verses-500', name: 'Estudioso', desc: 'Lee 500 versículos', icon: '📖', condition: () => parseInt(localStorage.getItem('versesRead') || '0') >= 500 },
        { id: 'goals-10', name: 'Perseverante', desc: 'Completa 10 metas', icon: '🎯', condition: () => parseInt(localStorage.getItem('goalsCompleted') || '0') >= 10 },
        { id: 'level-5', name: 'Experto', desc: 'Alcanza nivel 5', icon: '⭐', condition: () => {
            const versesRead = parseInt(localStorage.getItem('versesRead') || '0');
            const goalsCompleted = parseInt(localStorage.getItem('goalsCompleted') || '0');
            const totalXP = (versesRead * 5) + (goalsCompleted * 25);
            return calculateLevel(totalXP) >= 5;
        }},
        { id: 'level-10', name: 'Maestro', desc: 'Alcanza nivel 10', icon: '🌟', condition: () => {
            const versesRead = parseInt(localStorage.getItem('versesRead') || '0');
            const goalsCompleted = parseInt(localStorage.getItem('goalsCompleted') || '0');
            const totalXP = (versesRead * 5) + (goalsCompleted * 25);
            return calculateLevel(totalXP) >= 10;
        }},
        { id: 'favorites-50', name: 'Amante de la Palabra', desc: 'Marca 50 favoritos', icon: '❤️', condition: () => {
            const favorites = JSON.parse(localStorage.getItem('versiculosFavoritos') || '[]');
            return favorites.length >= 50;
        }}
    ];

    const achievementsGrid = document.getElementById('achievements-grid');
    if (!achievementsGrid) return;

    const unlockedCount = achievements.filter(a => a.condition()).length;
    const achievementsCountEl = document.getElementById('achievements-count');
    if (achievementsCountEl) achievementsCountEl.textContent = unlockedCount;

    const achievementsHTML = achievements.map(achievement => {
        const unlocked = achievement.condition();
        return `
            <div class="achievement-card text-center p-4 ${unlocked ? '' : 'opacity-60'}">
                <div class="w-16 h-16 ${unlocked ? 'bg-gradient-to-br from-yellow-400 to-amber-500' : 'bg-gradient-to-br from-gray-300 to-gray-400'} rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                    <span class="text-2xl">${achievement.icon}</span>
                </div>
                <div class="font-semibold text-sm">${achievement.name}</div>
                <div class="text-xs text-gray-500 mt-1">${unlocked ? 'Completado' : 'Por desbloquear'}</div>
            </div>
        `;
    }).join('');

    achievementsGrid.innerHTML = achievementsHTML;
}

// Cargar actividad reciente
function loadRecentActivity() {
    const activityList = document.getElementById('activity-list');
    if (!activityList) return;

    const activities = [];
    const today = new Date();
    
    // Obtener actividad de check-ins
    const streakData = JSON.parse(localStorage.getItem('streakData') || '{}');
    if (streakData.lastDay) {
        const lastDay = new Date(streakData.lastDay);
        const daysAgo = Math.floor((today - lastDay) / (1000 * 60 * 60 * 24));
        if (daysAgo <= 7) {
            activities.push({
                type: 'checkin',
                message: 'Check-in diario completado',
                date: lastDay,
                xp: 10,
                streak: streakData.streak || 0
            });
        }
    }
    
    // Obtener actividad de versículos leídos
    const versesRead = parseInt(localStorage.getItem('versesRead') || '0');
    if (versesRead > 0) {
        activities.push({
            type: 'verse',
            message: `Leíste ${versesRead} versículos`,
            date: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000),
            xp: versesRead * 5,
            count: versesRead
        });
    }
    
    // Obtener actividad de metas completadas
    const goalsCompleted = parseInt(localStorage.getItem('goalsCompleted') || '0');
    if (goalsCompleted > 0) {
        activities.push({
            type: 'goal',
            message: `Meta completada: ${goalsCompleted} metas logradas`,
            date: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000),
            xp: goalsCompleted * 25,
            badge: 'Medalla desbloqueada'
        });
    }
    
    // Obtener actividad de nivel
    const versesReadForLevel = parseInt(localStorage.getItem('versesRead') || '0');
    const goalsCompletedForLevel = parseInt(localStorage.getItem('goalsCompleted') || '0');
    const totalXP = (versesReadForLevel * 5) + (goalsCompletedForLevel * 25);
    const level = calculateLevel(totalXP);
    if (level > 1) {
        activities.push({
            type: 'level',
            message: `Subiste al nivel ${level}`,
            date: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000),
            level: level,
            badge: '¡Felicidades!'
        });
    }
    
    // Ordenar por fecha (más reciente primero)
    activities.sort((a, b) => b.date - a.date);
    
    // Limitar a 4 actividades más recientes
    const recentActivities = activities.slice(0, 4);
    
    if (recentActivities.length === 0) {
        activityList.innerHTML = '<p class="text-center text-gray-500 py-4">No hay actividad reciente</p>';
        return;
    }
    
    const activityHTML = recentActivities.map(activity => {
        const daysAgo = Math.floor((today - activity.date) / (1000 * 60 * 60 * 24));
        let timeAgo = '';
        if (daysAgo === 0) timeAgo = 'Hoy';
        else if (daysAgo === 1) timeAgo = 'Ayer';
        else timeAgo = `Hace ${daysAgo} días`;
        
        const iconMap = {
            checkin: { icon: '✅', color: 'green' },
            verse: { icon: '📖', color: 'blue' },
            goal: { icon: '🎯', color: 'purple' },
            level: { icon: '⭐', color: 'amber' }
        };
        
        const iconInfo = iconMap[activity.type] || { icon: '📝', color: 'gray' };
        
        return `
            <div class="activity-item flex items-center space-x-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
                <div class="w-10 h-10 bg-${iconInfo.color}-100 dark:bg-${iconInfo.color}-900/30 rounded-lg flex items-center justify-center">
                    <span class="text-${iconInfo.color}-600 dark:text-${iconInfo.color}-400">${iconInfo.icon}</span>
                </div>
                <div class="flex-1">
                    <div class="font-medium">${activity.message}</div>
                    <div class="text-sm text-gray-500">${timeAgo}</div>
                </div>
                <div class="text-right">
                    <div class="font-semibold">${activity.xp ? `+${activity.xp} XP` : `Nivel ${activity.level}`}</div>
                    <div class="text-sm text-gray-500">${activity.streak ? `Racha: ${activity.streak} días` : activity.count ? `${activity.count} versículos` : activity.badge || ''}</div>
                </div>
            </div>
        `;
    }).join('');
    
    activityList.innerHTML = activityHTML;
}

// Funciones de utilidad
function viewHabitsDetails() {
    if (typeof showNotification === 'function') {
        showNotification('📊 Aquí verías un detalle completo de tus hábitos y estadísticas semanales.', 'ℹ️');
    } else {
        alert('📊 Aquí verías un detalle completo de tus hábitos y estadísticas semanales.');
    }
}

function viewAllAchievements() {
    if (typeof showNotification === 'function') {
        showNotification('🏆 Aquí verías todos los logros disponibles y tus progresos.', 'ℹ️');
    } else {
        alert('🏆 Aquí verías todos los logros disponibles y tus progresos.');
    }
}

function clearActivity() {
    if (confirm('¿Estás seguro de que quieres limpiar tu historial de actividad?')) {
        localStorage.removeItem('activityHistory');
        loadRecentActivity();
        if (typeof showNotification === 'function') {
            showNotification('✅ Historial de actividad limpiado.', '✅');
        } else {
            alert('✅ Historial de actividad limpiado.');
        }
    }
}

function loadMoreActivity() {
    if (typeof showNotification === 'function') {
        showNotification('📝 Cargando más actividad...', 'ℹ️');
    } else {
        alert('📝 Cargando más actividad...');
    }
}

function shareProfile() {
    const streakData = JSON.parse(localStorage.getItem('streakData') || '{}');
    const streak = streakData.streak || 0;
    const versesRead = parseInt(localStorage.getItem('versesRead') || '0');
    const goalsCompleted = parseInt(localStorage.getItem('goalsCompleted') || '0');
    
    const message = `🔥 Mi progreso espiritual:\n\n` +
        `📖 Versículos leídos: ${versesRead}\n` +
        `🎯 Metas completadas: ${goalsCompleted}\n` +
        `🔥 Racha actual: ${streak} días\n\n` +
        `¡Únete a Jóvenes con Cristo!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Mi Progreso Espiritual - Jóvenes con Cristo',
            text: message,
            url: window.location.href
        }).catch(err => {
            console.error('Error al compartir:', err);
            copyToClipboard(message);
        });
    } else {
        copyToClipboard(message);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        if (typeof showNotification === 'function') {
            showNotification('📋 Información copiada al portapapeles', '✅');
        } else {
            alert('📋 Información copiada al portapapeles');
        }
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

function exportData() {
    const userData = {
        user: JSON.parse(localStorage.getItem('currentUser') || '{}'),
        stats: {
            streak: JSON.parse(localStorage.getItem('streakData') || '{}'),
            versesRead: parseInt(localStorage.getItem('versesRead') || '0'),
            goalsCompleted: parseInt(localStorage.getItem('goalsCompleted') || '0'),
            goalsActive: parseInt(localStorage.getItem('goalsActive') || '0')
        },
        favorites: JSON.parse(localStorage.getItem('versiculosFavoritos') || '[]'),
        history: JSON.parse(localStorage.getItem('readingHistory') || '[]'),
        settings: JSON.parse(localStorage.getItem('userSettings') || '{}')
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `jovenes-con-cristo-datos-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    if (typeof showNotification === 'function') {
        showNotification('✅ Tus datos se han exportado correctamente.', '✅');
    } else {
        alert('✅ Tus datos se han exportado correctamente.');
    }
}

function resetProgress() {
    if (confirm('⚠️ ¿ESTÁS SEGURO?\n\nEsta acción reiniciará TODO tu progreso:\n• Puntos de experiencia\n• Estadísticas\n• Logros\n• Racha actual\n\nEsta acción NO se puede deshacer.')) {
        localStorage.removeItem('streakData');
        localStorage.removeItem('versesRead');
        localStorage.removeItem('goalsCompleted');
        localStorage.removeItem('goalsActive');
        localStorage.removeItem('achievements');
        localStorage.removeItem('activityHistory');
        localStorage.removeItem('bibleWeekData');
        localStorage.removeItem('prayerWeekData');
        localStorage.removeItem('reflectionWeekData');
        
        if (typeof showNotification === 'function') {
            showNotification('✅ Progreso reiniciado. Comienza tu nuevo camino espiritual.', '✅');
        } else {
            alert('✅ Progreso reiniciado. Comienza tu nuevo camino espiritual.');
        }
        
        location.reload();
    }
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');

    const notificationsToggle = document.getElementById('notifications-toggle');
    const dailyReminderTime = document.getElementById('daily-reminder-time');
    const shareProgressToggle = document.getElementById('share-progress-toggle');

    if (notificationsToggle) notificationsToggle.checked = settings.notifications !== false;
    if (dailyReminderTime) dailyReminderTime.value = settings.dailyReminderTime || '09:00 AM';
    if (shareProgressToggle) shareProgressToggle.checked = settings.shareProgress !== false;

    // Guardar cambios automáticamente
    if (notificationsToggle) {
        notificationsToggle.addEventListener('change', saveSettings);
    }
    if (dailyReminderTime) {
        dailyReminderTime.addEventListener('change', saveSettings);
    }
    if (shareProgressToggle) {
        shareProgressToggle.addEventListener('change', saveSettings);
    }
}

function saveSettings() {
    const notificationsToggle = document.getElementById('notifications-toggle');
    const dailyReminderTime = document.getElementById('daily-reminder-time');
    const shareProgressToggle = document.getElementById('share-progress-toggle');
    
    const settings = {
        notifications: notificationsToggle ? notificationsToggle.checked : true,
        dailyReminderTime: dailyReminderTime ? dailyReminderTime.value : '09:00 AM',
        shareProgress: shareProgressToggle ? shareProgressToggle.checked : false
    };

    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    if (typeof showNotification === 'function') {
        showNotification('✅ Configuración guardada', '✅');
    }
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('versiculosFavoritos') || '[]');
    const favoritesList = document.getElementById('favorites-list');

    if (!favoritesList) return;

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-state">No tienes versículos favoritos aún. ¡Agrega algunos desde la página de la Biblia!</p>';
        return;
    }

    const favoritesHTML = favorites.map((fav, index) => `
        <div class="favorite-item">
            <blockquote class="favorite-verse">"${fav.text || fav.versiculo || ''}"</blockquote>
            <cite class="favorite-ref">${fav.ref || fav.referencia || ''}</cite>
            <div class="favorite-date">${fav.date ? new Date(fav.date).toLocaleDateString() : 'Fecha no disponible'}</div>
            <button onclick="removeFavorite(${index})" class="btn-secondary">🗑️</button>
        </div>
    `).join('');

    favoritesList.innerHTML = favoritesHTML;
}

function removeFavorite(index) {
    let favorites = JSON.parse(localStorage.getItem('versiculosFavoritos') || '[]');
    favorites.splice(index, 1);
    localStorage.setItem('versiculosFavoritos', JSON.stringify(favorites));
    loadFavorites();
}

// Exponer funciones globales
window.saveProfile = saveProfile;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.loadProfile = loadProfile;
window.loadStats = loadStats;
window.loadAchievements = loadAchievements;
window.loadSettings = loadSettings;
window.loadFavorites = loadFavorites;
window.removeFavorite = removeFavorite;
window.displayProfile = displayProfile;
window.toggleEditSection = toggleEditSection;
window.cancelEdit = cancelEdit;
window.updateStats = updateStats;
window.changeProfilePic = changeProfilePic;
window.handleProfilePicChange = handleProfilePicChange;
window.loadProfilePic = loadProfilePic;
window.updateAllProfileStats = updateAllProfileStats;
window.viewHabitsDetails = viewHabitsDetails;
window.viewAllAchievements = viewAllAchievements;
window.clearActivity = clearActivity;
window.loadMoreActivity = loadMoreActivity;
window.shareProfile = shareProfile;
window.exportData = exportData;
window.resetProgress = resetProgress;
window.saveSettings = saveSettings;

// Inicializar página de perfil
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos básicos
    displayProfile();
    updateStats();
    loadProfilePic();
    
    // Event listeners
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const editPicBtn = document.getElementById('edit-pic-btn');
    const profilePicInput = document.getElementById('profile-pic-input');
    
    if (editProfileBtn) editProfileBtn.addEventListener('click', toggleEditSection);
    if (cancelEditBtn) cancelEditBtn.addEventListener('click', cancelEdit);
    if (editPicBtn) editPicBtn.addEventListener('click', changeProfilePic);
    if (profilePicInput) profilePicInput.addEventListener('change', handleProfilePicChange);
    
    // Cargar todas las estadísticas mejoradas
    setTimeout(() => {
        updateAllProfileStats();
        loadSettings();
    }, 100);
});
