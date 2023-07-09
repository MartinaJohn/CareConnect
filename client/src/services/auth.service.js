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

// create redux action and reducer
export const PDetails=async(body)=>{
  
  const response=await axios.post(`${BACKEND_URL}/details`,body)
  console.log("is called "+response.data)
  return response.data
}