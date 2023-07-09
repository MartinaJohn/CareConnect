import React from 'react'
import { Button, Card, Form, Input, message } from "antd";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignIn } from "../services/auth.service";
import { login } from "../store/user.slice";
import styles from "../styles/Register.module.scss"
import loginImg from "../assets/login.jpg"
import Navbar from "../components/Navbar"

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
      }; //d50efa1
      await finishMutation.mutateAsync(data);
      message.success("Successfully Logged In!");
      console.log(data);
      dispatch(login(data));
      navigate("/test", { replace: true });
    } catch (error) {
      console.error('An error occurred during login:', error);
     // message.error('An error occurred during login');
    }
  };

  return (
    <div className={styles.regContainer}>
    <Navbar />
    <div className={styles.containerController}>
    <img src={loginImg} alt="login" className={styles.loginImg}/>
    <Card className={styles.card}>
          <h1>Login to CareConnect</h1>
          <h2>
            Don't have an account? <a href="/register">Sign Up</a>
          </h2>    
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
              className={styles.loginButton}
              // loading={loading}
              // disabled={loading}
            >
              Sign In
            </Button>
          </Form>
        </Card>
    </div>
    </div>
  )
}
