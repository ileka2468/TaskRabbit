var express = require('express')
var router = express.Router()
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
  let query =
      'SELECT menucategory_id, cat_name FROM menucategories'
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    }
    res.render('menucategories/allrecords', { allrecs: result })
  })
})

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
  let query =
      'SELECT menucategory_id, cat_name FROM menucategories WHERE menucategory_id = ' +
      req.params.recordid
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      res.render('menucategories/onerec', { onerec: result[0] })
    }
  })
})

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
  let query =
      'SELECT menucategory_id, cat_name FROM menucategories WHERE menucategory_id = ' +
      req.params.recordid
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      res.render('menucategories/editrec', { onerec: result[0] })
    }
  })
})

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
  res.render('menucategories/addrec');
})

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {
  let insertquery =
      'INSERT INTO menucategories (cat_name) VALUES (?)'
  db.query(
      insertquery,
      [
        req.body.menu_category_name
      ],
      (err, result) => {
        if (err) {
          console.log(err)
          res.render('error')
        } else {
          res.redirect('/menucategories/')
        }
      }
  )
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
  let updatequery =
      'UPDATE menucategories SET cat_name = ? WHERE menucategory_id = ' +
      req.body.menu_category_id
  db.query(
      updatequery,
      [
        req.body.menu_category_name
      ],
      (err, result) => {
        if (err) {
          console.log(err)
          res.render('error')
        } else {
          res.redirect('/menucategories')
        }
      }
  )
})



// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
  let query = "DELETE FROM menucategories WHERE menucategory_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/menucategories');
    }
  });
});

module.exports = router
