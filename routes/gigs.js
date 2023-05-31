var express = require('express');
var fetchOptions = require('./fetchoptions');
var router = express.Router();
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
  let query =
    'SELECT service_id, title, description, price, delivery_time, homepage FROM gigs';
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    res.render('gigs/allrecords', { allrecs: result });
  });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
  let query =
    'SELECT service_id, title, description, price, delivery_time, homepage, seller_id, gigimage FROM gigs WHERE service_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result1) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      let sellerID = result1[0].seller_id
      db.query('SELECT firstname, lastname, email FROM users WHERE user_id = ' +sellerID , (err, sellerData) =>{
        if (err){
          res.render('error')
        } else{
          db.query('SELECT Reviews.reviewdate, Reviews.rating, Reviews.review, Reviews.leftby, users.firstname, users.lastname, users.email FROM Reviews INNER JOIN users WHERE Reviews.leftby = users.user_id',(err, result2) =>{
            if (err){
              console.log(err);
              res.render('error')
            } else{
              console.log(result2)
              res.render('gigs/onerec', { onerec: result1[0], sellerInfo: sellerData[0], sellerReviews: result2});
            }
          });
        }
      });

    }
  })
})

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
  let userResult;
  let gigCatResult;
  let query =
    'SELECT service_id, title, description, price, delivery_time, seller_id, gig_category_id, homepage FROM gigs WHERE service_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result1) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      // console.log(result[0].description)
      fetchOptions("users")
          .then((result) =>{
            userResult = result;
              let query2 = 'SELECT gigs.gig_category_id, gig_categories.gig_category FROM gigs INNER JOIN gig_categories ON gigs.gig_category_id = gig_categories.gig_category_id';
              db.query(query2, (err, result) =>{
              res.render('gigs/editrec', { onerec: result1[0], userRecs: userResult, catName: result})
            });
          }).catch((err) => {
            console.log(err)
      });

    }
  });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
  let userResult;
  let gigCatResult;
  fetchOptions("users").
    then((result)=>{
      userResult = result;

      return fetchOptions("gig_categories")
    })
      .then((result) =>{
         gigCatResult = result;
         res.render('gigs/addrec', {userRecs: userResult, gigCatRecs: gigCatResult})
      }).catch((err) => {console.log(err)})

});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {
  var homepage_value=0;
  if (req.body.status)
  {
    homepage_value = 1;
  }

  let insertquery = 'INSERT INTO gigs (title, description, price, delivery_time, seller_id, gig_category_id, homepage) VALUES (?, ?, ?, ?, ?, ?, ?)'
  db.query(
    insertquery,
    [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.time,
      req.body.sellerID,
      req.body.gigCatID,
      homepage_value
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
  var homepage_value=0;
  if (req.body.status)
  {
    homepage_value = 1;
  }

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
        homepage_value

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
