const express        = require('express')
const expressGraphQL = require('express-graphql')
const app            = express()
const schema         = require('./schema')

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))
app.listen(8000, () => {
  console.log('Server is running on 8000')

})