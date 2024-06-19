import axios from "axios";

const url = "http://localhost:5000/api/posts";

export const fetchPosts = () => axios.get(`${url}/get_all_posts`);

export const fetchPost = (id: any) => axios.get(`${url}/${id}`);

export const createPost = (newPost: any) =>
  axios.post(`${url}/create_post`, newPost);

export const updatePost = (id: any, updatedPost: any) =>
  axios.put(`${url}/${id}`, updatedPost);

export const createBidding = (data: any) => axios.post(`${url}/bid`, data);

export const getPersonalBiddings = (userId: any) =>
  axios.get(`${url}/user/${userId}/bids`);

export const getPostSpecificBiddings = (postId: any) =>
  axios.get(`${url}/post/${postId}/bids`);

export const deletePost = (id: any) => axios.delete(`${url}/${id}`);

export const likePost = (postId: any, authToken: string) =>
  axios.post(`${url}/${postId}/like`, null, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

export const unlikePost = (postId: any, authToken: string) =>
  axios.post(`${url}/${postId}/unlike`, null, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
