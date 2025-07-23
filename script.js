// =============================================================================
// GENERADOR CV HARVARD - TODO NEGRO
// Versión sin colores rojos - Todo el texto en negro
// =============================================================================

// ===== FUNCIONES PRINCIPALES =====

// Recopilar datos del formulario y generar CV
function generarCV() {
    const datos = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        ubicacion: document.getElementById('ubicacion').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim(),
        portfolio: document.getElementById('portfolio').value.trim(),
        educacion: document.getElementById('educacion').value.trim(),
        experiencia: document.getElementById('experiencia').value.trim(),
        habilidades: document.getElementById('habilidades').value.trim()
    };

    // Validar campos obligatorios
    if (!datos.nombre || !datos.email) {
        mostrarAlerta('Por favor, completa al menos el nombre y el correo electrónico.', 'warning');
        return;
    }

    try {
        // Generar vista previa HTML del CV
        const cvHTML = generarCVHTML(datos);
        
        // Mostrar resultado
        mostrarResultado(cvHTML, datos);
        
        // Mostrar mensaje de éxito
        mostrarAlerta('¡CV generado exitosamente! ✅', 'success');
        
    } catch (error) {
        console.error('Error al generar CV:', error);
        mostrarAlerta('Hubo un error al generar el CV. Por favor, intenta nuevamente.', 'danger');
    }
}

// Generar HTML del CV - Solo en Español
function generarCVHTML(datos) {
    const fechaGeneracion = new Date().toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    let html = `
    <div style="max-width: 8.5in; margin: 0 auto; padding: 0.3in; font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.4; color: #000;">
        <!-- Encabezado -->
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #000; font-size: 20pt; font-weight: bold; margin: 0; font-family: 'Times New Roman', serif;">
                ${escaparHTML(datos.nombre)}
            </h1>
            <hr style="border: none; height: 2px; background-color: #000; margin: 15px 0;">
        </div>
        
        <!-- Información de contacto -->
        <div style="text-align: center; margin-bottom: 30px; font-size: 11pt;">`;
    
    // Información de contacto en líneas separadas
    if (datos.ubicacion || datos.telefono) {
        html += `<p style="margin: 5px 0; font-size: 11pt;">`;
        if (datos.ubicacion) html += escaparHTML(datos.ubicacion);
        if (datos.ubicacion && datos.telefono) html += ' • ';
        if (datos.telefono) html += escaparHTML(datos.telefono);
        html += `</p>`;
    }
    
    if (datos.email) {
        html += `<p style="margin: 5px 0; font-size: 11pt;">${escaparHTML(datos.email)}</p>`;
    }
    
    if (datos.linkedin || datos.portfolio) {
        html += `<p style="margin: 5px 0; font-size: 11pt;">`;
        if (datos.linkedin) html += `LinkedIn: ${escaparHTML(datos.linkedin)}`;
        if (datos.linkedin && datos.portfolio) html += ' • ';
        if (datos.portfolio) html += `Portfolio: ${escaparHTML(datos.portfolio)}`;
        html += `</p>`;
    }
    
    html += `</div>`;
    
    // Educación
    if (datos.educacion) {
        html += `
        <div style="margin-bottom: 25px;">
            <h2 style="color: #000; font-size: 14pt; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-family: 'Times New Roman', serif;">
                EDUCACIÓN
            </h2>
            <div style="margin-left: 10px; font-size: 11pt;">`;
        
        const lineasEducacion = datos.educacion.split('\n').filter(l => l.trim());
        lineasEducacion.forEach(linea => {
            const lineaTrim = linea.trim();
            if (lineaTrim.includes('Universidad') || lineaTrim.includes('Instituto') || lineaTrim.includes('Colegio') || 
                lineaTrim.includes('University') || lineaTrim.includes('Institute') || lineaTrim.includes('College')) {
                html += `<p style="margin: 3px 0; font-style: italic;">${escaparHTML(lineaTrim)}</p>`;
            } else if (/\d{4}/.test(lineaTrim)) {
                html += `<p style="margin: 3px 0; font-style: italic; color: #000;">${escaparHTML(lineaTrim)}</p>`;
            } else {
                html += `<p style="margin: 3px 0; font-weight: bold;">${escaparHTML(lineaTrim)}</p>`;
            }
        });
        
        html += `</div></div>`;
    }
    
    // Experiencia
    if (datos.experiencia) {
        html += `
        <div style="margin-bottom: 25px;">
            <h2 style="color: #000; font-size: 14pt; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-family: 'Times New Roman', serif;">
                EXPERIENCIA PROFESIONAL
            </h2>
            <div style="margin-left: 10px; font-size: 11pt;">`;
        
        const lineasExperiencia = datos.experiencia.split('\n').filter(l => l.trim());
        lineasExperiencia.forEach(linea => {
            const lineaTrim = linea.trim();
            if (lineaTrim.startsWith('•')) {
                html += `<p style="margin: 2px 0 2px 15px;">• ${escaparHTML(lineaTrim.substring(1).trim())}</p>`;
            } else if (lineaTrim.includes(',') && /\d{4}/.test(lineaTrim)) {
                html += `<p style="margin: 3px 0; font-style: italic; color: #000;">${escaparHTML(lineaTrim)}</p>`;
            } else {
                html += `<p style="margin: 5px 0 3px 0; font-weight: bold;">${escaparHTML(lineaTrim)}</p>`;
            }
        });
        
        html += `</div></div>`;
    }
    
    // Habilidades
    if (datos.habilidades) {
        html += `
        <div style="margin-bottom: 25px;">
            <h2 style="color: #000; font-size: 14pt; font-weight: bold; margin: 0 0 10px 0; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px; font-family: 'Times New Roman', serif;">
                HABILIDADES Y COMPETENCIAS
            </h2>
            <div style="margin-left: 10px; font-size: 11pt;">`;
        
        const lineasHabilidades = datos.habilidades.split('\n').filter(l => l.trim());
        lineasHabilidades.forEach(linea => {
            const lineaTrim = linea.trim();
            if (lineaTrim.includes(':')) {
                const partes = lineaTrim.split(':');
                const categoria = partes[0].trim();
                const contenido = partes.slice(1).join(':').trim();
                html += `<p style="margin: 3px 0;"><strong>${escaparHTML(categoria)}:</strong> ${escaparHTML(contenido)}</p>`;
            } else {
                html += `<p style="margin: 3px 0;">${escaparHTML(lineaTrim)}</p>`;
            }
        });
        
        html += `</div></div>`;
    }
    
    // Pie de página
    html += `
        <div style="margin-top: 40px; border-top: 1px solid #ccc; padding-top: 10px; text-align: center; font-size: 10pt; color: #000; font-family: 'Times New Roman', serif;">
            <p style="margin: 0;">${escaparHTML(datos.nombre)} - Curriculum Vitae</p>
            <p style="margin: 0;">Generado el ${fechaGeneracion}</p>
        </div>
    </div>`;
    
    return html;
}

