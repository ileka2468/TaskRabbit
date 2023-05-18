var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let query =
      'SELECT service_id, title, description, price, delivery_time, homepage FROM gigs WHERE homepage = true'
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err)
      res.render('error')
    }
    res.render('index', { allrecs: result })
  })
})
module.exports = router;
