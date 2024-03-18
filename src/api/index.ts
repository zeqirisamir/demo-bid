import axios from "axios";

const url = "http://localhost:5000/api/posts";

export const fetchPosts = () => axios.get(`${url}/get_all_posts`);
export const fetchPost = (id: any) => axios.get(`${url}/${id}`);
export const createPost = (newPost: any) => axios.post(`${url}/create_post`, newPost);
export const updatePost = (id: any, updatedPost: any) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id: any) => axios.delete(`${url}/${id}`);