import { getParams, loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import { productCrumb } from "./Breadcrumb.mjs";

import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices("tents");
const productId = getParams("product");

const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();

productCrumb();

// add to cart button event handler
async function addToCartHandler(e) {
  let product = await dataSource.findProductById(e.target.dataset.id);
  productDetails.addToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

//Subscript Counter
function getLocalStorageCount() {
  const item = localStorage.getItem("so-cart");
  let itemList = [item];
  const countedItems = itemList.length;
  return countedItems;
}

const cartSubscript = (count) => `<sup class="cart-number">${count}</sup>`;

document.querySelector(".cart-count").innerHTML = cartSubscript(
  getLocalStorageCount()
);
