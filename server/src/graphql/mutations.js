const { GraphQLString } = require('graphql');
const { LoginOutput } = require('./types');
const { User } = require('../models/index');
const { createJwtToken } = require('../util/auth');
const { encryptPassword, matchPassword } = require('../util/encryptPassword');

const signUp = {
    type: LoginOutput,
    description: 'SignUp',
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        fullname: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const { username, password, fullname } = args;
        const encryptedPassword = await encryptPassword(password);
        const user = new User({ username, password: encryptedPassword, fullname });
        await user.save();

        const token = createJwtToken(user);

        return {
            user,
            token
        };
    }
};

const signIn = {
    type: LoginOutput,
    description: 'SignIn',
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const { username, password } = args;
        const user = await User.findOne({ username }).select('+password');
        if (!user) {
            throw new Error('Username or password is wrong');
        } else {
            const validPassword = await matchPassword(password, user.password || "");
            if (!validPassword) {
                throw new Error('Username or password is wrong');
            } else {
                const token = createJwtToken(user);

                return {
                    user,
                    token
                };
            }
        }
    }
};

module.exports = { signUp, signIn }