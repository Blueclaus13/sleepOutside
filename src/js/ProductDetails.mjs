<<<<<<< HEAD
=======
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

>>>>>>> parent of c0a0873 (Merge branch 'ss' of https://github.com/Blueclaus13/sleepOutside)
function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }
<<<<<<< HEAD
  
  export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }
      async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // once we have the product details we can render out the HTML
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
          .addEventListener('click', this.addToCart.bind(this));
        }
    addProductToCart(product) {
        let cart = getLocalStorage("so-cart") ?? [];
        cart.push(product);
        setLocalStorage("so-cart", cart);
    }
    renderProductDetails(product){
            const newProduct = ``
    }

    }
=======

}
>>>>>>> parent of c0a0873 (Merge branch 'ss' of https://github.com/Blueclaus13/sleepOutside)
