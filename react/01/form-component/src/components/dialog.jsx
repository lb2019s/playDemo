import React from 'react'
import { createPortal } from 'react-dom'

export default class Dialog extends React.Component {
    constructor(props) {
        super(props)
        this.node = document.createElement('div')
        document.body.appendChild(this.node)
    }

    componentWillUnmount() {
        document.body.removeChild(this.node)
    }

    render() {
        return createPortal(
            <div className='dialog'>
                <h4>title</h4>
                <div className='body'>body</div>
                <footer>footer</footer>
            </div>,
            this.node
        )
    }
}