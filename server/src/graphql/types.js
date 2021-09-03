const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

const { User } = require('../models/index');

const LoginOutput = new GraphQLObjectType({
    name: "LoginOutput",
    fields: () => ({
        user: { type: UserType },
        token: { type: GraphQLString }
    }),
});

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User type",
    fields: () => ({
        _id: { type: GraphQLID },
        username: { type: GraphQLString },
        fullname: { type: GraphQLString }
    })
});

const MessageType = new GraphQLObjectType({
    name: "Message",
    description: "Message type",
    fields: () => ({
        _id: { type: GraphQLID },
        userFromId: { type: GraphQLString },
        userToId: { type: GraphQLString },
        message: { type: GraphQLString }
    })
});

module.exports = { UserType, MessageType, LoginOutput }