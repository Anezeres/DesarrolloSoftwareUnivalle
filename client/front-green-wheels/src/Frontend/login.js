// Copia el código del script del HTML
const images = document.querySelectorAll(".image");
const bullets = document.querySelectorAll(".bullets span");
const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");

let currentIndex = 0;
let interval;

function showImage(index) {
   images.forEach((image, i) => {
       image.classList.remove("show");
       bullets[i].classList.remove("active");
   });

   images[index].classList.add("show");
   bullets[index].classList.add("active");
}

function nextImage() {
   currentIndex = (currentIndex + 1) % images.length;
   showImage(currentIndex);

   const textSlider = document.querySelector(".text-group");
   textSlider.style.transform = `translateY(${-(currentIndex) * 2.2}rem)`;
}

function startSlider() {
   interval = setInterval(nextImage, 3000);
}

function resetSliderInterval() {
   clearInterval(interval);
   startSlider();
}

bullets.forEach((bullet, index) => {
   bullet.addEventListener("click", () => {
       currentIndex = index;
       showImage(currentIndex);

       const textSlider = document.querySelector(".text-group");
       textSlider.style.transform = `translateY(${-(currentIndex) * 2.2}rem)`;

       resetSliderInterval();
   });
});

startSlider();

inputs.forEach((inp) => {
   inp.addEventListener("focus", () => {
       inp.classList.add("active");
   });
   inp.addEventListener("blur", () => {
       if (inp.value != "") return;
       inp.classList.remove("active");
   });
});

toggle_btn.forEach((btn) => {
   btn.addEventListener("click", () => {
       main.classList.toggle("sign-up-mode");
   });
});

function moveSlider() {
   let index = this.dataset.value;

   let currentImage = document.querySelector(`.img-${index}`);
   images.forEach((img) => img.classList.remove("show"));
   currentImage.classList.add("show");

   const textSlider = document.querySelector(".text-group");
   textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

   bullets.forEach((bull) => bull.classList.remove("active"));
   this.classList.add("active");

   resetSliderInterval();
}

bullets.forEach((bullet) => {
   bullet.addEventListener("click", moveSlider);
});