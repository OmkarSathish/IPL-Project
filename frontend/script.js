let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.opacity = "1";
        } else {
            slide.style.opacity = "0";
        }
    });
}

function showPrevious() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function showNext() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Initial setup
showSlide(currentSlide);
