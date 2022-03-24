import { useReducer } from "react"
import { counterReducer } from "../store"

const init = (initArg) => {
    return initArg
}

export default function HookPage(props) {
    const [state, dispatch] = useReducer(counterReducer, 0, init)
    const add = () => {
        dispatch({ type: 'ADD' })
    }
    return (
        <div>
            <h3>HookPage</h3>
            <p>{state}</p>
            <button onClick={add}>ADD</button>
        </div>
    )
}