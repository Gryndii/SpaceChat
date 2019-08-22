const isEmail = (string) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (string.match(regEx)) {
        return true;
    } else {
        return false;
    }
};
exports.isEmail = isEmail;

const isPassword = (string) => {
    if (string.length > 4) {
        return true;
    } else {
        return false;
    }
};
exports.isPassword = isPassword;

const isEmpty = (string) => {
    if (string.trim() === '') {
        return true;
    } else {
        return false;
    }
};
exports.isEmpty = isEmpty;

exports.validateSignUpData = (data) => {
    const errors = {};

    //TODO: validate data
    if (isEmpty(data.email)) {
        errors.email = 'Email must be not empty';
    } else if (!isEmail(data.email)) {
        errors.email = 'Email must be valid';
    }

    if (isEmpty(data.password)) {
        errors.password = 'Password must be not empty';
    } else if (!isPassword(data.password)) {
        errors.password = 'Password is not valid';
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords doesn`t match';
    }

    if (isEmpty(data.handle)) {
        errors.handle = 'Handle must be not empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0,
    };
};

exports.validateLoginData = (data) => {
    const errors = {};

    if (isEmpty(data.email)) {
        errors.email = 'Email must not be empty';
    }

    if (isEmpty(data.password)) {
        errors.password = 'Password must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0,
    };
};

exports.reduceUserDetails = (data) => {
    let userDetails = {};

    if(!isEmpty(data.bio)) {
        userDetails.bio = data.bio;
    }
    if(!isEmpty(data.website)) {
        userDetails.website = data.website;
    }
    if(!isEmpty(data.location)) {
        userDetails.location = data.location;
    }

    return userDetails;
};
