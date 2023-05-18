var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    let query = "SELECT title, description, price, delivery_time, service_id FROM gigs WHERE title LIKE '%" + req.query.searchcriteria + "%'";
// execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('search', {allrecs: result});
        }
    });
});
module.exports = router;