const { GraphQLString, GraphQLList } = require('graphql');
const { UserType, MessageType } = require('./types');
const { User, Message } = require('../models/index');

const profile = {
    type: UserType,
    description: 'Profile',
    async resolve(parent, args, { verifiedUser, userId }) {
        if (!verifiedUser) {
            throw new Error('Acceso denegado');
        } else {
            return await User.findById(userId);
        }
    }
};

const getUsersWithConversation = {
    type: GraphQLList(UserType),
    description: 'Get Users With Conversation',
    async resolve(parent, args, { verifiedUser, userId }) {
        if (!verifiedUser) {
            throw new Error('Acceso denegado');
        } else {
            console.log(userId);
            const usersTo = await Message.find({ userFromId: userId }).distinct("userToId");
            const usersFrom = await Message.find({ userToId: userId }).distinct("userFromId");
            const usersId = usersTo.concat(usersFrom);
            return await User.find({ _id: { $in: usersId } });
        }
    }
};

const searchUsers = {
    type: GraphQLList(UserType),
    description: 'Get Users With Conversation',
    args: {
        username: { type: GraphQLString }
    },
    async resolve(parent, args, { verifiedUser, userId }) {
        if (!verifiedUser) {
            throw new Error('Acceso denegado');
        } else {
            const { username } = args;
            return await User.find({ username, _id: { $ne: userId } });
        }
    }
};

const getMessagesBetweenUsers = {
    type: GraphQLList(MessageType),
    description: 'Get Messages Between Users',
    args: {
        userWithId: { type: GraphQLString }
    },
    async resolve(parent, args, { verifiedUser, userId }) {
        if (!verifiedUser) {
            throw new Error('Acceso denegado');
        } else {
            const { userWithId } = args;
            return await Message.find({ userFromId: { $in: [userId, userWithId] }, userToId: { $in: [userId, userWithId] } });
        }
    }
};

module.exports = { profile, getUsersWithConversation, searchUsers, getMessagesBetweenUsers }