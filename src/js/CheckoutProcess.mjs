import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};
  
    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });
  
    return convertedJSON;
  }

function packageItems(items) {
    const simpleItems = items.map((item) => {
        return {id:item.Id, price:item.FinalPrice, name:item.Name, quantity: 1};
    })
    return simpleItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }
    calculateItemSummary() {
        this.list.forEach((product) => {
            this.itemTotal += product.FinalPrice;
        })
        document.querySelector('#subtotal').textContent = this.itemTotal;
    }
    calculateOrderTotal() {
        const quantity = this.list.length;
        this.shipping = 10 + 2 * (quantity - 1);
        this.tax = (this.itemTotal * .06);
        this.orderTotal = (this.itemTotal + this.tax + this.shipping);
        this.displayOrderTotals();
    }
    displayOrderTotals() {
        document.querySelector(this.outputSelector + "#shipping").textContent = this.shipping;
        document.querySelector(this.outputSelector + "#tax").textContent = this.tax.toFixed(2);
        document.querySelector(this.outputSelector + "#orderTotal").textContent = this.orderTotal.toFixed(2);
    }
    async checkout() {
        const formElement = document.forms["checkout"];
    
        const json = formDataToJSON(formElement);
        // add totals, and item details
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        try {
          const res = await services.checkout(json);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
    }
}