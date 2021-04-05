const db = require('../config/connect');

function _query(sql) {
    return new Promise((resolve, reject) => {
        db.connection.query(sql, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result);
        });
    })
}
module.exports = {_query};