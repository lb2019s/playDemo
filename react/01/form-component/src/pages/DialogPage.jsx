import React from 'react'
import Dialog from '../components/dialog'

export default class DialogPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDialog: false
        }
    }
    render() {
        const { showDialog } = this.state
        return (
            <div>
                <h3>Dialog Page</h3>
                <button onClick={() => this.setState({ showDialog: !showDialog })}>弹窗</button>
                {showDialog && <Dialog></Dialog>}
            </div>
        )
    }
}