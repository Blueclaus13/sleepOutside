import RenderCart from "./ShoppingCart.mjs";
import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cart = new RenderCart(getLocalStorage("so-cart"));
cart.init();


// const buttons = document.querySelectorAll("button");
// buttons.forEach(function(button){
//         button.addEventListener("click", cart.deleteItem());
//   });

// function onClosed( itemId){
//   console.log(itemId.target.id + "Item to delete");
// }