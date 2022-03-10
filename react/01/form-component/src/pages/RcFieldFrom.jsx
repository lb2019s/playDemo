import React, { useEffect } from 'react'
// import Form, { Field } from 'rc-field-form'
import Form, { Field } from '../components/myRCFieldFrom'
import Input from '../components/input'


const nameRules = { required: true, message: "请输入姓名！" };
const passwordRules = { required: true, message: "请输入密码！" };

const MyForm = () => {
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({
            username: '张三'
        })
    }, [])
    const onFinish = (values) => {
        console.log('onFinish', values);
    }
    const onFinishFailed = (error) => {
        console.warn(error)
    }
    return (
        <div>
            <h3>MyRcFieldFormPage</h3>
            <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Field name="username" rules={nameRules}>
                    <Input type="text" placeholder="username" />
                </Field>
                <Field name="password" rules={passwordRules}>
                    <Input type="text" placeholder="password" />
                </Field>
                <button>submit</button>
            </Form>
        </div>
    )
}

export default MyForm