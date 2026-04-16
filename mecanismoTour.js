        // --- LÓGICA DEL TOUR ACTUALIZADA CON BRILLO Y MENÚ AUTOMÁTICO ---
let paso = 0;

const contenidoTour = [
    { 
        id: "menuBtn", 
        t: "Menú principal", 
        d: "Aquí puedes abrir el panel lateral.", 
        pos: { top: "90px", left: "80px" }
    },
    { 
        id: "sidebar", 
        t: "Panel de navegación", 
        d: "Aquí tienes todas tus opciones.", 
        pos: { top: "150px", left: "300px" },
        accion: "abrir"
    },
    { 
        id: "categories-grid", 
        t: "Secciones", 
        d: "Aquí accedes a novedades, faltas y Moodle.", 
        pos: { top: "60%", left: "50%", center: true },
        accion: "cerrar"
    },
    { 
        id: null, 
        t: "¡Listo!", 
        d: "Ya puedes usar el sistema 🔥", 
        pos: { top: "50%", left: "50%", center: true }
    }
];

window.onload = function() {

    // 🔥 aplicar tema guardado (VERSIÓN PRO SIN CSS)
    const temaGuardado = localStorage.getItem('theme');

    if (temaGuardado === 'light') {

        document.body.style.background = "#f5f7fa";
        document.body.style.color = "#111";

        document.querySelectorAll('.recuadro').forEach(el => {
            el.style.background = "rgba(0,0,0,0.05)";
            el.style.border = "1px solid rgba(0,0,0,0.1)";
        });

        document.querySelectorAll('.search-input').forEach(el => {
            el.style.background = "#fff";
            el.style.color = "#000";
        });

    } else {

        document.body.style.background = "#02050a";
        document.body.style.color = "#fff";

        document.querySelectorAll('.recuadro').forEach(el => {
            el.style.background = "rgba(255,255,255,0.02)";
            el.style.border = "1px solid rgba(173,216,230,0.1)";
        });

        document.querySelectorAll('.search-input').forEach(el => {
            el.style.background = "rgba(255,255,255,0.05)";
            el.style.color = "#fff";
        });
    }

    // 🔥 lógica de usuario
    const nombre = sessionStorage.getItem('usuarioNombre');

    if (nombre) {
        document.getElementById('user-display').innerHTML =
            `HOLA, ${nombre} <i class="fas fa-user-circle"></i>`;

        if (!localStorage.getItem('tour_visto_' + nombre)) {
            setTimeout(iniciarTour, 600);
        }
    } else {
        window.location.href = 'login.html';
    }
};

function iniciarTour() {
    paso = 0;
    document.getElementById('tourOverlay').style.display = 'block';
    document.getElementById('tourCard').style.display = 'block';
    actualizarTour();
}

function siguientePaso() {
    paso++;
    if (paso < contenidoTour.length) {
        actualizarTour();
    } else {
        finalizarTour();
    }
}

function actualizarTour() {

    // limpiar highlights
    document.querySelectorAll('.tour-highlight')
        .forEach(el => {
            el.classList.remove('tour-highlight');
            el.style.zIndex = "";
            el.style.position = "";
        });

    const info = contenidoTour[paso];

    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menuBtn');
    const mainContent = document.getElementById('mainContent');

    // control menú
    if (info.accion === "abrir") {
        sidebar.classList.add('active');
        menuBtn.classList.add('active');
        mainContent.classList.add('active');
    }

    if (info.accion === "cerrar") {
        sidebar.classList.remove('active');
        menuBtn.classList.remove('active');
        mainContent.classList.remove('active');
    }

    // highlight REAL
    if (info.id) {
        const el = document.getElementById(info.id);

        if (el) {

            el.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            setTimeout(() => {
                el.style.position = "relative";
                el.style.zIndex = "2005";
                el.classList.add('tour-highlight');
            }, 300);
        }
    }

    // actualizar tarjeta
    document.getElementById('tourStepNum').innerText = paso + 1;
    document.getElementById('tourTitle').innerText = info.t;
    document.getElementById('tourText').innerText = info.d;

    const card = document.getElementById('tourCard');
    card.style.top = info.pos.top;
    card.style.left = info.pos.left;
    card.style.transform = info.pos.center ? "translate(-50%, -50%)" : "none";
}

function finalizarTour() {
    const nombre = sessionStorage.getItem('usuarioNombre');

    document.querySelectorAll('.tour-highlight')
        .forEach(el => {
            el.classList.remove('tour-highlight');
            el.style.zIndex = "";
            el.style.position = "";
        });

    document.getElementById('tourOverlay').style.display = 'none';
    document.getElementById('tourCard').style.display = 'none';

    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('menuBtn').classList.remove('active');
    document.getElementById('mainContent').classList.remove('active');

    localStorage.setItem('tour_visto_' + nombre, 'true');
}
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menuBtn');
    const main = document.getElementById('mainContent');

    sidebar.classList.toggle('active');
    menuBtn.classList.toggle('active');
    main.classList.toggle('active');
}

// ===== 🔥 HOVER AUTOMÁTICO (PRO) =====
let menuAbierto = false;
let timeoutCerrar;

