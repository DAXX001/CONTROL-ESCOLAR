const slides = document.querySelectorAll('.slide');
let index = 0;

function updateCarousel() {
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'left', 'right', 'hidden');

        if (i === index) {
            slide.classList.add('active');
        } 
        else if (i === (index - 1 + slides.length) % slides.length) {
            slide.classList.add('left');
        } 
        else if (i === (index + 1) % slides.length) {
            slide.classList.add('right');
        } 
        else {
            slide.classList.add('hidden');
        }
    });
}

document.querySelector('.next').onclick = () => {
    index = (index + 1) % slides.length;
    updateCarousel();
};

document.querySelector('.prev').onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
};

updateCarousel();