import { useCallback } from "react"
// import { useDispatch, useSelector } from "react-redux"
import { useSelector, useDispatch } from "../kReactRedux"

export default function ReduxHookPage(props) {
    const count = useSelector(({ count }) => count)
    const dispatch = useDispatch()
    const add = useCallback(() => {
        dispatch({ type: 'ADD' })
    }, [])

    return (
        <div>
            <h3>Redux Page</h3>
            <p>{count}</p>
            <button onClick={add}>ADD</button>
        </div>
    )
}