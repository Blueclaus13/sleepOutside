import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from './ProductDetails.mjs';

const productId = getParams('product');
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();

console.log(dataSource.findProductById(productId));


// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
// .addEventListener("click", addToCartHandler);
