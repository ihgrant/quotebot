var _ = require('lodash');
var sheetrock = require('sheetrock');

require('dotenv').config();

function get(quoteId) {
    return new Promise((resolve, reject) => {
        sheetrock({
            url: process.env.QUOTES_URL,
            query: `SELECT C WHERE A LIKE '%0${quoteId}:%'`,
            callback: (err, options, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            },
            reset: true
        });
    }).then(({ req, opts, raw, attr, rows, html }) =>
        _.first(_.first(rows).cellsArray));
}

module.exports = {
    get
};

get(98)
    .then(({ req, opts, raw, attr, rows, html }) =>
        console.info(_.first(_.first(rows).cellsArray)))
    .catch(err => console.error(err.message));
