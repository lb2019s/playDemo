import React from 'react'
import RouterContext from './Context'

export default class Route extends React.Component {
    static contextType = RouterContext
    handleClick = (event) => {
        event.preventDefault()
        this.context.history.push(this.props.to)
    }
    render() {
        const { to, children, ...restProps } = this.props
        return (
            <a href={to} onClick={this.handleClick} {...restProps}>{children}</a>
        )
    }
}