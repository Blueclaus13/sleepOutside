import ProductData from "../js/ProductData.mjs";
import ProductList from "../js/ProductList.mjs";
import { getParams } from "./utils.mjs";


const category = getParams("category");
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);

myList.init();