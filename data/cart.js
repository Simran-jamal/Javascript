export const cart = [];

export function addToCart(productId) {
    let machingItem;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        machingItem = cartItem;
      }
    });
  
  
    const quantitySelect = document.querySelector(`.js-quantity-selector-${productId}`);
    let quantity = Number(quantitySelect.value);
  
  
  
    if (machingItem) {
      machingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity
  
      });
  
    }
  }