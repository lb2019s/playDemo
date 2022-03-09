// test('测试 生成文件名', () => {
//     const testNow = new (require('../index'))()
//     const ret = testNow.getTestFileName('/abc/index.js')
//     expect(ret)
//         .toBe('/abc/__test__/index.spec.js')
// })
// test('测试 生成测试代码', () => {
//     const testNow = new (require('../index'))()
//     const ret = testNow.getTestSource('a', 'test')
//     // console.log('ret', ret);
//     expect(ret)
//         .toBe(`
//         test("TEST a", () => {
//             const a = require("../test")
//             const ret = a()
//             // expect(ret)
//             // .toBe()
//         })
//         `)
// })

const fs = require('fs')
test('集成测试', () => {
    if (fs.existsSync(__dirname + '/data/__test__')) {
        fs.rmdirSync(__dirname + '/data/__test__', {
            recursive: true
        })
    }

    const testNow = new (require('../index'))()
    testNow.genJestSource(__dirname + '/data')
})