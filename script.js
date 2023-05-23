const carousel = document.querySelector(".carousel"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff;
let autoSlideInterval;

const showHideIcons = () => {
  // Mostrar u ocultar los íconos prev/next según el valor de desplazamiento del carrusel
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14;
    carousel.scrollLeft +=
      icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

const autoSlide = () => {
  let firstImgWidth = firstImg.clientWidth + 14;
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

  if (carousel.scrollLeft >= scrollWidth) {
    // Si el carrusel ha llegado al final, ajustar el valor para volver a mostrar la imagen inicial
    carousel.scrollLeft -= scrollWidth;
  } else {
    carousel.scrollLeft += firstImgWidth;
  }

  showHideIcons();
};

const startAutoSlide = () => {
  autoSlideInterval = setInterval(autoSlide, 2000); // Cambiar la imagen cada 3 segundos (ajusta el intervalo según tus necesidades)
};

const stopAutoSlide = () => {
  clearInterval(autoSlideInterval);
};

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
  stopAutoSlide(); // Detener el auto desplazamiento cuando se inicia el arrastre
};

const dragging = (e) => {
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  startAutoSlide(); // Iniciar el auto desplazamiento después de soltar el arrastre
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

startAutoSlide(); // Iniciar el auto desplazamiento al cargar la página
