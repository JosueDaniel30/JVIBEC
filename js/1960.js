/* ============================
   📖 BIBLIA RVR1960 COMPLETA - AJUSTADO PARA JovenesIBEC
   VERSIÓN OPTIMIZADA UI/UX
============================ */

class BibliaRVR1960 {
    constructor() {
        // DETECCIÓN INTELIGENTE DEL ENTORNO
        const currentUrl = window.location.href;
        const currentHost = window.location.hostname;
        const currentPath = window.location.pathname;

        console.log('🔍 Detectando entorno...');
        console.log('URL:', currentUrl);
        console.log('Hostname:', currentHost);
        console.log('Pathname:', currentPath);

        // 1. ¿Estamos en GitHub Pages?
        if (currentHost.includes('github.io')) {
            // Verificar si es TU repositorio específico
            if (currentPath.includes('/JovenesIBEC')) {
                this.basePath = '/JovenesIBEC';
                console.log('✅ Modo: GitHub Pages (JovenesIBEC)');
            } else {
                this.basePath = '';
                console.log('⚠️ Modo: GitHub Pages (otro repositorio)');
            }
        }
        // 2. ¿Estamos en localhost (node server.js)?
        else if (currentHost.includes('localhost') || currentHost.includes('127.0.0.1')) {
            this.basePath = '';
            console.log('💻 Modo: Servidor Local');
        }
        // 3. ¿Estamos en file:// (archivo local)?
        else if (window.location.protocol === 'file:') {
            this.basePath = '.';
            console.error('❌ MODO FILE:// NO SOPORTADO');
            console.error('Ejecuta: node server.js');
            console.error('Luego abre: http://localhost:3000');

            // Mostrar alerta clara al usuario
            setTimeout(() => {
                const warning = document.createElement('div');
                warning.style.cssText = `
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #ef4444;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    z-index: 9999;
                    font-family: sans-serif;
                    max-width: 90%;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                `;
                warning.innerHTML = `
                    <strong>⚠️ ADVERTENCIA: MODO INCORRECTO</strong><br>
                    No uses file:// para probar la Biblia.<br>
                    <strong>Ejecuta en terminal:</strong> <code>node server.js</code><br>
                    <strong>Luego abre:</strong> <a href="http://localhost:3000" style="color: white; text-decoration: underline;">http://localhost:3000</a>
                `;
                document.body.appendChild(warning);

                // Auto-eliminar después de 10 segundos
                setTimeout(() => warning.remove(), 10000);
            }, 1500);
        }
        // 4. Otros servidores (Live Server, Python, etc.)
        else {
            this.basePath = '';
            console.log('🌐 Modo: Otro servidor HTTP');
        }

        // RESTO DEL CONSTRUCTOR SIN CAMBIOS
        this.libros = [
            { id: 1, nombre: "Génesis", abrev: "GEN", testament: "AT", cap: 50 },
            { id: 2, nombre: "Éxodo", abrev: "EXO", testament: "AT", cap: 40 },
            { id: 3, nombre: "Levítico", abrev: "LEV", testament: "AT", cap: 27 },
            { id: 4, nombre: "Números", abrev: "NUM", testament: "AT", cap: 36 },
            { id: 5, nombre: "Deuteronomio", abrev: "DEU", testament: "AT", cap: 34 },
            { id: 6, nombre: "Josué", abrev: "JOS", testament: "AT", cap: 24 },
            { id: 7, nombre: "Jueces", abrev: "JUE", testament: "AT", cap: 21 },
            { id: 8, nombre: "Rut", abrev: "RUT", testament: "AT", cap: 4 },
            { id: 9, nombre: "1 Samuel", abrev: "1SA", testament: "AT", cap: 31 },
            { id: 10, nombre: "2 Samuel", abrev: "2SA", testament: "AT", cap: 24 },
            { id: 11, nombre: "1 Reyes", abrev: "1RE", testament: "AT", cap: 22 },
            { id: 12, nombre: "2 Reyes", abrev: "2RE", testament: "AT", cap: 25 },
            { id: 13, nombre: "1 Crónicas", abrev: "1CR", testament: "AT", cap: 29 },
            { id: 14, nombre: "2 Crónicas", abrev: "2CR", testament: "AT", cap: 36 },
            { id: 15, nombre: "Esdras", abrev: "ESD", testament: "AT", cap: 10 },
            { id: 16, nombre: "Nehemías", abrev: "NEH", testament: "AT", cap: 13 },
            { id: 17, nombre: "Ester", abrev: "EST", testament: "AT", cap: 10 },
            { id: 18, nombre: "Job", abrev: "JOB", testament: "AT", cap: 42 },
            { id: 19, nombre: "Salmos", abrev: "SAL", testament: "AT", cap: 150 },
            { id: 20, nombre: "Proverbios", abrev: "PRO", testament: "AT", cap: 31 },
            { id: 21, nombre: "Eclesiastés", abrev: "ECL", testament: "AT", cap: 12 },
            { id: 22, nombre: "Cantares", abrev: "CAN", testament: "AT", cap: 8 },
            { id: 23, nombre: "Isaías", abrev: "ISA", testament: "AT", cap: 66 },
            { id: 24, nombre: "Jeremías", abrev: "JER", testament: "AT", cap: 52 },
            { id: 25, nombre: "Lamentaciones", abrev: "LAM", testament: "AT", cap: 5 },
            { id: 26, nombre: "Ezequiel", abrev: "EZE", testament: "AT", cap: 48 },
            { id: 27, nombre: "Daniel", abrev: "DAN", testament: "AT", cap: 12 },
            { id: 28, nombre: "Oseas", abrev: "OSE", testament: "AT", cap: 14 },
            { id: 29, nombre: "Joel", abrev: "JOE", testament: "AT", cap: 3 },
            { id: 30, nombre: "Amós", abrev: "AMO", testament: "AT", cap: 9 },
            { id: 31, nombre: "Abdías", abrev: "ABD", testament: "AT", cap: 1 },
            { id: 32, nombre: "Jonás", abrev: "JON", testament: "AT", cap: 4 },
            { id: 33, nombre: "Miqueas", abrev: "MIQ", testament: "AT", cap: 7 },
            { id: 34, nombre: "Nahúm", abrev: "NAH", testament: "AT", cap: 3 },
            { id: 35, nombre: "Habacuc", abrev: "HAB", testament: "AT", cap: 3 },
            { id: 36, nombre: "Sofonías", abrev: "SOF", testament: "AT", cap: 3 },
            { id: 37, nombre: "Hageo", abrev: "HAG", testament: "AT", cap: 2 },
            { id: 38, nombre: "Zacarías", abrev: "ZAC", testament: "AT", cap: 14 },
            { id: 39, nombre: "Malaquías", abrev: "MAL", testament: "AT", cap: 4 },
            { id: 40, nombre: "Mateo", abrev: "MAT", testament: "NT", cap: 28 },
            { id: 41, nombre: "Marcos", abrev: "MAR", testament: "NT", cap: 16 },
            { id: 42, nombre: "Lucas", abrev: "LUC", testament: "NT", cap: 24 },
            { id: 43, nombre: "Juan", abrev: "JUA", testament: "NT", cap: 21 },
            { id: 44, nombre: "Hechos", abrev: "HEC", testament: "NT", cap: 28 },
            { id: 45, nombre: "Romanos", abrev: "ROM", testament: "NT", cap: 16 },
            { id: 46, nombre: "1 Corintios", abrev: "1CO", testament: "NT", cap: 16 },
            { id: 47, nombre: "2 Corintios", abrev: "2CO", testament: "NT", cap: 13 },
            { id: 48, nombre: "Gálatas", abrev: "GAL", testament: "NT", cap: 6 },
            { id: 49, nombre: "Efesios", abrev: "EFE", testament: "NT", cap: 6 },
            { id: 50, nombre: "Filipenses", abrev: "FIL", testament: "NT", cap: 4 },
            { id: 51, nombre: "Colosenses", abrev: "COL", testament: "NT", cap: 4 },
            { id: 52, nombre: "1 Tesalonicenses", abrev: "1TS", testament: "NT", cap: 5 },
            { id: 53, nombre: "2 Tesalonicenses", abrev: "2TS", testament: "NT", cap: 3 },
            { id: 54, nombre: "1 Timoteo", abrev: "1TI", testament: "NT", cap: 6 },
            { id: 55, nombre: "2 Timoteo", abrev: "2TI", testament: "NT", cap: 4 },
            { id: 56, nombre: "Tito", abrev: "TIT", testament: "NT", cap: 3 },
            { id: 57, nombre: "Filemón", abrev: "FILM", testament: "NT", cap: 1 },
            { id: 58, nombre: "Hebreos", abrev: "HEB", testament: "NT", cap: 13 },
            { id: 59, nombre: "Santiago", abrev: "SAN", testament: "NT", cap: 5 },
            { id: 60, nombre: "1 Pedro", abrev: "1PE", testament: "NT", cap: 5 },
            { id: 61, nombre: "2 Pedro", abrev: "2PE", testament: "NT", cap: 3 },
            { id: 62, nombre: "1 Juan", abrev: "1JU", testament: "NT", cap: 5 },
            { id: 63, nombre: "2 Juan", abrev: "2JU", testament: "NT", cap: 1 },
            { id: 64, nombre: "3 Juan", abrev: "3JU", testament: "NT", cap: 1 },
            { id: 65, nombre: "Judas", abrev: "JUD", testament: "NT", cap: 1 },
            { id: 66, nombre: "Apocalipsis", abrev: "APO", testament: "NT", cap: 22 }
        ];

        this.versiculosCache = new Map();
        this.libroActual = null;
        this.capituloActual = null;

        console.log('Base path final:', this.basePath);
    }


