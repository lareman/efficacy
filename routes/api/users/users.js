const express = require('express');
const router = express.Router();
/* GravatAAAR */
const gravatar = require('gravatar');
/* Load user model */
const User = require('../../../models/User');
/* Load bcryptJS for password encryption */
const bcrypt = require('bcryptjs');
/* JSON Web Token */
const jwt = require('jsonwebtoken');
/* For refresh token */
const randtoken = require('rand-token');
/* Keys n Stuff */
const keys = require('../../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../../validation/register');
const validateLoginInput = require('../../../validation/login');

/**
 *  B E G I N    R O U T E     D E F S
 ****************************************************/

/**
 * @route:  GET api/users/test
 * @desc:   Test users route
 * @access: Public
 **/
router.get('/test', (req, res) => res.json({ msg: 'Users Works!' }));
/**
 * @route:  POST api/users/register
 * @desc:   Register user
 * @access: Public
 **/
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            errors.email =
                'Email already exists.  Please use a unique email address.';
            return res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm' // Default - Blank Avatar
            });
            /**
             *  When creating a new resource with Mongoose, use the 'new'
             *  keyword with the model name that is imported and pass the
             *  data in as an object
             */
            const newUser = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                /**
                 * ES6 Note
                 *  avatar: req.body.avatar
                 *      can be substituted with
                 *  avatar
                 *      because names are the same
                 **/
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        // Save to MongoDB via Mongoose
                        .save()
                        .then(user => res.json(user))
                        // Catch error and display to console
                        .catch(err => console.log(err));
                });
            });
        }
    });
});
/**
 * @route:  POST api/users/login
 * @desc:   Login user and return JWT token
 * @access: Public
 **/
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    /**
     * Check for user
     * ES6 Note
     *  User.findOne({ email : email})
     *      can be substituted with
     *  User.findOne({ email })
     *      because names are the same
     **/

    /**
     *  TODO:  Need to store access and refresh token in MongodDB
     *         as an additional security measure
     **/
    User.findOne({ email }).then(user => {
        if (!user) {
            errors.email = 'User NAME/password combination not found.';
            return res.status(404).json(errors);
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched, create JWT payload
                const payload = {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    avatar: user.avatar
                };

                /**
                 * Refresh Token
                 * This is just a placeholder.  A refresh token is not necessary for front-end
                 * interface?  Will use for the raw API usage part of the app, tho.
                 */
                var refresh_token = randtoken.uid(512);

                // Sign JWT Token
                jwt.sign(
                    payload,
                    keys.jwtTokenUserSecret,
                    { expiresIn: keys.jwtTokenUserLifeTime },
                    (err, token) => {
                        res.json({
                            success: true,
                            id: user.id,
                            token: 'Bearer ' + token,
                            refresh_token
                        });
                    }
                );
            } else {
                /**
                 *  Placeholder for now:  Should not reveal specifically
                 *  what doesn't match
                 **/
                errors.password = 'User name/PASSWORD combination not found.';
                return res.status(404).json(errors);
            }
        });
    });
});
/**
 * @route:  GET api/users/current
 * @desc:   Returns current user
 * @access: Private
 **/
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json(req.user);
    }
);

/**
 *  E N d    R O U T E     D E F S
 ****************************************************/

module.exports = router;
