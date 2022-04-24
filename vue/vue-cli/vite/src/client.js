console.log('[ vite connecting... ]')

const host = location.host

const socket = new WebSocket(`ws://${host}`, 'vite-hmr')

socket.addEventListener('message', ({ data }) => {
    handleMessage(JSON.parse(data)).catch(console.error)
})

async function handleMessage(payload) {
    switch (payload.type) {
        case 'connected': {
            console.log('[vite] connected.')

            setInterval(() => socket.send('ping'), 30000)
            break
        }
        case 'update': {

        }
    }
}


const sheetsMap = new Map()
export function updateStyle(id, css) {
    let style = sheetsMap.get(id)
    if (!style) {
        style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = css
        document.head.appendChild(style)
    } else {
        style.innerHTML = css
    }
    sheetsMap.set(id, style)
}