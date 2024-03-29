'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.static(__dirname));
app.use(cookieParser());

const whitelist = ['http://localhost:3002', 'https://my-super-blog.netlify.app', 'https://vspaul.github.io'];
app.use(cors({
    origin: function (origin, callback) {
        console.log('ORIGIN MF', origin, whitelist.indexOf(origin), whitelist)
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS MF'))
        }
    },
    credentials: true,
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

require('./src/routes/posts.routes')(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});