    // Obtener archivo JSON de un capítulo - CORREGIDO PARA TU ESTRUCTURA
    async obtenerCapitulo(nombreLibro, capitulo) {
        console.log(`📖 Obteniendo: ${nombreLibro} ${capitulo}`);

        const libro = this.libros.find(l => l.nombre === nombreLibro);
        if (!libro) {
            console.error('Libro no encontrado:', nombreLibro);
            return null;
        }

        // Obtener rutas
        const carpeta = this.getCarpetaLibro(nombreLibro);
        const archivo = this.getNombreArchivo(nombreLibro, capitulo);

        if (!carpeta || !archivo) {
            console.error('No se pudo generar nombre de archivo/carpeta');
            return null;
        }

        // Construir URL - CORREGIDA
        const url = `${this.basePath}/biblia/${carpeta}/${archivo.toLowerCase()}`;
        console.log('🌐 URL:', url);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.error(`❌ Error HTTP ${response.status} para: ${url}`);
                return null;
            }

            // Usar response.json() directamente ya que los archivos son JSON válido
            const chapterData = await response.json();

            // PROCESAR TU FORMATO ESPECÍFICO
            const versiculos = {};

            // FORMATO ACTUAL DE TUS ARCHIVOS: {book: "...", chapter: X, verses: [{verse: 1, text: "..."}]}
            if (chapterData.verses && Array.isArray(chapterData.verses)) {
                chapterData.verses.forEach(verseObj => {
                    if (verseObj && typeof verseObj.verse !== 'undefined' && verseObj.text) {
                        versiculos[verseObj.verse] = verseObj.text;
                    }
                });
                console.log(`✅ Extraídos ${Object.keys(versiculos).length} versículos de ${nombreLibro} ${capitulo}`);
            } else {
                console.warn('⚠️ Formato no reconocido, datos completos:', chapterData);
            }

