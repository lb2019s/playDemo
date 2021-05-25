const http = require('http');
const fs = require('fs');
const path = require('path')

const MIME = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css',
    '.js': 'application/javascript'
}


http.createServer(function (req, res) {
    console.log('req.url', req.url)
    let filepath = '.' + req.url;
    console.log('extname', path.extname(filepath))
    if (filepath === './') {
        filepath = './index.html';
    }

    readFile(filepath, res);
}).listen(3000);

function readFile(pathName, res) {
    fs.readFile(pathName, 'utf-8', function (err, data) {
        if (err) {
            readFile('./index.html', res);
        } else {
            res.writeHead(200, {
                'Content-Type': MIME[path.extname(pathName)] || 'text/plain'
            });
            res.end(data);
        }
    });
}

console.log('Server running at http://127.0.0.1:3000/');