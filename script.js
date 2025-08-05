// =============================================================================
// GENERADOR CV HARVARD - VERSIÓN MEJORADA Y OPTIMIZADA
// Refactorizado para mejor rendimiento, mantenibilidad y experiencia de usuario
// =============================================================================

'use strict';

// ===== CONFIGURACIÓN GLOBAL =====
const APP_CONFIG = {
    version: '2.0.0',
    author: 'CV Harvard Generator',
    debounceDelay: 300,
    autoSaveInterval: 2000
};

// ===== UTILIDADES CORE =====
const CoreUtils = {
    // Escapar HTML de forma segura
    escapeHTML(text) {
        if (!text) return '';
        const element = document.createElement('div');
        element.textContent = text;
        return element.innerHTML;
    },
    
    // Sanitizar entrada del usuario
    sanitizeInput(input, maxLength = 1000) {
        if (typeof input !== 'string') return '';
        return input
            .slice(0, maxLength)
            .replace(/[<>]/g, '') // Remover caracteres peligrosos
            .trim();
    },
    
    // Debounce optimizado
    debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },
    
    // Generar nombre de archivo seguro
    generateSafeFileName(name) {
        if (!name) return `CV_${Date.now()}`;
        
        return name
            .replace(/[^a-zA-Z0-9áéíóúñüÁÉÍÓÚÑÜ\s]/g, '')
            .replace(/\s+/g, '_')
            .substring(0, 50)
            .toLowerCase() || `CV_${Date.now()}`;
    },
    
    // Formatear fecha
    formatDate(date = new Date(), locale = 'es-ES') {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },
    
    // Validar email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

// ===== GENERADOR DE CV PRINCIPAL =====
function generarCV() {
    const datos = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        ubicacion: document.getElementById('ubicacion').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim(),
        portfolio: document.getElementById('portfolio').value.trim(),
        resumen: document.getElementById('resumen').value.trim(),
        educacion: document.getElementById('educacion').value.trim(),
        experiencia: document.getElementById('experiencia').value.trim(),
        habilidades: document.getElementById('habilidades').value.trim()
    };

    // Validar campos obligatorios
    if (!datos.nombre || !datos.email) {
        mostrarAlerta('Por favor, completa al menos el nombre y el correo electrónico.', 'warning');
        return;
    }

    // Agregar estado de carga
    const generateBtn = document.querySelector('button[onclick="generarCV()"]');
    const originalContent = generateBtn.innerHTML;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin icon" aria-hidden="true"></i><span>Generando CV...</span>';
    generateBtn.disabled = true;
    generateBtn.classList.add('loading');

    try {
        // Simular un pequeño delay para mostrar la animación
        setTimeout(() => {
            // Generar vista previa HTML del CV
            const cvHTML = generarCVHTML(datos);
            
            // Mostrar resultado con animación
            mostrarResultado(cvHTML, datos);
            
            // Mostrar mensaje de éxito
            mostrarAlerta('¡CV generado exitosamente! ✅', 'success');
            
            // Restaurar botón
            generateBtn.innerHTML = originalContent;
            generateBtn.disabled = false;
            generateBtn.classList.remove('loading');
            
            // Agregar efecto de celebración
            celebrarGeneracion();
            
        }, 800);
        
    } catch (error) {
        console.error('Error al generar CV:', error);
        mostrarAlerta('Hubo un error al generar el CV. Por favor, intenta nuevamente.', 'danger');
        
        // Restaurar botón en caso de error
        generateBtn.innerHTML = originalContent;
        generateBtn.disabled = false;
        generateBtn.classList.remove('loading');
    }
}

