import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage } from "./utils.mjs";

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
    newItems = items.map((item) => {

        return { id: item.Id, name: item.Name, price: item.FinalPrice, quantity: 1 }
    })

    return newItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.subTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.total = 0;
        this.cartItems = [];
    }
    init() {
        this.cartItems = getLocalStorage(this.key) ?? [];
        console.log(this.cartItems);
    }
    calculateSubTotal() {
        for (let i in this.cartItems) {
            this.subTotal += i.FinalPrice;
        }
    }

    calculateShipping() {
        let itemQuantity = this.cartItems.length;
        if (itemQuantity > 0) {
            this.shipping += 10;
            this.shipping += (itemQuantity - 1) * 2;
        }
    }
    calculateTax() {
        this.tax = this.subTotal * .06;
    }
    calculateTotal() {
        this.calculateSubTotal();
        this.calculateShipping();
        this.calculateTax();
        this.total = this.subTotal + this.shipping + this.tax;

        this.displayOrderTotals();
    }
    displayOrderTotals() {
        document.getElementById("shipping").innerHTML = `Shipping Cost: ${this.shipping}`;
        document.getElementById("sub-total").innerHTML = `Sub-Total: ${this.subTotal}`;
    }
    async checkout(event) {
        event.preventDefault();
        let packagedItems = packageItems(this.cartItems);
        let json = formDataToJSON(document.getElementById("checkout-form"));

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
