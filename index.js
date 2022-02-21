// this js file will house our schema

// 1. create apollo-server, a nodejs implementation of a graphql server
const { ApolloServer, gql } = require('apollo-server');
const { MockList, addMocksToSchema } = require("@graphql-tools/mock");

// 2. create type definitions, schema using gql function from apollo-server
// it will take schema string and turn it into an abstract syntax tree
const typeDefs = gql`

    # Custom Scalar Types
    scalar Date

    # START Object Types

    # documentation
    """
    An object that describes the characteristics of a ski day
    """
    type SkiDay {
        "A ski day's unique identifier"
        id: ID!
        
        "The date that a ski day occured"
        date: Date!
        
        "The location where the ski day occured"
        mountain: String!

        "The shape that the snow was in when the ski day occured"
        condition: Conditions
    }

    type RemoveDayPayload {
        day: SkiDay!
        removed: Boolean!
        totalBefore: Int
        totalAfter: Int
    }
    # END Object Types

    # START Input Types
    input AddDayInput {
        date: Date!
        mountain: String!
        condition: Conditions
    }
    # END Input Types

    # Enum Types
    enum Conditions {
        POWDER
        HEAVY
        ICE
        THIN
    }

    # Query Types
    type Query {
        totalDays: Int!
        allDays: [SkiDay!]!
    }

    # Mutation Types
    type Mutation {
        addDay(input: AddDayInput!): SkiDay!
        # removeDay(id: ID!): SkiDay!
        removeDay(id: ID!): RemoveDayPayload!
    }
`;

// 3. functions that return data for the schema 
const resolvers = {

};

// Mock responses for the schema
const mocks = {
    Date: () => new Date().toDateString(),
    String: () => 'Mock String',
    Query: () => ({
        allDays: () => new MockList([1,5])  // randome number of response objects between 1 and 5
    })
};
    

// 4. create an instance of the apollo server
const server = new ApolloServer({
    typeDefs,
    // resolvers,
    // mocks: true     // returns mock data without a real data source 
    mocks
});

//. 5. start the server
server
    .listen()
    .then(({ url }) =>
        console.log(`🚀 Server running at ${url}`)
    );

// 6. add a start script to package.json