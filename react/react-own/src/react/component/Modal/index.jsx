import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './index.less'
function Modal(props) {
    const [node] = useState(document.createElement('div'))
    useEffect(() => {
        document.body.appendChild(node)
        return () => {
            document.body.removeChild(node)
        }
    }, [])
    return createPortal(<Dialog {...props} />, node)
    // return <Dialog {...props} />
}

function Dialog(props) {
    const { title, visible, onOk, onCancel } = props
    console.log('visible', visible)
    return (
        <div style={{ display: visible ? 'block' : 'none', background: "#EF0000" }}>
            <div className="modal">
                <div className="dialog">
                    <div className="header">{title}</div>
                    <div className="content">{props.children}</div>
                    <div className="footer">
                        <button onClick={onOk}>取消</button>
                        <button onClick={onCancel}>确认</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Modal