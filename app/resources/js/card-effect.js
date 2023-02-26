var splide = new Splide( '.splide', {
    type : 'loop',
});
splide.mount();

// Swiper
var swiper = new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
  });
