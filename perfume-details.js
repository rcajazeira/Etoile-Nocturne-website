
async function displayPerfumeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    const products = await fetchProdutos();
    if (!products) return;

    const product = products.find(p => p.id === productId);
    if (!product) {
        document.getElementById('perfume-details').innerHTML = '<p>Produto não encontrado!</p>';
        return;
    }

    document.getElementById('perfume-details').innerHTML = `
    <div class="perfume-details">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>R$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <button onclick="addToCart(product)">Adicionar ao Carrinho</button>
    </div>
`;

    /*

    document.getElementById('perfume-details').innerHTML = `
        <div class="perfume-details">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
             <p>R$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
             <button onclick="addToCart(${JSON.stringify(product)})">Adicionar ao Carrinho</button>
        </div>
    `;
    */
    
 
}
document.addEventListener('DOMContentLoaded', displayPerfumeDetails);



