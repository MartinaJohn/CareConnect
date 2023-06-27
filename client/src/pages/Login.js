import React from 'react'
import { Button, Card, Form, Input, message } from "antd";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignIn } from "../services/auth.service";
import { login } from "../store/user.slice";


export default function Login(){
  // const info = useSelector((state) => state.user);
  // console.log(info, "info");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const finishMutation = useMutation(SignIn, {
    onSuccess: (data) => {
      message.success("Successfully Logged In!");
      console.log(data);
      dispatch(login(data));
      navigate("/details", { replace:true})
    },
    onError: (e) => {
      message.error("Login Failed");
      // message.error(e.response.data.message);
    },
  });

  const onFinish = async (values) => {
    console.log(values);
    const data = {
      email: values.email,
      password: values.password,
    };
    await finishMutation.mutateAsync(data);
  };

  return (
    <div>
        <Card>
          <Form
            name="register-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Email Id" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              // loading={loading}
              // disabled={loading}
            >
              Sign In
            </Button>
          </Form>
        </Card>
    </div>
  )
}
