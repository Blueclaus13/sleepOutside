import { renderListWithTemplate } from "./utils.mjs";

function productCartTemplate(product){
    const newProduct = `<li class="product-card">
        <a href="product_pages/index.html?product=">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h3 class="card_brand">${product.Brand.Name}</h3>
            <h2 class="card_name">${product.Name}</h2>
            <p class="product-card_price">$${product.FinalPrice}</p>
        </a>
    </li>`;
    console.log(product.Image);
    return newProduct;
}

export default class ProductListening {
    constructor(category, datasource, listElement){
        this.category = category;
        this.datasource = datasource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.datasource.getData();
        this.renderList(list);
    }

    // renderList(list){
    //     const htmlItems = list.map(productCartTemplate);
    //     this.listElement.insertAdjacentHTML("afterbegin", htmlItems.join(""));
    //     //document.querySelector(".product-list").innerHTML = htmlItems.join("");
    // }

    renderList(list){
        renderListWithTemplate(productCartTemplate, this.listElement, list);
    }
}