            return versiculos;

        } catch (error) {
            console.error('❌ Error cargando capítulo:', error);
            return null;
        }
    }

    // Mapear nombre del libro a carpeta - AJUSTADO A TU ESTRUCTURA REAL
    getCarpetaLibro(nombreLibro) {
        // Mapeo ESPECÍFICO para GitHub Pages
        const map = {
            "Génesis": "Genesis",
            "Éxodo": "Exodo",
            "Levítico": "Levitico",
            "Números": "Numeros",
            "Deuteronomio": "Deuteronomio",
            "Josué": "Josue",
            "Jueces": "Jueces",
            "Rut": "Rut",
            "1 Samuel": "1Samuel",
            "2 Samuel": "2Samuel",
            "1 Reyes": "1Reyes",
            "2 Reyes": "2Reyes",
            "1 Crónicas": "1Cronicas",
            "2 Crónicas": "2Cronicas",
            "Esdras": "Esdras",
            "Nehemías": "Nehemias",
            "Ester": "Ester",
            "Job": "Job",
            "Salmos": "Salmos",
            "Proverbios": "Proverbios",
            "Eclesiastés": "Eclesiastes",
            "Cantares": "Cantares",
            "Isaías": "Isaias",
            "Jeremías": "Jeremias",
            "Lamentaciones": "Lamentaciones",
            "Ezequiel": "Ezequiel",
            "Daniel": "Daniel",
            "Oseas": "Oseas",
            "Joel": "Joel",
            "Amós": "Amos",
            "Abdías": "Abdias",
            "Jonás": "Jonas",
            "Miqueas": "Miqueas",
            "Nahúm": "Nahum",
            "Habacuc": "Habacuc",
            "Sofonías": "Sofonias",
            "Hageo": "Hageo",
            "Zacarías": "Zacarias",
            "Malaquías": "Malaquias",

            // Nuevo Testamento
            "Mateo": "Mateo",
            "Marcos": "Marcos",
            "Lucas": "Lucas",
            "Juan": "Juan",
            "Hechos": "Hechos",
            "Romanos": "Romanos",
            "1 Corintios": "1Corintios",
            "2 Corintios": "2Corintios",
            "Gálatas": "Galatas",
            "Efesios": "Efesios",
            "Filipenses": "Filipenses",
            "Colosenses": "Colosenses",
            "1 Tesalonicenses": "1Tesalonicenses",
            "2 Tesalonicenses": "2Tesalonicenses",
            "1 Timoteo": "1Timoteo",
            "2 Timoteo": "2Timoteo",
            "Tito": "Tito",
            "Filemón": "Filemon",
            "Hebreos": "Hebreos",
            "Santiago": "Santiago",
            "1 Pedro": "1Pedro",
            "2 Pedro": "2Pedro",
            "1 Juan": "1Juan",
            "2 Juan": "2Juan",
            "3 Juan": "3Juan",
            "Judas": "Judas",
            "Apocalipsis": "Apocalipsis"
        };

        return map[nombreLibro] || nombreLibro;
    }

    // Generar nombre de archivo - AJUSTADO PARA SOPORTAR "2_samuel_15.json"
    getNombreArchivo(nombreLibro, capitulo) {
        // Normalizar nombre para el archivo:
        // 1. Reemplazar espacios con guiones bajos (para "2 Samuel" -> "2_Samuel")
        // 2. Quitar acentos (para "Génesis" -> "Genesis")
        // 3. Convertir a minúsculas
        const nombreNormalizado = nombreLibro
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar acentos
            .replace(/ /g, '_') // Espacios a guiones bajos
            .toLowerCase();

        return `${nombreNormalizado}_${capitulo}.json`;
    }

    // Obtener versículo aleatorio
    async obtenerVersiculoAleatorio(intentos = 0) {
        try {
            const libro = this.libros[Math.floor(Math.random() * this.libros.length)];
            const capitulo = Math.floor(Math.random() * libro.cap) + 1;

            const data = await this.obtenerCapitulo(libro.nombre, capitulo);
            if (!data || Object.keys(data).length === 0) {
                // Fallback a versículo conocido
                if (intentos < 3) return this.obtenerVersiculoAleatorio(intentos + 1);

                return {
                    libro: "Juan",
                    capitulo: 3,
                    versiculo: 16,
                    texto: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
                    referencia: "Juan 3:16"
                };
            }

            const versiculos = Object.keys(data).map(Number);
            const versiculoNum = versiculos[Math.floor(Math.random() * versiculos.length)];

            return {
                libro: libro.nombre,
                capitulo: capitulo,
                versiculo: versiculoNum,
                texto: data[versiculoNum],
                referencia: `${libro.nombre} ${capitulo}:${versiculoNum}`
            };
        } catch (error) {
            console.error('Error obteniendo versículo aleatorio:', error);
            return {
                libro: "Juan",
                capitulo: 3,
                versiculo: 16,
                texto: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
                referencia: "Juan 3:16"
            };
        }
    }

    // Obtener versículo por referencia exacta
    async obtenerPorReferencia(referencia) {
        try {
            // Parsear referencia (ej: "Juan 3:16" o "1 Juan 2:1")
            const match = referencia.match(/(\d*\s*\w+)\s+(\d+):(\d+)/);
            if (!match) return null;

            const [, libroStr, capituloStr, versiculoStr] = match;

            // Encontrar libro
            const libro = this.libros.find(l =>
                l.nombre.toLowerCase() === libroStr.toLowerCase() ||
                l.abrev.toLowerCase() === libroStr.toLowerCase()
            );

            if (!libro) return null;

            const capitulo = parseInt(capituloStr);
            const versiculo = parseInt(versiculoStr);

            const data = await this.obtenerCapitulo(libro.nombre, capitulo);
            if (!data || !data[versiculo]) return null;

            return {
                libro: libro.nombre,
                capitulo: capitulo,
                versiculo: versiculo,
                texto: data[versiculo],
                referencia: `${libro.nombre} ${capitulo}:${versiculo}`
            };
        } catch (error) {
            console.error('Error obteniendo por referencia:', error);
            return null;
        }
    }

    // Obtener lista de libros por testamento
    obtenerLibrosPorTestamento(testamento) {
        return this.libros.filter(libro => libro.testament === testamento);
    }
}

// Instancia global
const biblia = new BibliaRVR1960();

/* ============================
   📖 FUNCIONALIDAD DE INTERFAZ - SIMPLIFICADA
============================ */

