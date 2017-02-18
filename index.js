var express = require('express');
var config = require('./config');
var bot = require('./bot');

let app = express();
let port = config('PORT');

app.get('/', (req, res) => {
    res.send('\n 👋 🌍 \n');
});

app.listen(port, err => {
    console.info(`app listening on ${port}`);
});
