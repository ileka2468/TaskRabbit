var express = require('express')
var router = express.Router()
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================

router.get('/', function (req, res, next) {
  let query =
    "SELECT user_id, firstname, lastname, email, password, type FROM users"
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    }
    res.render('users/allrecords', { allrecs: result })
  })
})

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function (req, res, next) {
  let query =
    'SELECT user_id, firstname, lastname, email, password, type FROM users WHERE user_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      res.render('users/onerec', { onerec: result[0] })
    }
  })
})

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function (req, res, next) {
  let query =
    'SELECT user_id, firstname, lastname, email, password, type FROM users WHERE user_id = ' +
    req.params.recordid
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    } else {
      res.render('users/editrec', { onerec: result[0] })
    }
  })
})

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function (req, res, next) {
  res.render('users/addrec')
})

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function (req, res, next) {
  let insertquery =
    'INSERT INTO users (firstname, lastname, email, password, type) VALUES (?, ?, ?, ?, ?)'
  db.query(
    insertquery,
    [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.password,
      req.body.type
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.render('error')
      } else {
        res.redirect('/users')
      }
    }
  )
})

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function (req, res, next) {
  let updatequery =
    'UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ?, type = ? WHERE user_id = ' +
    req.body.user_id
  db.query(
    updatequery,
    [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.password,
      req.body.type
    ],
    (err, result) => {
      if (err) {
        console.log(err)
        res.render('error')
      } else {
        res.redirect('/users')
      }
    }
  )
})



// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function (req, res, next) {
  let query = "DELETE FROM users WHERE user_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/users');
    }
  });
});

module.exports = router
