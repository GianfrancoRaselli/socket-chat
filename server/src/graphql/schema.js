const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// Import queries
const { profile, getUsersWithConversation, searchUsers, getMessagesBetweenUsers } = require('./queries');

// Import mutations
const { signUp, signIn } = require('./mutations');

// Define QueryType
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: { profile, getUsersWithConversation, searchUsers, getMessagesBetweenUsers }
});

// Define MutationType
const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: { signUp, signIn }
});

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})