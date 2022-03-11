export default function createStore(reducer, enhancer) {
    if (enhancer && typeof enhancer === 'function') {
        return enhancer(createStore)(reducer)
    }
    let state
    let listeners = []
    function getState() {
        return state
    }
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(listen => listen())
    }
    function subscribe(listener) {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(item => item !== listener)
        }
    }
    dispatch({ type: 'WHH' })
    return {
        getState,
        dispatch,
        subscribe
    }
}