// Generar HTML del CV - Versión mejorada
function generarCVHTML(datos) {
    const fechaGeneracion = CoreUtils.formatDate();
    
    let html = `
    <div style="max-width: 8.5in; margin: 0 auto; padding: 0.3in; font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.4; color: #000;">
        <!-- Encabezado -->
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #000; font-size: 20pt; font-weight: bold; margin: 0; font-family: 'Times New Roman', serif;">
                ${CoreUtils.escapeHTML(datos.nombre)}
            </h1>
            <hr style="border: none; height: 2px; background-color: #000; margin: 15px 0;">
        </div>
        
        <!-- Información de contacto -->
        <div style="text-align: center; margin-bottom: 30px; font-size: 11pt;">`;
    
    // Información de contacto en líneas separadas
    if (datos.ubicacion || datos.telefono) {
        html += `<p style="margin: 5px 0; font-size: 11pt;">`;
        if (datos.ubicacion) html += CoreUtils.escapeHTML(datos.ubicacion);
        if (datos.ubicacion && datos.telefono) html += ' • ';
        if (datos.telefono) html += CoreUtils.escapeHTML(datos.telefono);
        html += `</p>`;
    }
    
    if (datos.email) {
        html += `<p style="margin: 5px 0; font-size: 11pt;">${CoreUtils.escapeHTML(datos.email)}</p>`;
    }
    
    if (datos.linkedin || datos.portfolio) {
        html += `<p style="margin: 5px 0; font-size: 11pt;">`;
        if (datos.linkedin) {
            const linkedinUrl = datos.linkedin.startsWith('http') ? datos.linkedin : `https://${datos.linkedin}`;
            html += `<a href="${linkedinUrl}" target="_blank" style="color: #0077b5; text-decoration: underline;">LinkedIn</a>`;
        }
        if (datos.linkedin && datos.portfolio) html += ' • ';
        if (datos.portfolio) {
            const portfolioUrl = datos.portfolio.startsWith('http') ? datos.portfolio : `https://${datos.portfolio}`;
            html += `<a href="${portfolioUrl}" target="_blank" style="color: #0077b5; text-decoration: underline;">Portfolio</a>`;
        }
        html += `</p>`;
    }
    
    html += `</div>`;
    
    // Resumen Profesional
    if (datos.resumen) {
        html += `
        <div style="margin-bottom: 25px;">
            <h2 style="color: #000; font-size: 14pt; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-family: 'Times New Roman', serif;">
                PROFESSIONAL SUMMARY
            </h2>
            <div style="margin-left: 10px; font-size: 11pt;">
                <p style="margin: 0; font-style: italic; text-align: justify;">${CoreUtils.escapeHTML(datos.resumen)}</p>
            </div>
        </div>`;
    }
    
    // Educación
    if (datos.educacion) {
        html += `
        <div style="margin-bottom: 25px;">
            <h2 style="color: #000; font-size: 14pt; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-family: 'Times New Roman', serif;">
                EDUCATION
            </h2>
            <div style="margin-left: 10px; font-size: 11pt;">`;
        
        const lineasEducacion = datos.educacion.split('\n').filter(l => l.trim());
        lineasEducacion.forEach(linea => {
            const lineaTrim = linea.trim();
            if (lineaTrim.includes('Universidad') || lineaTrim.includes('Instituto') || lineaTrim.includes('Colegio') || 
                lineaTrim.includes('University') || lineaTrim.includes('Institute') || lineaTrim.includes('College')) {
                html += `<p style="margin: 3px 0; font-style: italic;">${CoreUtils.escapeHTML(lineaTrim)}</p>`;
            } else if (/\d{4}/.test(lineaTrim)) {
                html += `<p style="margin: 3px 0; font-style: italic; color: #000;">${CoreUtils.escapeHTML(lineaTrim)}</p>`;
            } else {
                html += `<p style="margin: 3px 0; font-weight: bold;">${CoreUtils.escapeHTML(lineaTrim)}</p>`;
            }
        });
        
        html += `</div></div>`;
    }
    
    // Experiencia
    if (datos.experiencia) {
        html += `
        <div style="margin-bottom: 25px;">
            <h2 style="color: #000; font-size: 14pt; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-family: 'Times New Roman', serif;">
                PROFESSIONAL EXPERIENCE
            </h2>
            <div style="margin-left: 10px; font-size: 11pt;">`;
        
        const lineasExperiencia = datos.experiencia.split('\n').filter(l => l.trim());
        lineasExperiencia.forEach(linea => {
            const lineaTrim = linea.trim();
            if (lineaTrim.startsWith('•')) {
                html += `<p style="margin: 2px 0 2px 15px;">• ${CoreUtils.escapeHTML(lineaTrim.substring(1).trim())}</p>`;
            } else if (lineaTrim.includes(',') && /\d{4}/.test(lineaTrim)) {
                html += `<p style="margin: 3px 0; font-style: italic; color: #000;">${CoreUtils.escapeHTML(lineaTrim)}</p>`;
            } else {
                html += `<p style="margin: 5px 0 3px 0; font-weight: bold;">${CoreUtils.escapeHTML(lineaTrim)}</p>`;
            }
        });
        
        html += `</div></div>`;
    }
    
    // Habilidades
    if (datos.habilidades) {
        html += `
        <div style="margin-bottom: 25px;">
            <h2 style="color: #000; font-size: 14pt; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-family: 'Times New Roman', serif;">
                SKILLS AND COMPETENCIES
            </h2>
            <div style="margin-left: 10px; font-size: 11pt;">`;
        
        const lineasHabilidades = datos.habilidades.split('\n').filter(l => l.trim());
        lineasHabilidades.forEach(linea => {
            const lineaTrim = linea.trim();
            if (lineaTrim.includes(':')) {
                const partes = lineaTrim.split(':');
                const categoria = partes[0].trim();
                const contenido = partes.slice(1).join(':').trim();
                html += `<p style="margin: 3px 0;"><strong>${CoreUtils.escapeHTML(categoria)}:</strong> ${CoreUtils.escapeHTML(contenido)}</p>`;
            } else {
                html += `<p style="margin: 3px 0;">${CoreUtils.escapeHTML(lineaTrim)}</p>`;
            }
        });
        
        html += `</div></div>`;
    }
    
    // Pie de página - SOLO SE ELIMINA ESTA SECCIÓN
    html += `</div>`;
    
    return html;
}

