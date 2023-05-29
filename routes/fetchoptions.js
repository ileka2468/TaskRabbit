const  fetchOptions = (table) => {

    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM ${table}`
        db.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};


module.exports = fetchOptions;