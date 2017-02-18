# quotebot

This is a bot for Slack written to run on node.js. It uses a Google spreadsheet to store and retrieve quotes and post them to Slask general channel on command.

Required environment variables:
TOKEN: your slack bot token.
QUOTES_URL: the path to the google spreadsheet. Quotes must be stored in a worksheet called 'quotes'

## development

- install NodeJS ^6.0
- install dependencies: `npm install` (or if you have yarn installed, `yarn`. If not, don't worry.)
- run the app: `npm run dev`

## to do
[ ] add basic http response
[ ] deliver quotes to the channel the request was made in, rather than always general
[ ] add ability to save quotes
[ ] add ability to alias quotes and process quote aliases
