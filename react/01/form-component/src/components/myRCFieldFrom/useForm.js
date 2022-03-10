import { useRef } from 'react'
class FormStore {
    constructor() {
        this.store = {}
        this.fields = {}
        this.callbacks = {}
    }

    registerField = (entity) => {
        const key = entity.props.name
        this.fields[key] = entity
        return () => {
            delete this.fields[key]
        }
    }

    setCallback = (callbacks) => {
        this.callbacks = {
            ...this.callbacks,
            ...callbacks
        }
    }

    setFieldValue = (name, value) => {
        this.store[name] = value
        this.fields[name].onStoreChange()
    }

    setFieldsValue = (newStore) => {
        this.store = {
            ...this.store,
            ...newStore
        }
        console.log('setFieldsValue', this.store);
        Reflect.ownKeys(newStore).forEach(key => {
            this.fields[key].onStoreChange()
        })
    }

    getFieldsValue = () => {
        return this.store
    }

    getFieldValue = name => {
        return this.store[name]
    }
    validate = () => {
        const error = []
        Reflect.ownKeys(this.fields).forEach(key => {
            const entity = this.fields[key]
            const { name, rules } = entity.props
            const values = this.getFieldsValue()
            if (rules && rules.required && !values[name] && values[name] !== 0) {
                error.push({
                    [name]: rules.message,
                    values
                })
            }
        })
        return error
    }

    submit = () => {
        const errors = this.validate()
        if (errors.length === 0) {
            this.callbacks.onFinish && this.callbacks.onFinish(this.getFieldsValue())
        } else {
            this.callbacks.onFinishFailed && this.callbacks.onFinishFailed(errors)
        }
    }

    getForm = () => {
        return {
            setFieldsValue: this.setFieldsValue,
            setFieldValue: this.setFieldValue,
            getFieldValue: this.getFieldValue,
            getFieldsValue: this.getFieldsValue,
            registerField: this.registerField,
            setCallback: this.setCallback,
            submit: this.submit
        }
    }
}

export default function useForm(form) {
    const formRef = useRef()

    if (!formRef.current) {
        if (form) {
            formRef.current = form
        } else {
            const formStore = new FormStore()
            formRef.current = formStore.getForm()
        }
    }
    return [formRef.current]
}