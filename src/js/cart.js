import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  //initialize the variable with an empty array if the LocalStorage is empty.
  const cartItems = getLocalStorage("so-cart") ?? [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <div class="cart-closed"><button id="${item.Id}">X</button></div>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function onClosed( itemId){
  console.log(itemId.target.id + "Item to delete");

}

renderCartContents();
const button = document.getElementsByTagName("button");
button.addEventListener("click", onClosed);
