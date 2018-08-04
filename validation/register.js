const Validator = require('validator');

module.exports = function validateRegisterInput() {
    let errors = {};

    if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
        errors.first_name = 'First name must be between 2 and 30 characters';
    }
    if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
        errors.first_name = 'Last name must be between 2 and 30 characters';
    }

    return {
        errors,
        isValid: errors
    };
};
