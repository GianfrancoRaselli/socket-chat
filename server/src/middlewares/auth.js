const jwt = require('jsonwebtoken');
const { User } = require('../models/index');

const authenticate = async (req, res, next) => {
    if (!req.headers.authorization) {
        req.verifiedUser = false;
    } else {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            req.verifiedUser = false;
        } else {
            try {
                const payload = jwt.verify(token, process.env.TOKEN_SECRET || "tokentest");
                const user = await User.findById(payload._id);
                if (user === null) {
                    req.verifiedUser = false;
                } else {
                    req.userId = user._id;
                    req.verifiedUser = true;
                }
            } catch (e) {
                req.verifiedUser = false;
            }
        }
    };
    next();
};

module.exports = { authenticate }