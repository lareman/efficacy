const Validator = require('validator');
const isEmpty = require('./is-empty.js');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    /**
     * Email: Is not empty and is valid email.
     */
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email address doesn't appear to be valid.";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    /**
     * Password:  Is not empty
     */
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password 1 is required.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
