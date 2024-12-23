let cart = [];

// Função para carregar o carrinho do localStorage
function loadCart() {
    const cartData = localStorage.getItem('cart');
    console.log('Dados do carrinho no localStorage:', cartData);
    if (cartData) {
        try {
            cart = JSON.parse(cartData);
            if (!Array.isArray(cart)) {
                cart = []; // Se não for array, reseta o carrinho
                console.error('Carrinho do localStorage não é um array:', cartData);
            }
        } catch (error) {
            console.error('Erro ao analisar carrinho do localStorage:', error);
            cart = [];  // Se der erro, reseta o carrinho
        }
    }
    console.log('Conteúdo do carrinho:', cart);
}
// Função para salvar o carrinho no localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
// Função para remover um item do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}
// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');

    cartItemsContainer.innerHTML = '';
    let total = 0;
    console.log('Itens no carrinho:', cart);

    if(cart && cart.length > 0) {
         cart.forEach((product, index) => {
          const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name} - R$${product.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remover</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += product.price;
        });
    }

    totalElement.textContent = `Total: R$${total.toFixed(2)}`;
}

// Carregar o carrinho ao carregar a página e atualizar a exibição
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartDisplay();
});

