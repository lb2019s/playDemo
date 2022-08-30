import React from 'react'
function HOC(WrapperComponent) {
    return class extends WrapperComponent {
        constructor(props) {
            super(props)
            this.state = {
                name: 'hoc'
            }
        }
        componentDidMount() {
            console.log('hoc did mount', this.state)
        }
    }
}

class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'component',
            age: 12
        }
    }
    componentDidMount() {
        console.log('wrap did mount', this.state)
    }
    render() {
        return <h2>HOC</h2>
    }
}

export default HOC(Test)