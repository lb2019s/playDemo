const path = require('path')
const sd = require('silly-datetime')
const mkdir = require('mkdirp')

const Multer  = require('multer')

function multer (params) {
    // const upload = multer({ dest: 'static/uploads/' })
    const storage = Multer.diskStorage({
        destination: async function (req, file, cb) {
            let date = sd.format(new Date(), 'YYYYMMDD')
            let dir = path.join('static/uploads', date)
            await mkdir(dir)
            cb(null, dir)
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