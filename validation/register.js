const Validator = require('validator');
const isEmpty = require('./is-empty.js');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    /**
     * First/Last name:  Is not empty and between 2 and 30 characters
     */
    if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
        errors.first_name = 'First name must be between 2 and 30 characters';
    }
    if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
        errors.last_name = 'Last name must be between 2 and 30 characters';
    }
    if (Validator.isEmpty(data.first_name)) {
        errors.first_name = 'First name is required';
    }
    if (Validator.isEmpty(data.last_name)) {
        errors.last_name = 'Last name is required';
    }
    /**
     * Email: Is not empty and is valid email.
     */
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email address doesn't appear to be valid.";
    }
    /**
     * Password:  Is not empty, greater than 6 characters,
     *            and 2nd password matches.
     */
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password 1 is required.';
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.first_name = 'Password must be between 2 and 30 characters';
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password = 'Password 2 is required.';
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords are not matching.';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
