import axios from "axios";

const url = "http://localhost:5000/api/posts";
const loginUrl = "http://localhost:5000/api/auth";

export const login = (data: any) => axios.post(`${loginUrl}/sign_in`, data);
export const signUpBuyer = (data: any) =>
  axios.post(`${loginUrl}/sign_up_buyer`, data);
export const signUpSeller = (data: any) =>
  axios.post(`${loginUrl}/sign_up_seller`, data);

export const updateUserInfo = (data: any, token: string) =>
  axios.put(`${loginUrl}/update_user`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });
export const updateCurentValue = (data: any, token: string) =>
  axios.put(`${loginUrl}/update_user_value`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });

export const fetchPosts = () => axios.get(`${url}/get_all_posts`);

export const fetchPost = (id: any) => axios.get(`${url}/${id}`);

export const createPost = (newPost: any) =>
  axios.post(`${url}/create_post`, newPost);

export const getUserPosts = (userId: any) =>
  axios.get(`${url}/user/${userId}/posts`);

export const updatePost = (id: any, updatedPost: any) =>
  axios.put(`${url}/${id}`, updatedPost);

export const createBidding = (data: any) => axios.post(`${url}/bid`, data);

export const getPersonalBiddings = (userId: any) =>
  axios.get(`${url}/user/${userId}/bids`);

export const getPostSpecificBiddings = (postId: any) =>
  axios.get(`${url}/post/${postId}/bids`);

export const deletePost = (id: any) => axios.delete(`${url}/${id}`);
