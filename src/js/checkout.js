import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs"

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".order-summary")
checkout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", checkout.calculateOrdertotal.bind(checkout));
// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  checkout.checkout();
});