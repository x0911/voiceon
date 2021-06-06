const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())

const getUserData = require('./get-user-data')
app.use(getUserData)

if (require.main === module) {
  const port = 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}

module.exports = app
