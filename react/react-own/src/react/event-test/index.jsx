import React from 'react'

class EventTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
        this.div = React.createRef()
    }
    componentDidMount() {
        this.setState({
            count: this.state.count + 1
        })
        console.log('did mount ', this.state.count)

        setTimeout(() => {
            console.log('time out start', this.state.count)
            this.setState({
                count: this.state.count + 1
            })
            console.log('time out end', this.state.count)
        }, 0)

        this.div.current.addEventListener('click', () => {
            this.setState({
                count: this.state.count + 1
            })
            console.log('native click', this.state.count)
        })
    }

    onClick = () => {
        this.setState({
            count: this.state.count + 1
        })
        console.log('compose click', this.state.count)
    }

    render() {
        return (
            <button ref={this.div} onClick={this.onClick}>{this.state.count}</button>
        )
    }
}

export default EventTest