// ===== FUNCIONES PDF =====

// Variables globales para el engine PDF
let isEngineBusy = false;

// Generar PDF directamente
async function generarPDF() {
    const pdfBtn = document.getElementById('pdfBtn');
    const originalText = pdfBtn.innerHTML;
    
    if (isEngineBusy) {
        mostrarAlerta('Ya se está generando un PDF. Por favor espera.', 'warning');
        return;
    }
    
    try {
        isEngineBusy = true;
        
        // Cambiar estado del botón
        pdfBtn.innerHTML = '<i class="fas fa-spinner fa-spin icon"></i>Generando CV...';
        pdfBtn.classList.add('pdf-loading');
        pdfBtn.disabled = true;

        // Verificar que hay datos
        const datos = {
            nombre: document.getElementById('nombre').value.trim(),
            email: document.getElementById('email').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            ubicacion: document.getElementById('ubicacion').value.trim(),
            linkedin: document.getElementById('linkedin').value.trim(),
            portfolio: document.getElementById('portfolio').value.trim(),
            educacion: document.getElementById('educacion').value.trim(),
            experiencia: document.getElementById('experiencia').value.trim(),
            habilidades: document.getElementById('habilidades').value.trim()
        };

        if (!datos.nombre || !datos.email) {
            mostrarAlerta('Por favor, completa al menos el nombre y el correo electrónico.', 'warning');
            return;
        }

        // Verificar que jsPDF está disponible
        console.log('=== DIAGNÓSTICO PDF ===');
        console.log('window.jspdf existe:', typeof window.jspdf !== 'undefined');
        console.log('window.jspdf:', window.jspdf);
        
        if (typeof window.jspdf === 'undefined' || !window.jspdf.jsPDF) {
            console.error('jsPDF no está disponible');
            throw new Error('jsPDF no está cargado. Recarga la página e intenta nuevamente.');
        }

        console.log('jsPDF disponible, versión:', window.jspdf.version || 'desconocida');
        console.log('jsPDF.jsPDF:', window.jspdf.jsPDF);
        console.log('Iniciando generación PDF...');
        
        // Generar PDF
        await generarPDFSimple(datos);
        
    } catch (error) {
        console.error('Error completo al generar PDF:', error);
        console.error('Stack trace:', error.stack);
        
        let mensajeError = error.message;
        if (error.message.includes('jsPDF')) {
            mensajeError += ' Recarga la página e intenta nuevamente.';
        }
        
        mostrarAlerta(`Error al generar PDF: ${mensajeError}`, 'danger');
    } finally {
        // Restaurar botón
        pdfBtn.innerHTML = originalText;
        pdfBtn.classList.remove('pdf-loading');
        pdfBtn.disabled = false;
        isEngineBusy = false;
    }
}

