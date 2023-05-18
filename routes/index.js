var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
  let query = "SELECT service_id, title, description, price, delivery_time, gigimage FROM gigs WHERE homepage = true";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }

    let query = "SELECT promotion_id, promotitle, promoimage FROM promotions WHERE startdate <= CURRENT_DATE() and enddate >= CURRENT_DATE() ";
    // execute query
    db.query(query, (err, result2) => {
      if (err) {
        console.log(err);
        res.render('error');
      }
      console.log("Promos is " + result2[0].promotitle)
      res.render('index', {allrecs: result , promolist: result2});
    });
  });


});


module.exports = router;

