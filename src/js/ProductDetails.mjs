<<<<<<< HEAD
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {

    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails(this.product);
    document.getElementById('addToCart').addEventListener('click', this.addToCart.bind(this));

  }
  addToCart(product) {
    let cart = getLocalStorage("so-cart") ?? [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }
  renderProductDetails(product) {

    let colorString = "";
    for (c in product.Colors.ColorName) {
      colorString += c + " ";
    }

    const htmlContent = ` <h3>${product.Brand.Name}</h3>

            <h2 class="divider">${product.NameWithoutBrand}</h2>

            <img class="divider"
                src=${product.Image}
                alt="Marmot Ajax tent" />

            <p class="product-card__price">${product.ListPrice}</p>

            <p class="product__color">${colorString}</p>

            <p class="product__description">
                ${product.DescriptionHtmlSimple}
            </p>

            <div class="product-detail__add">
                <button id="addToCart" data-id=${product.Id}>Add to Cart</button>
            </div>`
    const productDetailsDiv = document.getElementById('product-detail-section');
    productDetailsDiv.innerHTML = htmlContent;
  }

}
=======
import {setLocalStorage, renderTemplate} from "./utils.mjs";

function productDetailsTemplate(product){
  const newProduct = `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${product.Image}"
          alt="${product.NameWithoutBrand}"
        />
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">
        ${product.DescriptionHtmlSimple}
        </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
    return newProduct;
}
  
  export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId)
        this.renderProductDetails("main");
        document
          .getElementById('addToCart')
          .addEventListener('click', this.addToCart.bind(this));
        }
    addToCart() {
        setLocalStorage("so-cart", this.product);
    }
    renderProductDetails(selector){
      renderTemplate(productDetailsTemplate, selector, this.product);}
    }
>>>>>>> 2fb9721e9107375a34e5a40811e15869e43a63d8