// Generar PDF con formato simple - TODO NEGRO
async function generarPDFSimple(datos) {
    // Verificación más robusta de jsPDF
    if (!window.jspdf || !window.jspdf.jsPDF) {
        throw new Error('jsPDF no está disponible. Asegúrate de que se cargó correctamente.');
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Configuración de colores - TODO NEGRO
    const colores = {
        primario: [0, 0, 0],        // Negro (antes Harvard Crimson)
        secundario: [0, 0, 0],      // Negro
        texto: [0, 0, 0],           // Negro
        linea: [200, 200, 200]      // Gris claro solo para líneas divisorias
    };
    
    // Configuración de fuentes y espaciado - Ajustado para Times New Roman 11pt
    const fontSize = {
        nombre: 20,        // Nombre más grande (equivale a ~20pt)
        titulo: 14,        // Títulos de secciones
        subtitulo: 12,     // Subtítulos
        normal: 11,        // Texto normal 11pt
        pequeño: 10        // Texto pequeño
    };
    
    const margen = 25;
    const anchoUtil = 210 - (2 * margen);
    let yPos = 30;
    
    // Función para verificar espacio y agregar página si es necesario
    function verificarEspacio(espacioNecesario) {
        if (yPos + espacioNecesario > 270) {
            doc.addPage();
            yPos = 30;
            return true;
        }
        return false;
    }
    
    // Función para agregar texto con ajuste de línea
    function agregarTexto(texto, x, y, maxWidth, fontSize, estilo = 'normal', color = colores.texto) {
        doc.setTextColor(color[0], color[1], color[2]);
        doc.setFontSize(fontSize);
        doc.setFont('times', estilo);
        
        const lineas = doc.splitTextToSize(texto, maxWidth);
        doc.text(lineas, x, y);
        return lineas.length * (fontSize * 0.4);
    }
    
    // Función para agregar línea divisoria
    function agregarLinea(y, ancho = anchoUtil) {
        doc.setDrawColor(colores.linea[0], colores.linea[1], colores.linea[2]);
        doc.setLineWidth(0.3);
        doc.line(margen, y, margen + ancho, y);
    }
    
    try {
        // ENCABEZADO - Nombre en negro
        doc.setTextColor(colores.texto[0], colores.texto[1], colores.texto[2]);
        doc.setFontSize(fontSize.nombre);
        doc.setFont('times', 'bold');
        
        // Centrar el nombre
        const nombreWidth = doc.getTextWidth(datos.nombre.toUpperCase());
        const nombreX = (210 - nombreWidth) / 2;
        doc.text(datos.nombre.toUpperCase(), nombreX, yPos);
        yPos += 8;
        
        // Línea debajo del nombre
        agregarLinea(yPos);
        yPos += 8;
        
        // Información de contacto centrada
        doc.setTextColor(colores.texto[0], colores.texto[1], colores.texto[2]);
        doc.setFontSize(fontSize.normal);
        doc.setFont('times', 'normal');
        
        let contactoLineas = [];
        
        // Primera línea: dirección y teléfono
        let linea1 = '';
        if (datos.ubicacion) linea1 += datos.ubicacion;
        if (datos.telefono) {
            if (linea1) linea1 += ' • ';
            linea1 += datos.telefono;
        }
        if (linea1) contactoLineas.push(linea1);
        
        // Segunda línea: email
        if (datos.email) contactoLineas.push(datos.email);
        
        // Tercera línea: enlaces profesionales
        let linea3 = '';
        if (datos.linkedin) linea3 += 'LinkedIn: ' + datos.linkedin;
        if (datos.portfolio) {
            if (linea3) linea3 += ' • ';
            linea3 += 'Portfolio: ' + datos.portfolio;
        }
        if (linea3) contactoLineas.push(linea3);
        
        // Centrar cada línea de contacto
        contactoLineas.forEach(linea => {
            const lineaWidth = doc.getTextWidth(linea);
            const lineaX = (210 - lineaWidth) / 2;
            doc.text(linea, lineaX, yPos);
            yPos += 5;
        });
        
        yPos += 8;
        
        // EDUCACIÓN - Títulos en negro
        if (datos.educacion) {
            verificarEspacio(25);
            
            // Título de sección - en negro
            doc.setTextColor(colores.texto[0], colores.texto[1], colores.texto[2]);
            yPos += agregarTexto('EDUCATION', margen, yPos, anchoUtil, fontSize.titulo, 'bold', colores.texto);
            yPos += 2;
            agregarLinea(yPos);
            yPos += 8;
            
            // Contenido de educación
            doc.setTextColor(colores.texto[0], colores.texto[1], colores.texto[2]);
            const lineasEducacion = datos.educacion.split('\n').filter(l => l.trim());
            
            for (let i = 0; i < lineasEducacion.length; i++) {
                const linea = lineasEducacion[i].trim();
                if (!linea) continue;
                
                verificarEspacio(8);
                
                // Determinar si es título de grado o detalles
                const esInstitucion = linea.includes('Universidad') || linea.includes('Instituto') || linea.includes('Colegio');
                const esFecha = /\d{4}/.test(linea) && (linea.includes('-') || linea.includes('presente'));
                
                if (esInstitucion || esFecha) {
                    yPos += agregarTexto(linea, margen + 5, yPos, anchoUtil - 5, fontSize.normal, 'italic') + 2;
                } else {
                    // Título de grado en negrita
                    yPos += agregarTexto(linea, margen + 5, yPos, anchoUtil - 5, fontSize.normal, 'bold') + 2;
                }
            }
            yPos += 8;
        }
        
        // EXPERIENCIA PROFESIONAL - Títulos en negro
        if (datos.experiencia) {
            verificarEspacio(25);
            
            doc.setTextColor(colores.texto[0], colores.texto[1], colores.texto[2]);
            yPos += agregarTexto('PROFESSIONAL EXPERIENCE', margen, yPos, anchoUtil, fontSize.titulo, 'bold', colores.texto);
            yPos += 2;
            agregarLinea(yPos);
            yPos += 8;
            
            doc.setTextColor(colores.texto[0], colores.texto[1], colores.texto[2]);
            const lineasExperiencia = datos.experiencia.split('\n').filter(l => l.trim());
            
            for (let i = 0; i < lineasExperiencia.length; i++) {
                const linea = lineasExperiencia[i].trim();
                if (!linea) continue;
                
                verificarEspacio(8);
                
                if (linea.startsWith('•')) {
                    // Viñetas de responsabilidades
                    yPos += agregarTexto('• ' + linea.substring(1).trim(), margen + 10, yPos, anchoUtil - 15, fontSize.normal) + 2;
                } else if (linea.includes(',') && /\d{4}/.test(linea)) {
                    // Empresa y fechas en cursiva
                    yPos += agregarTexto(linea, margen + 5, yPos, anchoUtil - 5, fontSize.normal, 'italic') + 2;
                } else {
                    // Título del puesto en negrita
                    yPos += agregarTexto(linea, margen + 5, yPos, anchoUtil - 5, fontSize.normal, 'bold') + 2;
                }
            }
            yPos += 8;
        }
        
        // HABILIDADES Y COMPETENCIAS - Títulos en negro
        if (datos.habilidades) {
            verificarEspacio(25);
            
            doc.setTextColor(colores.texto[0], colores.texto[1], colores.texto[2]);
            yPos += agregarTexto('SKILLS & COMPETENCIES', margen, yPos, anchoUtil, fontSize.titulo, 'bold', colores.texto);
            yPos += 2;
            agregarLinea(yPos);
            yPos += 8;
            
            doc.setTextColor(colores.texto[0], colores.texto[1], colores.texto[2]);
            const lineasHabilidades = datos.habilidades.split('\n').filter(l => l.trim());
            
            lineasHabilidades.forEach(linea => {
                const lineaTrim = linea.trim();
                if (!lineaTrim) return;
                
                verificarEspacio(8);
                
                // Formato de categoría: negrita para la categoría, normal para el contenido
                if (lineaTrim.includes(':')) {
                    const partes = lineaTrim.split(':');
                    const categoria = partes[0].trim();
                    const contenido = partes.slice(1).join(':').trim();
                    
                    // Categoría en negrita
                    const categoriaWidth = doc.getTextWidth(categoria + ':');
                    doc.setFont('times', 'bold');
                    doc.text(categoria + ':', margen + 5, yPos);
                    
                    // Contenido en normal
                    doc.setFont('times', 'normal');
                    yPos += agregarTexto(contenido, margen + 5 + categoriaWidth + 2, yPos, anchoUtil - 10 - categoriaWidth, fontSize.normal) + 2;
                } else {
                    yPos += agregarTexto(lineaTrim, margen + 5, yPos, anchoUtil - 5, fontSize.normal) + 2;
                }
            });
        }
        
        // PIE DE PÁGINA - en negro
        const totalPaginas = doc.internal.getNumberOfPages();
        const fechaGeneracion = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        for (let i = 1; i <= totalPaginas; i++) {
            doc.setPage(i);
            doc.setFontSize(fontSize.pequeño);
            doc.setTextColor(colores.texto[0], colores.texto[1], colores.texto[2]);
            doc.setFont('times', 'italic');
            
            // Línea superior del pie
            doc.setDrawColor(colores.linea[0], colores.linea[1], colores.linea[2]);
            doc.line(margen, 280, 210 - margen, 280);
            
            // Información del pie
            doc.text(`${datos.nombre} - Curriculum Vitae`, margen, 285);
            doc.text(`Page ${i} of ${totalPaginas}`, 210 - margen, 285, { align: 'right' });
            doc.text(`Generated: ${fechaGeneracion}`, margen, 290);
        }
        
        // Descargar el PDF
        console.log('Preparando descarga del PDF...');
        const nombreArchivo = `CV_${obtenerNombreArchivo()}.pdf`;
        console.log('Nombre del archivo:', nombreArchivo);
        
        try {
            doc.save(nombreArchivo);
            console.log('PDF descargado exitosamente');
            mostrarAlerta('¡CV generado y descargado exitosamente! 📄', 'success');
        } catch (saveError) {
            console.error('Error al guardar PDF:', saveError);
            throw new Error('Error al descargar el PDF: ' + saveError.message);
        }
        
    } catch (error) {
        console.error('Error en generación PDF:', error);
        throw new Error('Error al crear el CV: ' + error.message);
    }
}

// ===== FUNCIONES WORD =====

// Generar documento Word
function generarWord() {
    const datos = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        ubicacion: document.getElementById('ubicacion').value.trim(),
        linkedin: document.getElementById('linkedin').value.trim(),
        portfolio: document.getElementById('portfolio').value.trim(),
        educacion: document.getElementById('educacion').value.trim(),
        experiencia: document.getElementById('experiencia').value.trim(),
        habilidades: document.getElementById('habilidades').value.trim()
    };

    if (!datos.nombre || !datos.email) {
        mostrarAlerta('Por favor, completa al menos el nombre y el correo electrónico.', 'warning');
        return;
    }

    try {
        const cvHTML = generarCVHTML(datos);
        
        // Crear blob con el HTML
        const blob = new Blob([`
            <html>
            <head>
                <meta charset="utf-8">
                <title>CV - ${datos.nombre}</title>
                <style>
                    body { font-family: 'Times New Roman', serif; margin: 0.3in; color: #000; font-size: 11pt; }
                    h1, h2 { color: #000; }
                </style>
            </head>
            <body>
                ${cvHTML}
            </body>
            </html>
        `], {
            type: 'application/msword'
        });
        
        // Crear enlace de descarga
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `CV_${obtenerNombreArchivo()}.doc`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
        
        mostrarAlerta('¡CV en Word generado exitosamente! 📄', 'success');
        
    } catch (error) {
        console.error('Error al generar Word:', error);
        mostrarAlerta('Error al generar el documento Word.', 'danger');
    }
}

