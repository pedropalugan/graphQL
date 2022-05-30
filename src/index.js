const { gql, ApolloServer } = require('apollo-server')

let books = []

const typeDefs = gql `
    type Book {
        id: ID!
        title: String
        publishedAt: Int
    }

    type Query {
        books: [Book]
        book(id: ID): Book
    }

    type Mutation {
        create(id: ID!, title: String!, publishedAt: Int!): Book
        delete(id: ID!): Boolean
        update(id: ID!, title: String, publishedAt: Int!): Book
    }
`;


const resolvers = {
    Query:{
        books: () => {
            return books
        },
        book: (_, { id }) => {
            return books.find(book => book.id === id)
        },
    },
    Mutation: {
        create: (_, { id, title, publishedAt}) => {
            const book = { id, title, publishedAt };
            books.push(book)
            return book;
        },
        delete: (_, { id }) => {
            const filteredBooks = books.filter(book => book.id !== id)
            books = filteredBooks
            return true;
        },
        update: (_, { id, title, publishedAt }) => {
            const book = books.find(book => book.id === id)
            book.id = book.id
            book.title = title ? title : book.title
            book.publishAt = publishedAt ? publishedAt : book.publishedAt
            return book;
        },
    },
};


const app = new ApolloServer({ typeDefs, resolvers })

app.listen().then(({url}) => console.log('Server Runing on ' + url))