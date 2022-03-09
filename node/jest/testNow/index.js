const fs = require('fs')
const path = require('path')
module.exports = class TestNow {
    /**
     * 
     * @param {*} methodName 
     * @param {*} classFile 
     * @param {*} isClass 
     * @returns 
     */
    getTestSource(methodName, classFile, isClass = false) {
        return `
        test("TEST ${methodName}", () => {
            const ${ isClass ? '{' + methodName + '}' : methodName } = require("../${classFile}")
            const ret = ${methodName}()
            // expect(ret)
            // .toBe()
        })
        `
    }
    /**
     * 生成测试文件名
     * @param {*} fileName 
     * @returns 
     */
    getTestFileName(fileName) {
        const dirName = path.dirname(fileName)
        let baseName = path.basename(fileName)
        const extName = path.extname(fileName)
        baseName = baseName.replace(extName, `.spec${extName}`)
        return path.format({
            root: dirName + '/__test__/',
            base: baseName
        })
    }

    /**
     * 
     * @param {*} sourcePath 
     */
    genJestSource(sourcePath = path.resolve('./')) {
        const testPath = path.resolve(sourcePath, '__test__')
        if (!fs.existsSync(testPath)) {
            fs.mkdirSync(testPath)
        }

        const list = fs.readdirSync(sourcePath)
        list
            .map(v => sourcePath + '/' + v)
            .filter(v => fs.statSync(v).isFile())
            .filter(v => v.indexOf('.spec') === -1)
            .forEach(v => this.genTestFile(v))
    }

    /**
     * 
     * @param {*} fileName 
     * @returns 
     */
    genTestFile(fileName) {
        console.log('filename', fileName)
        const testname = this.getTestFileName(fileName)
        if (fs.existsSync(testname)) {
            return
        }

        const model = require(fileName)
        let source
        if (typeof model === 'object') {
            source = 
                Reflect.ownKeys(model)
                    .map(method => this.getTestSource(method, path.basename(fileName), true))
                    .join('\r\n')
        } else if (typeof model === 'function') {
            const basename = path.basename(fileName)
            source = this.getTestSource(basename.replace('.js', ''), basename)
        }
        fs.writeFileSync(testname, source)
    }
}