// ===== FUNCIONES AUXILIARES =====

// Obtener nombre para archivo
function obtenerNombreArchivo() {
    const nombre = document.getElementById('nombre').value.trim();
    return nombre ? nombre.replace(/[^a-zA-Z0-9]/g, '_') : 'CV';
}

// Escapar HTML
function escaparHTML(texto) {
    if (!texto) return '';
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// Mostrar resultado en la página
function mostrarResultado(html, datos) {
    const contenedor = document.getElementById('resultado');
    if (contenedor) {
        contenedor.style.display = 'block'; // Hacer visible el contenedor
        contenedor.innerHTML = `
            <div class="mt-4">
                <h3 class="mb-3">Vista Previa del CV:</h3>
                <div class="cv-preview border p-3 mb-3" style="background: white;">
                    ${html}
                </div>
                <div class="d-flex gap-2 justify-content-center flex-wrap">
                    <button onclick="generarWord()" class="btn btn-success">
                        <i class="fas fa-file-word"></i> Descargar Word
                    </button>
                </div>
            </div>
        `;
        contenedor.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mostrar alertas
function mostrarAlerta(mensaje, tipo) {
    const alertaHtml = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
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

// ===== INICIALIZACIÓN =====

// Función para llenar con datos de ejemplo completos
function llenarEjemploCompleto() {
    // Ejemplo en español
    document.getElementById('nombre').value = 'María Elena García Rodríguez';
    document.getElementById('email').value = 'maria.garcia@email.com';
    document.getElementById('telefono').value = '+34 123 456 789';
    document.getElementById('ubicacion').value = 'Madrid, España';
    document.getElementById('linkedin').value = 'linkedin.com/in/mariagarcia';
    document.getElementById('portfolio').value = 'mariagarcia-portfolio.com';
    
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
    
    // Generar CV inmediatamente para mostrar el ejemplo
    generarCV();
}

// Función para limpiar el formulario
function limpiarFormulario() {
    const campos = ['nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'portfolio', 'educacion', 'experiencia', 'habilidades'];
    campos.forEach(campo => {
        document.getElementById(campo).value = '';
    });
    
    // Ocultar resultado si está visible
    const resultado = document.getElementById('resultado');
    if (resultado) {
        resultado.style.display = 'none';
    }
    
    mostrarAlerta('Formulario limpiado correctamente', 'info');
}

// Función para configurar la auto-generación en tiempo real
function setupAutoGeneration() {
    // Lista de todos los IDs CORRECTOS de campos del formulario
    const camposFormulario = [
        'nombre', 'email', 'telefono', 'ubicacion', 'linkedin', 'portfolio',
        'educacion', 'experiencia', 'habilidades'
    ];
    
    // Agregar event listeners a todos los campos
    camposFormulario.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (elemento) {
            // Solo generar cuando el usuario termine de escribir y salga del campo
            elemento.addEventListener('blur', function() {
                generarCV();
            });
            
            // También generar al presionar Enter en campos de texto
            elemento.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && elemento.tagName !== 'TEXTAREA') {
                    generarCV();
                }
            });
        } else {
            console.warn('Campo no encontrado:', campo);
        }
    });
    
    console.log('Auto-generación configurada para', camposFormulario.length, 'campos');
}

// Inicializar componentes cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Generador de CV cargado correctamente');
    
    // Agregar event listeners para auto-generación
    setupAutoGeneration();
    
    // Verificar si el botón PDF debe estar disponible
    const pdfBtn = document.getElementById('pdfBtn');
    if (pdfBtn) {
        // Verificar periódicamente si jsPDF está disponible
        const checkLibrary = setInterval(() => {
            if (typeof window.jspdf !== 'undefined') {
                pdfBtn.disabled = false;
                pdfBtn.title = 'Generar PDF directamente';
                console.log('jsPDF disponible - botón habilitado');
                clearInterval(checkLibrary);
            } else {
                pdfBtn.disabled = true;
                pdfBtn.title = 'Cargando librería PDF...';
            }
        }, 1000);
        
        // Timeout después de 10 segundos
        setTimeout(() => {
            clearInterval(checkLibrary);
            if (typeof window.jspdf === 'undefined') {
                pdfBtn.disabled = true;
                pdfBtn.title = 'Error: No se pudo cargar la librería PDF';
                mostrarAlerta('No se pudo cargar la librería PDF. Verifica tu conexión a internet.', 'warning');
            }
        }, 10000);
    }
});
