import RenderCart from "./productCart";
import { getLocalStorage } from "./utils.mjs";

const cart = new RenderCart(getLocalStorage("so-cart"));
cart.init();


// const buttons = document.querySelectorAll("button");
// buttons.forEach(function(button){
//         button.addEventListener("click", cart.deleteItem());
//   });

// function onClosed( itemId){
//   console.log(itemId.target.id + "Item to delete");
// }