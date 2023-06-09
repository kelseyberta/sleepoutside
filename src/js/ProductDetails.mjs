import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

function productDetailsTemplate(product) {
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">
      ${product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div></section>`;
  }

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
      };

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");

        document.getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    };

    addToCart() {
        // setLocalStorage("so-cart", this.product); 
        let cart = getLocalStorage("so-cart");
        if (cart === null) {
          cart = [];
        }
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
        alertMessage("Product added to cart!")
        animationIcon();

    };

    //    // add to cart button event handler
    //    async addToCartHandler(e) {
    //     const product1 = await dataSource.findProductById(e.target.dataset.id);
    //     product.addToCart();
    //   }

    //   // add listener to Add to Cart button
    //   document
    //     .getElementById("addToCart")
    //     .addEventListener("click", addToCartHandler);



    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
        "afterBegin",
        productDetailsTemplate(this.product)
        );
        console.log(this.product);
  }
  }

  function animationIcon() {
    const cartStorage = getLocalStorage("so-cart").length;
    const cart = document.querySelector(".cart");
    if (!cart.querySelector(".cart__items")) {
      const cartItems = document.createElement("div");
      cartItems.classList.add("cart__items");
      cartItems.textContent = cartStorage;
      cart.append(cartItems);
    } else {
      const cartItems = cart.querySelector(".cart__items");
      cartItems.textContent = cartStorage;
    }
  }