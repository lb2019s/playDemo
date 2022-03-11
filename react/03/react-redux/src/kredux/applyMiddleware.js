export default function applyMiddleware(...middlewares) {
    return createStore => reducer => {
        const store = createStore(reducer)
        let dispatch = () => {
            throw new Error(
                'Dispatching while constructing your middleware is not allowed. ' +
                'Other middleware would not be applied to this dispatch.'
            )
        }
        const midApi = {
            dispatch: (action, ...args) => dispatch(action, ...args),
            // dispatch,
            getState: store.getState
        }
        const middlewareChain = middlewares.map(middleware => middleware(midApi))

        dispatch = compose(...middlewareChain)(store.dispatch)

        return {
            ...store,
            dispatch
        }
    }
}

function compose(...funcs) {
    if (funcs.length === 0) {
        return args => args
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}