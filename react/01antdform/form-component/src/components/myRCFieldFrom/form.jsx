import { useImperativeHandle } from "react"
import FieldContext from "./filedContext"
import useForm from './useForm'
const Form = ({ children, form, onFinish, onFinishFailed }, ref) => {
    const [formStore] = useForm(form)
    useImperativeHandle(ref, () => formStore)
    formStore.setCallback({
        onFinish,
        onFinishFailed
    })
    return (
        <form onSubmit={event => {
            event.preventDefault()
            formStore.submit()
        }}>
            <FieldContext.Provider value={formStore}>
                {children}
            </FieldContext.Provider>
        </form>
    )
}

export default Form