// =============================================================================
// GENERADOR CV HARVARD - VERSIÓN MEJORADA
// Código refactorizado con arquitectura moderna y mejores prácticas
// =============================================================================

// ===== CONFIGURACIÓN Y CONSTANTES =====
const CONFIG = {
    CV_STYLES: {
        fontFamily: 'Times New Roman, serif',
        fontSize: '11pt',
        lineHeight: '1.4',
        color: '#000000',
        maxWidth: '8.5in',
        margin: '0.3in'
    },
    VALIDATION: {
        debounceTime: 300,
        autoSaveInterval: 1000,
        maxFileNameLength: 50
    },
    ANIMATIONS: {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
};

// ===== GENERADOR DE CV HTML MEJORADO =====
class CVGenerator {
    static generateHTML(datos) {
        const fechaGeneracion = new Date().toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const sections = [
            this.generateHeader(datos),
            this.generateContactInfo(datos),
            this.generateEducation(datos),
            this.generateExperience(datos),
            this.generateSkills(datos),
            this.generateFooter(datos, fechaGeneracion)
        ].filter(Boolean);
        
        return `
            <div style="max-width: ${CONFIG.CV_STYLES.maxWidth}; margin: 0 auto; padding: ${CONFIG.CV_STYLES.margin}; font-family: ${CONFIG.CV_STYLES.fontFamily}; font-size: ${CONFIG.CV_STYLES.fontSize}; line-height: ${CONFIG.CV_STYLES.lineHeight}; color: ${CONFIG.CV_STYLES.color};">
                ${sections.join('')}
            </div>
        `;
    }
    
    static generateHeader(datos) {
        if (!datos.nombre) return '';
        
        return `
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #000; font-size: 20pt; font-weight: bold; margin: 0; font-family: 'Times New Roman', serif;">
                    ${this.escapeHTML(datos.nombre)}
                </h1>
                <hr style="border: none; height: 2px; background-color: #000; margin: 15px 0;">
            </div>
        `;
    }
    
    static generateContactInfo(datos) {
        const contactParts = [];
        
        if (datos.ubicacion || datos.telefono) {
            const locationPhone = [datos.ubicacion, datos.telefono].filter(Boolean).join(' • ');
            contactParts.push(`<p style="margin: 5px 0; font-size: 11pt;">${this.escapeHTML(locationPhone)}</p>`);
        }
        
        if (datos.email) {
            contactParts.push(`<p style="margin: 5px 0; font-size: 11pt;">${this.escapeHTML(datos.email)}</p>`);
        }
        
        if (datos.linkedin || datos.portfolio) {
            const links = [];
            if (datos.linkedin) links.push(`LinkedIn: ${this.escapeHTML(datos.linkedin)}`);
            if (datos.portfolio) links.push(`Portfolio: ${this.escapeHTML(datos.portfolio)}`);
            contactParts.push(`<p style="margin: 5px 0; font-size: 11pt;">${links.join(' • ')}</p>`);
        }
        
        return contactParts.length > 0 ? `
            <div style="text-align: center; margin-bottom: 30px; font-size: 11pt;">
                ${contactParts.join('')}
            </div>
        ` : '';
    }
    
    static generateEducation(datos) {
        if (!datos.educacion?.trim()) return '';
        
        const lines = datos.educacion.split('\n').filter(l => l.trim());
        const processedLines = lines.map(line => {
            const trimmedLine = line.trim();
            
            if (this.isInstitution(trimmedLine)) {
                return `<p style="margin: 3px 0; font-style: italic;">${this.escapeHTML(trimmedLine)}</p>`;
            } else if (this.hasDate(trimmedLine)) {
                return `<p style="margin: 3px 0; font-style: italic; color: #000;">${this.escapeHTML(trimmedLine)}</p>`;
            } else {
                return `<p style="margin: 3px 0; font-weight: bold;">${this.escapeHTML(trimmedLine)}</p>`;
            }
        });
        
        return `
            <div style="margin-bottom: 25px;">
                <h2 style="color: #000; font-size: 14pt; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-family: 'Times New Roman', serif;">
                    EDUCACIÓN
                </h2>
                <div style="margin-left: 10px; font-size: 11pt;">
                    ${processedLines.join('')}
                </div>
            </div>
        `;
    }
    
    static generateExperience(datos) {
        if (!datos.experiencia?.trim()) return '';
        
        const lines = datos.experiencia.split('\n').filter(l => l.trim());
        const processedLines = lines.map(line => {
            const trimmedLine = line.trim();
            
            if (trimmedLine.startsWith('•')) {
                return `<p style="margin: 2px 0 2px 15px;">• ${this.escapeHTML(trimmedLine.substring(1).trim())}</p>`;
            } else if (trimmedLine.includes(',') && this.hasDate(trimmedLine)) {
                return `<p style="margin: 3px 0; font-style: italic; color: #000;">${this.escapeHTML(trimmedLine)}</p>`;
            } else {
                return `<p style="margin: 5px 0 3px 0; font-weight: bold;">${this.escapeHTML(trimmedLine)}</p>`;
            }
        });
        
        return `
            <div style="margin-bottom: 25px;">
                <h2 style="color: #000; font-size: 14pt; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-family: 'Times New Roman', serif;">
                    EXPERIENCIA PROFESIONAL
                </h2>
                <div style="margin-left: 10px; font-size: 11pt;">
                    ${processedLines.join('')}
                </div>
            </div>
        `;
    }
    
    static generateSkills(datos) {
        if (!datos.habilidades?.trim()) return '';
        
        const lines = datos.habilidades.split('\n').filter(l => l.trim());
        const processedLines = lines.map(line => {
            const trimmedLine = line.trim();
            
            if (trimmedLine.includes(':')) {
                const [category, ...contentParts] = trimmedLine.split(':');
                const content = contentParts.join(':').trim();
                return `<p style="margin: 3px 0;"><strong>${this.escapeHTML(category.trim())}:</strong> ${this.escapeHTML(content)}</p>`;
            } else {
                return `<p style="margin: 3px 0;">${this.escapeHTML(trimmedLine)}</p>`;
            }
        });
        
        return `
            <div style="margin-bottom: 25px;">
                <h2 style="color: #000; font-size: 14pt; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-family: 'Times New Roman', serif;">
                    HABILIDADES Y COMPETENCIAS
                </h2>
                <div style="margin-left: 10px; font-size: 11pt;">
                    ${processedLines.join('')}
                </div>
            </div>
        `;
    }
    
    static generateFooter(datos, fechaGeneracion) {
        return `
            <div style="margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; text-align: center; font-size: 10pt; color: #000; font-family: 'Times New Roman', serif;">
                <p style="margin: 0;">${this.escapeHTML(datos.nombre)} - Curriculum Vitae</p>
                <p style="margin: 0;">Generado el ${fechaGeneracion}</p>
            </div>
        `;
    }
    
    // Utility methods
    static escapeHTML(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    static isInstitution(line) {
        const institutionKeywords = ['Universidad', 'Instituto', 'Colegio', 'University', 'Institute', 'College', 'Escuela', 'Conservatorio'];
        return institutionKeywords.some(keyword => line.includes(keyword));
    }
    
    static hasDate(line) {
        return /\d{4}/.test(line);
    }
}

// ===== GENERADOR DE WORD MEJORADO =====
class WordGenerator {
    static async generate(datos) {
        if (!datos.nombre || !datos.email) {
            throw new Error('Faltan datos obligatorios (nombre y email)');
        }
        
        try {
            const cvHTML = CVGenerator.generateHTML(datos);
            const fileName = this.generateFileName(datos.nombre);
            
            const blob = new Blob([this.createWordDocument(cvHTML, datos)], {
                type: 'application/msword'
            });
            
            this.downloadFile(blob, fileName);
            return { success: true, fileName };
            
        } catch (error) {
            console.error('Error al generar Word:', error);
            throw new Error('Error al generar el documento Word: ' + error.message);
        }
    }
    
    static createWordDocument(cvHTML, datos) {
        return `
            <!DOCTYPE html>
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>CV - ${datos.nombre}</title>
                <!--[if gte mso 9]>
                <xml>
                    <w:WordDocument>
                        <w:View>Print</w:View>
                        <w:Zoom>90</w:Zoom>
                        <w:DoNotPromptForConvert/>
                        <w:DoNotShowRevisions/>
                        <w:DoNotShowMarkup/>
                        <w:DoNotShowComments/>
                        <w:DoNotShowInsertionsAndDeletions/>
                        <w:DoNotShowPropertyChanges/>
                    </w:WordDocument>
                </xml>
                <![endif]-->
                <style>
                    @page { 
                        margin: 0.75in; 
                        size: letter; 
                    }
                    body { 
                        font-family: 'Times New Roman', serif; 
                        margin: 0; 
                        color: #000; 
                        font-size: 11pt; 
                        line-height: 1.4;
                    }
                    h1, h2 { 
                        color: #000; 
                        page-break-after: avoid;
                    }
                    p { 
                        margin: 0.1em 0; 
                        orphans: 2; 
                        widows: 2;
                    }
                    .page-break { 
                        page-break-before: always; 
                    }
                </style>
            </head>
            <body>
                ${cvHTML}
            </body>
            </html>
        `;
    }
    
    static generateFileName(nombre) {
        const safeName = nombre
            .replace(/[^a-zA-Z0-9áéíóúñüÁÉÍÓÚÑÜ\s]/g, '')
            .replace(/\s+/g, '_')
            .substring(0, CONFIG.VALIDATION.maxFileNameLength);
        
        const timestamp = new Date().toISOString().slice(0, 10);
        return `CV_${safeName}_${timestamp}.doc`;
    }
    
    static downloadFile(blob, filename) {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
    }
}

// ===== GESTIÓN DE EJEMPLOS MEJORADA =====
class ExampleManager {
    static getCompleteExample() {
        return {
            nombre: 'María Elena García Rodríguez',
            email: 'maria.garcia@email.com',
            telefono: '+34 123 456 789',
            ubicacion: 'Madrid, España',
            linkedin: 'linkedin.com/in/mariagarcia',
            portfolio: 'mariagarcia-portfolio.com',
            educacion: `Máster en Administración de Empresas (MBA)
Universidad Complutense de Madrid, Madrid, España
2020 - 2022

Licenciatura en Economía y Finanzas
Universidad Autónoma de Madrid, Madrid, España
2016 - 2020
Nota: Cum Laude (8.7/10)

Certificación en Análisis de Datos
Coursera - Universidad de Stanford
2021 - 2022`,
            experiencia: `Analista Senior de Negocios
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
• Participación en proyectos de consultoría para PYMEs del sector servicios`,
            habilidades: `Competencias Técnicas: Python, R, SQL, Excel Avanzado, Power BI, Tableau, SAP, Bloomberg Terminal, MATLAB, VBA

Idiomas: Español (Nativo), Inglés (C2 - Proficiency), Francés (B2 - Intermedio Alto), Portugués (B1 - Intermedio)

Competencias de Liderazgo: Gestión de equipos, Comunicación ejecutiva, Negociación, Resolución de conflictos, Mentoring

Certificaciones: CFA Level II Candidate, FRM Part I, Scrum Master Certified, Six Sigma Green Belt

Software Especializado: Risk Management Systems, Credit Analysis Tools, Financial Modeling, Data Visualization, Machine Learning aplicado a finanzas`
        };
    }
    
    static async loadExample() {
        try {
            const exampleData = this.getCompleteExample();
            
            // Usar FormManager si está disponible, si no, cargar directamente
            if (window.FormManager) {
                FormManager.setData(exampleData);
            } else {
                this.setFormData(exampleData);
            }
            
            // Generar CV automáticamente
            if (window.generarCV) {
                await generarCV();
            }
            
            return exampleData;
        } catch (error) {
            console.error('Error al cargar ejemplo:', error);
            throw error;
        }
    }
    
    static setFormData(data) {
        Object.keys(data).forEach(key => {
            const field = document.getElementById(key);
            if (field) {
                field.value = data[key];
            }
        });
    }
}

// ===== GESTIÓN DE RESULTADOS MEJORADA =====
class ResultManager {
    static show(cvHTML, datos) {
        const container = document.getElementById('resultado');
        if (!container) return;
        
        container.style.display = 'block';
        container.innerHTML = this.generateResultHTML(cvHTML);
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Agregar event listeners a los botones
        this.setupResultListeners();
    }
    
    static generateResultHTML(cvHTML) {
        return `
            <div class="mt-4">
                <h2 class="mb-3">
                    <i class="fas fa-file-code icon" aria-hidden="true"></i>
                    CV Harvard Generado
                </h2>
                <div class="mb-3 d-flex gap-2 justify-content-center flex-wrap">
                    <button onclick="generarWord()" class="btn download-btn" id="wordBtn" aria-describedby="word-help">
                        <i class="fas fa-file-word icon" aria-hidden="true"></i>
                        <span>Descargar Word</span>
                    </button>
                    <button onclick="verVistaPrevia()" class="btn download-btn" id="previewBtn" aria-describedby="preview-help">
                        <i class="fas fa-eye icon" aria-hidden="true"></i>
                        <span>Vista Previa</span>
                    </button>
                </div>
                <div id="previewArea" style="display: none;" class="preview-container" role="region" aria-label="Vista previa del CV">
                    <h3 class="mb-3">Vista Previa del CV:</h3>
                    <div id="cvPreview" class="cv-preview-content" role="document" aria-label="Contenido del CV generado">
                        ${cvHTML}
                    </div>
                </div>
            </div>
        `;
    }
    
    static setupResultListeners() {
        // Los event listeners ya están configurados via onclick en el HTML
        // Aquí podemos agregar funcionalidad adicional si es necesario
    }
    
    static hide() {
        const container = document.getElementById('resultado');
        if (container) {
            container.style.display = 'none';
        }
    }
}

// ===== FUNCIONES GLOBALES PARA RETROCOMPATIBILIDAD =====

// Función global para generar CV HTML (usada por el código existente)
function generarCVHTML(datos) {
    return CVGenerator.generateHTML(datos);
}

// Función global para generar Word (usada por el código existente)
async function generarWord() {
    try {
        const datos = window.FormManager ? FormManager.getData() : getFormDataLegacy();
        
        if (!datos.nombre || !datos.email) {
            if (window.NotificationManager) {
                NotificationManager.show('Por favor, completa al menos el nombre y el correo electrónico.', 'warning');
            } else {
                alert('Por favor, completa al menos el nombre y el correo electrónico.');
            }
            return;
        }
        
        await WordGenerator.generate(datos);
        
        if (window.NotificationManager) {
            NotificationManager.show('¡CV en Word generado exitosamente! 📄', 'success');
        }
        
    } catch (error) {
        console.error('Error al generar Word:', error);
        if (window.NotificationManager) {
            NotificationManager.show('Error al generar el documento Word: ' + error.message, 'error');
        } else {
            alert('Error al generar el documento Word: ' + error.message);
        }
    }
}

// Función global para llenar ejemplo (usada por el código existente)
async function llenarEjemploCompleto() {
    try {
        await ExampleManager.loadExample();
        
        if (window.NotificationManager) {
            NotificationManager.show('Ejemplo cargado correctamente', 'success');
        }
    } catch (error) {
        console.error('Error al cargar ejemplo:', error);
        if (window.NotificationManager) {
            NotificationManager.show('Error al cargar el ejemplo', 'error');
        }
    }
}

// Función global para mostrar resultado (usada por el código existente)
function mostrarResultado(cvHTML, datos) {
    ResultManager.show(cvHTML, datos);
}

// Función legacy para obtener datos del formulario
function getFormDataLegacy() {
    const fields = ['nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'portfolio', 'educacion', 'experiencia', 'habilidades'];
    const data = {};
    
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            data[fieldName] = field.value.trim();
        }
    });
    
    return data;
}

