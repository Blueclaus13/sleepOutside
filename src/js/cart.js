import RenderCart from "./productCart";
import { getLocalStorage } from "./utils.mjs";

const cart = new RenderCart(getLocalStorage("so-cart"));
cart.init();