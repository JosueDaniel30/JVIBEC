// Script de prueba para validar funcionalidades PWA
// Ejecutar con: node test-pwa.js

const fs = require('fs');
const path = require('path');

console.log('🧪 Iniciando pruebas PWA para "App Jóvenes"...\n');

// Función para verificar si un archivo existe
function fileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

// Función para validar JSON
function isValidJSON(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        JSON.parse(content);
        return true;
    } catch {
        return false;
    }
}

// Función para verificar meta tags PWA en HTML
function checkPWAMetaTags(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const checks = {
        manifest: content.includes('manifest.json'),
        themeColor: content.includes('theme-color'),
        appleTouchIcon: content.includes('apple-touch-icon'),
        viewport: content.includes('viewport')
    };
    return checks;
}

// Pruebas principales
const tests = [
    {
        name: '📄 Archivo manifest.json existe',
        test: () => fileExists('manifest.json'),
        critical: true
    },
    {
        name: '✅ manifest.json es JSON válido',
        test: () => isValidJSON('manifest.json'),
        critical: true
    },
    {
        name: '🔧 Archivo sw.js existe',
        test: () => fileExists('sw.js'),
        critical: true
    },
    {
        name: '🏠 index.html tiene meta tags PWA',
        test: () => {
            const checks = checkPWAMetaTags('index.html');
            return checks.manifest && checks.themeColor && checks.appleTouchIcon;
        },
        critical: true
    },
    {
        name: '📖 biblia.html tiene meta tags PWA',
        test: () => {
            const checks = checkPWAMetaTags('biblia.html');
            return checks.manifest && checks.themeColor && checks.appleTouchIcon;
        },
        critical: true
    },
    {
        name: '👤 perfil.html tiene meta tags PWA',
        test: () => {
            const checks = checkPWAMetaTags('perfil.html');
            return checks.manifest && checks.themeColor && checks.appleTouchIcon;
        },
        critical: true
    },
    {
        name: '🎯 metas.html tiene meta tags PWA',
        test: () => {
            const checks = checkPWAMetaTags('metas.html');
            return checks.manifest && checks.themeColor && checks.appleTouchIcon;
        },
        critical: true
    },
    {
        name: '🔑 login.html tiene meta tags PWA',
        test: () => {
            const checks = checkPWAMetaTags('login.html');
            return checks.manifest && checks.themeColor && checks.appleTouchIcon;
        },
        critical: true
    },
    {
        name: '🎨 Archivo styles.css existe',
        test: () => fileExists('styles.css'),
        critical: false
    },
    {
        name: '📜 Archivo script.js existe',
        test: () => fileExists('script.js'),
        critical: false
    },
    {
        name: '🖼️ Logo existe (logojov.png)',
        test: () => fileExists('logojov.png'),
        critical: false
    }
];

// Ejecutar pruebas
let passedTests = 0;
let criticalFailed = 0;

tests.forEach(test => {
    const result = test.test();
    const status = result ? '✅ PASÓ' : '❌ FALLÓ';
    const critical = test.critical ? ' (CRÍTICO)' : '';

    console.log(`${status}${critical}: ${test.name}`);

    if (result) {
        passedTests++;
    } else if (test.critical) {
        criticalFailed++;
    }
});

console.log(`\n📊 Resultados: ${passedTests}/${tests.length} pruebas pasaron`);
console.log(`🚨 Pruebas críticas fallidas: ${criticalFailed}`);

// Validar contenido del manifest
if (fileExists('manifest.json') && isValidJSON('manifest.json')) {
    console.log('\n🔍 Validando contenido del manifest.json...');
    const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));

    const manifestChecks = [
        { name: 'Nombre de la app', check: manifest.name === 'Jóvenes con Cristo' },
        { name: 'Nombre corto', check: manifest.short_name === 'JovenesApp' },
        { name: 'Modo de visualización standalone', check: manifest.display === 'standalone' },
        { name: 'URL de inicio', check: manifest.start_url === '/index.html' },
        { name: 'Color del tema', check: manifest.theme_color === '#4f46e5' },
        { name: 'Idioma', check: manifest.lang === 'es' },
        { name: 'Íconos definidos', check: manifest.icons && manifest.icons.length > 0 },
        { name: 'Atajos definidos', check: manifest.shortcuts && manifest.shortcuts.length > 0 }
    ];

    manifestChecks.forEach(check => {
        const status = check.check ? '✅' : '❌';
        console.log(`${status} ${check.name}`);
    });
}

// Validar service worker básico
if (fileExists('sw.js')) {
    console.log('\n🔍 Validando contenido básico del service worker...');
    const swContent = fs.readFileSync('sw.js', 'utf8');

    const swChecks = [
        { name: 'Registro de instalación', check: swContent.includes('install') },
        { name: 'Registro de activación', check: swContent.includes('activate') },
        { name: 'Manejo de fetch', check: swContent.includes('fetch') },
        { name: 'Estrategia de cache', check: swContent.includes('caches.match') },
        { name: 'Cache de recursos estáticos', check: swContent.includes('STATIC_ASSETS') },
        { name: 'Cache de Biblia', check: swContent.includes('bible-cache') }
    ];

    swChecks.forEach(check => {
        const status = check.check ? '✅' : '❌';
        console.log(`${status} ${check.name}`);
    });
}

// Verificar registro del service worker en script.js
if (fileExists('script.js')) {
    console.log('\n🔍 Verificando registro del service worker...');
    const scriptContent = fs.readFileSync('script.js', 'utf8');

    const scriptChecks = [
        { name: 'Función registerServiceWorker existe', check: scriptContent.includes('registerServiceWorker') },
        { name: 'Registro del service worker', check: scriptContent.includes('navigator.serviceWorker.register') },
        { name: 'Manejo de actualizaciones', check: scriptContent.includes('updatefound') }
    ];

    scriptChecks.forEach(check => {
        const status = check.check ? '✅' : '❌';
        console.log(`${status} ${check.name}`);
    });
}

console.log('\n🎯 Recomendaciones para testing manual:');
console.log('1. Abrir http://localhost:8000 en Chrome/Edge');
console.log('2. Abrir DevTools > Application > Manifest - verificar que se carga');
console.log('3. DevTools > Application > Service Workers - verificar registro');
console.log('4. Desconectar internet y recargar - verificar funcionamiento offline');
console.log('5. Buscar "Install app" en el navegador - verificar instalación');
console.log('6. Probar atajos de la app después de instalar');

if (criticalFailed === 0) {
    console.log('\n🎉 ¡Todas las pruebas críticas pasaron! La PWA está lista para producción.');
} else {
    console.log(`\n⚠️ ${criticalFailed} pruebas críticas fallaron. Corregir antes de desplegar.`);
}
