'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const db = require('./src/models');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(cors())
// app.use(cors({
//     origin: process.env.COOKIE_PATH_ENV,
//     credentials: true,
// }));

// parse requests of content-type - application/json
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));
// app.use(express.static("./src/salonPictures"));
// app.use('/dashboard', express.static(__dirname));

require('./src/routes/posts.routes')(app);
// require('./src/routes/content.routes')(app);
// require('./src/routes/stripe.routes')(app);
// require('./src/routes/dashboard.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// db.sequelize
//     .sync({ alter: true })
//     .then(() =>
//         app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
//     );

// db.sequelize
//     .sync({ force: true })
//     .then(() =>
//         app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
//     );

// npx sequelize-auto -o ./src/models/ -d csyes -h localhost -u root -p 3306 -x Newbeginning888! -e mysql