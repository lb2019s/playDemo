const list = document.getElementById('list')

list.addEventListener('click', function (event) {
    const e = event || window.event
    const target = e.target || e.srcElement
    const currentTarget = e.currentTarget || this
    if (target.nodeName.toLowerCase() === 'li') {
        console.log('li', target.innerHTML)
    }
})