const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');

// 👉 abrir con hover
menuBtn.addEventListener('mouseenter', () => {

    // 🚫 no interferir con el tour
    const overlay = document.getElementById('tourOverlay');
    if (overlay && overlay.style.display === 'block') return;

    clearTimeout(timeoutCerrar);

    if (!menuAbierto) {
        toggleMenu();
        menuAbierto = true;
    }
});

// 👉 mantener abierto si entras al sidebar
sidebar.addEventListener('mouseenter', () => {
    clearTimeout(timeoutCerrar);
});

// 👉 cerrar con delay elegante
menuBtn.addEventListener('mouseleave', cerrarMenuHover);
sidebar.addEventListener('mouseleave', cerrarMenuHover);

function cerrarMenuHover() {

    const overlay = document.getElementById('tourOverlay');
    if (overlay && overlay.style.display === 'block') return;

    timeoutCerrar = setTimeout(() => {
        if (menuAbierto) {
            toggleMenu();
            menuAbierto = false;
        }
    }, 300); // 🔥 ajusta: 200 = rápido | 400 = suave
}

function cerrarSesion() {
    sessionStorage.removeItem('usuarioNombre');
    window.location.href = 'login.html';
}

        function guardarPostulacion(trabajo) {
            let misPostulaciones = JSON.parse(localStorage.getItem('postulaciones')) || [];
            const duplicado = misPostulaciones.find(p => p.titulo === trabajo.titulo && p.empresa === trabajo.empresa);
            if (duplicado) { alert("Ya te has postulado a esta vacante anteriormente."); } 
            else {
                trabajo.fechaPostulacion = new Date().toLocaleDateString();
                misPostulaciones.push(trabajo);
                localStorage.setItem('postulaciones', JSON.stringify(misPostulaciones));
                alert("¡Postulación enviada con éxito!");
            }
        }
function mostrarNovedades() {
    const container = document.getElementById('resultados-busqueda');

    const novedades = [
        {
            titulo: "Proceso de reinscripción",
            descripcion: "Ya puedes reinscribirte desde el sistema CEI.",
            fecha: "Abril 2026",
            icono: "fa-newspaper",
            link: "https://cei.iseu.mx/reinscripcion.php"
        },
        {
            titulo: "Actualización del sistema",
            descripcion: "Se mejoró el rendimiento y diseño de la plataforma.",
            fecha: "Febrero 2026",
            icono: "fa-wrench"
        },
        {
            titulo: "Conoce nuestro Instagram",
            descripcion: "",
            fecha: "Disponible ahora",
            icono: "fa-instagram",
            link: "https://www.instagram.com/iseu.mx/"
        },
        {
            titulo: "Conoce nuestro Facebook",
            descripcion: "Entérate de todo y mantente conectado",
            fecha: "Disponible ahora",
            icono: "fa-facebook",
            link: "https://www.facebook.com/ISEUOficial/"
        },
        {
            titulo: "Conoce nuestro YouTube",
            descripcion: "Tutoriales, noticias y más",
            fecha: "Disponible ahora",
            icono: "fa-youtube",
            link: "https://www.youtube.com/channel/UCq5165sm12-pZ0Uc9BnYk4w/about"
        },
        {
            titulo: "Conoce nuestro TikTok",
            descripcion: "Contenido rápido y útil",
            fecha: "Disponible ahora",
            icono: "fa-tiktok",
            link: "https://www.tiktok.com/@iseumx"
        },
        {
    titulo: "App Android Beta",
    descripcion: "¡Descarga la app beta ya disponible!",
    fecha: "Nuevo",
    icono: "fa-android",
    link: "beta.html"
}
    ];

    // 🔥 animación de salida
    container.style.opacity = "0";

    setTimeout(() => {
        container.innerHTML = "";

        novedades.forEach((n, index) => {
            const card = document.createElement('div');
            card.className = 'recuadro';

            // 🔥 estado inicial (animación)
            card.style.opacity = "0";
            card.style.transform = "translateY(40px) scale(0.95)";

            // 🔥 click seguro
            card.onclick = () => {
                if (n.link) {
                    window.open(n.link, "_blank");
                }
            };

            card.style.cursor = n.link ? "pointer" : "default";

            // 🔥 detectar tipo icono
            const redes = ["fa-instagram", "fa-facebook", "fa-youtube", "fa-tiktok", "fa-android"];
            const tipoIcono = redes.includes(n.icono) ? "fab" : "fa-solid";

            // 🔥 contenido
            card.innerHTML = `
                <i class="${tipoIcono} ${n.icono}" style="font-size: 28px; margin-bottom:10px;"></i>
                <h3 style="color: #add8e6;">${n.titulo}</h3>
                <p>${n.descripcion}</p>
                <p style="font-size: 12px; opacity: 0.7;">${n.fecha}</p>
            `;

            container.appendChild(card);

            // 🔥 animación escalonada (LA CLAVE)
            setTimeout(() => {
                card.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
                card.style.opacity = "1";
                card.style.transform = "translateY(0) scale(1)";
            }, index * 150);
        });

        // 🔥 entrada del contenedor
        container.style.transition = "opacity 0.4s ease";
        container.style.opacity = "1";

    }, 200);
}


