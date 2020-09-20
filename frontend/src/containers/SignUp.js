import React, { useEffect } from "react";
import { Button, Checkbox, Form, Row, Col, Input, Radio } from "antd";
import { Link } from "react-router-dom";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";

import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "../appRedux/actions/Auth";

import IntlMessages from "util/IntlMessages";
// import InfoView from "components/InfoView";

const FormItem = Form.Item;

const SignUp = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(({ auth }) => auth.token);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = (values) => {
    dispatch(userSignUp(values));
    // console.log(values)
  };

  useEffect(() => {
    if (token !== null) {
      props.history.push("/");
    }
  });

  return (
    <div className="gx-login-container">
      <div
        className="gx-login-content"
        style={{ maxWidth: "600px", padding: "20px 15px 20px" }}
      >
        <div className="gx-login-header gx-text-center">
          <h1 className="gx-login-title">Sign Up</h1>
        </div>
        <Form
          initialValues={{ remember: true }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="gx-signin-form gx-form-row0"
        >
          <Row>
            <Col span={12}>
              <FormItem
                rules={[
                  { required: true, message: "Please input your firstname!'}" },
                ]}
                name="first_name"
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Firstname"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                rules={[
                  { required: true, message: "Please input your lastname!" },
                ]}
                name="last_name"
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Lastname"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                rules={[
                  { required: true, message: "Please input your username!'}" },
                ]}
                name="username"
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Username"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                rules={[
                  { required: true, message: "Please input your E-mail!" },
                ]}
                name="email"
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Email"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={4}>
              <FormItem
                rules={[
                  { required: true, message: "Please input your age!'}" },
                ]}
                name="age"
              >
                <Input
                  // prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Age"
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem name="isMale">
                <Radio.Group>
                  <Radio value={true}>Male</Radio>
                  <Radio value={false}>Female</Radio>
                </Radio.Group>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
                name="phone_number"
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Phone number"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                rules={[
                  { required: true, message: "Please input your country!'}" },
                ]}
                name="country"
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Country"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                rules={[
                  {
                    required: true,
                    message: "Please input your city!",
                  },
                ]}
                name="city"
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="City"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                rules={[
                  { required: true, message: "Please input your region!'}" },
                ]}
                name="region"
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Region"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                rules={[
                  {
                    required: true,
                    message: "Please input your status!",
                  },
                ]}
                name="status"
              >
                <Input
                  prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Status"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                name="password"
              >
                <Input
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="Password"
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                name="confirm-password"
              >
                <Input
                  prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="Confirm Password"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
                <Link
                  className="gx-login-form-forgot"
                  to="/forgot-password"
                >
                  Forgot password
                </Link>
              </FormItem>
            </Col>
          </Row>

          <FormItem className="gx-text-center">
            <Button type="primary" className="gx-mb-0" htmlType="submit">
              <IntlMessages id="app.userAuth.signUp" />
            </Button>
            <span>
              <IntlMessages id="app.userAuth.or" />
            </span>{" "}
            <Link to="/signin">
              <IntlMessages id="app.userAuth.signIn" />
            </Link>
          </FormItem>
        </Form>
      </div>
      {/* <InfoView/> */}
    </div>
  );
};

export default SignUp;