// ===== GENERADOR DE WORD MEJORADO =====
function generarWord() {
    const datos = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        ubicacion: document.getElementById('ubicacion').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim(),
        portfolio: document.getElementById('portfolio').value.trim(),
        resumen: document.getElementById('resumen').value.trim(),
        educacion: document.getElementById('educacion').value.trim(),
        experiencia: document.getElementById('experiencia').value.trim(),
        habilidades: document.getElementById('habilidades').value.trim()
    };

    if (!datos.nombre || !datos.email) {
        mostrarAlerta('Por favor, completa al menos el nombre y el correo electrónico.', 'warning');
        return;
    }

    // Agregar estado de carga al botón
    const wordBtn = document.querySelector('button[onclick="generarWord()"]');
    const originalContent = wordBtn.innerHTML;
    wordBtn.innerHTML = '<i class="fas fa-spinner fa-spin icon" aria-hidden="true"></i><span>Generando Word...</span>';
    wordBtn.disabled = true;
    wordBtn.classList.add('loading');

    try {
        setTimeout(() => {
            const cvHTML = generarCVHTML(datos);
            const fileName = CoreUtils.generateSafeFileName(datos.nombre) + '_CV.doc';
            
            // Crear blob con el HTML mejorado
            const documentHTML = `
<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - ${CoreUtils.escapeHTML(datos.nombre)}</title>
    <!--[if gte mso 9]>
    <xml>
        <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>90</w:Zoom>
            <w:DoNotPromptForConvert/>
            <w:DoNotShowRevisions/>
            <w:DoNotShowMarkup/>
            <w:DoNotShowComments/>
        </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
        @page { margin: 0.75in; size: letter; }
        body { font-family: 'Times New Roman', serif; margin: 0; color: #000; font-size: 11pt; line-height: 1.4; }
        h1, h2 { color: #000; page-break-after: avoid; }
        p { margin: 0.1em 0; orphans: 2; widows: 2; }
    </style>
</head>
<body>
    ${cvHTML}
</body>
</html>`;
            
            const blob = new Blob([documentHTML], {
                type: 'application/msword'
            });
            
            // Crear enlace de descarga
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
            
            // Restaurar botón
            wordBtn.innerHTML = originalContent;
            wordBtn.disabled = false;
            wordBtn.classList.remove('loading');
            
            // Mostrar mensaje de éxito con animación
            mostrarAlerta('¡CV en Word generado exitosamente! 📄', 'success');
            
            // Efecto de celebración para la descarga
            celebrarDescarga();
            
        }, 600);
        
    } catch (error) {
        console.error('Error al generar Word:', error);
        mostrarAlerta('Error al generar el documento Word.', 'danger');
        
        // Restaurar botón en caso de error
        wordBtn.innerHTML = originalContent;
        wordBtn.disabled = false;
        wordBtn.classList.remove('loading');
    }
}

