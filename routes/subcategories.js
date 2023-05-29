var express = require('express');
var router = express.Router();
var fetchoptions = require('./fetchoptions');
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
  let query =
    'SELECT subcategory_id, subcategory, category_id FROM subcategories'
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    }
    res.render('subcategories/allrecords', { allrecs: result });
  })
})

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
  let query =
    'SELECT subcategory_id, subcategory, category_id FROM subcategories WHERE subcategory_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      res.render('subcategories/onerec', { onerec: result[0] });
    }
  })
})

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
  let query =
    'SELECT subcategory_id, subcategory, category_id FROM subcategories WHERE subcategory_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result1) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      fetchoptions("categories")
          .then((result)=>{
            res.render('subcategories/editrec', { onerec: result1[0], cat: result })
          }).catch((err)=>{
            console.log(err)
      });
    }
  })
})

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
  router.get('/addrecord', function (req, res, next) {
    fetchoptions("categories")
        .then((result)=>{
          res.render('subcategories/addrec', {cat: result});
        }).catch((err)=>{
            console.log(err)
    });
  });

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {
  let insertquery =
    'INSERT INTO subcategories (subcategory, category_id) VALUES (?, ?)'
  db.query(
    insertquery,
    [
      req.body.subcategory,
      req.body.category_id
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.render('error')
      } else {
        res.redirect('/subcategories')
      }
    }
  )
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
  let updatequery =
    'UPDATE subcategories SET subcategory = ?, category_id = ? WHERE subcategory_id = ' +
    req.body.subcategory_id
  db.query(
    updatequery,
    [
      req.body.subcategory,
      req.body.category_id
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.render('error')
      } else {
        res.redirect('/subcategories')
      }
    }
  )
})

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
  let query = "DELETE FROM subcategories WHERE subcategory_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/subcategories');
    }
  });
});

module.exports = router
