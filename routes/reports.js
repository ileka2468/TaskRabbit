var express = require('express')
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('reports')
})

router.get('/customers', function (req, res, next) {

    let query = "SELECT user_id, firstname, lastname, email, password, type FROM users"
    db.query(query, (err, results) =>{
        if (err){
            console.log(err)
            res.render('error')
        }
        console.log(results)
        res.render('subreports/customerreport', {records: results})
    })

})

router.get('/sales', function (req, res, next) {

    let query = "SELECT order_id, buyer_id, seller_id, service_id, fulfilled, created_at, priceAtSale FROM orders"
    db.query(query, (err, results) =>{
        if (err){
            console.log(err)
            res.render('error')
        }
        console.log(results)
        res.render('subreports/salesreport', {records: results})
    })

})

router.get('/products', function (req, res, next) {

    let query = "SELECT service_id, title, description, price, delivery_time, seller_id, gig_category_id, homepage FROM gigs"
    db.query(query, (err, results) =>{
        if (err){
            console.log(err)
            res.render('error')
        }
        console.log(results)
        res.render('subreports/productsreport', {records: results})
    })

})


module.exports = router