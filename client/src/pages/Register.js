import React from "react";
import { Button, Card, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { SignUp } from "../services/auth.service";
import { useMutation } from "react-query";
import { login } from "../store/user.slice";
import { useDispatch } from "react-redux";

export default function Register() {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const finishMutation = useMutation(SignUp, {
        onSuccess: (data) => {
          message.success("Successfully Registered!");
          console.log(data);
          dispatch(login(data));
          navigate("/login", { replace: true });
        },
        onError: (e) => {
          message.error("Registration Failed");
          // message.error(e.response.data.message);
        },
    });
    const onFinish = async (values) => {
        console.log(values);
        const data = {
            password: values.password,
            name: values.name,
            email: values.email,
        };
        await finishMutation.mutateAsync(data);
    };

    return (
        <div>
            <Card>
            <Form name="register-form" onFinish={onFinish}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Full Name!",
                },
              ]}
            >
              <Input placeholder="Full name" />
            </Form.Item>
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
              Sign Up
            </Button>            
            </Form>
            </Card>
        </div>
    )
    
}  