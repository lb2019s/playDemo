import React from 'react'
import RouterContext from './Context'
import matchPath from './matchPath'

export default class Route extends React.Component {
    render() {
        const { children, component, render, path, computedMatch } = this.props
        // const match = window.location.pathname === path
        return (
            <RouterContext.Consumer>
                {context => {
                    const { location } = context
                    const match = computedMatch ? computedMatch : path ? matchPath(location.pathname, this.props) : context.match
                    const props = {
                        ...context,
                        match
                    }
                    return <RouterContext.Provider value={props}>
                        {
                            match
                                ? children ? typeof children === 'function' ? children(props) : children :
                                    component ? React.createElement(component, props) :
                                        render ? render(props) : null
                                : children ? typeof children === 'function' ? children(props) : children : null
                        }
                    </RouterContext.Provider>
                }}
            </RouterContext.Consumer>

        )
    }
}