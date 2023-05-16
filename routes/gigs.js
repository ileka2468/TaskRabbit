var express = require('express')
var router = express.Router()
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
  let query =
    'SELECT service_id, title, description, price, delivery_time, homepage FROM gigs'
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    }
    res.render('gigs/allrecords', { allrecs: result })
  })
})

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
  let query =
    'SELECT service_id, title, description, price, delivery_time, homepage FROM gigs WHERE service_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      res.render('gigs/onerec', { onerec: result[0] })
    }
  })
})

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
  let query =
    'SELECT service_id, title, description, price, delivery_time, seller_id, gig_category_id, homepage FROM gigs WHERE service_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      console.log(result[0].description)
      res.render('gigs/editrec', { onerec: result[0] })
    }
  })
})

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
  res.render('gigs/addrec')
})

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {
  let insertquery =
    'INSERT INTO gigs (title, description, price, delivery_time, seller_id, gig_category_id) VALUES (?, ?, ?, ?, ?, ?)'
  db.query(
    insertquery,
    [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.time,
      req.body.sellerID,
      req.body.gigCatID
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.render('error')
      } else {
        res.redirect('/gigs')
      }
    }
  )
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
  let updatequery =
    'UPDATE gigs SET title = ?, description = ?, price = ?, delivery_time = ?, seller_id = ?, gig_category_id = ?, homepage = ? WHERE service_id = ' +
    req.body.service_id
  db.query(
    updatequery,
    [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.time,
        req.body.sellerID,
        req.body.gigCatID,
        req.body.homepage

    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.render('error')
      } else {
        res.redirect('/gigs')
      }
    }
  )
})



// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
  let query = "DELETE FROM gigs WHERE service_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/gigs');
    }
  });
});

module.exports = router
