


// Iterates over the products.data array and creates a product card for each item
// Appends the product card to the container with the class '.products'
for (const i of products.data) {
    const container = document.querySelector('.products');
    const card = document.createElement('div');
    card.classList.add('card', i.category, 'hide');

    //create new link for card
   
    const image = document.createElement('img');
    image.setAttribute('src', i.image);
    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info');
    const productName = document.createElement('h3');
    productName.textContent = i.productName;
    const price = document.createElement('p');
    price.textContent = '$' + i.price;
    const productLink = document.createElement('a');
    productLink.href = `./Product-details.html?id=${i.id}`;
    productLink.textContent = 'Show details';
    productLink.target= '_blank';
    productLink.style.textDecoration = 'none';
    productLink.style.color = 'inherit';
    
    container.appendChild(card);
    card.appendChild(image);
    card.appendChild(cardInfo);
    cardInfo.appendChild(productName);
    cardInfo.appendChild(price);
    cardInfo.appendChild(productLink);
}
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const notFoundElement = document.querySelector('.not-found');

// Adds an event listener to the search button
// When clicked, it calls the filterProducts function with the search term
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterProducts(searchTerm);
  
});
// Filters the product cards based on the search term
// Iterates over all cards and shows/hides them based on whether the product name includes the search term
// If no match is found, it displays a "Not Found!" message
function filterProducts(searchTerm) {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const productName = card.querySelector('h3').textContent.toLowerCase();
    if (productName.includes(searchTerm)) {
      card.classList.remove('hide');
    } else {
      card.classList.add('hide');
    }
  });
}
// Filters the product cards based on the selected category
// Iterates over all category buttons and applies the 'active' class to the selected category
// Iterates over all product cards and shows/hides them based on whether their category matches the selected category
// If the "All" category is selected, all cards are shown
function filterProduct(value){
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if(value.toLocaleUpperCase() == button.textContent.toLocaleUpperCase()){
            button.classList.add('active');
        }
        else{
            button.classList.remove('active');
        }
    });
    const cards = document.querySelectorAll('.card');
    cards.forEach((element) => {
        if ( value === 'All') {
            element.classList.remove('hide');
        }
        else{
        if(element.classList.contains(value)){
            element.classList.remove('hide');
        }
        else{
            element.classList.add('hide');
        }
    }
    }
)};
// Calls the filterProduct function with the "All" argument when the page loads
// This ensures that all product cards are visible on page load
window.onload = ()=>{
    filterProduct('All');
}

function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.querySelector('.panier');
  
  if (cart.length === 0) {
    cartContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    return;
  }
  
  let cartHTML = `
    <h2 class="cart-title">Your Cart</h2>
    <ul class="cart-items">
  `;
  
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    cartHTML += `
      <li class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
        <div class="cart-item-actions">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <span class="item-quantity">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
        </div>
      </li>
    `;
  });
  
  cartHTML += `
    </ul>
    <div class="cart-total">
      <span>Total:</span>
      <strong>$${total.toFixed(2)}</strong>
    </div>
            <button class="checkout-btn" onclick="goToCheckout()">Proceed to Checkout</button>

  `;
  
  cartContainer.innerHTML = cartHTML;
}
function goToCheckout() {
  window.location.href = './checkout.html';
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}
const icon = document.querySelector('i');
const panier = document.querySelector('.panier');
// قم بإضافة مستمع حدث لأيقونة السلة لعرض محتوياتها
icon.addEventListener('click', () => {
  panier.classList.toggle('active-panier');
  displayCart();
});

// قم باستدعاء displayCart عند تحميل الصفحة
window.addEventListener('load', displayCart);
