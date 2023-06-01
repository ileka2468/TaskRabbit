var express = require('express');
var router = express.Router();
var Product = require('./ProductClass')
router.post('/add-to-cart', function(req, res){
    let extraInsert = null;
    if(req.body.extra){
        extraInsert = "expedited"
    }

    var productObj = new Product(req.body.productId, req.body.quantity, extraInsert, req.body.price, req.body.sellerID)

    if(!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push(productObj);
    res.redirect('/');
});

router.post('/remove-from-cart', function(req, res){
    console.log("logging from remove route " +  req.body.productId);
    // check if the session cart exists
    if(!req.session.cart) {
        console.log("cart empty redirecting")
        return res.redirect('/');
    }

    // log the type of productId in the cart
    console.log("Type of productId in cart: " + typeof req.session.cart);
    // log the type of productId in the request body
    console.log("Type of productId in request body: " + typeof req.body.productId);
    // find the product in the cart
    var productIndex = req.session.cart.findIndex(product => product.productID === req.body.productId);


    console.log(productIndex)

    // if the product was found in the cart, remove it
    if(productIndex > -1){
        req.session.cart.splice(productIndex, 1);
    }

    res.redirect('/');
});

router.get('/cart', function(req, res, next) {
    if (!req.session.cart || !req.session.cart.length){
        console.log("Cart is empty or not an array");
        res.render('cart');
    } else {
        let productIds = req.session.cart.map(product => product.productID); // <-- change here
        let productIdsStr = productIds.join(",");

        if (productIdsStr === "") {
            console.log("Cart is empty");
            res.render('cart', {allrecs: []});
        } else {
            let query = "SELECT service_id, title, description, price, delivery_time, gigimage FROM gigs WHERE service_id IN (" + productIdsStr + ") order by find_in_set(service_id, '" + productIdsStr + "');";

            db.query(query, (err, result) => {
                if (err) {
                    console.error(err);
                    res.render('error');
                } else {
                    res.render('cart', {allrecs: result});
                }
            });
        }
    }
});







module.exports = router;