import { cart, removeFromCart, calculateCartQuntity, updateQuantity, updateDeliveryOption } from '../data/cart.js';
import {  getProduct } from '../data/products.js';
import { products } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { calculateDeliveryOption, deliveryOptions, getDeliveryOption } from '../data/delivaryOptions.js';



renderCheckoutHeader();

 function renderCheckoutHeader(){
  let cartQuantity = calculateCartQuntity();
    
    const checkoutHeaderHTML =`
    <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/amazon-logo.png">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link js-return-to-home"
            href="amazon.html"> ${cartQuantity} items</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
    `;
    document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML;
}
renderCheckoutHeader();


export function renderOrderSummary(){

  let cartSummaryHtml = '';

  cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  const matchingProduct = getProduct(productId);
  
  const deliveryOptionId = cartItem.deliveryOptionId;
  
  const deliveryOption = getDeliveryOption(deliveryOptionId);
  
  const dateString = calculateDeliveryOption(deliveryOption);  
  
  cartSummaryHtml += `
    <div class="cart-item-container js-cart-item-container-${productId}">
            <div class="delivery-date js-delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                 ${matchingProduct.price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id ='${matchingProduct.id}'>
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${productId}">
                  <span class="save-quantity-link link-primary js-save-link" data-product-id =${matchingProduct.id}>Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id='${matchingProduct.id}'>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${delivaryOptionsHTML(matchingProduct,cartItem)}
              </div>
            </div>
          </div>
          `;
});


function delivaryOptionsHTML(matchingProduct, cartItem){
  let html = '';
  deliveryOptions.forEach((deliveryOption)=>{
    const dateString = calculateDeliveryOption(deliveryOption);
    
    const priceString = deliveryOption.price === 0
    ? 'Free'
    : `${deliveryOption.price} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html +=`
     <div class="delivery-option js-delivery-option"
     data-product-id = "${matchingProduct.id}"
     data-delivery-option-id = "${deliveryOption.id}">
        <input type="radio"
        ${isChecked ? 'checked': ''}

         class="delivery-option-input"
         name="delivery-option-${matchingProduct.id}">
       <div>
         <div class="delivery-option-date">
           ${dateString}
         </div>
         <div class="delivery-option-price">
         ${priceString} Shipping
         </div>
       </div>
     </div>
    `

  });
  return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();

      // updateCartQuantity();
      renderCheckoutHeader();

    });

  });

// function updateCartQuantity() {
//   const cartQuantity = calculateCartQuntity();
//   // document.querySelector('.js-return-to-home').innerHTML = `${cartQuantity} item`
// }
// updateCartQuantity();

document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add('is-editing');
    });

  });

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);


      if (newQuantity < 0 || newQuantity > 1000) {
        alert('Quantity must be atleast 0 and less than 1000');
        return;
      }
      updateQuantity(productId, newQuantity);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing');


      const quantityabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityabel.innerHTML = newQuantity;
      // updateCartQuantity();
      renderCheckoutHeader();
    });
  });

document.querySelectorAll('.js-delivery-option')
.forEach((element)=>{
  element.addEventListener('click', ()=>{
    const {productId, deliveryOptionId}= element.dataset;
  updateDeliveryOption(productId, deliveryOptionId);
  renderOrderSummary();
  renderPaymentSummary();
  
  });

});
}
renderOrderSummary();

export function renderPaymentSummary(){
    let productPrice = 0;
    let shippingPrice = 0;
    
    cart.forEach((cartItem) => {
       const product = getProduct(cartItem.productId);
       productPrice += product.price * cartItem.quantity;
        
       const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

      shippingPrice += deliveryOption.price;
      console.log(deliveryOption)
      console.log(shippingPrice)
    });

    const totalBeforeTax = productPrice + shippingPrice;
    const tax = totalBeforeTax * 0.1;
    const total = totalBeforeTax + tax;

    const cartQuantity = calculateCartQuntity();

    let paymentSummaryHtml = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items ${cartQuantity}</div>
            <div class="payment-summary-money">${productPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${shippingPrice}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${tax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${total}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

}
renderPaymentSummary();


