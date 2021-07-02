const path = require('path')

const Multer  = require('multer')

function multer (params) {
    // const upload = multer({ dest: 'static/uploads/' })
    const storage = Multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'static/uploads')
        },
        filename: function (req, file, cb) {
            let extname = path.extname(file.originalname)
            cb(null, file.originalname + '-' + Date.now() + extname)
        }
    })
    
    return Multer({ storage: storage })
}

const tools = {
    multer
}

module.exports = tools