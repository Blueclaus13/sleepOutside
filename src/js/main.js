import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const productData = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", productData, element);

productList.init();