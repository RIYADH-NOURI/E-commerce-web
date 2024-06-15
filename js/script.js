
const products = {
    data :[
        {
        id:1,
        productName : 'addidas blue',
        category : 'Topwear',
        price : 45,
        image : './images/adidas.png',
    },
    {
        id:2,    
        productName : 'beige jacket',
        category : 'Jacket',
        price : 30,
        image : './images/beige-jacket.png'
    },
    {
        id:3 ,
        productName : 'blue shoes',
        category : 'Topwear',
        price : 25,
        image : './images/blue-shoes.png',
    },
    {
        id:4 ,
        productName : 'blue t shirt',
        category : 'Topwear',
        price : 10,
        image : './images/blue-t-shirt.png'
    },
    {
        id:5 ,
        productName : 'brown shoes',
        category : 'Topwear',
        price : 99,
        image : './images/brown-shoes.png'
    },
    {
        id:6 ,
        productName : 'classic watch',
        category : 'Watch',
        price : 50,
        image : './images/classic-watc.png'
    },
    {
        id:7,
        productName : 'green jacket',
        category : 'Jacket',
        price : 40,
        image : './images/green-jacket.png'
    },
    {
        id:8,
        productName : 't shirt black',
        category : 'Topwear',
        price : 15,
        image : './images/t-shirt_black.png'
    },
    {
        id:9,
        productName : 'white bottom',
        category : 'Bottomwear',
        price : 30,
        image : './images/white-bottom.png'
    },
    {
        id:10,
        productName : 'smart watch',
        category : 'Watch',
        price : 25,
        image : './images/white-watch.png'
    },
    {
        id:11,
        productName : 'black watch',
        category : 'Watch',
        price : 60,
        image : './images/black-watch.png'
    },
    {
        id:12,
        productName : 'bottom cargo',
        category : 'Bottomwear',
        price : 25,
        image : './images/bottom-cargo.png'
    },
]
}
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
    productLink.style.textDecoration = 'none';
    productLink.style.color = 'inherit';
    
    container.appendChild(card);
    card.appendChild(productLink);
    productLink.appendChild(image);
    productLink.appendChild(cardInfo);
    cardInfo.appendChild(productName);
    cardInfo.appendChild(price);
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