import ProductData from "..js/ProductData.mjs";
import ProductList from "..js/ProductList.mjs";

const productData = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", productData, element);

productList.init();