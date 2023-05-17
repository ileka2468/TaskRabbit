var express = require('express')
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('reports')
})

router.get('/customers', function (req, res, next) {

    let query = "SELECT user_id, firstname, lastname, email, password, type FROM users"
    db.query(query, (err, results) =>{
        if (err){
            console.log(err)
            res.render('error')
        }
        console.log(results)
        res.render('subreports/customerreport', {records: results})
    })



})





module.exports = router