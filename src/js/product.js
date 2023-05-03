import { getParams, loadHeaderFooter } from "./utils.mjs";

import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";

loadHeaderFooter();
const dataSource = new ProductData("tents");
const productId = getParams("product");

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();
// add to cart button event handler
async function addToCartHandler(e) {
  let product = await dataSource.findProductById(e.target.dataset.id);
  productDetails.addToCart(product);
}

// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCartHandler);
