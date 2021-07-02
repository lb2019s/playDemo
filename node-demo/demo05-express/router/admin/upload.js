
const express = require('express')
const router = express.Router()
const { multer } = require('../../model/tools')

router.post('/', multer().single('pic'), (req, res) => {
    let body = req.body
    res.send({body, file: req.file})
})

module.exports = router