class Product {
    constructor(productID, quantity) {
        this.productID = productID;
        this.quantity = quantity;
    }

    getQuantity(){
        return this.quantity;
    }

    setQuantity(newQuantity){
        this.quantity = newQuantity;
    }
}

module.exports = Product;