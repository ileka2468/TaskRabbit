var express = require('express');
var router = express.Router();
var fetchoptions = require('./fetchoptions')
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
  let query =
    'SELECT category_id, category, menu_category_id FROM categories'
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    }
    res.render('categories/allrecords', { allrecs: result })
  })
})

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
  let query =
    'SELECT category_id, category, menu_category_id FROM categories WHERE category_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      res.render('categories/onerec', { onerec: result[0] })
    }
  })
})

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
  let query =
    'SELECT category_id, category, menu_category_id FROM categories WHERE category_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result1) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      // console.log(result[0].description)
      fetchoptions("menucategories")
          .then((result)=>{
            res.render('categories/editrec', { onerec: result1[0], mc: result })
          }).catch((err)=>{
            console.log(err);
      });

    }
  });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
  fetchoptions("menucategories")
      .then((result)=>{
        res.render('categories/addrec', {mc: result});
      }).catch((err)=>{
    console.log(err)
  });

})

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {
  let insertquery =
    'INSERT INTO categories (category, menu_category_id) VALUES (?, ?)'
  db.query(
    insertquery,
    [
      req.body.category,
      req.body.menu_category_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.render('error')
      } else {
        res.redirect('/categories')
      }
    }
  )
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
  let updatequery =
    'UPDATE categories SET category = ?, menu_category_id = ? WHERE category_id = ' +
    req.body.category_id
  db.query(
    updatequery,
    [
      req.body.category_name,
      req.body.menu_category_id
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.render('error')
      } else {
        res.redirect('/categories')
      }
    }
  )
})



// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
  let query = "DELETE FROM categories WHERE category_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/categories');
    }
  });
});

module.exports = router