// Función para celebrar la descarga exitosa
function celebrarDescarga() {
    // Agregar efecto de pulso al botón
    const wordBtn = document.querySelector('button[onclick="generarWord()"]');
    wordBtn.classList.add('pulse');
    setTimeout(() => {
        wordBtn.classList.remove('pulse');
    }, 1500);
    
    // Crear efecto de partículas
    for (let i = 0; i < 20; i++) {
        crearParticula();
    }
}

// Función para crear partículas de celebración
function crearParticula() {
    const particula = document.createElement('div');
    particula.style.position = 'fixed';
    particula.style.width = '6px';
    particula.style.height = '6px';
    particula.style.backgroundColor = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`; // Azules y verdes
    particula.style.left = Math.random() * 100 + 'vw';
    particula.style.top = Math.random() * 100 + 'vh';
    particula.style.pointerEvents = 'none';
    particula.style.zIndex = '9999';
    particula.style.borderRadius = '50%';
    particula.style.animation = `particle ${Math.random() * 2 + 1}s ease-out forwards`;
    
    document.body.appendChild(particula);
    
    setTimeout(() => {
        if (particula.parentNode) {
            particula.parentNode.removeChild(particula);
        }
    }, 3000);
}

// Agregar animación de partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// ===== FUNCIONES AUXILIARES MEJORADAS =====

// Obtener nombre para archivo
function obtenerNombreArchivo() {
    const nombre = document.getElementById('nombre').value.trim();
    return CoreUtils.generateSafeFileName(nombre) || 'CV';
}

// Escapar HTML (mantenido para compatibilidad)
function escaparHTML(texto) {
    return CoreUtils.escapeHTML(texto);
}

// Mostrar resultado en la página con animaciones mejoradas
function mostrarResultado(html, datos) {
    const contenedor = document.getElementById('resultado');
    if (contenedor) {
        contenedor.style.display = 'block';
        contenedor.innerHTML = `
            <div class="mt-4 fade-in-up">
                <h2 class="mb-3">
                    <i class="fas fa-file-code icon" aria-hidden="true"></i>
                    CV Harvard Generado
                </h2>
                <div class="cv-preview border p-3 mb-3 slide-in-right" style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    ${html}
                </div>
                <div class="d-flex gap-2 justify-content-center flex-wrap">
                    <button onclick="generarWord()" class="btn download-btn bounce">
                        <i class="fas fa-file-word"></i> Descargar Word
                    </button>
                    <button onclick="verVistaPrevia()" class="btn btn-info bounce" style="animation-delay: 0.2s;">
                        <i class="fas fa-eye"></i> Vista Previa
                    </button>
                </div>
            </div>
        `;
        
        // Scroll suave con offset
        contenedor.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Agregar efecto de entrada
        setTimeout(() => {
            contenedor.classList.add('fade-in-up');
        }, 100);
    }
}

// Mostrar alertas mejoradas
function mostrarAlerta(mensaje, tipo) {
    const iconMap = {
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        danger: 'fas fa-times-circle',
        info: 'fas fa-info-circle'
    };
    
    const alertaHtml = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert" aria-live="assertive">
            <i class="${iconMap[tipo] || iconMap.info}" aria-hidden="true"></i>
            ${CoreUtils.escapeHTML(mensaje)}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar alerta"></button>
        </div>
    `;
    
    const contenedor = document.getElementById('alertas') || document.body;
    const alertaDiv = document.createElement('div');
    alertaDiv.innerHTML = alertaHtml;
    contenedor.insertBefore(alertaDiv, contenedor.firstChild);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (alertaDiv.parentNode) {
            alertaDiv.remove();
        }
    }, 5000);
}

// Función para celebrar la generación exitosa
function celebrarGeneracion() {
    // Crear confeti
    for (let i = 0; i < 50; i++) {
        crearConfeti();
    }
    
    // Agregar efecto de pulso al resultado
    const resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.classList.add('pulse');
        setTimeout(() => {
            resultado.classList.remove('pulse');
        }, 2000);
    }
}

