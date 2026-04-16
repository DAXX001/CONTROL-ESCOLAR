/* =========================
   USUARIO
========================= */

window.onload = function () {

    const nombre = sessionStorage.getItem('usuarioNombre');

    if (nombre) {

        document.getElementById('user-display').innerHTML =
            `HOLA, ${nombre} <i class="fas fa-user-circle"></i>`;

        document.getElementById('perfil-nombre').innerText = nombre;

        let contador = localStorage.getItem(nombre + "_logins") || 0;

        contador++;

        localStorage.setItem(nombre + "_logins", contador);

    } else {
        window.location.href = 'login.html';
    }

};


/* =========================
   MENSAJES PRO
========================= */

function mostrarMensaje(texto) {

    const caja = document.getElementById("mensajeSistema");

    if (!caja) return;

    caja.innerText = texto;
    caja.style.display = "block";

    setTimeout(() => {
        caja.style.display = "none";
    }, 4000);
}


/* =========================
   HISTORIAL DE INICIOS
========================= */

function mostrarInicios() {

    const nombre = sessionStorage.getItem('usuarioNombre');

    let contador = localStorage.getItem(nombre + "_logins") || 0;

    mostrarMensaje(`Has iniciado sesión ${contador} veces en el sistema CEI`);
}


/* =========================
   CONTADOR INTERACTIVO
========================= */

let numero = 0;

function sumarNumero() {
    numero++;
    document.getElementById("contadorNumero").innerText = numero;
    mostrarMensaje(`Contador: ${numero}`);
}

function restarNumero() {
    numero--;
    document.getElementById("contadorNumero").innerText = numero;
    mostrarMensaje(`Contador: ${numero}`);
}


/* =========================
   MODO CLARO / OSCURO
========================= */

function cambiarModo() {

    document.body.classList.toggle("modo-claro");

    let modo = document.body.classList.contains("modo-claro");

    localStorage.setItem("modoTema", modo);
}

window.addEventListener("load", () => {

    let modoGuardado = localStorage.getItem("modoTema");

    if (modoGuardado === "true") {
        document.body.classList.add("modo-claro");
    }

});


/* =========================
   INFO USUARIO (MEJORADO)
========================= */

function mostrarInfoUsuario() {

    const nombre = sessionStorage.getItem("usuarioNombre") || "Estudiante";

    const ahora = new Date();

    const fecha = ahora.toLocaleDateString();
    const hora = ahora.toLocaleTimeString();

    alert(`👤 ${nombre}

🎓 Sistema CEI - ISEU

📅 Fecha: ${fecha}
⏰ Hora: ${hora}

📘 Centro Escolar Inteligente (CEI):
Consulta tus materias, horarios y avance académico en un solo lugar.

💡 Recomendación:
Revisa tu horario diariamente y mantén un control de tus actividades para mejorar tu rendimiento.

🚀 ¡Sigue avanzando en tu formación profesional!`);

}


/* =========================
   CERRAR SESIÓN
========================= */

function cerrarSesion() {

    sessionStorage.removeItem('usuarioNombre');

    mostrarMensaje("Sesión cerrada correctamente");

    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}


/* =========================
   CARRUSEL (MEJORADO)
========================= */

function scrollHorario(id, direction) {

    const container = document.getElementById(id);

    if (!container) return;

    const scrollAmount = 260;

    container.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth"
    });
}


/* =========================
   DETECTAR MATERIA ACTUAL 🔥
========================= */

function resaltarMateriaActual() {

    const ahora = new Date();
    const hora = ahora.getHours();

    const tarjetas = document.querySelectorAll(".card-horario");

    tarjetas.forEach(card => {

        const texto = card.innerText;

        if (texto.includes("08:00") && hora >= 8 && hora < 10) {
            card.style.boxShadow = "0 0 25px #22c55e";
        }

        if (texto.includes("10:00") && hora >= 10 && hora < 12) {
            card.style.boxShadow = "0 0 25px #3b82f6";
        }

        if (texto.includes("12:00") && hora >= 12 && hora < 14) {
            card.style.boxShadow = "0 0 25px #f59e0b";
        }

    });
}

/* Ejecutar automáticamente */
setInterval(resaltarMateriaActual, 60000);


