import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

 
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", (event) => {
      const itemIndex = parseInt(event.target.dataset.itemIndex, 10);
      cartItems.splice(itemIndex, 1);
      localStorage.setItem("so-cart", JSON.stringify(cartItems));
      renderCartContents();
    });
  });
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
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
  <button class="remove-item" data-item-index="${index}">X</button>
</li>`;

  return newItem;
}

renderCartContents();