document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM cargado - Iniciando Biblia');

    // Cargar versículo del día
    await cargarVersiculoDelDia();

    // Inicializar búsqueda rápida
    inicializarBusquedaRapida();

    // Cargar libros en la interfaz
    cargarLibrosInterfaz();

    // Configurar event listeners
    configurarEventListeners();
});

// Función de prueba
async function testLoadGenesis() {
    try {
        console.log('=== PRUEBA DE CARGA ===');
        const data = await biblia.obtenerCapitulo('Génesis', 1);
        console.log('Resultado prueba Génesis 1:', data ? 'ÉXITO' : 'FALLO');
        if (data) {
            console.log('Número de versículos:', Object.keys(data).length);
            console.log('Primer versículo:', data[1]);
        }
    } catch (error) {
        console.error('Error en prueba:', error);
    }
}

// Cargar versículo del día
async function cargarVersiculoDelDia() {
    const hoy = new Date().toDateString();
    const versiculoGuardado = localStorage.getItem('versiculoDelDia');

    if (versiculoGuardado) {
        try {
            const data = JSON.parse(versiculoGuardado);
            if (data.fecha === hoy && data.texto) {
                mostrarVersiculo(data.texto, data.referencia);
                return;
            }
        } catch (e) {
            console.error('Error al parsear versículo guardado:', e);
        }
    }

    const versiculo = await biblia.obtenerVersiculoAleatorio();
    if (versiculo && versiculo.texto) {
        mostrarVersiculo(versiculo.texto, versiculo.referencia, versiculo.libro, versiculo.capitulo, versiculo.versiculo);

        localStorage.setItem('versiculoDelDia', JSON.stringify({
            ...versiculo,
            fecha: hoy
        }));
    } else {
        // Fallback
        mostrarVersiculo(
            "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.",
            "Juan 3:16"
        );
    }
}

// Mostrar versículo en la interfaz
function mostrarVersiculo(texto, referencia, libro, capitulo, versiculo) {
    const verseTextEl = document.getElementById('daily-verse-text');
    const verseRefEl = document.getElementById('daily-verse-ref');

    if (verseTextEl) verseTextEl.textContent = `"${texto}"`;
    if (verseRefEl) {
        verseRefEl.textContent = referencia;
        // Hacer la referencia clicable para ir al contexto
        if (libro && capitulo) {
            verseRefEl.onclick = () => abrirLibro(libro, capitulo);
            verseRefEl.style.cursor = 'pointer';
        }
    }
}

// Inicializar búsqueda rápida
function inicializarBusquedaRapida() {
    const quickSearchInput = document.querySelector('.quick-search-input');
    if (quickSearchInput) {
        quickSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarPorReferencia(this.value.trim());
            }
        });
    }
}

// Buscar por referencia rápida
async function buscarPorReferencia(referencia) {
    if (!referencia) return;

    showNotification(`Buscando: ${referencia}`, '🔍');
    const versiculo = await biblia.obtenerPorReferencia(referencia);
    if (versiculo) {
        mostrarVersiculo(versiculo.texto, versiculo.referencia, versiculo.libro, versiculo.capitulo, versiculo.versiculo);
        mostrarSeccion('versiculo');
        showNotification(`Versículo encontrado: ${versiculo.referencia}`, '✅');
    } else {
        showNotification('No se encontró la referencia', '❌');
    }
}

// Cargar libros en la interfaz
function cargarLibrosInterfaz() {
    const booksGrid = document.getElementById('books-grid');
    if (!booksGrid) return;

    const librosAT = biblia.obtenerLibrosPorTestamento('AT');
    let html = '';

    librosAT.forEach(libro => {
        html += `
            <div class="book-card" onclick="abrirLibro('${libro.nombre.replace(/'/g, "\\'")}')" data-testament="${libro.testament}">
                <div class="book-icon">📖</div>
                <h3 class="book-title">${libro.nombre}</h3>
                <span class="book-chapters">${libro.cap} caps</span>
            </div>
        `;
    });

    booksGrid.innerHTML = html;
}

// Mostrar testamento específico
function mostrarTestamento(testamento) {
    console.log('🔽 Cambiando a testamento:', testamento);

    const booksGrid = document.getElementById('books-grid');
    if (!booksGrid) {
        console.error('❌ booksGrid no encontrado');
        return;
    }

    let libros = [];
    if (testamento === 'ALL') {
        // Mostrar todos los libros de ambos testamentos
        libros = biblia.libros;
    } else {
        libros = biblia.obtenerLibrosPorTestamento(testamento);
    }

    if (!libros || libros.length === 0) {
        console.error('❌ No se encontraron libros para el testamento:', testamento);
        return;
    }

    // Botones - con validación más robusta
    const buttons = document.querySelectorAll('.tab-btn');
    if (buttons && buttons.length > 0) {
        buttons.forEach(btn => {
            // Validar que btn existe y es un HTMLElement con classList
            if (!btn || typeof btn.classList === 'undefined') {
                console.warn('⚠️ Botón inválido encontrado:', btn);
                return;
            }

            try {
                btn.classList.remove('active');

                const texto = btn.textContent || btn.innerText || '';
                if (
                    (testamento === 'ALL' && texto.includes('Todos')) ||
                    (testamento === 'AT' && texto.includes('Antiguo')) ||
                    (testamento === 'NT' && texto.includes('Nuevo'))
                ) {
                    btn.classList.add('active');
                }
            } catch (error) {
                console.error('❌ Error manipulando clases del botón:', error);
            }
        });
    } else {
        console.warn('⚠️ No se encontraron botones .tab-btn');
    }

    // Render libros
    let html = '';
    libros.forEach(libro => {
        if (!libro || !libro.nombre) {
            console.warn('⚠️ Libro inválido:', libro);
            return;
        }

        html += `
            <div class="book-card animate-fade-in" onclick="abrirLibro('${libro.nombre.replace(/'/g, "\\'")}')" data-testament="${libro.testament}">
                <div class="book-icon">📖</div>
                <h3 class="book-title">${libro.nombre}</h3>
                <span class="book-chapters">${libro.cap || 0} caps</span>
            </div>
        `;
    });

    booksGrid.innerHTML = html;
    console.log('✅ Testamento cargado correctamente:', testamento, '- Libros:', libros.length);
}


