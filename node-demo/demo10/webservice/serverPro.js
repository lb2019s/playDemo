const fs = require('fs')
const path = require('path')
const http = require('http')

const MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

function validateFiles(pathnames, callback) {
    (function next(i, len) {
        if (i < len) {
            fs.stat(pathnames[i], (err, stat) => {
                if (err) {
                    callback(err)
                } else if (!stat.isFile()) {
                    callback(new Error())
                } else {
                    next(i + 1, len)
                }
            })
        } else {
            callback(null, pathnames)
        }
    }(0, pathnames.length))
}

function outputFiles(pathnames, writer) {
    (function next(i, len) {
        if (i < len) {
            let reader = fs.createReadStream(pathnames[i])
            reader.pipe(writer, { end: false })
            reader.on('end', () => {
                next(i + 1, len)
            })
        } else {
            writer.end()
        }
    }(0, pathnames.length))
}

function main(argv) {
    let config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
        root = config.root || '.',
        port = config.port || 80,
        server;

    server = http.createServer(function (request, response) {
        let urlInfo = parseURL(root, request.url);

        validateFiles(urlInfo.pathnames, function (err, pathnames) {
            if (err) {
                response.writeHead(404);
                response.end(err.message);
            } else {
                response.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                outputFiles(pathnames, response);
            }
        });
    }).listen(port);


    process.on('SIGTEAM', () => {
        server.close(() => {
            process.exit(0)
        })
    })
}

function parseURL(root, url) {
    let base, pathnames, parts;

    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??');
    }

    parts = url.split('??');
    base = parts[0];
    pathnames = parts[1].split(',').map(function (value) {
        return path.join(root, base, value);
    });

    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    };
}

main(process.argv.slice(2));