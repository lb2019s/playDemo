import React from 'react'
import RouterContext from './Context'
import LifeCycle from './LifeCycle'

export default class Redirect extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    const { history } = context
                    const { to, push } = this.props
                    return (
                        <LifeCycle onMount={() => push ? history.push(to) : history.replace(to)}></LifeCycle>
                    )
                }}
            </RouterContext.Consumer>
        )
    }
}