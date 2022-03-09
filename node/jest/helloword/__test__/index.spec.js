test('测试 hello word', () => {
    const ret = require('../index')
    expect(ret)
        .toBe('hello word')
})