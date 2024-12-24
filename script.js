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

// Função para adicionar produto ao carrinho
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado ao carrinho!');
}

// Função para criar o carrossel global
async function createGlobalCarousel(carouselContainer) {
    const produtos = await fetchProdutos();
    if (produtos) {
        produtos.forEach(produto => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');

            const img = document.createElement('img');
            img.src = produto.image;
            img.alt = produto.name;
             img.addEventListener('click', function() {
                showOverlay(produto.image);
             });
            const p = document.createElement('p');
            p.textContent = produto.name;

            carouselItem.appendChild(img);
            carouselItem.appendChild(p);
            carouselContainer.appendChild(carouselItem);
        });
    }
}
 // Função para criar a seção de marcas na página inicial
async function createBrandsSection() {
    const produtos = await fetchProdutos();
    if (produtos) {
        const brandsContainer = document.querySelector('.brands-container');
         if(brandsContainer){
           const brands = [...new Set(produtos.map(produto => produto.brand))];
           brands.forEach(brandName => {
                const brand = document.createElement('div');
                brand.classList.add('brand');

                 // Encontra o primeiro produto da marca para pegar a imagem
                const firstProductOfBrand = produtos.find(produto => produto.brand === brandName);

                 // Cria a imagem da marca
                const brandImage = document.createElement('img');
                brandImage.src = firstProductOfBrand ? firstProductOfBrand.image : 'placeholder-image.jpg'; // Se não tiver imagem coloca uma placeholder
                brandImage.alt = brandName;
                 brand.appendChild(brandImage);

                const brandButton = document.createElement('button');
                brandButton.textContent = brandName;
                 // Modificação aqui para redirecionar para a página correta
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
                }); // Redireciona para página da marca
                 brand.appendChild(brandButton);
                brandsContainer.appendChild(brand);
            });
          }
    }
}
    function showOverlay(imageSrc) {
     const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    const img = document.createElement('img');
    img.src = imageSrc;
      overlay.appendChild(img);
        document.body.appendChild(overlay);
     overlay.style.display = 'flex';

      overlay.addEventListener('click', function(){
          hideOverlay(overlay);
     })
    }
    function hideOverlay(overlay) {
        overlay.style.display = 'none';
        overlay.remove();
    }
// Executa a função ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        await createGlobalCarousel(carouselContainer);
    }
    createBrandsSection();
});





/*
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

// Função para adicionar produto ao carrinho
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado ao carrinho!');
}
    /*

/*
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

// Função para adicionar produto ao carrinho
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado ao carrinho!');
}

*/
