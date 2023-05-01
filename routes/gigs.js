var express = require('express');
var router = express.Router();
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT service_id, title, description, price, delivery_time FROM gigs";
// execute query
db.query(query, (err, result) => {
if (err) {
console.log(err);
res.render('error');
}
res.render('gigs/allrecords', {allrecs: result });
});
});


// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT service_id, title, description, price, delivery_time FROM gigs WHERE service_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('gigs/onerec', {onerec: result[0] });
    }
    });
    });


// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('gigs/addrec');
    });


    // ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO product (productname, prodimage, description, styletype, shoesize, widthtype, prodcolor, solecolor, shoeclosure, supplier_id, brand_id, saleprice, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(insertquery,[req.body.productname, req.body.prodimage, req.body.description, req.body.styletype, req.body.shoesize, req.body.widthtype, req.body.prodcolor, req.body.solecolor, req.body.shoeclosure, req.body.supplier_id, req.body.brand_id, req.body.saleprice,req.body.status],
        (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/product');
            }

        });

    });





















module.exports = router;