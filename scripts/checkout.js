import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {renderCheckoutHeader} from "./checkout/checkoutHeader.js";
import { loadProducts,loadProductFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';

async function loadPage(){
  try{
    //throw 'error1'
    await loadProductFetch();
  
    await new Promise((resolve)=>{
      //throw 'error2'
      loadCart(()=>{
        //reject('error3')
        resolve();
      });
    });

  } catch (error){
    console.log('Unexpected error. Please try again later.');
  }

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


