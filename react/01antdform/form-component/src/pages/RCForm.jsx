import React from 'react'
// import { createForm } from 'rc-form'
import createForm from '../components/myRCForm'
import Input from '../components/input';

const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

@createForm
class RCForm extends React.Component {
    componentDidMount() {
        this.props.form.setFieldsValue({ username: "default" });
    }

    submit = () => {
        const { getFieldsValue, validateFields } = this.props.form;
        console.log("submit", getFieldsValue()); //sy-log
        validateFields((err, val) => {
            if (err) {
                console.log("err", err); //sy-log
            } else {
                console.log("校验成功", val); //sy-log
            }
        });
    };

    render() {
        console.log("props", this.props); //sy-log
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <h3>MyRCForm</h3>
                {getFieldDecorator("username", { rules: [nameRules] })(
                    <Input placeholder="Username" />
                )}
                {getFieldDecorator("password", { rules: [passworRules] })(
                    <Input placeholder="Password" />
                )}
                <button onClick={this.submit}>submit</button>
            </div>
        );
    }
}

export default RCForm