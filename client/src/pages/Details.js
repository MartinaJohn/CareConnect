import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { updateUserDetails } from '../services/auth.service';


import { Form, Input, Button, message } from 'antd';
import { update } from '../store/user.slice';
function Details() {
  // const user = useSelector((state) => state.user);
  // const history = useHistory();
  // const navigate=useNavigate()
  // const [form] = Form.useForm();
  // const [loading, setLoading] = useState(false);

  // const onFinish = async (values) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch('http://localhost:4000/details', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //       body: JSON.stringify(values),
  //     });
  //     console.log(response)
  //     if (response.ok) {
  //       message.success('Details saved successfully');
        
  //       navigate('/'); // Redirect to the desired page after successful submission
  //     } else {
  //       message.error('Failed to save details');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     message.error('An error occurred');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  let navigate = useNavigate();
  const dispatch = useDispatch();

  // const finishMutation = useMutation(updateUserDetails, {
  //   onError: (error) => {
  //     if (error.response && error.response.status === 401) {
  //       //const errorMessage = error.response.data.message;
  //       const errorMessage = "Invalid data"
  //       // console.log('Login failed: Invalid email or password');
  //       message.error(`${errorMessage}`);
  //     } else {
  //       console.error('An error occurred during details: ', error);
  //       message.error('An error occurred during details');
  //     }
  //     console.log(error.response); // Log the entire response object
  //   },
  // });
  const finishMutation = useMutation(updateUserDetails, {
    onSuccess: (data) => {
      message.success("Successfully Registered!");
      console.log(data);
      dispatch(update(data));
      navigate("/login", { replace: true });
    },
    onError: (e) => {
      message.error("Registration Failed");
      // message.error(e.response.data.message);
    },
});

  const onFinish = async (values) => {
    try {
      console.log(values);
      const data = {
        // email: values.email,
        // password: values.password,
        dateOfBirth:values.dateOfBirth,
        gender:values.gender
      };
      await finishMutation.mutateAsync(data);
      // message.success("Successfully saved details!");
      // console.log(data);
      // dispatch(update(data));
      // navigate("/", { replace: true });
    } catch (error) {
      console.error('An error occurred during details:', error);
     // message.error('An error occurred during login');
    }
  };

  return (
    <div>
      <h1>Details Page</h1>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true, message: 'Please enter your date of birth' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please enter your gender' }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Details;
