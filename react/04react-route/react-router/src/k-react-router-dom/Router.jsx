import React from 'react'
import RouterContext from './Context'

export default class Router extends React.Component {
    static computeRootMatch(pathname) {
        return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
    }
    constructor(props) {
        super(props)
        this.state = {
            location: props.history.location
        }

        this.unListen = props.history.listen(location => {
            console.log('listen', location);
            this.setState({
                location
            })
        })
    }

    componentWillUnmount() {
        if (this.unListen) {
            this.unListen()
        }
    }

    render() {
        const { children, history } = this.props
        const { location } = this.state
        return (
            <RouterContext.Provider value={{
                history,
                location,
                match: Router.computeRootMatch(location.pathname)
            }}>
                {children}
            </RouterContext.Provider>
        )
    }
}