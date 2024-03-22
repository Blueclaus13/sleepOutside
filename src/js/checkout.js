import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs"

loadHeaderFooter();

//const form = document.getElementById("#checkout-form", ".output-summary");

const checkoutProcess = new CheckoutProcess("so-cart", "checkout-summary");
checkoutProcess.init();

document
  .querySelector("#zip")
  .addEventListener("blur", checkoutProcess.calculateTotal.bind(checkoutProcess));


document.querySelector("#submit-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status){
    checkoutProcess.checkout();
  }
  
});