import { setLocalStorage, renderListWithTemplate, replaceElement, renderTemplate, cartCount } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <div class="cart-closed"><button id="${item.Id}">X</button></div>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

function totalCartTemplate(quantity) {
  return `<p id='total'>
            Total: ${quantity}
            </p>`;
}

export default class ShoppingCart {
  constructor(cartItems) {
    this.cartItems = cartItems ?? [];
    this.total = 0;
  }

  async init() {
    const element = document.querySelector(".product-list");
    this.renderProducts(element);
    this.addListenerToElements();
    const totalDiv = document.getElementById("cart-total");
    if (this.cartItems.length !== 0) {
      totalDiv.classList.remove("hidden");
      this.sumTotal();
    }
    renderTemplate(totalCartTemplate, "#cart-total", this.total);
  }

  sumTotal() {
    let result = this.cartItems.reduce((total, item) => {
      return total + parseFloat(item.FinalPrice);
    }, 0);
    this.total = parseFloat(result).toFixed(2);
  }

  reduceList(){
    const idCounts = this.cartItems.reduce((acc, item) => {
      acc[item.Id] = (acc[item.Id] || 0) + 1; 
      return acc;
    }, {});

    const modifiedCartItems = this.cartItems.map(item => ({
      ...item, quantity: idCounts[item.Id] }));

    const filteredList = modifiedCartItems.reduce((acc, current) => {
      const x = acc.find(item => item.Id === current.Id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

      console.log(filteredList);
      return filteredList;
  }

  renderProducts(element) {
    const reducedList = this.reduceList();
    renderListWithTemplate(cartItemTemplate, element, reducedList);
  }

  getProductsId() {
    const idList = this.cartItems.map((item) => item.Id);
    return idList;
  }

  deleteItem = e => {
    console.log(e.target.id);
    const productList = document.querySelector(".product-list");
    const storedItem = this.cartItems.filter((item) => item.Id != e.target.id);
    this.cartItems = storedItem ?? [];
    setLocalStorage("so-cart", storedItem);
    productList.replaceChildren();
    this.renderProducts(productList);
    this.addListenerToElements();
    this.sumTotal();
    replaceElement(totalCartTemplate, "#cart-total", this.total);
    console.log(storedItem);
    if (this.cartItems.length === 0) {
      document.querySelector("#cart-total").classList.add('hidden');
    }
    cartCount();
  }

  addListenerToElements() {
    console.log(this.getProductsId());
    const listId = this.getProductsId();
    listId.forEach(element => {
      document
        .getElementById(element)
        .addEventListener('click', this.deleteItem.bind(this));
    });
  }

}