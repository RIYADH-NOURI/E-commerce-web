document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = products.data.find(p => p.id === parseInt(productId));

    if (product) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
            <div class="product-image" id="imgContainer">
                <img src="${product.image}" alt="${product.productName}" id="productImg">
            </div>
            <div class="product-details">
                <h1>${product.productName}</h1>
                <p class="price" id="priceElement">$${product.price}</p>
                <p class="category">${product.category}</p>
                <p>${product.description}</p>
                <div class="quantity-control">
                    <button id="decrementBtn">-</button>
                    <span id="quantityValue">1</span>
                    <button id="incrementBtn">+</button>
                </div>
                <a href="./index.html" class="back-link"><i class="fa-solid fa-arrow-left"></i></a>
                <button id="addToCartBtn">Add panier</button>
            </div>
        `;

        setupZoom();
        setupQuantityControl(product.price);
        const addToCartBtn = document.getElementById('addToCartBtn');
        addToCartBtn.addEventListener('click', () => {
          const quantity = parseInt(document.getElementById('quantityValue').textContent);
          addToCart(product, quantity);
        });
    }
});
function addToCart(product, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.productName,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  }


function setupQuantityControl(basePrice) {
    const quantityValue = document.getElementById('quantityValue');
    const decrementBtn = document.getElementById('decrementBtn');
    const incrementBtn = document.getElementById('incrementBtn');
    const priceElement = document.getElementById('priceElement');

    let quantity = 1;
    let currentPrice = basePrice;
    

    decrementBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityValue.textContent = quantity;
            currentPrice = basePrice * quantity;
            priceElement.textContent = `$${currentPrice.toFixed(2)}`;
        }
    });

    incrementBtn.addEventListener('click', () => {
        quantity++;
        quantityValue.textContent = quantity;
        currentPrice = basePrice * quantity;
        priceElement.textContent = `$${currentPrice.toFixed(2)}`;
    });
}

function setupZoom() {
    const img = document.getElementById('productImg');
    const container = document.getElementById('imgContainer');

    container.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        const zoom = 1.3;
        const xOffset = (0.5 - x) * 100;
        const yOffset = (0.5 - y) * 100;

        img.style.transform = `scale(${zoom}) translate(${xOffset}px, ${yOffset}px)`;
    });

    container.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1) translate(0, 0)';
    });
}
