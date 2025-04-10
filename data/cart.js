
export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));


  if(!cart){
    cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '1'
  }];
  }
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  if (!quantitySelector) {
    console.error(`Quantity selector for product ${productId} not found.`);
    return;
  }

  const quantity = Number(quantitySelector.value);
  
  if(matchingItem){
    matchingItem.quantity += quantity;
  }
  else{
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function removeFromCart(productId){
  let newcart = [];

  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newcart.push(cartItem);
    }
  });

 cart = newcart;

 saveToStorage();
}


 export function calculateCartQuantity(){
  let cartQuantity = 0;
cart.forEach((cartItem)=>{
  cartQuantity += cartItem.quantity;
});
return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((item)=>{
    if(productId === item.productId){
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

 export function updateCartQuantity(){
  // const addedMessageTimeouts = {};
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    // const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`
    // );
    // addedMessage.classList.add('added-to-cart-visible');
    // const previousTimeoutId = addedMessageTimeouts[productId];
    // if (previousTimeoutId) {
    //   clearTimeout(previousTimeoutId);
    // }

    // const timeoutId = setTimeout(() => {
    //   addedMessage.classList.remove('added-to-cart-visible');
    // }, 2000);
    // addedMessageTimeouts[productId] = timeoutId;
  }

  export function loadCart(fun){
   let xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load',()=>{
      //console.log(xhr.response);
      fun();
    });
  
   xhr.open('GET','https://supersimplebackend.dev/products');
   xhr.send();
  }