// ===== INICIALIZACIÓN MEJORADA =====
(function initializeEnhancedScript() {
    console.log('📄 Script mejorado de CV Harvard cargado');
    
    // Verificar dependencias
    if (typeof CONFIG === 'undefined') {
        console.error('❌ Error: Configuración no disponible');
        return;
    }
    
    // Configurar mejoras adicionales cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupEnhancements);
    } else {
        setupEnhancements();
    }
    
    function setupEnhancements() {
        // Agregar estilos CSS adicionales si es necesario
        addAdditionalStyles();
        
        // Configurar observer para cambios en el DOM
        setupDOMObserver();
        
        console.log('✅ Mejoras adicionales aplicadas');
    }
    
    function addAdditionalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cv-preview-content {
                background: white !important;
                padding: 2rem;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                font-family: 'Times New Roman', serif;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            
            .preview-container {
                border: 2px dashed #cbd5e0;
                border-radius: 12px;
                padding: 1.5rem;
                background: #f7fafc;
                margin-top: 1rem;
            }
            
            .invalid-feedback {
                display: block;
                color: #e53e3e;
                font-size: 0.875rem;
                margin-top: 0.25rem;
            }
            
            .form-control.is-invalid {
                border-color: #e53e3e;
                box-shadow: 0 0 0 0.2rem rgba(229, 62, 62, 0.25);
            }
            
            @media print {
                .cv-preview-content {
                    box-shadow: none;
                    border: none;
                    padding: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    function setupDOMObserver() {
        // Observer para detectar cambios dinámicos en el DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Re-aplicar mejoras si es necesario
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();
