const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLSchema,
        GraphQLList,
        GraphQLNonNull,
      } = require('graphql')

const customers = [
  { id: '1', name: 'Alex', email: 'alex@ya,ru', age: 27 },
  { id: '2', name: 'Brad', email: 'Brad@ya,ru', age: 22 },
  { id: '3', name: 'John', email: 'jj@ya,ru', age: 35 }
]
// root query

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },

  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {

        return customers.find(customer => customer.id === args.id) || null

      }
    }
  }


})

module.exports = new GraphQLSchema({
  query: RootQuery
})