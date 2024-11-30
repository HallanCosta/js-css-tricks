class CarouselUX {
  track = null;
  items = null;
  prevBtn = null;
  nextBtn = null;
  bullets = null;
  currentIndex = null;
  itemsPerSlide = null;
  itemWidth = null;
  swiper = false;
  
  bulletItems = [];
  startX = null; 
  isDragging = false;

  responsive = null

  constructor(props) {
    this.track = props.track;
    this.items = props.items;
    this.prevBtn = props.prevBtn;
    this.nextBtn = props.nextBtn;
    this.bullets = props.bullets;
    this.currentIndex = props.currentIndex;
    this.itemsPerSlide = props.itemsPerSlide;
    this.itemWidth = this.items[0].offsetWidth + 20;
    this.swiper = props.swiper;
    this.responsive = props.responsive;
  }

  run() {
    console.log('> CarouselUX');
    if (!!this.responsive) {
      this.setupResponsiveness();
    }
    this.executeCarousel();

    if (this.swiper) {
      this.executeSwiper();
    }
  }

  executeCarousel() {
    this.updateCarousel();
    this.nextButton();
    this.prevButton();
    this.createBullets();
  }

  executeSwiper() {
    this.mouseDown();
    this.mouseMove();
    this.mouseUp();
    this.mouseLeave();
    this.touchStart();
    this.touchMove();
    this.touchEnd();
  }

  setupResponsiveness() {
    const updateItemsPerSlide = () => {
      const breakpoints = Object.keys(this.responsive).sort((a, b) => b - a); // Ordenar de maior para menor
      for (let breakpoint of breakpoints) {
        if (window.innerWidth >= breakpoint) {
          this.itemsPerSlide = this.responsive[breakpoint].itemsPerSlide || this.itemsPerSlide;
          break;
        }
      }
      this.updateCarousel(); // Atualizar o carrossel com o novo valor
    };
  
    // Configura a responsividade inicial
    updateItemsPerSlide();
  
    // Adiciona evento para atualizar no resize
    window.addEventListener('resize', updateItemsPerSlide);
  }

  updateCarousel() {
    // Movimenta o track baseado no índice
    this.track.style.transform = `translateX(calc(-${this.currentIndex * this.itemWidth}px))`;

    // Gerenciar a classe "partial-visible" para o UX
    this.items.forEach((item, index) => {
      item.classList.toggle('partial-visible', index === this.currentIndex + this.itemsPerSlide);
    });
  }

  nextButton() {
    this.nextBtn.addEventListener('click', () => {
      if (this.currentIndex < this.items.length - this.itemsPerSlide) {
        this.currentIndex += this.itemsPerSlide;
        this.updateCarousel();

        // Add color on bullet
        this.setCurrentBullet(this.currentIndex + this.itemsPerSlide);
      }
    });
  }

  prevButton() {
    this.prevBtn.addEventListener('click', () => {
      if (this.currentIndex > 0) {
        // Add color on bullet
        this.setCurrentBullet(this.currentIndex);

        this.currentIndex -= this.itemsPerSlide;
        this.updateCarousel();
      }
    });
  }

  createBullets() {
    for (let i = 1; i <= this.items.length; i++) {
      const bullet = document.createElement('div');

      // Init bullet with color
      if (i <= this.itemsPerSlide) {
        bullet.classList.add('current');
      }

      bullet.classList.add('bullet');

      this.bulletItems.push(bullet);
      this.bullets.appendChild(bullet);
    }
  }

  setCurrentBullet(currentBulletIndex) {
    this.bulletItems.forEach((bulletItem, index) => {
      const indexBullet = index + 1;

      // Remove de todos
      bulletItem.classList.remove('current');

      const isOneBullet = indexBullet === currentBulletIndex;
      const isRangeBullet = indexBullet > currentBulletIndex - this.itemsPerSlide && indexBullet < currentBulletIndex

      if (isOneBullet || isRangeBullet) {
        bulletItem.classList.add('current');
      }
    });
  }

  // Drag with mouse or touch
  mouseDown() {
    this.track.addEventListener('mousedown', (e) => {
      this.startX = e.pageX;
      this.isDragging = true;
    });
  }

  // Drag with mouse or touch
  mouseDown() {
    this.track.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.startX = e.pageX;
      this.isDragging = true;

      this.track.style.transition = 'none';
    });
  }

  mouseMove() {
    this.track.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;

      const moveX = e.pageX - this.startX;

      this.track.style.transform = `translateX(calc(-${this.currentIndex * this.itemWidth}px + ${moveX}px))`;
    });
  }

  mouseUp() {
    this.track.addEventListener('mouseup', (e) => {
      if (!this.isDragging) return;

      const moveX = e.pageX - this.startX;

      // Move next
      if (moveX > 50 && this.currentIndex > 0) {
        this.currentIndex -= this.itemsPerSlide;
      } else if (moveX < -50 && this.currentIndex < this.items.length - this.itemsPerSlide) {
        this.currentIndex += this.itemsPerSlide;
      }

      this.setCurrentBullet(this.currentIndex + this.itemsPerSlide);
      this.updateCarousel();

      this.track.style.transition = 'transform 0.3s ease';
      this.isDragging = false;
    });
  }

  mouseLeave() {
    this.track.addEventListener('mouseleave', () => {
      if (this.isDragging) {
        this.updateCarousel();
        this.track.style.transition = 'transform 0.3s ease';
        this.isDragging = false;
      }
    });
  }

  // Support for touch devices
  touchStart() {
    this.track.addEventListener('touchstart', (e) => {
      this.startX = e.touches[0].pageX;
      this.isDragging = true;
    });
  }

  touchMove() {
    this.track.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;
      const moveX = e.touches[0].pageX - this.startX;
      this.track.style.transform = `translateX(calc(-${this.currentIndex * this.itemWidth}px + ${moveX}px))`;
    });
  }

  touchEnd() {
    this.track.addEventListener('touchend', (e) => {
      const moveX = e.changedTouches[0].pageX - this.startX;
      if (moveX > 50 && this.currentIndex > 0) this.currentIndex -= this.itemsPerSlide;
      if (moveX < -50 && this.currentIndex < this.items.length - this.itemsPerSlide) this.currentIndex += this.itemsPerSlide;

      this.setCurrentBullet(this.currentIndex + this.itemsPerSlide);
      this.updateCarousel();
      this.isDragging = false;
    });
  }
}
const items = document.querySelectorAll('.carouselux-item');

const carouselUX = new CarouselUX({
  track: document.querySelector('.carouselux-track'),
  items: document.querySelectorAll('.carouselux-item'),
  prevBtn: document.querySelector('.prev-btn'),
  nextBtn: document.querySelector('.next-btn'),
  bullets: document.querySelector('.bullets'),
  currentIndex: 0,
  itemsPerSlide: 2,
  swiper: true
});
carouselUX.run();