// 🔥 abrir Moodle con animación ligera
function abrirMoodle() {
    document.body.style.opacity = "0.7";

    setTimeout(() => {
        window.open("https://online.isima.com.mx/login/index", "_blank");
        document.body.style.opacity = "1";
    }, 200);
}

function mostrarFaltas() {

    const contenedor = document.getElementById('contenidoFaltas');

    // 🔥 Simulación de datos del alumno (aquí luego cargas de tu BD)
    const faltas = [
        { materia: "SC525 Métodos Numéricos", faltas: 1, retardos: 0 },
        { materia: "SC526 Maquetación Web", faltas: 2, retardos: 1 },
        { materia: "SC527 Tópicos Selectos", faltas: 1, retardos: 2 },
        { materia: "SC528 Bases de Datos", faltas: 0, retardos: 0 }
    ];

    const totalFaltas = faltas.reduce((total, f) => total + f.faltas, 0);

    // 🔥 Si no tiene faltas
    if (totalFaltas === 0) {
        contenedor.innerHTML = `
            <div class="sin-faltas">
                ✅ No tienes faltas registradas
            </div>
        `;

        document.getElementById('modalFaltas').style.display = 'flex';
        return;
    }

    let html = `
        <div class="faltas-resumen">
             Tienes <strong>${totalFaltas} faltas</strong>
        </div>
    `;

    faltas.forEach(f => {

        if(f.faltas === 0 && f.retardos === 0) return;

        let clase = "verde";
        let colorBarra = "#4caf50";
        let mensajeExtra = "";

        if (f.faltas == 2) {
            clase = "amarillo";
            colorBarra = "#ffc107";
        } 
        else if (f.faltas == 3) {
            clase = "rojo";
            colorBarra = "#ff4d4d";
        } 
        else if (f.faltas >= 4) {
            clase = "extra";
            colorBarra = "#ff0000";
            mensajeExtra = `
                <div style="color:#ff4d4d; font-size:12px; margin-top:5px;">
                    ⚠️ Ya estás en extra. Justifica tus faltas.
                </div>
            `;
        }

        html += `
            <div class="faltas-card ${clase}">
                <div class="materia">${f.materia}</div>

                <div class="datos">
                    <span>📌 Faltas: <strong>${f.faltas}</strong></span>
                    <span>⏱ Retardos: <strong>${f.retardos}</strong></span>
                </div>

                <div class="barra">
                    <div class="progreso" 
                        style="width:${f.faltas * 25}%; background:${colorBarra};">
                    </div>
                </div>

                ${mensajeExtra}
            </div>
        `;
    });

    contenedor.innerHTML = html;

    document.getElementById('modalFaltas').style.display = 'flex';
}

function verDetalleFaltas() {

    const faltas = [
        { materia: "SC525 Métodos Numéricos", faltas: 1, retardos: 0 },
        { materia: "SC526 Maquetación Web", faltas: 2, retardos: 1 },
        { materia: "SC527 Tópicos Selectos", faltas: 1, retardos: 2 },
        { materia: "SC528 Bases de Datos", faltas: 1, retardos: 0 }
    ];

    const contenedor = document.getElementById('contenidoFaltas');

    let html = `<h3 style="margin-bottom:10px;">Detalle de faltas</h3>`;

    faltas.forEach(f => {
        html += `
            <div class="fila-falta">
                <strong>${f.materia}</strong><br>
                Faltas: ${f.faltas} | Retardos: ${f.retardos}
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

function cerrarModalFaltas() {
    document.getElementById('modalFaltas').style.display = 'none';
}
window.onclick = function(e) {
    const modal = document.getElementById('modalFaltas');
    if (e.target === modal) {
        modal.style.display = "none";
    }
}

function toggleTheme() {
    const body = document.body;

    if (body.classList.contains('dark-mode')) {

        // ☀️ MODO CLARO (forzado por JS)
        body.classList.remove('dark-mode');
        body.style.background = "#f5f7fa";
        body.style.color = "#111";

        document.querySelectorAll('.recuadro').forEach(el => {
            el.style.background = "rgba(0,0,0,0.05)";
            el.style.border = "1px solid rgba(0,0,0,0.1)";
        });

        document.querySelectorAll('.search-input').forEach(el => {
            el.style.background = "#fff";
            el.style.color = "#000";
        });

        localStorage.setItem('theme', 'light');

    } else {

        // 🌙 MODO OSCURO
        body.classList.add('dark-mode');
        body.style.background = "#02050a";
        body.style.color = "#fff";

        document.querySelectorAll('.recuadro').forEach(el => {
            el.style.background = "rgba(255,255,255,0.02)";
            el.style.border = "1px solid rgba(173,216,230,0.1)";
        });

        document.querySelectorAll('.search-input').forEach(el => {
            el.style.background = "rgba(255,255,255,0.05)";
            el.style.color = "#fff";
        });

        localStorage.setItem('theme', 'dark');
    }
}