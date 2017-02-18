var SlackBot = require('slackbots');
var parseMessage = require('./parse');
var quotes = require('./quotes');
var config = require('./config');

// create a bot
var bot = new SlackBot({
    token: config('TOKEN'),
    name: 'Quotbot'
});

bot.on('start', function() {
    console.info('bot connected');
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    // var params = {
    //     icon_emoji: ':cat:'
    // };
    // // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    // bot.postMessageToChannel('general', 'meow!', params);
    // // define existing username instead of 'user_name'
    // bot.postMessageToUser('user_name', 'meow!', params);
    // // If you add a 'slackbot' property,
    // // you will post to another user's slackbot channel instead of a direct message
    // bot.postMessageToUser('user_name', 'meow!', {
    //     slackbot: true,
    //     icon_emoji: ':cat:'
    // });
    // // define private group instead of 'private_group', where bot exist
    // bot.postMessageToGroup('private_group', 'meow!', params);
});

bot.on('message', data => {
    if (data.type === 'message') {
        parseMessage(data.text)
            .then(response => {
                if (response) {
                    console.info(`quote delivered: ${response}`);
                    bot.postMessageToChannel('general', response, {});
                }
            })
            .catch(err => console.error(err.stack));
    }
});

bot.on('error', err => {
    console.error(err.message);
});
