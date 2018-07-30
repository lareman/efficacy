const express = require("express");
const router = express.Router();
/* GravatAAAR */
const gravatar = require("gravatar");
/* Load user model */
const User = require("../../../../models/User");
/* Load bcryptJS for password encryption */
const bcrypt = require("bcryptjs");

/**
 *  B E G I N    R O U T E S
 ****************************************************/

/**
 * @route:  GET api/users/test
 * @desc:   Test users route
 * @access: Public
 **/
router.get("/test", (req, res) => res.json({ msg: "Users Works!" }));
/**
 * @route:  POST api/users/register
 * @desc:   Register user
 * @access: Public
 **/
router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({
                email: "Email already exists.  Please use unique email address."
            });
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: "200", // Size
                r: "pg", // Rating
                d: "mm" // Default - Blank Avatar
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
router.post("/login", (req, res) => {
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
    User.findOne({ email }).then(user => {
        if (!user) {
            return res
                .status(404)
                .json({ email: "User name/password not found." });
        }
        // Check password with bcrypt compare
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                res.json({ msg: "This is where we return our JWT" });
            } else {
                return res
                    .status(400)
                    .json({ password: "User name/password not found." });
            }
        });
    });
});

/**
 *  E N d    R O U T E S
 ****************************************************/

module.exports = router;
