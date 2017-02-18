var _ = require('lodash');
var quotes = require('./quotes');

var triggers = ['!quote', 'quotebot', 'quotbot'];

function parseMessage(msg) {
    return Promise.resolve().then(() => {
        const [trigger, command, input, ...rest] = _.split(msg, ' ');

        if (!trigger || !_.includes(triggers, trigger)) {
            return;
        }

        return processCommand(command, input);
    });
}

function processCommand(command, input) {
    switch (command.toLowerCase()) {
        case 'get':
            if (!_.isNumber(Number(input))) {
                throw new Error('quoteId is not a number.');
            }
            return quotes.get(input);
        case 'search':
            return quotes.search(input);
        default:
            throw new Error('command not matched');
    }
}

module.exports = parseMessage;
