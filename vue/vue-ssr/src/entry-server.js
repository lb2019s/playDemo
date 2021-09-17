import { createApp } from './main'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router } = createApp()
        router.push(context.url)
        router.onReady(() => {
            resolve(app)
        }, reject)
    })
}