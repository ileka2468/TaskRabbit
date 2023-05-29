var express = require('express');
var fetchOptions = require('./fetchoptions');
var router = express.Router();

// Route to list all records.
router.get('/', function (req, res, next) {
    let query = 'SELECT review_id, user_id, service_id, reviewdate, rating, status FROM Reviews';
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        }
        res.render('reviews/allrecords', { allrecs: result });
    });
});

// Route to view one specific record.
router.get('/:recordid/show', function (req, res, next) {
    let query = 'SELECT review_id, user_id, service_id, reviewdate, rating, status FROM Reviews WHERE review_id = ' + req.params.recordid;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.render('reviews/onerec', { onerec: result[0] });
        }
    });
});

// Route to add a new review.
router.get('/addrecord', function (req, res, next) {
    let userResult;
    let serviceResult;

    fetchOptions("users")
        .then((result) => {
            userResult = result;
            return fetchOptions("gigs")
        })
        .then((result) => {
            serviceResult = result;
            res.render('reviews/addrec', { userRecs: userResult, serviceRecs: serviceResult })
        })
        .catch((err) => { console.log(err) })
});


// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:review_id/edit', function (req, res, next) {
    let userResult;
    let serviceResult;
    let query =
        'SELECT review_id, user_id, service_id, reviewdate, rating, status FROM Reviews WHERE review_id = ' +
        req.params.review_id;
    // execute query
    db.query(query, (err, result1) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            fetchOptions("users")
                .then((result) => {
                    userResult = result;
                    return fetchOptions("gigs")
                })
                .then((result) => {
                    serviceResult = result;
                    res.render('reviews/editrec', { onerec: result1[0], userRecs: userResult, serviceRecs: serviceResult })
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
});


// Route to obtain user input and save in database.
router.post('/', function (req, res, next) {
    let insertquery = 'INSERT INTO Reviews (user_id, service_id, reviewdate, rating, status) VALUES (?, ?, ?, ?, ?)';
    db.query(
        insertquery,
        [
            req.body.user_id,
            req.body.service_id,
            req.body.reviewdate,
            req.body.rating,
            req.body.status,
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                res.render('error');
            } else {
                res.redirect('/reviews');
            }
        }
    );
});


router.post('/save', function (req, res, next) {
    let updatequery =
        'UPDATE Reviews SET user_id = ?, service_id = ?, reviewdate = ?, rating = ?, status = ? WHERE review_id = ' +
        req.body.review_id
    db.query(
        updatequery,
        [
            req.body.user_id,
            req.body.service_id,
            req.body.reviewdate,
            req.body.rating,
            req.body.status
        ],
        (err, result) => {
            if (err) {
                console.log(err)
                res.render('error')
            } else {
                res.redirect('/reviews')
            }
        }
    )
})


// Route to delete one specific record.
router.get('/:recordid/delete', function (req, res, next) {
    let query = 'DELETE FROM Reviews WHERE review_id = ' + req.params.recordid;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/reviews');
        }
    });
});

module.exports = router;
