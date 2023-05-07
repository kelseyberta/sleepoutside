import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
    return `<li class="cart-card divider">
    <a href="product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="Picture of ${item.Name}"
      />
    </a>
    <a href="product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`
}

export default class ShoppingCart {
    constructor(key, selector) {
    this.key = key;
    this.selector = selector;
    }
    renderCartContents() {
        const cartItems = getLocalStorage(this.key);
        if (cartItems) {
          const htmlItems = cartItems.map((item) => cartItemTemplate(item));
          document.querySelector(this.selector).innerHTML = htmlItems.join("");
          renderTotal(cartItems);
        }
      
      }
    
}

function calculateTotal(items) {
    let total = 0;
    items.forEach((item) => (total += item.FinalPrice));
    return total;
  }
  
function renderTotal(cartItems) {
    if (cartItems.length) {
      const total = calculateTotal(cartItems);
      document.querySelector(".cart-total").innerHTML = total;
      const htmlCartFooter = document.querySelector(".cart-footer");
  
      if (htmlCartFooter.classList.contains("hide")) {
        htmlCartFooter.classList.remove("hide");
      }
    } else {
      if (!htmlCartFooter.classList.contains("hide")) {
        htmlCartFooter.classList.add("hide");
      }
    }
  }