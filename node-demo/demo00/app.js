process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`)
})
const arg = require('minimist')(process.argv.slice(2))
console.log(arg)

const oranges = ['橙子', '橙子']
const apples = ['苹果']
oranges.forEach(fruit => {
  console.count(fruit)
})
apples.forEach(fruit => {
  console.count(fruit)
})

const doSomething = () => console.log('测试')
const measureDoingSomething = () => {
  console.time('do')
  //做点事，并测量所需的时间。
  doSomething()
  console.timeEnd('do')
}
measureDoingSomething()

const ProgressBar = require('progress')

const bar = new ProgressBar(':bar', { total: 100 })
const timer = setInterval(() => {
  bar.tick()
  if (bar.complete) {
    clearInterval(timer)
  }
}, 100)