var _ = require('lodash');
var quotes = require('./quotes');

var triggers = ['!quote', 'quotebot', 'quotbot'];

function parseMessage(msg) {
    return Promise.resolve().then(() => {
        const [trigger, command, quoteId, ...rest] = _.split(msg, ' ');

        if (!trigger || !_.includes(triggers, trigger)) {
            return;
        }

        return processCommand(command, quoteId);
    });
}

function processCommand(command, quoteId) {
    if (!_.isNumber(Number(quoteId))) {
        throw new Error('quoteId is not a number.');
    }

    switch (command.toLowerCase()) {
        case 'get':
            return quotes.get(quoteId);
        default:
            throw new Error('command not matched');
    }
}

module.exports = parseMessage;
