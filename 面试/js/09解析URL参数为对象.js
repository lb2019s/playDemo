function parseParm(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1]
    const paramsArr = paramsStr.split('&')
    const paramsObj = {}
    paramsArr.forEach(param => {
        if (/=/.test(param)) {
            let [key, val] = param.split('=')
            val = decodeURIComponent(val)
            if (paramsObj.hasOwnProperty(key)) {
                paramsObj[key] = [].concat(paramsObj[key], val)
            } else {
                paramsObj[key] = val
            }
        } else {
            paramsObj[param] = true
        }
    })

    return paramsObj
}

console.log(parseParm('https://cn.bing.com/search?q=js+&qs=n&form=QBRE&sp=-1&=waaasc=1-9&sk=&clint&qs=o#home'))