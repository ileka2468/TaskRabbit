var express = require('express')
var router = express.Router()
var fetchOptions = require('./fetchoptions')

// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
  let query =
    'SELECT order_id, buyer_id, seller_id, service_id, fulfilled, created_at, orderTotal FROM orders'
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
    'SELECT order_id, buyer_id, seller_id, service_id, fulfilled, created_at, orderTotal FROM orders WHERE order_id = ' +
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
    'SELECT order_id, buyer_id, seller_id, service_id, fulfilled, created_at, orderTotal FROM orders WHERE order_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result1) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      fetchOptions("users").
      then((result) => {
        userData = result;
        fetchOptions("gigs").
        then((result) => {
          gigData = result;
          res.render('orders/editrec', { onerec: result1[0], userD: userData, gig: gigData})
        });
      }).catch((err) => { console.log(err) });

    }
  })
})

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
  let userData;
  let gigData;
  fetchOptions("users").
    then((result) => {
      userData = result;
      fetchOptions("gigs").
        then((result) => {
          gigData = result;
          res.render('orders/addrec', { userD: userData, gig: gigData })
        });
    }).catch((err) => { console.log(err) });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {
  if(!req.session.cart || req.session.cart.length === 0) {
    return res.render('error', {message: "Your cart is empty."});
  }
  console.log("WE ARE IN THE INSERTION FOR ORDERS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

  req.session.cart.forEach((cartItem) => {
    let insertquery =
        'INSERT INTO orders (buyer_id, seller_id, service_id, fulfilled, created_at, orderTotal, extras, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    let orderTotal = cartItem.price * cartItem.quantity;
    let date = new Date();

    console.log(req.session.username,
        cartItem.sellerID,
        cartItem.productID,
        0,
        date,
        orderTotal,
        cartItem.extras,
        cartItem.quantity)
    db.query(
        insertquery,
        [
          req.session.user_id,
          cartItem.sellerID,
          cartItem.productID,
          0,
          date,
          orderTotal,
          cartItem.extras,
          cartItem.quantity
        ],
        (err, result) => {
          if (err) {
            console.log(err)
            res.render('error')
          }
        }
    );
  });

  // If everything goes well, empty the cart and redirect to orders
  req.session.cart = [];
  res.redirect('/');
});


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
  // console.log(req.body.buyer_id)
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
