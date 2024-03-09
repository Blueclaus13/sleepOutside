import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product){
    const newProduct = `<li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h3 class="card_brand">${product.Brand.Name}</h3>
            <h2 class="card_name">${product.Name}</h2>
            <p class="product-card_price">$${product.FinalPrice}</p>
        </a>
    </li>`;

    return newProduct;
}

export default class ProductList {
    constructor(category, datasource, listElement){
        this.category = category;
        this.datasource = datasource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.datasource.getData();
        this.renderList(list);
    }

    renderList(list){
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}