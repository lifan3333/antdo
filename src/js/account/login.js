/**
 * Created by Administrator on 2017/3/20.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker, message } from 'antd';
//import $ from 'jquery';
//import NProgress from 'nprogress';
import './login.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit(e)  {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="components-form-login">
                <Form onSubmit={e => this.handleSubmit(e)} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入账号!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {/*{getFieldDecorator('remember', {*/}
                            {/*valuePropName: 'checked',*/}
                            {/*initialValue: true,*/}
                        {/*})(*/}
                            {/*<Checkbox>Remember me</Checkbox>*/}
                        {/*)}*/}
                        <a className="login-form-forgot">忘记密码</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('app'));

console.log('login')