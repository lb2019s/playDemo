import React, { useState } from 'react'
import Modal from './component/Modal'
// import App from './event-test/index'
// import App from './react-redux/index'
// import App from './loop/index'
// import App from './HOC/index'
// import App from './context/index'
import App from './hook/useItemList'

function ModalApp() {
    const [visible, setVisible] = useState(false)
    const handleOk = () => {
        setVisible(false)
    }
    const handleCancel = () => {
        setVisible(false)
    }
    return (
        <>
            <button onClick={() => { setVisible(true) }}>打开弹框</button>
            <Modal title="今日酬宾" visible={visible} onOk={handleOk} onCancel={handleCancel}>
                Content
            </Modal>
        </>
    )
}

export default App