const bodyParser = require('body-parser')
// const cors = require('cors')
const express = require('express')
const app = express()

// app.use(
//   cors({
//     origin: "*", // Allow everything
//   })
// )

app.use(bodyParser.json())

const getUserData = require('./get-user-data')
app.use(getUserData)

const updateUserData = require('./update-user-data')
app.use(updateUserData)

if (require.main === module) {
  const port = 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}

module.exports = app