// Función para crear confeti
function crearConfeti() {
    const confeti = document.createElement('div');
    confeti.style.position = 'fixed';
    confeti.style.width = '10px';
    confeti.style.height = '10px';
    confeti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    confeti.style.left = Math.random() * 100 + 'vw';
    confeti.style.top = '-10px';
    confeti.style.pointerEvents = 'none';
    confeti.style.zIndex = '9999';
    confeti.style.borderRadius = '50%';
    confeti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
    
    document.body.appendChild(confeti);
    
    setTimeout(() => {
        if (confeti.parentNode) {
            confeti.parentNode.removeChild(confeti);
        }
    }, 5000);
}

// Agregar animación de caída para el confeti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// ===== FUNCIÓN PARA LLENAR EJEMPLO COMPLETO =====
function llenarEjemploCompleto() {
    // Agregar estado de carga al botón
    const ejemploBtn = document.querySelector('button[onclick="llenarEjemploCompleto()"]');
    const originalContent = ejemploBtn.innerHTML;
    ejemploBtn.innerHTML = '<i class="fas fa-spinner fa-spin icon" aria-hidden="true"></i><span>Cargando ejemplo...</span>';
    ejemploBtn.disabled = true;
    ejemploBtn.classList.add('loading');

    // Simular carga con animación
    setTimeout(() => {
        // Ejemplo mejorado en español
        document.getElementById('nombre').value = 'María Elena García Rodríguez';
        document.getElementById('email').value = 'maria.garcia@email.com';
        document.getElementById('telefono').value = '+34 123 456 789';
        document.getElementById('ubicacion').value = 'Madrid, España';
        document.getElementById('linkedin').value = 'linkedin.com/in/mariagarcia';
        document.getElementById('portfolio').value = 'mariagarcia-portfolio.com';
        
        document.getElementById('resumen').value = `Profesional egresada en Administración de Empresas con especialización en análisis financiero, con un enfoque proactivo y orientado a resultados. Cuento con más de 3 años de experiencia en análisis de datos, gestión de riesgos financieros y liderazgo de equipos. Me destaco por mi capacidad para aprender rápidamente, adaptarme a entornos dinámicos y generar valor mediante la implementación de soluciones innovadoras basadas en datos.`;
        
        document.getElementById('educacion').value = `Máster en Administración de Empresas (MBA)
Universidad Complutense de Madrid, Madrid, España
2020 - 2022

Licenciatura en Economía y Finanzas
Universidad Autónoma de Madrid, Madrid, España
2016 - 2020
Nota: Cum Laude (8.7/10)

Certificación en Análisis de Datos
Coursera - Universidad de Stanford
2021 - 2022`;

        document.getElementById('experiencia').value = `Analista Senior de Negocios
Banco Santander, Madrid, España - Enero 2022 - Presente
• Desarrollo e implementación de estrategias de análisis financiero para portafolios de más de €50M
• Liderazgo de equipo de 5 analistas junior en proyectos de transformación digital
• Creación de modelos predictivos que mejoraron la eficiencia operativa en un 25%
• Presentación de informes ejecutivos a la junta directiva mensualmente
• Gestión de relaciones con clientes corporativos de alto valor

Analista de Riesgos Financieros
BBVA, Madrid, España - Junio 2020 - Diciembre 2021
• Evaluación y mitigación de riesgos crediticios en cartera de préstamos comerciales
• Desarrollo de herramientas de análisis usando Python y SQL para automatizar procesos
• Colaboración con equipos multidisciplinarios para optimizar políticas de crédito
• Reducción del 15% en pérdidas por morosidad mediante implementación de nuevos criterios

Prácticas Profesionales - Analista Trainee
Deloitte España, Madrid, España - Enero 2020 - Mayo 2020
• Apoyo en auditorías financieras para empresas del sector tecnológico
• Análisis de estados financieros y preparación de informes detallados
• Participación en proyectos de consultoría para PYMEs del sector servicios`;

        document.getElementById('habilidades').value = `Competencias Técnicas: Python, R, SQL, Excel Avanzado, Power BI, Tableau, SAP, Bloomberg Terminal, MATLAB, VBA

Idiomas: Español (Nativo), Inglés (C2 - Proficiency), Francés (B2 - Intermedio Alto), Portugués (B1 - Intermedio)

Competencias de Liderazgo: Gestión de equipos, Comunicación ejecutiva, Negociación, Resolución de conflictos, Mentoring

Certificaciones: CFA Level II Candidate, FRM Part I, Scrum Master Certified, Six Sigma Green Belt

Software Especializado: Risk Management Systems, Credit Analysis Tools, Financial Modeling, Data Visualization, Machine Learning aplicado a finanzas`;
        
        // Restaurar botón
        ejemploBtn.innerHTML = originalContent;
        ejemploBtn.disabled = false;
        ejemploBtn.classList.remove('loading');
        
        // Agregar efecto visual a los campos llenados
        const campos = ['nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'portfolio', 'resumen', 'educacion', 'experiencia', 'habilidades'];
        campos.forEach((campo, index) => {
            const elemento = document.getElementById(campo);
            if (elemento) {
                setTimeout(() => {
                    elemento.classList.add('bounce');
                    setTimeout(() => {
                        elemento.classList.remove('bounce');
                    }, 1000);
                }, index * 100);
            }
        });
        
        // Generar CV inmediatamente para mostrar el ejemplo
        setTimeout(() => {
            generarCV();
            mostrarAlerta('Ejemplo cargado correctamente ✨', 'success');
        }, campos.length * 100 + 500);
        
    }, 800);
}

// Función para limpiar el formulario
function limpiarFormulario() {
    const campos = ['nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'portfolio', 'resumen', 'educacion', 'experiencia', 'habilidades'];
    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) {
            elemento.value = '';
        }
    });
    
    // Ocultar resultado si está visible
    const resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.style.display = 'none';
    }
    
    mostrarAlerta('Formulario limpiado correctamente', 'info');
}

