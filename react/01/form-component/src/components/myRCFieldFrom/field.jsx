import React from 'react'
import FieldContext from './filedContext';

export default class Field extends React.Component {
    static contextType = FieldContext
    componentDidMount() {
        this.destroyFiled = this.context.registerField(this)
    }
    componentWillUnmount() {
        this.destroyFiled()
    }
    onStoreChange() {
        this.forceUpdate()
    }
    getControlled() {
        const { name } = this.props
        return {
            value: this.context.getFieldValue(name) || '',
            onChange: (event) => {
                const value = event.target.value
                this.context.setFieldValue(name, value)
            }
        }
    }
    render() {
        const { children } = this.props
        const returnChildNode = React.cloneElement(children, this.getControlled())
        return (
            returnChildNode
        )
    }
}