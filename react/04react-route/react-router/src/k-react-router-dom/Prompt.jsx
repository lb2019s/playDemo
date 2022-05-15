import React from 'react'
import RouterContext from './Context'
import LifeCycle from './LifeCycle'

export default class Prompt extends React.Component {
    render() {
        return <RouterContext.Consumer>
            {context => {
                const { when, message } = this.props
                if (!when) return null
                const method = context.history.block
                return <LifeCycle onMount={(self) => {
                    self.release = method(message)
                }} onUnMount={(self) => {
                    self.release()
                }}></LifeCycle>
            }}
        </RouterContext.Consumer>
    }
}