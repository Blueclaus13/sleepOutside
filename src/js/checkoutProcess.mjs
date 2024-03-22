import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, setLocalStorage, removeAllAlerts, alertMessage } from "./utils.mjs";

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
    const newItems = items.map((item) => {

        return { id: item.Id, name: item.Name, price: item.FinalPrice, quantity: 1 };
    });
    return newItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.itemTotal = 0;
        this.orderTotal = 0;
        this.subTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.cartItems = [];
    }
    init() {
        this.cartItems = getLocalStorage(this.key) ?? [];
        console.log(this.cartItems);
        //this.calculateItemSummary();
    }
    calculateSubTotal() {
        const amounts = this.cartItems.map((item) => item.FinalPrice);
        this.subTotal = amounts.reduce((sum, item) => sum + item);
        //this.cartItems.forEach((item)=> this.subTotal += parseFloat(item.FinalPrice).toFixed(2));
        //this.subTotal = this.cartItems.reduce((sum, item) => {sum + parseFloat(item.FinalPrice).toFixed(2)});
        // for (let i in this.cartItems) {
        //     this.subTotal += i.FinalPrice;
        // }
        this.itemTotal = this.cartItems.length;
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
        this.orderTotal = (parseFloat(this.subTotal) + parseFloat(this.shipping) + parseFloat(this.tax)).toFixed(2);
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        document.getElementById("shipping").innerHTML = `$${this.shipping}`;
        document.getElementById("cartTotal").innerHTML = `$${this.subTotal}`;
        document.getElementById("orderTotal").innerHTML = `$${this.orderTotal}`;
        document.getElementById("tax").innerHTML = `$${this.tax}`;
        document.getElementById("num-items").innerHTML = `${this.itemTotal} items`;
    }
    async checkout() {
        const formElement = document.forms["checkout"];
        let json = formDataToJSON(formElement);
        
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.cartItems);
        console.log(json);
        try {
            const res = await services.checkout(json);
            console.log(res);
            setLocalStorage("so-cart", []);
            location.assign("/checkout/success.html");
        } catch (err) {
            console.log(err);
            removeAllAlerts();
            alertMessage(err.message);
            throw { name: "Service Error", message: err.message};
        }
    }
}
