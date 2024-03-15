import { getLocalStorage, getParams, loadHeaderFooter} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();
const dataSource = new ProductData("tents");
const productId = getParams('product');

const product = new ProductDetails(productId, dataSource, getLocalStorage("so-cart"));
product.init();
