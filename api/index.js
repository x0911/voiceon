const app = require('express')()
app.all('/api/form-submitted', (req, res) => {
  res.json({ data: 'data' })
})

module.exports = app
