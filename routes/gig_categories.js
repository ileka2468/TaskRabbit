var express = require('express')
var router = express.Router()
var fetchoptions = require('./fetchoptions');
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
  let query =
    'SELECT gig_category_id, subcategory_id, gig_category FROM gig_categories'
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    }
    res.render('gigcategories/allrecords', { allrecs: result })
  })
})

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
  let query =
    'SELECT gig_category_id, subcategory_id, gig_category FROM gig_categories WHERE gig_category_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      res.render('gigcategories/onerec', { onerec: result[0] })
    }
  })
})

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
  let query =
    'SELECT gig_category_id, subcategory_id, gig_category FROM gig_categories WHERE gig_category_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      // console.log(result[0].description)
      fetchoptions("subcategories")
          .then((result1) =>{
            console.table(result);
            res.render('gigcategories/editrec', { onerec: result[0], subCat: result1 });
          }).catch((err) =>{
            console.log(err)
      });

    }
  })
})

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {

  fetchoptions("subcategories")
      .then((result)=>{
        // console.table(result);
        res.render('gigcategories/addrec', {subCat: result});
      }).catch((err)=>{
        console.log(err)
  });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {
  let insertquery =
      'INSERT INTO gig_categories (subcategory_id, gig_category) VALUES (?, ?)'
  db.query(
      insertquery,
      [
          req.body.subcategory_id,
          req.body.gig_category_name
      ],
      (err, result) => {
        if (err) {
          console.log(err)
          res.render('error')
        } else {
          res.redirect('/gigcategories/')
        }
      }
  )
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
  let updatequery =
    'UPDATE gig_categories SET subcategory_id = ?, gig_category = ? WHERE gig_category_id = ' +
    req.body.gig_category_id
  db.query(
    updatequery,
    [
      req.body.sub_category_id ,
      req.body.gig_category_name

    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.render('error')
      } else {
        res.redirect('/gigcategories')
      }
    }
  )
})



// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
  let query = "DELETE FROM gig_categories WHERE gig_category_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/gigcategories');
    }
  });
});

module.exports = router
