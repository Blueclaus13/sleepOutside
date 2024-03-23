import { setLocalStorage, renderTemplate, cartCount } from "./utils.mjs";

function productDetailsTemplate(product) {

  let listPrice = parseFloat(product.ListPrice).toFixed(2);
  let finalPrice = parseFloat(product.FinalPrice).toFixed(2);
  let suggestedRetailPrice = parseInt(product.SuggestedRetailPrice);
  let priceAfterDescount = parseInt(finalPrice - (suggestedRetailPrice - finalPrice)).toFixed(2);
  const saleHTML = finalPrice < suggestedRetailPrice ? `<p class="on-sale">ON SALE</p>
    <p class="tag">Save -$${((product.SuggestedRetailPrice.toFixed(2) - product.FinalPrice).toFixed(2))}</p>
    <p class="product-card_price"><s>$${product.ListPrice}</s></p>` : "";
  const newProduct = `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
          src="${product.Images.PrimaryLarge}"
          alt="${product.NameWithoutBrand}"
        />
        ${saleHTML}
        <p class="product-card__price">$${priceAfterDescount}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">
        ${product.DescriptionHtmlSimple}
        </p>
      <div class="product-detail__add">
        <div id="notification" class="notification">Item added to cart!</div>
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
  return newProduct;
}

export default class ProductDetails {
  constructor(productId, dataSource, localStore) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.localStore = localStore ?? [];
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId)
    this.renderProductDetails("main");
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }
  addToCart() {
    this.localStore.push(this.product)
    setLocalStorage("so-cart", this.localStore);

    cartCount();
    this.cartNotification();
  }
  renderProductDetails(selector) {
    renderTemplate(productDetailsTemplate, selector, this.product);
  }
  cartNotification() {
    var notification = document.getElementById('notification');
    notification.classList.remove('appear');

    setTimeout(function () {
      notification.classList.remove('disappear');
      notification.classList.add('appear');
    }, 1);

    setTimeout(function () {
      notification.classList.remove('appear');
      notification.classList.add('disappear');
    }, 3000);
  }
}