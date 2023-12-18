import {cart} from '../data/cart.js';
import { products } from '../data/products.js';

let productsHTML = '';
products.forEach((product) => {
 productsHTML += `
 <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      ${product.price}
    </div>

    <div class="product-quantity-container">
    <select class = "js-quantity-selector-${product.id}" >
    <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>`


});

document.querySelector('.js-products-grid').innerHTML = productsHTML;
const addMessageTimeout = {

};

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
        const {productId} = button.dataset;
        
        let machingItem;
        cart.forEach((item)=>{
            if(productId === item.productId){
                machingItem = item;
            }
        });

        
        const quantitySelect = document.querySelector(`.js-quantity-selector-${productId}`);
            let quantity  = Number(quantitySelect.value);



            if(machingItem){
                machingItem.quantity+=quantity;
            }else{
                cart.push({
                    productId,
                    quantity
                    
                });

            }
            let cartQuantity =0;
            cart.forEach((item)=>{
                cartQuantity+= item.quantity;
            });

            document.querySelector(".js-cart-quantity").innerHTML= cartQuantity;

            const addMessage = document.querySelector(`.js-added-to-cart-${productId}`);
            addMessage.classList.add('add-to-cart-visible');

            const privousTimeout = addMessageTimeout[productId];
            if(privousTimeout){
              clearTimeout(privousTimeout);
            }
             const timeout = setTimeout(()=>{
              addMessage.classList.remove('add-to-cart-visible');

            },2000);

            addMessageTimeout[productId]=timeout;

            
    });
});