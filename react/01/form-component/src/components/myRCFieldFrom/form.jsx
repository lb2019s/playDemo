import FieldContext from "./filedContext"
import useForm from './useForm'
const Form = ({ children, form, onFinish, onFinishFailed }) => {
    const [formStore] = useForm(form)
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