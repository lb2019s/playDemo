import React from 'react'

const createForm = (Cmp) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {}
            this.options = {}
        }
        setFieldsValue = (newState) => {
            this.setState({
                ...this.state,
                ...newState
            })
        }
        handleChange = event => {
            console.log('event', event);
            const { name, value } = event.target
            this.setState({
                [name]: value
            })
        }
        getFieldDecorator = (field, options) => Cmp => {
            this.options[field] = options
            const NewCmp = React.cloneElement(Cmp, {
                name: field,
                value: this.state[field] || "",
                onChange: this.handleChange
            })
            return NewCmp
        }
        getFieldsValue = () => {
            return this.state
        }
        validateFields = (callback) => {
            const error = []
            for (let filed in this.options) {
                const rules = this.options[filed].rules
                rules.forEach(rule => {
                    if (rule.required && !this.state[filed]) {
                        error.push({
                            error: rule.message,
                            name: filed
                        })
                    }
                })
            }
            const values = this.getFieldsValue()
            if (error.length) {
                callback(error, values)
            } else {
                callback(null, values)
            }
        }
        getForm = () => {
            return {
                form: {
                    getFieldDecorator: this.getFieldDecorator,
                    getFieldsValue: this.getFieldsValue,
                    validateFields: this.validateFields,
                    setFieldsValue: this.setFieldsValue
                }
            }
        }
        render() {
            return <Cmp {...this.props} {...this.getForm()}></Cmp>
        }
    }
}

export default createForm