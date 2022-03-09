function counter() {
    const div = document.createElement('div')
    div.setAttribute('id', counter)
    div.innerHTML = 0
    div.onclick = function () {
        div.innerHTML = parseInt(div.innerHTML) + 1
    }
    document.body.append(div)
}

export default counter