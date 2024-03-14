import RenderCart from "./ShoppingCart.mjs";
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const cart = new RenderCart(getLocalStorage("so-cart"));
cart.init();