import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const cart = new ShoppingCart(getLocalStorage("so-cart"));
cart.init();