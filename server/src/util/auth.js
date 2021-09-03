const jwt = require('jsonwebtoken');

const createJwtToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET || "tokentest", {
        expiresIn:  process.env.JWT_EXPIRES_IN
    })
};

module.exports = { createJwtToken }