const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let particlesArray;

// Mouse
let mouse = {
    x: null,
    y: null,
    radius: (window.innerHeight/80) * (window.innerWidth/80)
};

// Movimiento mouse (PC)
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Movimiento táctil (celular)
window.addEventListener('touchmove', (event) => {
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
});

// 🔥 FUNCIÓN RESPONSIVE
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // actualizar radio dinámicamente
    mouse.radius = (canvas.height/80) * (canvas.width/80);

    init(); // recalcular partículas
}

// Evento resize (zoom, rotación, cambio tamaño)
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#add8e6';
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

function init() {
    particlesArray = [];

    let numberOfParticles = (canvas.height * canvas.width) / 9000;

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;

        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);

        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;

        particlesArray.push(
            new Particle(x, y, directionX, directionY, size, '#add8e6')
        );
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    connect();
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {

            let distance =
                ((particlesArray[a].x - particlesArray[b].x) *
                (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) *
                (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width/7) * (canvas.height/7)) {
                ctx.strokeStyle = 'rgba(173, 216, 230, 0.1)';
                ctx.lineWidth = 1;

                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// 🔥 INICIO CORRECTO
resizeCanvas();
animate();