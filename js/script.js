

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