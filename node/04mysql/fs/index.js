const fs = require('fs')

const set = (key, val) => {
    fs.readFile('./db.json', (err, data) => {
        const json = data ? JSON.parse(data) : {}
        json[key] = val
        fs.writeFile('./db.json', JSON.stringify(json), err => {
            if (err) {
                console.log('w文件写入失败！');
                return
            }
            console.log('写入成功');
        })
    })
}

const get = (key) => {
    fs.readFile('./db.json', (err, data) => {
        const json = JSON.parse(data)
        console.log(json[key]);
    })
}

const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('line', input => {
    const [op, key, val] = input.split(' ')
    if (op === 'get') {
        get(key)
    } else if (op === 'set') {
        set(key, val)
    } else if (op === 'exit') {
        rl.close()
    } else {
        console.log('没有该操作');
    }
})

rl.on('close', () => {
    console.log('bey');
    process.exit(0)
})