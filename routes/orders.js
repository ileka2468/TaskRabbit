var express = require('express')
var router = express.Router()
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
  let query =
    'SELECT order_id, buyer_id, seller_id, service_id, fulfilled, created_at, priceAtSale FROM orders'
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    }
    res.render('orders/allrecords', { allrecs: result })
  })
})

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
  let query =
    'SELECT order_id, buyer_id, seller_id, service_id, fulfilled, created_at, priceAtSale FROM orders WHERE order_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      res.render('orders/onerec', { onerec: result[0] })
    }
  })
})

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
  let query =
    'SELECT order_id, buyer_id, seller_id, service_id, fulfilled, created_at, priceAtSale FROM orders WHERE order_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      console.log(result[0].description)
      res.render('orders/editrec', { onerec: result[0] })
    }
  })
})

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
  res.render('orders/addrec')
})

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {
  let insertquery =
    'INSERT INTO orders (buyer_id, seller_id, service_id, fulfilled, created_at, priceAtSale) VALUES (?, ?, ?, ?, ?, ?)'
  db.query(
    insertquery,
    [
      req.body.buyer_id,
      req.body.seller_id,
      req.body.service_id,
      req.body.fulfilled,
      req.body.created_at,
      req.body.priceAtSale
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.render('error')
      } else {
        res.redirect('/orders')
      }
    }
  )
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
  console.log(req.body.buyer_id)
  let updatequery =
    'UPDATE orders SET buyer_id = ?, seller_id = ?, service_id = ?, fulfilled = ?, created_at = ?, priceAtSale = ? WHERE order_id = ' +
    req.body.order_id
  db.query(
    updatequery,
    [
      req.body.buyer_id,
      req.body.seller_id,
      req.body.service_id,
      req.body.fulfilled,
      req.body.created_at,
      req.body.priceAtSale
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.render('error')
      } else {
        res.redirect('/orders')
      }
    }
  )
})


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
  let query = "DELETE FROM orders WHERE order_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/orders');
    }
  });
});

module.exports = router
