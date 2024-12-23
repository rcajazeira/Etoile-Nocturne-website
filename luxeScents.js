// Carrossel global
document.addEventListener('DOMContentLoaded', async () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        await createGlobalCarousel(carouselContainer);
    }
    displayPerfumes();
});
// Função para exibir os produtos na página
async function displayPerfumes() {
    const products = await fetchProdutos();
    if (!products) return;

    let brand = '';
    let perfumesContainerId = '';

    if(window.location.href.includes("LuxeScents")){
      brand = 'LuxeScents';
      perfumesContainerId = 'luxeScentsPerfumes'
    }
    if(window.location.href.includes("elegancePerfumes")){
      brand = 'ElegancePerfumes';
      perfumesContainerId = 'elegancePerfumesPerfumes';
    }
       if(window.location.href.includes("trendFragrance")){
      brand = 'TrendFragrance';
       perfumesContainerId = 'trendFragrancePerfumes';
    }

    const brandProducts = products.filter(product => product.brand === brand);
    const perfumesContainer = document.getElementById(perfumesContainerId);
    perfumesContainer.innerHTML = '';

    brandProducts.forEach(p => {
        const perfumeDiv = document.createElement('div');
        perfumeDiv.classList.add('perfume');
    
         perfumeDiv.innerHTML = `
            <div class="carousel">
                <img src="${p.image}" alt="${p.name}" class="carousel-item">
            </div>
            <h3>${p.name}</h3>
            <p>R$${p.price.toFixed(2)}</p>
             <p>${p.description}</p>
            <button class="add-to-cart-button">Adicionar ao Carrinho</button>
            
        `;
      const addToCartButton = perfumeDiv.querySelector('.add-to-cart-button');
      addToCartButton.addEventListener('click', () => {
            addToCart(p);
        });
        perfumesContainer.appendChild(perfumeDiv);
    });
}