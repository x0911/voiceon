const { Router } = require('express')
const router = Router()

router.use('/get-user-data', (req, res) => {
  res.json({ msg: 'User has been updated!', updatedKeys: req.keys && Array.isArray(req.keys) ? req.keys : null })
})

module.exports = router
