import { getLocalStorage } from './utils.mjs';
import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
        constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        // once we have the product details we can render out the HTML
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
        document.addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart(product) {
        //First get what is already in localStorage and assign it to a variable (if there is anything, it will come back as an array):
        let cart = getLocalStorage('so-cart');
        //if there was no "cart" already, like you didn't have anything yet, then create an empty array:
        if (!cart) {
            cart = [];
        }
        //now we push the product that the user clicked on with "addtoCart" button to the end of the array
        cart.push(product);
        //and then setLocalStorage with the new contents of the cart:
        setLocalStorage('so-cart', cart);
    }

    renderProductDetails() {
        let temp = document.getElementsByTagName('template')[0];
        let clone = temp.content.cloneNode(true);
        document.getElementsByTagName('main')[0].appendChild(clone);
    }

}