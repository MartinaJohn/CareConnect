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
    onError: (error) => {
      if (error.response && error.response.status === 401) {
        //const errorMessage = error.response.data.message;
        const errorMessage = "Invalid email or password" || error.response.data.message;
        console.log('Login failed: Invalid email or password');
        message.error(`${errorMessage}`);
      } else {
        console.error('An error occurred during login:', error);
        message.error('An error occurred during login');
      }
      console.log(error.response); // Log the entire response object
    },
  });

  const onFinish = async (values) => {
    try {
      console.log(values);
      const data = {
        email: values.email,
        password: values.password,
      };
      await finishMutation.mutateAsync(data);
      message.success("Successfully Logged In!");
      console.log(data);
      dispatch(login(data));
      navigate("/details", { replace: true });
    } catch (error) {
      console.error('An error occurred during login:', error);
     // message.error('An error occurred during login');
    }
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
