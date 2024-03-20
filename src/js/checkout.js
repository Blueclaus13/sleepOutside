import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs"

loadHeaderFooter();

const form = document.getElementById("#checkout-form", ".output-summary");

const checkoutProcess = new CheckoutProcess("so-cart");
checkoutProcess.init();
checkoutProcess.calculateTotal(form);