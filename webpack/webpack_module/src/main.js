import React, { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import loadComponent from './loadCompoentAsync'
// const Async = lazy(() => import('./Async'))
const Async = loadComponent(() => import('./Async'))
const App = () => {
    return (
        <div>
            哇哈哈--00
            {/* <Suspense>
                <Async />
            </Suspense> */}
            <Async />
        </div>
    )
}
const root = createRoot(document.getElementById('root'))
root.render(<App />)
if (module.hot) {
    module.hot.accept(App, () => {
        root.render(<App />);
    });
}