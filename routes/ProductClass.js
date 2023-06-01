class Product {
    constructor(productID, quantity, extras = null, price, sellerID) {
        this.productID = productID;
        this.quantity = quantity;
        this.extras = extras;
        this.price = price;
        this.sellerID = sellerID;
    }

    getQuantity(){
        return this.quantity;
    }

    getExtras(){
        return this.extras;
    }

    setQuantity(newQuantity){
        this.quantity = newQuantity;
    }
}

module.exports = Product;