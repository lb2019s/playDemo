const xhr = new XMLHttpRequest()
xhr.open('get', '/users')
xhr.send()
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const res = xhr.responseText
        document.body.innerHTML = res
    }
}