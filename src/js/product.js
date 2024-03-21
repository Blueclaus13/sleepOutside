import { getLocalStorage, getParams, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();
const dataSource = new ExternalServices("tents");
const productId = getParams('product');

const product = new ProductDetails(productId, dataSource, getLocalStorage("so-cart"));
product.init();
