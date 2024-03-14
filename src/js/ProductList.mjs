import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    let listPrice = parseInt(product.ListPrice);
    let finalPrice = parseInt(product.FinalPrice);
    const saleHTML = finalPrice < listPrice ? `<p class="product-card_price">ON SALE</p>
    <p class="product-card_price"><s>$${product.ListPrice}</s></p>` : "";
    const newProduct = `<li class="product-card">
            <a href="../product_pages/index.html?product=${product.Id}">
                <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
                <h3 class="card_brand">${product.Brand.Name}</h3>
                <h2 class="card_name">${product.Name}</h2>
                ${saleHTML}
                <p class="product-card_price">$${product.FinalPrice}</p>
            </a>
        </li>`;
    return newProduct;
}

export default class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").innerHTML = this.category;
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}