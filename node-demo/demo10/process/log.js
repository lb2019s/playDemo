const util = require('util')

function log() {
    process.stdout.write(
        util.format.apply(util, arguments) + '\n'
    );
}

log(process.argv.slice(2).join('\n'))