function parseParm(url) {
    const params = /^.+\?(.+)$/.exec(url)[1]
    const paramsArr = params.split('&')
    const result = {}
    paramsArr.forEach(item => {
        if (/=/.test(item)) {
            let [key, val] = item.split('=')
            val = decodeURIComponent(val)
            if (Object.prototype.hasOwnProperty.call(result, key)) {
                result[key] = [].concat(result[key], val)
            } else {
                result[key] = val
            }
        } else {
            result[item] = true
        }
    })
    return result
}

console.log(parseParm('https://cn.bing.com/search?q=js+&qs=n&form=QBRE&sp=-1&=waaasc=1-9&sk=&clint&qs=o#home'))