// ===== INICIALIZACIÓN MEJORADA =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 Generador de CV Harvard v' + APP_CONFIG.version + ' cargado correctamente');
    
    // Verificar funcionalidades del navegador
    const features = {
        localStorage: typeof(Storage) !== "undefined",
        blob: typeof Blob !== "undefined",
        url: typeof URL !== "undefined"
    };
    
    console.log('🔧 Características del navegador:', features);
    
    // Configurar mejoras de accesibilidad
    setupAccessibilityEnhancements();
    
    // Configurar auto-guardado básico
    setupBasicAutoSave();
    
    console.log('✅ Inicialización completada');
});

// Configurar mejoras de accesibilidad
function setupAccessibilityEnhancements() {
    // Agregar navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Cerrar vista previa si está abierta
            const previewArea = document.getElementById('previewArea');
            if (previewArea && previewArea.style.display !== 'none') {
                if (window.verVistaPrevia) {
                    verVistaPrevia();
                }
            }
        }
    });
    
    // Mejorar enfoque para lectores de pantalla
    const elementos = document.querySelectorAll('input, textarea, button, select');
    elementos.forEach(elemento => {
        elemento.addEventListener('focus', () => {
            elemento.setAttribute('data-focused', 'true');
        });
        
        elemento.addEventListener('blur', () => {
            elemento.removeAttribute('data-focused');
        });
    });
}

// Configurar auto-guardado básico
function setupBasicAutoSave() {
    const campos = ['nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'portfolio', 'resumen', 'educacion', 'experiencia', 'habilidades'];
    
    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) {
            elemento.addEventListener('input', CoreUtils.debounce(() => {
                // Auto-guardado básico en localStorage
                try {
                    const formData = {};
                    campos.forEach(c => {
                        const el = document.getElementById(c);
                        if (el) formData[c] = el.value;
                    });
                    localStorage.setItem('cvFormData', JSON.stringify(formData));
                } catch (error) {
                    console.warn('No se pudo auto-guardar:', error);
                }
            }, APP_CONFIG.debounceDelay));
        }
    });
    
    // Cargar datos guardados
    try {
        const saved = localStorage.getItem('cvFormData');
        if (saved) {
            const formData = JSON.parse(saved);
            campos.forEach(campo => {
                const elemento = document.getElementById(campo);
                if (elemento && formData[campo]) {
                    elemento.value = formData[campo];
                }
            });
        }
    } catch (error) {
        console.warn('No se pudieron cargar datos guardados:', error);
    }
}
