import ExternalServices from "../js/ExternalServices.mjs";
import ProductList from "../js/ProductList.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const category = getParams("category");
const dataSource = new ExternalServices();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);

myList.init();