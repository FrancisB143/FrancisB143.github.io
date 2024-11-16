function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

var icon = document.getElementById("icon");

icon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        icon.src = "images/light_mode.png";
    } else{
        icon.src = "images/dark_mode.png";
    }
}

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let slideIndex = 0;
slides[slideIndex].classList.add('active');
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

function prevSlide(){
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex === 0) ? slides.length - 1 : slideIndex - 1;
    slides[slideIndex].classList.add('active');
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
}

function nextSlide(){
    slides[slideIndex].classList.remove('active');
    slideIndex = (slideIndex === slides.length - 1) ? 0 : slideIndex + 1;
    slides[slideIndex].classList.add('active');
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
}