import axios from "axios";
import { setUser } from "../../redux/auth/AuthReducer";
import { setPosts } from "../../redux/posts/postsReducer";
import * as api from "../../api/index";

export const getPosts = async () => {
  try {
    const { data } = await api.fetchPosts();

    //console.log("from apii", data);
    return data;
  } catch (error: any) {
    console.log(error.message);
    console.log("from api", error);
  }
};

export const createPost = async (data: any) => {
  try {
    const res = await api.createPost(data);
    return res;
  } catch (error: any) {
    console.log(error.message);
    console.log("from api", error);
  }
};
export const createBid = async (data: any) => {
  try {
    const res = await api.createBidding(data);
    return res;
  } catch (error: any) {
    console.log(error.message);
    console.log("from api", error);
  }
};

export const getAllPersonalBiddings = async (userId: number) => {
  try {
    const res = await api.getPersonalBiddings(userId);
    return res;
  } catch (error: any) {
    console.log(error.message);
    console.log("from api", error);
  }
};

export const getAllPreviousBidsForPost = async (postId: number) => {
  try {
    const res = await api.getPostSpecificBiddings(postId);
    return res;
  } catch (error: any) {
    console.log(error.message);
    console.log("from api", error);
  }
};

export const updatePost = async (id: number, data: any) => {
  console.log("from api", data);
  try {
    const res = await api.updatePost(id, data);

    return res;
  } catch (error: any) {
    console.log("error updating::", error.message);
  }
};

export const deletePost = async (data: any) => {
  try {
    const res = await api.deletePost(data);
    return res;
  } catch (error: any) {
    console.log(error.message);
    console.log("from api", error);
  }
};

export const likePost = async (data: any, authToken: any) => {
  try {
    const res = await api.likePost(data, authToken);
    return res;
  } catch (error: any) {
    console.log(error.message);
    console.log("from api", error);
  }
};

export const unlikePost = async (data: any, authToken: any) => {
  try {
    const res = await api.unlikePost(data, authToken);
    return res;
  } catch (error: any) {
    console.log(error.message);
    console.log("from api", error);
  }
};
