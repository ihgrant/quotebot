var _ = require('lodash');
var sheetrock = require('sheetrock');

function get(quoteId) {
    return new Promise((resolve, reject) => {
        sheetrock({
            url: `${process.env.QUOTES_URL}#gid=quotes`,
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
    }).then(({ req, opts, raw, attr, rows, html }) => {
        if (!_.first(rows)) {
            return '';
        }
        const cells = _.first(rows).cellsArray;
        return _.first(cells);
    });
}

module.exports = {
    get
};
