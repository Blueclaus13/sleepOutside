function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
  }
  
  export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      }
      async init() {
        const list = await this.datasource.getData();
        this.product = list.findProductById(this.productId)
        this.renderProductDetails(this.product);
        document.getElementById('addToCart')
          .addEventListener('click', this.addToCart.bind(this));
        }
    addToCart(product) {
        let cart = getLocalStorage("so-cart") ?? [];
        cart.push(product);
        setLocalStorage("so-cart", cart);
    }
    renderProductDetails(product){
            const newProduct = `<section class="products">
            <h2>Top Products</h2>
            <ul class="product-list">
              <li class="product-card">
                <a href="product_pages/?product=${product.Id}">
                <img
                  src="${product.Image}"
                  alt="${product.Name}"
                />
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">$${product.FinalPrice}</p></a>
              </li>
              </ul>
              </section>`;
              return newProduct;
    }

    }