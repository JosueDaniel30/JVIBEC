/* ============================ */
/* 🎯 SISTEMA DE METAS OPTIMIZADO */
/* ============================ */

const LEVELS = {
    bronze: { name: 'Bronce', color: '#d97706', reward: 'Guía de oración básica', icon: '🥉' },
    silver: { name: 'Plata', color: '#9ca3af', reward: 'Guía de estudio bíblico', icon: '🥈' },
    gold: { name: 'Oro', color: '#fbbf24', reward: 'Certificado de Liderazgo Espiritual', icon: '🥇' }
};

const TOTAL_GOALS = 15;

// Este listener se maneja más abajo junto con el formulario

function loadGoals() {
    Object.keys(LEVELS).forEach(level => {
        // Cargar metas predefinidas
        for (let i = 1; i <= 5; i++) {
            const checkbox = document.getElementById(`${level}${i}`);
            if (checkbox) {
                checkbox.checked = localStorage.getItem(`${level}${i}`) === 'true';
                updateGoalProgress(`${level}${i}`);
            }
        }
        
        // Cargar metas personalizadas del nivel
        loadLevelCustomGoals(level);
        
        updateProgress(level);
    });
    loadCustomGoals();
}

function loadLevelCustomGoals(level) {
    const levelGoals = JSON.parse(localStorage.getItem(`${level}_custom_goals`) || '[]');
    const levelGoalsContainer = document.getElementById(`${level}-goals`);
    
    if (!levelGoalsContainer) return;
    
        // Si hay metas personalizadas, expandir el nivel automáticamente
        if (levelGoals.length > 0) {
            const levelSection = document.querySelector(`.level-section.${level}`);
            const levelToggle = levelSection ? levelSection.querySelector('.level-toggle') : null;
            if (levelToggle) {
                const isExpanded = levelToggle.getAttribute('aria-expanded') === 'true';
                if (!isExpanded) {
                    levelToggle.setAttribute('aria-expanded', 'true');
                    levelGoalsContainer.classList.remove('hidden');
                    const icon = levelToggle.querySelector('.toggle-icon');
                    if (icon) {
                        icon.textContent = '▼';
                    }
                }
            }
        }
    
    if (levelGoals.length === 0) return;
    
    levelGoals.forEach(goal => {
        // Verificar si la meta ya existe en el DOM
        if (document.getElementById(goal.id)) return;
        
        const goalHTML = `
            <div class="goal-item goal-card bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700" data-goal-id="${goal.id}">
                <div class="flex items-start space-x-4">
                    <div class="goal-checkbox-section">
                        <div class="goal-checkbox-wrapper">
                            <input type="checkbox" id="${goal.id}" ${goal.completed ? 'checked' : ''}>
                            <label for="${goal.id}" class="goal-checkbox-label">
                                <div class="checkbox-custom">
                                    <div class="checkbox-icon">🎯</div>
                                    <div class="checkbox-checkmark">✓</div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="goal-content-section flex-1">
                        <div class="goal-header flex justify-between items-start mb-2">
                            <div class="goal-title-section">
                                <h4 class="goal-title font-bold text-lg">${goal.title}</h4>
                                <span class="goal-description text-sm text-gray-600 dark:text-gray-400">${goal.description || ''}</span>
                            </div>
                            <div class="goal-reward-badge bg-accent/20 text-accent px-3 py-1 rounded-lg text-sm font-semibold">
                                +10 ⭐
                            </div>
                        </div>
                        <div class="goal-progress">
                            <div class="streak-info text-sm text-gray-600 dark:text-gray-400">
                                ${goal.deadline ? `<span>📅 ${new Date(goal.deadline).toLocaleDateString()}</span>` : '<span class="streak-count">0</span> días de racha'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        levelGoalsContainer.insertAdjacentHTML('beforeend', goalHTML);
        
        // Guardar estado en localStorage
        if (goal.completed) {
            localStorage.setItem(goal.id, 'true');
        }
        
        // Agregar event listener
        const checkbox = document.getElementById(goal.id);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                const goalId = this.id;
                recordGoalProgress(goalId, this.checked);
                
                // Actualizar en localStorage
                const goals = JSON.parse(localStorage.getItem(`${level}_custom_goals`) || '[]');
                const goalIndex = goals.findIndex(g => g.id === goalId);
                if (goalIndex !== -1) {
                    goals[goalIndex].completed = this.checked;
                    localStorage.setItem(`${level}_custom_goals`, JSON.stringify(goals));
                }
                
                updateProgress(level);
                updateOverallProgress();
                updateGoalProgress(goalId);
                playCheckmarkAnimation(this);
                
                if (this.checked) {
                    celebrateGoalCompletion(goalId);
                }
            });
        }
    });
}

function setupEventListeners() {
    document.querySelectorAll('.level-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const levelSection = this.closest('.level-section');
            if (!levelSection) {
                console.error('No se encontró la sección del nivel');
                return;
            }
            
            // Buscar el nivel en las clases o en el data-level del contenedor de metas
            let level = null;
            const levels = ['bronze', 'silver', 'gold'];
            
            // Primero intentar encontrar el nivel en las clases
            for (let i = 0; i < levelSection.classList.length; i++) {
                if (levels.includes(levelSection.classList[i])) {
                    level = levelSection.classList[i];
                    break;
                }
            }
            
            // Si no se encuentra, buscar en el contenedor de metas
            if (!level) {
                const goalsGrid = levelSection.querySelector('[data-level]');
                if (goalsGrid) {
                    level = goalsGrid.getAttribute('data-level');
                }
            }
            
            if (!level) {
                console.error('No se pudo determinar el nivel');
                return;
            }
            
            const goalsGrid = document.getElementById(`${level}-goals`);
            
            if (!goalsGrid) {
                console.error(`No se encontró el contenedor de metas para el nivel: ${level}`);
                return;
            }
            
            const isExpanded = this.getAttribute('aria-expanded') === 'true';

            // Toggle del estado
            this.setAttribute('aria-expanded', !isExpanded);
            if (isExpanded) {
                goalsGrid.classList.add('hidden');
            } else {
                goalsGrid.classList.remove('hidden');
            }

            // Actualizar icono
            const icon = this.querySelector('.toggle-icon');
            if (icon) {
                if (isExpanded) {
                    icon.textContent = '▶';
                } else {
                    icon.textContent = '▼';
                }
            }
        });
    });

    document.getElementById('reset-progress')?.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
            resetAllProgress();
        }
    });

    document.getElementById('share-progress')?.addEventListener('click', shareProgress);

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const level = this.id.replace(/\d+$/, '');
            const goalId = this.id;

            // Registrar progreso detallado
            recordGoalProgress(goalId, this.checked);

            updateProgress(level);
            updateOverallProgress();
            updateGoalProgress(goalId);
            playCheckmarkAnimation(this);

            // Celebrar logros
            if (this.checked) {
                celebrateGoalCompletion(goalId);
            }
        });
    });
}

function updateProgress(level) {
    let completed = 0;
    let total = 5; // Metas predefinidas
    
    // Contar metas predefinidas
    for (let i = 1; i <= 5; i++) {
        const checkbox = document.getElementById(`${level}${i}`);
        if (checkbox?.checked) completed++;
        if (checkbox) localStorage.setItem(`${level}${i}`, checkbox.checked);
    }
    
    // Contar metas personalizadas del nivel
    const levelCustomGoals = JSON.parse(localStorage.getItem(`${level}_custom_goals`) || '[]');
    total += levelCustomGoals.length;
    levelCustomGoals.forEach(goal => {
        const checkbox = document.getElementById(goal.id);
        if (checkbox?.checked) {
            completed++;
            // Actualizar el estado en localStorage
            goal.completed = true;
        } else {
            goal.completed = false;
        }
    });
    
    // Guardar el estado actualizado
    if (levelCustomGoals.length > 0) {
        localStorage.setItem(`${level}_custom_goals`, JSON.stringify(levelCustomGoals));
    }

    const percentage = total > 0 ? (completed / total) * 100 : 0;

    const progressElement = document.getElementById(`${level}-progress`);
    if (progressElement) {
        progressElement.style.setProperty('width', `${percentage}%`);
        progressElement.setAttribute('aria-valuenow', percentage);
    }

    const countElement = document.getElementById(`${level}-count`);
    if (countElement) {
        countElement.textContent = `${completed}/${total} completadas`;
    }

    const percentageElement = document.getElementById(`${level}-percentage`);
    if (percentageElement) {
        percentageElement.textContent = `${Math.round(percentage)}%`;
    }

    if (completed === 5) showReward(level);
}

function updateOverallProgress() {
    let totalCompleted = 0;
    Object.keys(LEVELS).forEach(level => {
        for (let i = 1; i <= 5; i++) {
            const checkbox = document.getElementById(`${level}${i}`);
            if (checkbox && checkbox.checked) totalCompleted++;
        }
    });

    const totalPercentage = Math.round((totalCompleted / TOTAL_GOALS) * 100);

    const totalProgressElement = document.getElementById('total-progress');
    if (totalProgressElement) {
        totalProgressElement.textContent = totalPercentage;
    }

    const overallProgressFillElement = document.getElementById('overall-progress-fill');
    if (overallProgressFillElement) {
        overallProgressFillElement.style.setProperty('width', `${totalPercentage}%`);
    }

    showMotivationalMessage(totalPercentage);
}

function showReward(level) {
    const levelData = LEVELS[level];
    const rewardElement = document.getElementById(`${level}-reward`);
    if (!rewardElement) return;

    rewardElement.querySelector('.reward-text').textContent = `¡Nivel ${levelData.name} completado! Desbloqueaste: ${levelData.reward}`;
    rewardElement.style.display = 'flex';
    rewardElement.style.animation = 'fadeInUp 0.5s ease';

    showNotification(`🎉 ¡Felicidades! Completaste el Nivel ${levelData.name}`, levelData.icon);
}

function playCheckmarkAnimation(checkbox) {
    const customCheckbox = checkbox.nextElementSibling?.querySelector('.checkbox-custom');
    if (customCheckbox) {
        // Agregar efecto de pulso adicional
        customCheckbox.style.transform = 'scale(1.2)';
        setTimeout(() => {
            customCheckbox.style.transform = '';
        }, 200);
        
        // Crear efecto de ondas concéntricas
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.borderRadius = '16px';
        ripple.style.background = 'rgba(16, 185, 129, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        customCheckbox.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
}

function updateGoalProgress(goalId) {
    const goalItem = document.querySelector(`[data-goal-id="${goalId}"]`);
    if (!goalItem) return;

    const checkbox = document.getElementById(goalId);
    const isChecked = checkbox?.checked || false;

    // Actualizar contador de racha (los dots fueron eliminados)
    const streakCount = goalItem.querySelector('.streak-count');
    if (streakCount) {
        const progressData = JSON.parse(localStorage.getItem(`progress_${goalId}`) || '[]');
        const currentStreak = calculateStreak(progressData);
        streakCount.textContent = currentStreak;
    }

    // Actualizar barras de progreso para metas cuantitativas
    const progressTracker = goalItem.querySelector('.progress-tracker');
    if (progressTracker) {
        const progressData = JSON.parse(localStorage.getItem(`progress_${goalId}`) || '{}');
        const current = progressData.current || 0;
        const target = progressData.target || getTargetForGoal(goalId);

        const percentage = Math.min((current / target) * 100, 100);
        const progressFill = progressTracker.querySelector('.progress-fill-mini');
        const progressText = progressTracker.querySelector('.progress-text');

        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }

        if (progressText) {
            progressText.textContent = `${current}/${target} ${getUnitForGoal(goalId)}`;
        }
    }
}

function getTargetForGoal(goalId) {
    const targets = {
        'silver1': 5,   // versículos
        'silver3': 10,  // capítulos
        'gold1': 3,     // personas
        'gold3': 12,    // lecciones
        'gold4': 3,     // ministerios
        'gold5': 5      // vidas
    };
    return targets[goalId] || 1;
}

function getUnitForGoal(goalId) {
    const units = {
        'silver1': 'versículos',
        'silver3': 'capítulos',
        'gold1': 'personas',
        'gold3': 'lecciones',
        'gold4': 'ministerios',
        'gold5': 'vidas'
    };
    return units[goalId] || 'veces';
}

function calculateStreak(progressData) {
    if (!progressData.length) return 0;

    let streak = 0;
    const today = new Date();

    for (let i = 0; i < 30; i++) { // Check last 30 days
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);

        const hasEntry = progressData.some(entry =>
            new Date(entry.date).toDateString() === checkDate.toDateString()
        );

        if (hasEntry) {
            streak++;
        } else if (i === 0) {
            // If today is not completed, streak is 0
            return 0;
        } else {
            break;
        }
    }

    return streak;
}

function recordGoalProgress(goalId, isChecked) {
    const today = new Date().toISOString();

    if (isGoalQuantitative(goalId)) {
        // Para metas cuantitativas, incrementar contador
        const progressData = JSON.parse(localStorage.getItem(`progress_${goalId}`) || '{}');
        if (isChecked && !progressData.completed) {
            progressData.current = (progressData.current || 0) + 1;
            progressData.target = progressData.target || getTargetForGoal(goalId);

            if (progressData.current >= progressData.target) {
                progressData.completed = true;
                // Marcar checkbox como completada
                const checkbox = document.getElementById(goalId);
                if (checkbox) checkbox.checked = true;
            }

            localStorage.setItem(`progress_${goalId}`, JSON.stringify(progressData));
        }
    } else {
        // Para metas diarias/semanales, registrar fecha
        const progressData = JSON.parse(localStorage.getItem(`progress_${goalId}`) || '[]');

        if (isChecked) {
            // Agregar entrada si no existe
            const todayEntry = progressData.find(entry =>
                new Date(entry.date).toDateString() === new Date().toDateString()
            );

            if (!todayEntry) {
                progressData.push({ date: today, completed: true });
            }
        } else {
            // Remover entrada del día actual
            const filteredData = progressData.filter(entry =>
                new Date(entry.date).toDateString() !== new Date().toDateString()
            );
            localStorage.setItem(`progress_${goalId}`, JSON.stringify(filteredData));
            return;
        }

        localStorage.setItem(`progress_${goalId}`, JSON.stringify(progressData));
    }
}

function isGoalQuantitative(goalId) {
    const quantitativeGoals = ['silver1', 'silver3', 'gold1', 'gold3', 'gold4', 'gold5'];
    return quantitativeGoals.includes(goalId);
}

function celebrateGoalCompletion(goalId) {
    const goalNames = {
        'bronze1': 'Lectura diaria',
        'bronze2': 'Oración diaria',
        'bronze3': 'Asistencia al culto',
        'bronze4': 'Compartir versículos',
        'bronze5': 'Reflexión diaria',
        'silver1': 'Memorización de versículos',
        'silver2': 'Servicio en ministerio',
        'silver3': 'Estudio bíblico',
        'silver4': 'Compartir testimonio',
        'silver5': 'Oración intercesora',
        'gold1': 'Discipulado',
        'gold2': 'Liderazgo de grupo',
        'gold3': 'Curso bíblico',
        'gold4': 'Servicio múltiple',
        'gold5': 'Impacto espiritual'
    };

    const goalName = goalNames[goalId] || 'Meta completada';

    // Animación de celebración
    showCelebrationAnimation(goalId);

    // Notificación
    showNotification(`🎉 ¡${goalName} completada!`, '✅');

    // Efectos de sonido (simulado con vibración si está disponible)
    if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
    }
}

function showCelebrationAnimation(goalId) {
    const goalItem = document.querySelector(`[data-goal-id="${goalId}"]`);
    if (!goalItem) return;

    // Agregar clase de celebración
    goalItem.classList.add('celebrating');

    // Crear partículas de celebración
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createCelebrationParticle(goalItem);
        }, i * 100);
    }

    // Remover clase después de la animación
    setTimeout(() => {
        goalItem.classList.remove('celebrating');
    }, 2000);
}

function createCelebrationParticle(parentElement) {
    const particle = document.createElement('div');
    particle.className = 'celebration-particle';
    particle.innerHTML = '✨';

    // Posición aleatoria
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    parentElement.appendChild(particle);

    // Remover después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1000);
}

function celebrateStreak(streak) {
    const message = streak >= 30 ?
        `🎊 ¡INCREÍBLE! ${streak} días de racha - ¡Eres un guerrero de la fe!` :
        `🎯 ¡Excelente! ${streak} días seguidos - ¡Sigue así!`;
    showNotification(message, '🔥');
}

function shareProgress() {
    const totalCompleted = document.getElementById('total-progress')?.textContent || 0;
    const bronzeCompleted = document.getElementById('bronze-count')?.textContent?.split('/')[0] || 0;
    const silverCompleted = document.getElementById('silver-count')?.textContent?.split('/')[0] || 0;
    const goldCompleted = document.getElementById('gold-count')?.textContent?.split('/')[0] || 0;

    const message = `🎯 Mi progreso espiritual en Jóvenes en Cristo:\n` +
                   `✅ Progreso total: ${totalCompleted}%\n` +
                   `🥉 Nivel Bronce: ${bronzeCompleted}/5\n` +
                   `🥈 Nivel Plata: ${silverCompleted}/5\n` +
                   `🥇 Nivel Oro: ${goldCompleted}/5\n` +
                   `\n¡Únete a mí en este viaje de fe! ⛪`;

    if (navigator.share) {
        navigator.share({ title: 'Mi Progreso Espiritual', text: message, url: window.location.href });
    } else {
        navigator.clipboard.writeText(message).then(() =>
            showNotification('📋 ¡Progreso copiado al portapapeles!', '✅')
        );
    }
}

function resetAllProgress() {
    Object.keys(LEVELS).forEach(level => {
        for (let i = 1; i <= 5; i++) {
            localStorage.removeItem(`${level}${i}`);
            const checkbox = document.getElementById(`${level}${i}`);
            if (checkbox) {
                checkbox.checked = false;
            }
        }
        updateProgress(level);
    });

    document.querySelectorAll('.level-reward').forEach(reward => reward.style.display = 'none');
    updateOverallProgress();
    showNotification('♻️ Progreso reiniciado exitosamente', '🔄');
}

function showMotivationalMessage(percentage) {
    const messages = [
        { threshold: 0, message: '🎯 ¡Comienza tu viaje espiritual hoy!' },
        { threshold: 25, message: '🚀 ¡Vas por buen camino! Sigue adelante.' },
        { threshold: 50, message: '🌟 ¡Mitad del camino! Tu perseverancia es admirable.' },
        { threshold: 75, message: '💪 ¡Casi llegas! Tu dedicación está dando frutos.' },
        { threshold: 90, message: '🎊 ¡Casi completo! Eres una inspiración para otros.' },
        { threshold: 100, message: '🏆 ¡LO LOGRASTE! Has completado todas las metas.' }
    ];

    let message = messages[0].message;
    for (let i = messages.length - 1; i >= 0; i--) {
        if (percentage >= messages[i].threshold) {
            message = messages[i].message;
            break;
        }
    }

    const motivationText = document.querySelector('.motivation-text');
    if (motivationText && percentage > 0 && percentage < 100) {
        motivationText.textContent = message;
    }
}
// ============================
// 🔐 SISTEMA DE ADMINISTRACIÓN
// ============================

function initializeAdminPassword() {
    // Inicializar contraseña de admin si no existe (por defecto: "Dios12345")
    const currentPassword = localStorage.getItem('adminPassword');
    if (!currentPassword || currentPassword.trim() === '') {
        localStorage.setItem('adminPassword', 'Dios12345');
        console.log('Contraseña de admin inicializada: Dios12345');
    } else {
        console.log('Contraseña de admin ya existe:', currentPassword);
    }
}

function verifyAdminPassword(password) {
    // Asegurar que la contraseña de admin esté inicializada
    initializeAdminPassword();
    
    // Forzar reset si la contraseña no es la correcta
    let adminPassword = localStorage.getItem('adminPassword');
    if (!adminPassword || adminPassword !== 'Dios12345') {
        localStorage.setItem('adminPassword', 'Dios12345');
        adminPassword = 'Dios12345';
        console.log('Contraseña de admin reseteada a: Dios12345');
    }
    
    // Limpiar espacios en blanco de ambos lados
    const cleanPassword = password ? password.trim() : '';
    const cleanAdminPassword = adminPassword ? adminPassword.trim() : '';
    
    // Depuración
    console.log('Verificando contraseña:');
    console.log('- Ingresada:', `"${cleanPassword}"`);
    console.log('- Almacenada:', `"${cleanAdminPassword}"`);
    console.log('- Longitud ingresada:', cleanPassword.length);
    console.log('- Longitud almacenada:', cleanAdminPassword.length);
    console.log('- ¿Coinciden?', cleanPassword === cleanAdminPassword);
    
    const isValid = cleanPassword === cleanAdminPassword;
    
    if (!isValid) {
        console.error('❌ Contraseña incorrecta. La contraseña correcta es: Dios12345');
    } else {
        console.log('✅ Contraseña correcta');
    }
    
    return isValid;
}

function setAdminPassword(newPassword) {
    if (newPassword && newPassword.length >= 4) {
        localStorage.setItem('adminPassword', newPassword);
        showNotification('🔐 Contraseña de admin actualizada', '✅');
        return true;
    }
    showNotification('La contraseña debe tener al menos 4 caracteres', '⚠️');
    return false;
}

// Función global para resetear la contraseña de admin (útil para depuración)
function resetAdminPassword() {
    localStorage.setItem('adminPassword', 'Dios12345');
    console.log('✅ Contraseña de admin reseteada a: Dios12345');
    if (typeof showNotification === 'function') {
        showNotification('🔐 Contraseña de admin reseteada a: Dios12345', '✅');
    }
    return true;
}

// Hacer la función disponible globalmente
window.resetAdminPassword = resetAdminPassword;

// Funciones para metas personalizadas
function showAddGoalModal() {
    // Asegurar que la contraseña esté inicializada antes de mostrar el modal
    initializeAdminPassword();
    
    const modal = document.getElementById('add-goal-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        const passwordInput = document.getElementById('admin-password');
        if (passwordInput) {
            passwordInput.focus();
            // Limpiar el campo al abrir el modal
            passwordInput.value = '';
        }
    } else {
        console.error('Modal no encontrado');
    }
}

function closeModal() {
    const modal = document.getElementById('add-goal-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
    const form = document.getElementById('add-goal-form');
    if (form) {
        form.reset();
    }
    // Limpiar mensaje de error si existe
    const errorMsg = document.getElementById('admin-password-error');
    if (errorMsg) errorMsg.remove();
}

function addCustomGoal(title, description, deadline, level = 'custom', order = null) {
    // Si el nivel es bronze, silver o gold, agregar directamente en ese nivel
    if (level === 'bronze' || level === 'silver' || level === 'gold') {
        addGoalToLevel(title, description, deadline, level);
        return;
    }
    
    // Si es custom, agregar a metas personalizadas
    const customGoals = JSON.parse(localStorage.getItem('customGoals') || '[]');
    const newGoal = {
        id: Date.now(),
        title,
        description,
        deadline,
        level,
        order: order !== null ? order : customGoals.length,
        completed: false,
        createdAt: new Date().toISOString()
    };

    customGoals.push(newGoal);
    // Ordenar por order
    customGoals.sort((a, b) => (a.order || 0) - (b.order || 0));
    localStorage.setItem('customGoals', JSON.stringify(customGoals));
    loadCustomGoals();
    initializeDragAndDrop();
    showNotification('✅ Meta agregada exitosamente', '🎯');
}

function addGoalToLevel(title, description, deadline, level) {
    // Obtener el contenedor del nivel
    const levelGoalsContainer = document.getElementById(`${level}-goals`);
    if (!levelGoalsContainer) {
        showNotification('Error: No se encontró el contenedor del nivel', '❌');
        return;
    }
    
    // Generar un ID único para la meta
    const goalId = `${level}_custom_${Date.now()}`;
    
    // Crear el HTML de la nueva meta
    const goalHTML = `
        <div class="goal-item goal-card bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700" data-goal-id="${goalId}">
            <div class="flex items-start space-x-4">
                <div class="goal-checkbox-section">
                    <div class="goal-checkbox-wrapper">
                        <input type="checkbox" id="${goalId}">
                        <label for="${goalId}" class="goal-checkbox-label">
                            <div class="checkbox-custom">
                                <div class="checkbox-icon">🎯</div>
                                <div class="checkbox-checkmark">✓</div>
                            </div>
                        </label>
                    </div>
                </div>
                <div class="goal-content-section flex-1">
                    <div class="goal-header flex justify-between items-start mb-2">
                        <div class="goal-title-section">
                            <h4 class="goal-title font-bold text-lg">${title}</h4>
                            <span class="goal-description text-sm text-gray-600 dark:text-gray-400">${description || ''}</span>
                        </div>
                        <div class="goal-reward-badge bg-accent/20 text-accent px-3 py-1 rounded-lg text-sm font-semibold">
                            +10 ⭐
                        </div>
                    </div>
                    <div class="goal-progress">
                        <div class="streak-info text-sm text-gray-600 dark:text-gray-400">
                            ${deadline ? `<span>📅 ${new Date(deadline).toLocaleDateString()}</span>` : '<span class="streak-count">0</span> días de racha'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insertar la meta en el contenedor
    levelGoalsContainer.insertAdjacentHTML('beforeend', goalHTML);
    
    // Guardar la meta en localStorage
    const levelGoals = JSON.parse(localStorage.getItem(`${level}_custom_goals`) || '[]');
    levelGoals.push({
        id: goalId,
        title,
        description,
        deadline,
        level,
        completed: false,
        createdAt: new Date().toISOString()
    });
    localStorage.setItem(`${level}_custom_goals`, JSON.stringify(levelGoals));
    
    // Agregar event listener al nuevo checkbox
    const newCheckbox = document.getElementById(goalId);
    if (newCheckbox) {
        newCheckbox.addEventListener('change', function() {
            const goalId = this.id;
            recordGoalProgress(goalId, this.checked);
            updateProgress(level);
            updateOverallProgress();
            updateGoalProgress(goalId);
            playCheckmarkAnimation(this);
            
            if (this.checked) {
                celebrateGoalCompletion(goalId);
            }
        });
    }
    
    // Asegurar que el nivel esté expandido
    const levelToggle = document.querySelector(`.level-section.${level} .level-toggle`);
    if (levelToggle && levelGoalsContainer) {
        const isExpanded = levelToggle.getAttribute('aria-expanded') === 'true';
        if (!isExpanded) {
            levelToggle.setAttribute('aria-expanded', 'true');
            levelGoalsContainer.classList.remove('hidden');
            const icon = levelToggle.querySelector('.toggle-icon');
            if (icon) {
                icon.textContent = '▼';
            }
        }
    }
    
    updateProgress(level);
    updateOverallProgress();
    showNotification(`✅ Meta agregada al nivel ${LEVELS[level].name}`, '🎯');
}

function loadCustomGoals() {
    const customGoals = JSON.parse(localStorage.getItem('customGoals') || '[]');
    const container = document.getElementById('custom-goals-list');

    if (customGoals.length === 0) {
        container.innerHTML = '<p class="empty-state text-center py-8 text-gray-500 col-span-2">No tienes metas personalizadas aún. ¡Agrega una!</p>';
        return;
    }

    // Ordenar por order
    const sortedGoals = [...customGoals].sort((a, b) => (a.order || 0) - (b.order || 0));

    const goalsHTML = sortedGoals.map(goal => `
        <div class="custom-goal-item goal-item goal-card bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 ${goal.completed ? 'completed opacity-60' : ''}" data-id="${goal.id}" data-goal-id="custom_${goal.id}" draggable="true">
            <div class="flex items-start space-x-4">
                <div class="goal-checkbox-section">
                    <div class="goal-checkbox-wrapper">
                        <input type="checkbox" id="custom_${goal.id}" ${goal.completed ? 'checked' : ''}>
                        <label for="custom_${goal.id}" class="goal-checkbox-label">
                            <div class="checkbox-custom">
                                <div class="checkbox-icon">🎯</div>
                                <div class="checkbox-checkmark">✓</div>
                            </div>
                        </label>
                    </div>
                </div>
                <div class="goal-content-section flex-1">
                    <div class="goal-header flex justify-between items-start mb-2">
                        <div class="goal-title-section">
                            <h4 class="goal-title font-bold text-lg">${goal.title}</h4>
                            <span class="goal-description text-sm text-gray-600 dark:text-gray-400">${goal.description || ''}</span>
                        </div>
                        <div class="goal-reward-badge bg-accent/20 text-accent px-3 py-1 rounded-lg text-sm font-semibold">
                            +10 ⭐
                        </div>
                    </div>
                    <div class="goal-progress">
                        <div class="streak-info text-sm text-gray-600 dark:text-gray-400">
                            ${goal.deadline ? `<span>📅 ${new Date(goal.deadline).toLocaleDateString()}</span>` : '<span class="streak-count">0</span> días de racha'}
                        </div>
                    </div>
                </div>
                <div class="custom-goal-actions flex space-x-2">
                    <button onclick="deleteCustomGoal(${goal.id})" class="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors" title="Eliminar">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = goalsHTML;
    initializeDragAndDrop();
    
    // Agregar event listeners a los checkboxes de metas personalizadas
    sortedGoals.forEach(goal => {
        const checkbox = document.getElementById(`custom_${goal.id}`);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                toggleCustomGoal(goal.id);
            });
        }
    });
}

function toggleCustomGoal(id) {
    const customGoals = JSON.parse(localStorage.getItem('customGoals') || '[]');
    const goal = customGoals.find(g => g.id === id);
    if (goal) {
        goal.completed = !goal.completed;
        localStorage.setItem('customGoals', JSON.stringify(customGoals));
        loadCustomGoals();
        showNotification(goal.completed ? '🎉 ¡Meta completada!' : 'Meta marcada como pendiente', goal.completed ? '✅' : '⏳');
    }
}

function deleteCustomGoal(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta meta?')) {
        const customGoals = JSON.parse(localStorage.getItem('customGoals') || '[]');
        const filteredGoals = customGoals.filter(g => g.id !== id);
        localStorage.setItem('customGoals', JSON.stringify(filteredGoals));
        loadCustomGoals();
        showNotification('Meta eliminada', '🗑️');
    }
}

function showStats() {
    const totalGoals = 15; // 5 por nivel
    const customGoals = JSON.parse(localStorage.getItem('customGoals') || '[]');
    const completedCustom = customGoals.filter(g => g.completed).length;

    let completedLevels = 0;
    Object.keys(LEVELS).forEach(level => {
        let completed = 0;
        for (let i = 1; i <= 5; i++) {
            if (localStorage.getItem(`${level}${i}`) === 'true') completed++;
        }
        if (completed === 5) completedLevels++;
    });

    const totalCompleted = completedLevels * 5 + completedCustom;
    const totalAvailable = totalGoals + customGoals.length;

    const statsMessage = `
📊 Tus Estadísticas Espirituales:

🎯 Metas del Sistema: ${totalCompleted - completedCustom}/${totalGoals}
🥉 Bronce: ${document.getElementById('bronze-count')?.textContent || '0/5'}
🥈 Plata: ${document.getElementById('silver-count')?.textContent || '0/5'}
🥇 Oro: ${document.getElementById('gold-count')?.textContent || '0/5'}

🎯 Metas Personalizadas: ${completedCustom}/${customGoals.length}
🔥 Racha actual: ${localStorage.getItem('streak') || 0} días

¡Sigue adelante, guerrero de la fe! 💪
    `;

    showNotification(statsMessage, '📊');
}

// ============================
// 🎯 DRAG AND DROP PARA METAS
// ============================

function initializeDragAndDrop() {
    const goalItems = document.querySelectorAll('.custom-goal-item[draggable="true"]');
    const goalsGrid = document.getElementById('custom-goals-list');
    
    if (!goalsGrid || goalItems.length === 0) return;

    goalItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    // Permitir drop en el contenedor
    goalsGrid.addEventListener('dragover', handleDragOver);
    goalsGrid.addEventListener('drop', handleDrop);
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    const container = e.currentTarget;
    const afterElement = getDragAfterElement(container, e.clientY);
    
    if (afterElement == null) {
        if (container.classList.contains('goals-grid')) {
            container.appendChild(draggedElement);
        }
    } else {
        container.insertBefore(draggedElement, afterElement);
    }
    
    return false;
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Actualizar orden en localStorage
    updateGoalsOrder();
    showNotification('✅ Orden de metas actualizado', '🔄');
    
    return false;
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    draggedElement = null;
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.custom-goal-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateGoalsOrder() {
    const goalItems = document.querySelectorAll('.custom-goal-item');
    const customGoals = JSON.parse(localStorage.getItem('customGoals') || '[]');
    
    goalItems.forEach((item, index) => {
        const goalId = parseInt(item.getAttribute('data-id'));
        const goal = customGoals.find(g => g.id === goalId);
        if (goal) {
            goal.order = index;
        }
    });
    
    localStorage.setItem('customGoals', JSON.stringify(customGoals));
}

// Event listeners adicionales
document.addEventListener('DOMContentLoaded', () => {
    initializeAdminPassword();
    loadGoals();
    setupEventListeners();
    updateOverallProgress();
    loadCustomGoals();

    // Formulario de meta personalizada con autenticación de admin
    const addGoalForm = document.getElementById('add-goal-form');
    if (addGoalForm) {
        addGoalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const adminPasswordInput = document.getElementById('admin-password');
            const titleInput = document.getElementById('goal-title');
            const descriptionInput = document.getElementById('goal-description');
            const deadlineInput = document.getElementById('goal-deadline');
            const levelInput = document.getElementById('goal-level');

            if (!adminPasswordInput || !titleInput || !levelInput) {
                showNotification('Error: No se encontraron todos los campos del formulario', '❌');
                console.error('Campos del formulario no encontrados');
                return;
            }

            const adminPassword = adminPasswordInput.value.trim();
            const title = titleInput.value.trim();
            const description = descriptionInput ? descriptionInput.value.trim() : '';
            const deadline = deadlineInput ? deadlineInput.value : '';
            const level = levelInput.value;

            // Verificar que la contraseña no esté vacía
            if (!adminPassword) {
                showNotification('Por favor ingresa la contraseña de admin', '⚠️');
                adminPasswordInput.focus();
                return;
            }

            // Verificar contraseña de admin
            if (!verifyAdminPassword(adminPassword)) {
                // Depuración: mostrar en consola para ayudar a diagnosticar
                const storedPassword = localStorage.getItem('adminPassword');
                console.log('Contraseña ingresada:', adminPassword);
                console.log('Contraseña almacenada:', storedPassword);
                console.log('¿Coinciden?', adminPassword === storedPassword);
                
                // Mostrar mensaje de error
                const errorMsg = document.getElementById('admin-password-error');
                if (errorMsg) {
                    errorMsg.remove();
                }
                const errorDiv = document.createElement('div');
                errorDiv.id = 'admin-password-error';
                errorDiv.style.color = 'var(--error-color, #ef4444)';
                errorDiv.style.marginTop = '0.5rem';
                errorDiv.style.fontSize = '0.875rem';
                errorDiv.textContent = '❌ Contraseña de admin incorrecta. La contraseña correcta es: Dios12345';
                adminPasswordInput.parentNode.insertBefore(errorDiv, adminPasswordInput.nextSibling);
                adminPasswordInput.focus();
                return;
            }

            // Remover mensaje de error si existe
            const errorMsg = document.getElementById('admin-password-error');
            if (errorMsg) errorMsg.remove();

            if (title) {
                const customGoals = JSON.parse(localStorage.getItem('customGoals') || '[]');
                const order = customGoals.length;
                addCustomGoal(title, description, deadline, level, order);
                closeModal();
            } else {
                showNotification('Por favor ingresa un título para la meta', '⚠️');
                titleInput.focus();
            }
        });
    } else {
        console.error('Formulario de agregar meta no encontrado');
    }

    // Cerrar modal al hacer clic fuera
    document.getElementById('add-goal-modal')?.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
});

// ============================
// 🔔 SISTEMA DE NOTIFICACIONES
// ============================

function showNotification(message, type = 'info') {
    // Crear notificación
    const notification = document.createElement('div');
    const bgColor = type === 'success' || type === '✅' ? 'bg-green-500' :
                    type === 'error' || type === '❌' ? 'bg-red-500' :
                    type === 'warning' || type === '⚠️' ? 'bg-yellow-500' :
                    'bg-accent';
    
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg transform transition-all duration-300 translate-x-0 opacity-100 ${bgColor} text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Hacer showNotification disponible globalmente
window.showNotification = showNotification;