// Abrir libro para lectura
async function abrirLibro(nombreLibro, capituloInicial = 1) {
    console.log(`Abriendo libro: ${nombreLibro}`);

    const libro = biblia.libros.find(l => l.nombre === nombreLibro);
    if (!libro) {
        showNotification('Libro no encontrado', '❌');
        return;
    }

    // Crear sección de lectura si no existe
    let readingSection = document.getElementById('reading-section');
    if (!readingSection) {
        crearSeccionLectura();
        readingSection = document.getElementById('reading-section');
    }

    // Mostrar sección de lectura
    mostrarSeccion('lectura');

    // Cargar información del libro
    document.getElementById('reading-book-title').textContent = libro.nombre;
    document.getElementById('reading-book-chapters').textContent = `${libro.testament === 'AT' ? 'Antiguo' : 'Nuevo'} Testamento • ${libro.cap} Capítulos`;

    // Cargar lista completa de capítulos
    const chaptersGrid = document.getElementById('reading-chapters-grid');
    if (chaptersGrid) {
        let chaptersHTML = '';

        for (let i = 1; i <= libro.cap; i++) {
            chaptersHTML += `
                <button class="chapter-btn ${i === 1 ? 'active' : ''}" onclick="cargarCapitulo('${libro.nombre.replace(/'/g, "\\'")}', ${i})">
                    ${i}
                </button>
            `;
        }

        chaptersGrid.innerHTML = chaptersHTML;
    }

    // Cargar primer capítulo por defecto
    await cargarCapitulo(libro.nombre, capituloInicial);
}

