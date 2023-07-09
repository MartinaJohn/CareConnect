import { BACKEND_URL } from "../constants";
import axios from "axios";

export const SignUp = async (body) => {
  const response = await axios.post(`${BACKEND_URL}/users/register`, body);
  return response.data;
};

export const SignIn = async (body) => {
  const response = await axios.post(`${BACKEND_URL}/users/login`, body);
  return response.data;
};

export const SignOut = async (body) => {
  const response = await axios.post(`${BACKEND_URL}/users/logout`, body);
  return response.data;
};

export const UserDetails = async (body) => {
  console.log(body)
  const response = await axios.post(`${BACKEND_URL}/details`, body);
  return response.data; 
}