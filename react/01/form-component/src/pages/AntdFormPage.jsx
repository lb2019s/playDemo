import React from 'react'
import { Form, Input, Button } from 'antd';

class AntdFormPage extends React.Component {
    form = React.createRef()
    onFinish = (values) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    onReset = () => {
        this.form.current.resetFields();
    };

    render() {
        console.log('form', this.form)
        const { onFinish, onFinishFailed, onReset } = this
        return (
            <Form
                name="basic"
                initialValues={{
                    username: "张三",
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                ref={this.form}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default AntdFormPage