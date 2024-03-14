import RenderCart from "./ShoppingCart.mjs";
import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const cart = new RenderCart(getLocalStorage("so-cart"));
cart.init();