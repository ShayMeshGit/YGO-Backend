const { buildSchema } = require('graphql');


const schema = buildSchema(`

    

    type Card {
        _id: ID!
        name: String!
        set: String!
        type: String!
        lowestPrice: Float!
        highestPrice: Float!
        currency: String!
        rarity: String!
        sold: Boolean!
    }

    type Query {
        cards: [Card!]
        card(id: ID!): Card 
    }

    type Mutation {
        changeStatus(id: ID!): Card!
    }

    schema {
        query: Query
        mutation: Mutation
    }
`);


module.exports = schema;