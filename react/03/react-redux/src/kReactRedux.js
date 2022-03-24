import React, { useContext, useLayoutEffect, useReducer } from 'react'
const Context = React.createContext()

export function Provider({ store, children }) {
    const { Provider } = Context
    return <Provider value={store}>{children}</Provider>
}

export const connect = (
    mapStateToProps = state => state,
    mapDispatchToProps
) => WarperComponent => props => {
    const store = useStore()
    const { getState, dispatch, subscribe } = store
    const stateProps = mapStateToProps(getState())
    let dispatchProps = { dispatch }

    if (typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch)
    } else if (typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    }

    const [, forceUpdate] = useReducer(x => x + 1, 0)
    useLayoutEffect(() => {
        const unSubscribe = subscribe(() => {
            forceUpdate()
        })

        return () => {
            unSubscribe()
        };
    }, [store])
    return <WarperComponent {...props} {...stateProps} {...dispatchProps}></WarperComponent>
}

export function useSelector(selector) {
    const store = useStore()
    const { getState, subscribe } = store

    const [, forceUpdate] = useReducer(x => x + 1, 0)
    useLayoutEffect(() => {
        const unSubscribe = subscribe(() => {
            forceUpdate()
        })

        return () => {
            unSubscribe()
        };
    }, [store])

    return selector(getState())
}

export function useDispatch() {
    const store = useStore()
    return store.dispatch
}

function useStore() {
    return useContext(Context)
}

function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
    const obj = {}
    for (let key in creators) {
        obj[key] = bindActionCreator(creators[key], dispatch)
    }
    return obj
}