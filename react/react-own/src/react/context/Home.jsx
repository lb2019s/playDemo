import React from 'react'
import Context from './context'

class Home extends React.Component {
    // static contextType = Context
    constructor(props) {
        super(props, { function({ setState }) { setState({ name: 'jack' }) } }, function up() { console.log('eee') })
    }
    componentDidMount() {
        console.log('this', this)
        console.log('context', this.context)
        console.log('state', this.state)
    }
    render() {
        return (
            <div>HOME</div>
        )
    }
}

export default Home