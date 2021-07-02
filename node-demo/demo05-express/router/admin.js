const express = require('express')
const router = express.Router()

const userRouter = require('./admin/user')
const uploadRouter = require('./admin/upload')

router.get('/', (req, res) => {
    res.send('后台管理')
})
router.use('/user', userRouter)
router.use('/upload', uploadRouter)

module.exports = router