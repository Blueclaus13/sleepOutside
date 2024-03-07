<<<<<<< HEAD
import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";
=======
import { getParams} from "./utils.mjs";
>>>>>>> 2fb9721e9107375a34e5a40811e15869e43a63d8
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

<<<<<<< HEAD
const productId = getParams('product');
=======
>>>>>>> 2fb9721e9107375a34e5a40811e15869e43a63d8
const dataSource = new ProductData("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();
<<<<<<< HEAD

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
=======
>>>>>>> 2fb9721e9107375a34e5a40811e15869e43a63d8