// Crear sección de lectura
function crearSeccionLectura() {
    const main = document.querySelector('main');
    if (!main) return;

    const readingSection = document.createElement('section');
    readingSection.id = 'reading-section';
    readingSection.className = 'mb-10';
    readingSection.style.display = 'none';

    readingSection.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div class="flex items-center justify-between mb-6">
                <button onclick="mostrarSeccion('versiculo')" class="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors">
                    <span>⬅️</span>
                    <span>Volver</span>
                </button>
                <div class="text-right">
                    <h2 id="reading-book-title" class="text-2xl font-bold text-gray-900 dark:text-white">Libro</h2>
                    <p id="reading-book-chapters" class="text-sm text-gray-600 dark:text-gray-400">Capítulos</p>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <aside class="lg:col-span-1">
                    <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                        <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Capítulos</h3>
                        <div id="reading-chapters-grid" class="grid grid-cols-3 lg:grid-cols-1 gap-2 max-h-96 overflow-y-auto"></div>
                    </div>
                </aside>
                
                <article class="lg:col-span-3">
                    <div class="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h3 id="chapter-title" class="text-2xl font-bold text-gray-900 dark:text-white">Capítulo 1</h3>
                            <div class="flex items-center space-x-2">
                                <button onclick="navegarCapitulo('prev')" class="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors">◀</button>
                                <input type="number" id="chapter-input" min="1" value="1" class="w-20 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-primary">
                                <button onclick="navegarCapitulo('next')" class="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors">▶</button>
                            </div>
                        </div>
                        <div id="chapter-content" class="chapter-content prose max-w-none">
                            <div class="flex justify-center items-center py-12">
                                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    `;

    main.appendChild(readingSection);
}

// Cargar capítulo específico - CORREGIDO
async function cargarCapitulo(nombreLibro, numeroCapitulo) {
    console.log(`Cargando: ${nombreLibro} ${numeroCapitulo}`);

    const libro = biblia.libros.find(l => l.nombre === nombreLibro);
    if (!libro) {
        showNotification('Libro no encontrado', '❌');
        return;
    }

    // Validar número de capítulo
    if (numeroCapitulo < 1 || numeroCapitulo > libro.cap) {
        showNotification(`Capítulo ${numeroCapitulo} no existe en ${libro.nombre}`, '❌');
        return;
    }

    // Actualizar UI
    document.getElementById('chapter-title').textContent = `${libro.nombre} ${numeroCapitulo}`;
    document.getElementById('chapter-input').value = numeroCapitulo;

    // Actualizar botones de capítulos activos
    const chapterBtns = document.querySelectorAll('.chapter-btn');
    chapterBtns.forEach(btn => {
        btn.classList.remove('active');
        const btnText = btn.textContent.trim();
        // Comparar con el número del capítulo (puede ser solo el número o "Capítulo X")
        if (btnText === `${numeroCapitulo}` || btnText === `Capítulo ${numeroCapitulo}`) {
            btn.classList.add('active');
        }
    });

    // Mostrar loading
    const chapterContent = document.getElementById('chapter-content');
    if (chapterContent) {
        chapterContent.innerHTML = '<div class="flex justify-center items-center py-12"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>';
    }

    // Obtener datos del capítulo
    const data = await biblia.obtenerCapitulo(nombreLibro, numeroCapitulo);

    if (!data || Object.keys(data).length === 0) {
        if (chapterContent) {
            chapterContent.innerHTML = `
                <div class="text-center py-12">
                    <div class="text-6xl mb-4">❌</div>
                    <p class="text-xl font-bold mb-2 text-gray-900 dark:text-white">No se pudo cargar el capítulo ${numeroCapitulo} de ${nombreLibro}</p>
                    <p class="text-gray-600 dark:text-gray-400 mb-4">Posibles causas:</p>
                    <ul class="text-left max-w-md mx-auto mb-6 text-gray-600 dark:text-gray-400">
                        <li>• El archivo JSON no existe</li>
                        <li>• Error de conexión</li>
                        <li>• Formato incorrecto del archivo</li>
                    </ul>
                    <button onclick="cargarCapitulo('${nombreLibro.replace(/'/g, "\\'")}', ${numeroCapitulo})" class="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors">
                        Reintentar
                    </button>
                </div>
            `;
        }
        return;
    }

    // Mostrar versículos
    let html = '';
    Object.entries(data).forEach(([versiculo, texto]) => {
        html += `
            <div class="verse-item flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" id="verse-${versiculo}">
                <span class="verse-number font-bold text-primary flex-shrink-0 min-w-[2rem]">${versiculo}</span> 
                <span class="verse-text flex-1 text-gray-800 dark:text-gray-200">${texto}</span>
                <button onclick="marcarVersiculo('${nombreLibro.replace(/'/g, "\\'")}', ${numeroCapitulo}, ${versiculo})" 
                        class="btn-verse-action flex-shrink-0 p-1 hover:bg-primary/10 rounded transition-colors" title="Marcar versículo">
                    ⭐
                </button>
            </div>
        `;
    });

    if (chapterContent) {
        chapterContent.innerHTML = html;
    }

    // Guardar último capítulo leído
    biblia.libroActual = nombreLibro;
    biblia.capituloActual = numeroCapitulo;

    // Guardar en historial
    guardarEnHistorialLectura(nombreLibro, numeroCapitulo);

    showNotification(`Capítulo ${numeroCapitulo} cargado`, '✅');
    console.log(`Capítulo cargado exitosamente: ${Object.keys(data).length} versículos`);
}

// Navegar entre capítulos
async function navegarCapitulo(direccion) {
    if (!biblia.libroActual || !biblia.capituloActual) {
        showNotification('No hay libro seleccionado', 'ℹ️');
        return;
    }

    const libro = biblia.libros.find(l => l.nombre === biblia.libroActual);
    if (!libro) return;

    let nuevoCapitulo = biblia.capituloActual;

    if (direccion === 'prev' && nuevoCapitulo > 1) {
        nuevoCapitulo--;
    } else if (direccion === 'next' && nuevoCapitulo < libro.cap) {
        nuevoCapitulo++;
    } else {
        return;
    }

    await cargarCapitulo(biblia.libroActual, nuevoCapitulo);
}

// Marcar versículo como favorito
function marcarVersiculo(libro, capitulo, versiculo) {
    const versiculoData = {
        libro: libro,
        capitulo: capitulo,
        versiculo: versiculo,
        referencia: `${libro} ${capitulo}:${versiculo}`,
        fecha: new Date().toISOString(),
        id: `${libro}-${capitulo}-${versiculo}`
    };

    let favoritos = JSON.parse(localStorage.getItem('versiculosFavoritos') || '[]');

    // Verificar si ya existe
    const existe = favoritos.some(fav => fav.id === versiculoData.id);

    if (!existe) {
        favoritos.unshift(versiculoData);
        localStorage.setItem('versiculosFavoritos', JSON.stringify(favoritos));
        showNotification('Versículo marcado ⭐', '✅');
    } else {
        showNotification('Versículo ya marcado', 'ℹ️');
    }
}

// Guardar en historial de lectura
function guardarEnHistorialLectura(libro, capitulo) {
    let historial = JSON.parse(localStorage.getItem('historialLectura') || '[]');

    historial.unshift({
        libro: libro,
        capitulo: capitulo,
        fecha: new Date().toISOString()
    });

    if (historial.length > 50) {
        historial = historial.slice(0, 50);
    }

    localStorage.setItem('historialLectura', JSON.stringify(historial));
}

// Mostrar/ocultar secciones
function mostrarSeccion(seccion) {
    const secciones = [
        'verse-section',
        'search-section',
        'favorites-section',
        'quiz-section',
        'books-section'
    ];

    secciones.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    const readingSection = document.getElementById('reading-section');
    if (readingSection) {
        readingSection.style.display = 'none';
    }

    // Ocultar quick-search si existe (puede no existir en el nuevo diseño)
    const quickSearch = document.querySelector('.quick-search');
    if (quickSearch) {
        quickSearch.style.display = 'none';
    }

    switch(seccion) {
        case 'versiculo':
            const verseSection = document.getElementById('verse-section');
            const booksSection = document.getElementById('books-section');
            if (verseSection) verseSection.style.display = 'block';
            if (booksSection) booksSection.style.display = 'block';
            if (quickSearch) quickSearch.style.display = 'block';
            break;
        case 'busqueda':
            const searchSection = document.getElementById('search-section');
            if (searchSection) searchSection.style.display = 'block';
            break;
        case 'favoritos':
            const favoritesSection = document.getElementById('favorites-section');
            if (favoritesSection) {
                favoritesSection.style.display = 'block';
                if (typeof cargarFavoritos === 'function') {
                    cargarFavoritos();
                }
            }
            break;
        case 'quiz':
            const quizSection = document.getElementById('quiz-section');
            if (quizSection) quizSection.style.display = 'block';
            break;
        case 'lectura':
            if (readingSection) {
                readingSection.style.display = 'block';
                if (quickSearch) quickSearch.style.display = 'none';
            }
            break;
    }
}

// Configurar event listeners
function configurarEventListeners() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', realizarBusquedaAvanzada);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') realizarBusquedaAvanzada();
        });

        // Agregar listener para sugerencias dinámicas
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 2) {
                mostrarSugerencias(query);
            } else {
                ocultarSugerencias();
            }
        });
    }

    const chapterInput = document.getElementById('chapter-input');
    if (chapterInput) {
        chapterInput.addEventListener('change', function() {
            const valor = parseInt(this.value);
            if (valor && biblia.libroActual) {
                cargarCapitulo(biblia.libroActual, valor);
            }
        });
    }
}

// Función para compartir versículo
function shareVerse() {
    const text = document.getElementById('daily-verse-text')?.textContent || '';
    const ref = document.getElementById('daily-verse-ref')?.textContent || '';

    if (navigator.share) {
        navigator.share({
            title: 'Versículo Bíblico',
            text: `${text} ${ref}`,
            url: window.location.href
        });
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(`${text} ${ref}`);
        showNotification('Versículo copiado al portapapeles', '📋');
    } else {
        showNotification('No se puede compartir en este dispositivo', '❌');
    }
}

// Cargar favoritos
function cargarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('versiculosFavoritos') || '[]');
    const favoritesList = document.getElementById('favorites-list');

    if (!favoritesList) return;

    if (favoritos.length === 0) {
        favoritesList.innerHTML = '<p class="empty-state">No tienes versículos favoritos aún.</p>';
        return;
    }

    let html = '';
    favoritos.forEach(fav => {
        html += `
            <div class="favorite-item">
                <div class="favorite-content">
                    <blockquote>${fav.libro} ${fav.capitulo}:${fav.versiculo}</blockquote>
                    <div class="favorite-meta">
                        <span>Agregado: ${new Date(fav.fecha).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="favorite-actions">
                    <button onclick="buscarPorReferencia('${fav.libro} ${fav.capitulo}:${fav.versiculo}')" class="btn-icon">👁️</button>
                    <button onclick="eliminarFavorito('${fav.libro}', ${fav.capitulo}, ${fav.versiculo})" class="btn-icon">🗑️</button>
                </div>
            </div>
        `;
    });

    favoritesList.innerHTML = html;
}

// Eliminar favorito
function eliminarFavorito(libro, capitulo, versiculo) {
    let favoritos = JSON.parse(localStorage.getItem('versiculosFavoritos') || '[]');
    favoritos = favoritos.filter(fav =>
        !(fav.libro === libro && fav.capitulo === capitulo && fav.versiculo === versiculo)
    );
    localStorage.setItem('versiculosFavoritos', JSON.stringify(favoritos));
    cargarFavoritos();
    showNotification('Versículo eliminado de favoritos', '🗑️');
}

// Función de notificación
function showNotification(message, icon = 'ℹ️') {
    // Si ya hay una notificación, quitarla
    const existing = document.querySelector('.custom-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.innerHTML = `<span class="notification-icon">${icon}</span> ${message}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: transparent;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slide-in-right 0.3s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
        align-items: center;
        gap: 8px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Agregar estilos CSS para notificaciones
if (!document.querySelector('#custom-notification-styles')) {
    const style = document.createElement('style');
    style.id = 'custom-notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification-icon {
            font-size: 1.2em;
        }
    `;
    document.head.appendChild(style);
}

// Funciones adicionales para compatibilidad con biblia.html
function irAVersiculo() {
    const ref = document.getElementById('daily-verse-ref')?.textContent;
    if (ref) {
        buscarPorReferencia(ref);
    }
}

function marcarComoLeido() {
    if (!biblia.libroActual || !biblia.capituloActual) return;

    const stats = JSON.parse(localStorage.getItem('bibleStats') || '{}');
    const libro = biblia.libroActual;
    const capitulo = biblia.capituloActual;

    if (!stats[libro]) {
        stats[libro] = { readChapters: [] };
    }

    if (!stats[libro].readChapters) {
        stats[libro].readChapters = [];
    }

    if (!stats[libro].readChapters.includes(capitulo)) {
        stats[libro].readChapters.push(capitulo);
        localStorage.setItem('bibleStats', JSON.stringify(stats));
        showNotification(`Capítulo ${capitulo} marcado como leído`, '✅');
        loadStats(); // Actualizar estadísticas
    } else {
        showNotification('Capítulo ya marcado como leído', 'ℹ️');
    }
}

function marcarVersiculoFavorito() {
    // Esta función ya existe como marcarVersiculo
    // Solo mostrar un mensaje para que el usuario sepa cómo usarla
    showNotification('Haz clic en ⭐ en cualquier versículo para marcarlo como favorito', 'ℹ️');
}

// Exportar funciones al ámbito global
window.mostrarSeccion = mostrarSeccion;
window.mostrarTestamento = mostrarTestamento;
window.abrirLibro = abrirLibro;
window.cargarCapitulo = cargarCapitulo;
window.navegarCapitulo = navegarCapitulo;
window.buscarPorReferencia = buscarPorReferencia;
window.shareVerse = shareVerse;
window.marcarVersiculo = marcarVersiculo;
window.loadRandomVerse = cargarVersiculoDelDia;
window.showNotification = showNotification;
window.irAVersiculo = irAVersiculo;
window.marcarComoLeido = marcarComoLeido;
window.marcarVersiculoFavorito = marcarVersiculoFavorito;

// Funciones para compatibilidad
function showSearch() {
    mostrarSeccion('busqueda');
    document.getElementById('search-input')?.focus();
}

function showFavorites() {
    mostrarSeccion('favoritos');
}

function addToFavorites() {
    const text = document.getElementById('daily-verse-text')?.textContent.replace(/"/g, '') || '';
    const ref = document.getElementById('daily-verse-ref')?.textContent || '';

    if (text && ref) {
        const match = ref.match(/(\d*\s*\w+)\s+(\d+):(\d+)/);
        if (match) {
            const [, libro, capitulo, versiculo] = match;
            marcarVersiculo(libro.trim(), parseInt(capitulo), parseInt(versiculo));
        }
    }
}

// Asegurar que las funciones existentes estén disponibles
window.showSearch = showSearch;
window.showFavorites = showFavorites;
window.addToFavorites = addToFavorites;

// Funciones de búsqueda avanzada
function quickSearch(query) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = query;
        realizarBusquedaAvanzada();
    }
}

function realizarBusquedaAvanzada() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput ? searchInput.value.trim() : '';

    if (!query) {
        showNotification('Ingresa un término de búsqueda', 'ℹ️');
        return;
    }

    showNotification(`Buscando: ${query}`, '🔍');

    // Intentar parsear como referencia bíblica
    const referenciaMatch = query.match(/(\d*\s*\w+)\s+(\d+):(\d+)/);
    if (referenciaMatch) {
        buscarPorReferencia(query);
        return;
    }

    // Búsqueda por tema o palabra clave
    buscarPorTema(query);
}

async function buscarPorTema(tema) {
    // Simular búsqueda por tema (en una implementación completa, buscaría en todos los versículos)
    showNotification(`Búsqueda por tema: ${tema}`, '🔍');

    // Por ahora, mostrar un mensaje de que la búsqueda avanzada está en desarrollo
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
        searchResults.innerHTML = `
            <div class="results-placeholder">
                <div class="placeholder-icon">🔍</div>
                <h3>Búsqueda en desarrollo</h3>
                <p>La búsqueda avanzada por temas estará disponible próximamente.</p>
                <p>Por ahora, puedes buscar versículos por referencia (ej: Juan 3:16)</p>
            </div>
        `;
    }
}

function mostrarSugerencias(query) {
    const suggestionsList = document.getElementById('suggestions-list');
    const searchSuggestions = document.getElementById('search-suggestions');

    if (!suggestionsList || !searchSuggestions) return;

    // Sugerencias predefinidas
    const sugerenciasPredefinidas = [
        'amor', 'fe', 'fortaleza', 'paz', 'esperanza', 'oración', 'perdón', 'gracia',
        'Juan 3:16', 'Salmos 23', 'Filipenses 4:13', 'Jeremías 29:11'
    ];

    const sugerenciasFiltradas = sugerenciasPredefinidas.filter(sugerencia =>
        sugerencia.toLowerCase().includes(query.toLowerCase())
    );

    if (sugerenciasFiltradas.length > 0) {
        let html = '';
        sugerenciasFiltradas.forEach(sugerencia => {
            html += `<div class="suggestion-item" onclick="quickSearch('${sugerencia}')">${sugerencia}</div>`;
        });
        suggestionsList.innerHTML = html;
        searchSuggestions.style.display = 'block';
    } else {
        ocultarSugerencias();
    }
}

function ocultarSugerencias() {
    const searchSuggestions = document.getElementById('search-suggestions');
    if (searchSuggestions) {
        searchSuggestions.style.display = 'none';
    }
}

// Inicializar arrays para evitar errores
let searchResults = new Set();
let searchSuggestions = [];

// Exportar funciones al ámbito global
window.quickSearch = quickSearch;
window.realizarBusquedaAvanzada = realizarBusquedaAvanzada;
window.mostrarSugerencias = mostrarSugerencias;
window.ocultarSugerencias = ocultarSugerencias;

// Funciones adicionales para compatibilidad con biblia.html
function loadStats() {
    const stats = JSON.parse(localStorage.getItem('bibleStats') || '{}');

    // Versículos leídos
    const versesRead = Object.values(stats).reduce((total, book) => {
        return total + (book.versesRead || 0);
    }, 0);
    const versesReadEl = document.getElementById('verses-read');
    if (versesReadEl) versesReadEl.textContent = versesRead.toLocaleString();

    const statsVersesEl = document.getElementById('stats-verses');
    if (statsVersesEl) statsVersesEl.textContent = versesRead.toLocaleString();

    // Favoritos
    const favorites = JSON.parse(localStorage.getItem('versiculosFavoritos') || '[]');
    const favoritesCountEl = document.getElementById('favorites-count');
    if (favoritesCountEl) favoritesCountEl.textContent = favorites.length;

    // Días leyendo
    const readingDays = Object.keys(JSON.parse(localStorage.getItem('readingDays') || '{}')).length;
    const readingDaysEl = document.getElementById('reading-days');
    if (readingDaysEl) readingDaysEl.textContent = readingDays;

    // Libros completados
    const booksCompleted = Object.values(stats).filter(book => book.completed).length;
    const booksCompletedEl = document.getElementById('books-completed');
    if (booksCompletedEl) booksCompletedEl.textContent = booksCompleted;

    // Calcular progreso
    const totalVerses = 31102; // Total aproximado de versículos en la Biblia
    const progress = Math.min(Math.round((versesRead / totalVerses) * 100), 100);
    const readingProgressEl = document.getElementById('reading-progress');
    if (readingProgressEl) readingProgressEl.textContent = `${progress}%`;

    const progressBarEl = document.getElementById('progress-bar');
    if (progressBarEl) progressBarEl.style.width = `${progress}%`;
}

function setupEventListeners() {
    // Buscar al presionar Enter
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                realizarBusquedaAvanzada();
            }
        });
    }

    // Cambiar capítulo al cambiar el input
    const chapterInput = document.getElementById('modal-chapter-input');
    if (chapterInput) {
        chapterInput.addEventListener('change', function() {
            const valor = parseInt(this.value);
            const libro = biblia.libros.find(l => l.nombre === biblia.libroActual);
            if (valor && libro && valor >= 1 && valor <= libro.cap) {
                cargarCapitulo(biblia.libroActual, valor);
            } else {
                this.value = biblia.capituloActual;
            }
        });
    }
}

function marcarCapituloComoLeido(libro, capitulo) {
    const stats = JSON.parse(localStorage.getItem('bibleStats') || '{}');

    if (!stats[libro]) {
        stats[libro] = { readChapters: [], versesRead: 0 };
    }

    if (!stats[libro].readChapters) {
        stats[libro].readChapters = [];
    }

    // Añadir capítulo si no está ya marcado
    if (!stats[libro].readChapters.includes(capitulo)) {
        stats[libro].readChapters.push(capitulo);
        stats[libro].versesRead = (stats[libro].versesRead || 0) + 1;

        // Marcar día de lectura
        const today = new Date().toISOString().split('T')[0];
        const readingDays = JSON.parse(localStorage.getItem('readingDays') || '{}');
        readingDays[today] = true;
        localStorage.setItem('readingDays', JSON.stringify(readingDays));
    }

    localStorage.setItem('bibleStats', JSON.stringify(stats));
}

function cerrarLector() {
    const modal = document.getElementById('reading-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function compartirVersiculo(libro, capitulo, versiculo, texto) {
    const shareText = `"${texto}"\n\n${libro} ${capitulo}:${versiculo}\n\nVia Biblia RVR1960 - Jóvenes con Cristo`;

    if (navigator.share) {
        navigator.share({
            title: 'Versículo Bíblico',
            text: shareText,
            url: window.location.href
        });
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText);
        showNotification('Versículo copiado al portapapeles', 'success');
    } else {
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Versículo copiado al portapapeles', 'success');
    }
}

// Exportar funciones adicionales
window.loadStats = loadStats;
window.setupEventListeners = setupEventListeners;
window.marcarCapituloComoLeido = marcarCapituloComoLeido;
window.cerrarLector = cerrarLector;
window.compartirVersiculo = compartirVersiculo;


