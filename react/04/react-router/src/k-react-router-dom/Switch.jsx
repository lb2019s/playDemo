import React from 'react'
import RouterContext from './Context'
import matchPath from './matchPath';

export default class Switch extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    const { location } = context
                    let match, element;
                    React.Children.forEach(this.props.children, child => {
                        if (!match && React.isValidElement(child)) {
                            element = child
                            const { path } = child.props
                            match = path ? matchPath(location.pathname, {
                                ...child.props,
                                path
                            }) : context.match
                        }
                    })
                    return match ? React.cloneElement(element, {
                        computedMatch: match
                    }) : null
                }}
            </RouterContext.Consumer>
        )
    }
}