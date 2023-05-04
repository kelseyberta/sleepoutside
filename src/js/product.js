import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import { getParams } from "./utils.mjs";

import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, dataSource);
product.init();
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

function getLocalStorageCount() {
  const item = localStorage.getItem('so-cart');
  let itemList = [item];
  const countedItems = itemList.length;
  return countedItems;
}

const cartSubscript = (count) => `<sup class="cart-number">${count}</sup>`;

document.querySelector('.cart-count').innerHTML = cartSubscript(
  getLocalStorageCount(product)
);

// add listener to Add to Cart button
document.getElementById("addToCart").addEventListener("click", addToCartHandler);
