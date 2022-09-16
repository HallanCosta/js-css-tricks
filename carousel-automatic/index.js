let time = 2; // tempo em segundos
let currentImageIndex = 0;
let images = document.querySelectorAll('#slider .images img');
let buttons = document.querySelectorAll('#slider .navigation label');
let max = images.length;

function nextImage() {
  images[currentImageIndex].classList.remove('selected');
  buttons[currentImageIndex].classList.remove('selected');
  
  currentImageIndex++;

  if (currentImageIndex >= max) currentImageIndex = 0;

  images[currentImageIndex].classList.add('selected');
  buttons[currentImageIndex].classList.add('selected');
}

function carousel() {
  setInterval(function() {
    nextImage();
  }, time * 1000);
}

window.addEventListener('load', carousel);

