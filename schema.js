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

// mutations

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt),
        },

      },
      resolve (parentValue, args) {
        return axios.post('http://localhost:3000/customers', {
          name: args.name,
          email: args.email,
          age: args.age,

        }).then(({ data }) => data)

      }
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
        name: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString
        },
        age: {
          type: GraphQLInt,
        },

      },
      resolve (parentValue, args) {
        return axios.patch(`http://localhost:3000/customers/${args.id}`, args).then(({ data }) => data)

      }
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve (parentValue, args) {
        return axios.delete(`http://localhost:3000/customers/${args.id}`).then(({ data }) => data)

      }
    },
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})