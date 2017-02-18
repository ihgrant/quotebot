'use strict';

const dotenv = require('dotenv');
const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') {
    dotenv.load();
}

const config = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    PROXY_URI: process.env.PROXY_URI,
    QUOTES_URL: process.env.QUOTES_URL,
    TOKEN: process.env.TOKEN
};

module.exports = key => {
    if (!key) {
        return config;
    }
    return config[key];
};
