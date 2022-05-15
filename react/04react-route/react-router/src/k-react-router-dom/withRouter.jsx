import RouterContext from "./Context"

const withRouter = WrapperComponent => props => {
    return <RouterContext.Consumer>
        {context => <WrapperComponent {...props} {...context}></WrapperComponent>}
    </RouterContext.Consumer>
}


export default withRouter