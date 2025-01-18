import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {renderCheckoutHeader} from "./checkout/checkoutHeader.js";
import { loadProducts,loadProductFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';

async function loadPage(){
  await loadProductFetch();
  
  await new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();


// Promise.all([
//   loadProductFetch(),
//   new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve();
//     });
//   })
// ]).then(()=>{
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// })


