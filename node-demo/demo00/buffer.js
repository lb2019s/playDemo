const buf = Buffer.from('Hey!')
console.log(buf.toString())
for(const item of buf) {
    console.log(item)
}
const buffer = Buffer.alloc(4)
console.log(buffer[0])
buffer.write('hello')
console.log(buffer.toString())

const bufCopy = Buffer.allocUnsafe(4)
buf.copy(bufCopy)
console.log(bufCopy.toString())
bufCopy[2] = 123
console.log(bufCopy.toString())
bufCopy[1] = 111
console.log(bufCopy.toString())

console.log(bufCopy.slice(0, 2).toString())
