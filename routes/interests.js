var express = require('express')
const fetchoptions = require("./fetchoptions");
var router = express.Router()
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function (req, res, next) {
  let query =
    'SELECT user_id, category_id FROM interests'
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    }
    res.render('interests/allrecords', { allrecs: result })
  })
})

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
  let query =
    'SELECT user_id, category_id FROM interests WHERE user_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      res.render('interests/onerec', { onerec: result[0] })
    }
  })
})

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
  let userRes;
  let catRes;
  let query =
    'SELECT user_id, category_id FROM interests WHERE user_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result1) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      // console.log(result[0].description)
      fetchoptions("users")
        .then((result)=>{
          userRes = result;
          return fetchoptions("categories")
        }).then((result) =>{
          catRes = result;
          res.render('interests/editrec', { onerec: result1[0], users: userRes, cat : catRes })
        }).catch((err) =>{
          console.error(err);
      });

    }
  })
})

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
  let userRes;
  let catRes;
  fetchoptions("users")
      .then((result)=>{
        userRes = result;
        return fetchoptions("categories")
      }).then((result) =>{
        catRes = result;
        res.render('interests/addrec', {users: userRes, cat : catRes })
      }).catch((err) =>{
        console.error(err);
      });
});

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {
  let insertquery =
    'INSERT INTO interests (user_id, category_id) VALUES (?, ?)'
  db.query(
    insertquery,
    [
      req.body.user_id,
      req.body.category_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.render('error')
      } else {
        res.redirect('/interests/')
      }
    }
  )
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
  let updatequery =
    'UPDATE interests SET user_id = ? WHERE user_id = ' +
    req.body.user_id
  db.query(
    updatequery,
    [
      req.body.user_id
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.render('error')
      } else {
        res.redirect('/interests')
      }
    }
  )
})



// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
  let query = "DELETE FROM interests WHERE user_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/interests/');
    }
  });
});

module.exports = router
