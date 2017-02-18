var _ = require('lodash');
var sheetrock = require('sheetrock');
var config = require('./config');

function request(query) {
    return new Promise((resolve, reject) => {
        sheetrock({
            url: `${config('QUOTES_URL')}#gid=quotes`,
            query: query,
            callback: (err, options, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            },
            reset: true
        });
    });
}

function get(quoteId) {
    return request(`SELECT C WHERE A LIKE '%0${quoteId}:%'`).then((
        { req, opts, raw, attr, rows, html }
    ) => {
        if (!_.first(rows)) {
            return `I didn't find a quote for that ID 😓`;
        }
        const cells = _.first(rows).cellsArray;
        return `>${_.first(cells)}`; // slack will format this as a quote
    });
}

function search(query) {
    return request(`SELECT A, C WHERE C LIKE '%${query}%'`).then((
        { req, opts, raw, attr, rows, html }
    ) => {
        // console.log(rows);
        if (!rows.length) {
            return `No quotes found matching '${query}'`;
        }

        if (rows.length === 1) {
            const cells = _.first(rows).cellsArray;
            return `>${_.first(cells)}`; // slack will format this as a quote
        }

        const cells = rows.map(el => ({ cells: el.cellsArray }));
        return `I found ${rows.length} quotes:
        ${rows.map(formatSearchResult).join('\n')}`; // slack will format this as a quote
    });
}

function formatSearchResult(row) {
    return `${_.replace(
        _.first(row.cellsArray[0].split(':')),
        /0/g,
        ''
    )}: ${row.cellsArray[1]}`;
}

module.exports = {
    get,
    search
};
// search('butt').then(rtn => console.log(rtn));
