var express = require('express');
var router = express.Router();
var Product = require('./ProductClass')
router.post('/add-to-cart', function(req, res){

    var productObj = Product(req.body.productId, req.body.quantity)

    if(!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push(productObj);
    res.redirect('/');
});


module.exports = router;