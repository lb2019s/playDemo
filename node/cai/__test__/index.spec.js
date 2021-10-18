const fs = require('fs')
test('集成测试', () => {
    if (fs.existsSync(__dirname + '/data/__test__')) {
        fs.rmdirSync(__dirname + '/data/__test__', {
            recursive: true
        })
    }
    

    const src = new (require('../index'))()
    src.getJestSource(__dirname + '/data')
})


// test('测试 getTestFileName', () => {
//     const src = new (require('../index'))
//     const ret = src.getTestFileName('/abc/class.js')
//     expect(ret)
//         .toBe('/abc/__test__/class.spec.js')
// })

// test('测试 getTestSource', () => {
//     const src = new (require('../index'))
//     const ret = src.getTestSource('fun', 'class')
//     console.log('getTestSource', ret)
//     expect(ret)
//         .toBe(`
// test('TEST fun'', () => {
//     const fun = require('../class')
//     const ret = fun()
//     // expect(ret)
//     //  .toBe('test return')
// })
//         `)
// })