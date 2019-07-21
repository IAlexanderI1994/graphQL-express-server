const axios = require('axios')

const {
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLSchema,
        GraphQLList,
        GraphQLNonNull,
      } = require('graphql')

// customers
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (customer) => customer.id
    },
    name: {
      type: GraphQLString,
      resolve: (customer) => customer.name
    },
    email: {
      type: GraphQLString,
      resolve: (customer) => customer.email
    },
    age: {
      type: GraphQLInt,
      resolve: (customer) => customer.age
    },

  })
})

// root query

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (parentValue, args) => axios
        .get(`http://localhost:3000/customers/${args.id}`)
        .then(({ data }) => data)

    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve: (parentValue, args) => axios.get(`http://localhost:3000/customers/`).then(({ data }) => data)
    }
  }

})

module.exports = new GraphQLSchema({
  query: RootQuery
})