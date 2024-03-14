import {setLocalStorage, renderListWithTemplate, getLocalStorage} from "./utils.mjs";

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
  
  export default class ShoppingCart {
    constructor(cartItems){
      this.cartItems = cartItems ?? [];
    }
  
    async init() {
      const element = document.querySelector(".product-list");
      this.renderProducts(element);
      console.log(this.getProductsId());
      const listId = this.getProductsId();
      listId.forEach(element => {
        document
          .getElementById(element)
          .addEventListener('click', this.deleteItem.bind(this));
      });
    }
    //initialize the variable with an empty array if the LocalStorage is empty.
    // const cartItems = getLocalStorage("so-cart") ?? [];
    // const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    // document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
    renderProducts(element){
      renderListWithTemplate(cartItemTemplate, element, this.cartItems);
    }
    getProductsId(){
        const idList = this.cartItems.map((item) => item.Id);
        return idList;
    }
  
    deleteItem= e => {
      console.log(e.target.id);
      const storedItem = this.cartItems.filter((item)=>item.Id != e.target.id);
      this.cartItems = storedItem ?? [];
      setLocalStorage("so-cart", storedItem);
      const element = document.querySelector(".product-list");
      element.replaceChildren();
      this.renderProducts(element);
      console.log(storedItem);
    }
  
  }