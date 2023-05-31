var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
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

router.get('/login', (req, res, next)=>{
  res.render('users/login');
});

router.get('/register', (req, res, next)=>{
  res.render('users/register');
});

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
  let insertquery = 'INSERT INTO users (firstname, lastname, email, password, type) VALUES (?, ?, ?, ?, ?)';

  bcrypt.genSalt(10, (err, salt) =>{
    bcrypt.hash(req.body.password, salt, (err, hashedpw)=>{
      if (err) {res.render('error');}

      db.query(
          insertquery,
          [
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            hashedpw,
            req.body.type
          ],
          (err, result) => {
            if (err) {
              console.log(err)
              res.render('error')
            } else {
              res.render('/users/login', {message: "Account created, login to continue."})
            }
          }
      );

    });
  });
});

// ==================================================
// Route Check Login Credentials
// ==================================================


router.post('/login', function(req, res, next) {
  console.log(req.body.email);
  let query = "SELECT user_id, firstname, lastname, password, type FROM users WHERE email = ?";

  db.query(query, [req.body.email], (err, result) => {
    if (err) {
      res.render('error');
      console.log(err);
    } else {
      if (result[0]){
        // username correct, check pw
        bcrypt.compare(req.body.password, result[0].password, (err, passwordMatches)=>{
          if (passwordMatches){
            // user id session var
            req.session.user_id = result[0].user_id
            // name session var
            req.session.username = `${result[0].firstname} ${result[0].lastname}`;
            res.redirect('/');
          } else {
            res.render('users/login', {message: "Check your credentials and try again."})
          }
        });

      } else{
        console.log("No match", result)
        res.render('users/login', {message: "This user does not exist. Please try again."})
      }
    }
  });
});

// ==================================================
// Route Check Login Credentials
// ==================================================
router.get('/logout', function(req, res, next) {
  req.session.user_id = 0;
  req.session.username = "";
  req.session.cart=[];
  req.session.qty=[];
  res.redirect('/');
});


// router.post('/login', function(req, res, next) {
//   console.log(req.body.email)
//   let query = "select user_id, firstname, lastname, password, type from users WHERE email = " + req.body.email;
//   // execute query
//
//   db.query(query, (err, result) =>{
//     if (err){
//       res.render('error')
//       console.log(err)
//     } else{
//
//         if (result[0]){
//           console.log(result[0])
//             // username correct, check pw
//             bcrypt.compare(req.body.password, result[0].password, (err, passwordMatches)=>{
//               if (passwordMatches){
//                 // user id session var
//                 req.session.user_id = result[0].user_id
//                 // name session var
//                 req.session.custname = `${result[0].firstname} ${result[0].lastname}`;
//                 res.redirect('/');
//               } else {
//                 res.render('users/login', {message: "Check your credentials and try again."})
//               }
//             });
//
//         } else{
//             console.log("No match", result)
//             res.render('users/login', {message: "This user does not exist. Please try again."})
//         }
//     }
//
//   });
//
// });

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
