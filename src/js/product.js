import { setLocalStorage, getLocalStorage, getParams, loadHeaderFooter } from "./utils.mjs";

import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();
const dataSource = new ProductData("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCartHandler);
