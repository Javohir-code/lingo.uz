import React, {useEffect} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";

import {userSignIn} from "../appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import InfoView from "components/InfoView";

const FormItem = Form.Item;

const SignIn = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(({auth}) => auth.token);

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = values => {
    // console.log("finish",values)
    dispatch(userSignIn(values));
  };

  useEffect(() => {
    if (token !== null) {
      props.history.push('/');
    }
  }, [token, props.history]);

  return (
    <div className="gx-login-container">
      <div className="gx-login-content">
        <div className="gx-login-header gx-text-center">
          <h1 className="gx-login-title">Sign In</h1>
        </div>
        <Form
          initialValues={{ remember: true }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="gx-signin-form gx-form-row0">
          <Form.Item
            rules={[{ required: true, message: 'The input is not valid username!' }]} name="username">
            <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
          </Form.Item>
          <Form.Item
            rules= {[{required: true, message: 'Please input your Password!'}]}  name="password">
            <Input prefix={<LockOutlined  style={{color: 'rgba(0,0,0,.25)'}}/>} type="password" placeholder="Password"/>
          </Form.Item>
          <FormItem  name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
            <Link className="gx-login-form-forgot" to="/custom-views/user-auth/forgot-password">Forgot password</Link>
          </FormItem>
          <Form.Item>
            <Button type="primary" className="gx-mb-0" htmlType="submit">
              <IntlMessages id="app.userAuth.signIn"/>
            </Button>
            <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signup"><IntlMessages
            id="app.userAuth.signUp"/></Link>
          </Form.Item>
        </Form>
      </div>
      {/* <InfoView/> */}
    </div>
  );
};

export default SignIn;
