// Função para buscar os dados do JSON
async function fetchProdutos() {
    try {
        const response = await fetch('produtos.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return null;
    }
}

// Função para criar a seção de marcas
async function createBrandsSection() {
    const produtos = await fetchProdutos();
    if (produtos) {
        const brandsContainer = document.querySelector('.brands-container');
        const brands = [...new Set(produtos.map(produto => produto.brand))];
        brands.forEach(brandName => {
            const brand = document.createElement('div');
            brand.classList.add('brand');

            // Encontra o primeiro produto da marca para pegar a imagem
            const firstProductOfBrand = produtos.find(produto => produto.brand === brandName);

            // Cria a imagem da marca
            const brandImage = document.createElement('img');
            brandImage.src = firstProductOfBrand ? firstProductOfBrand.image : 'placeholder-image.jpg';
            brandImage.alt = brandName;
            brand.appendChild(brandImage);

            const brandButton = document.createElement('button');
            brandButton.textContent = brandName;
            // Redireciona para página da marca
            let pageUrl;
            switch (brandName) {
                case 'LuxeScents':
                    pageUrl = 'LuxeScents.html';
                    break;
                case 'ElegancePerfumes':
                    pageUrl = 'elegancePerfumes.html';
                    break;
                case 'TrendFragrance':
                    pageUrl = 'trendFragrance.html';
                    break;
                default:
                    pageUrl = '#'; // Se não corresponder a nenhum, deixa em branco
            }
            brandButton.addEventListener('click', () => {
                window.location.href = pageUrl;
            });
            brand.appendChild(brandButton);
            brandsContainer.appendChild(brand);
        });
    }
}

// Função para criar o carrossel mobile usando Swiper
async function createMobileCarousel() {
    const produtos = await fetchProdutos();
    if (produtos) {
        const brands = [...new Set(produtos.map(produto => produto.brand))];
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        brands.forEach(brandName => {
          const swiperSlide = document.createElement('div');
           swiperSlide.classList.add('swiper-slide');
            // Encontra o primeiro produto da marca para pegar a imagem
            const firstProductOfBrand = produtos.find(produto => produto.brand === brandName);

            // Cria a imagem da marca
             const brandImage = document.createElement('img');
             brandImage.src = firstProductOfBrand ? firstProductOfBrand.image : 'placeholder-image.jpg';
             brandImage.alt = brandName;
             swiperSlide.appendChild(brandImage);
           swiperWrapper.appendChild(swiperSlide);
        });
    }
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: ".swiper-pagination",
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
        },
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    createBrandsSection();
    createMobileCarousel();
});