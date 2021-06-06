const { Router } = require('express')
const router = Router()

router.use('/get-user-data', (req, res) => {
  res.json({ user: { name: 'Hamdi Mohamed', email: 'test@voiceon.com' } })
})

module.exports = router
