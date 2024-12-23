// Carrossel global
document.addEventListener('DOMContentLoaded',  () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      createGlobalCarousel(carouselContainer);
    }
});


/*
// Carrossel global
document.addEventListener('DOMContentLoaded', async () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        await createGlobalCarousel(carouselContainer);
    }
});

*/

