/* Web server */
const express = require('express');
/* Mongoose - ODM (Object Data Modeler) for MongoDB */
const mongoose = require('mongoose');
/* Use passport to read jwt tokens */
const passport = require('passport');
/* DB Config */
const db = require('./config/keys').mongoURI;
/* Define Express as app */
const app = express();
/**
 *   Define Express port to use
 *   process.env.PORT is for an environment variable
 *   that has been previously defined.  Mostly used
 *   for hosting services such as Heroku, Amazon, Nodejitsu, etc
 **/
const port = process.env.PORT || 5000;
/* Bring in routes to use */

const users = require('./routes/api/users/users');
const posts = require('./routes/api/posts');
/* BodyParser for posts */
const bodyParser = require('body-parser');

/* Connect to MondoDB */
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

/* 

/****************************************************
 *  M I D D L E W A R E    S E C T I O N    B E G I N
 */

/* Body Parser */
app.use(bodyParser.urlencoded({ extended: false }));
/* API users JSON */
app.use(bodyParser.json());
/**
 *  Passport
 *  /routes/api/users/for_users/users.js
 * */
app.use(passport.initialize());
require('./config/passport')(passport);

/*
 *  M I D D L E W A R E    S E C T I O N    E N D
 ****************************************************/

/**
 *  Define the root of our Routes so we don't have to
 *  type the entire path in our route files
 */
app.use('/api/users', users);
app.use('/api/posts', posts);

// app.get("/", (req, res) => res.send("Hello World"));

/* Start server */
app.listen(port, () => console.log(`Server running on port ${port}`));
