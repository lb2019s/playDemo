const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp')
console.log(xhr.readyState)
xhr.open('GET', '/info')
console.log(xhr.readyState)
xhr.onreadystatechange = function () {
    console.log(xhr.readyState)
    if (xhr.readyState !== 4) return
    if (xhr.status === 200) {
        document.body.append('success' + xhr.responseText)
    } else {
        document.body.append('error' + xhr.responseText)
    }
}
xhr.send()
console.log(xhr.readyState)