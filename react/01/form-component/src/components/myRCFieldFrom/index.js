import React from 'react'
import Form from './form'
import Field from './field'
import useForm from './useForm'

const _Form = React.forwardRef(Form)
_Form.useForm = useForm

export default _Form

export { Field, useForm }