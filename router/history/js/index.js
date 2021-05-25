
import Route from './route.js'

new Route([
    {
        path: '/',
        component: 'who'
    },
    {
        path: '/yang',
        component: '杨'
    },
    {
        path: '/da',
        component: '达'
    }
], document.getElementById('content'))