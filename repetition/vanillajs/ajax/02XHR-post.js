const xhr = new XMLHttpRequest()
xhr.open('post', '/users')
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send(JSON.stringify({ id: 001 }))
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseType)
        const res = xhr.responseText
        document.body.innerHTML = res
    }
}