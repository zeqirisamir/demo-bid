import axios from "axios";
import { setUser } from "../../redux/auth/AuthReducer";
import { setPosts } from "../../redux/posts/postsReducer";
import * as api from "../../api/index";

export const getPosts = async() => {
    try {
      const { data } = await api.fetchPosts();
      
      console.log("from apii", data);
      return data
      
    } catch (error:any) {
      console.log(error.message);
      console.log('from api' , error);
    }
  };
  export const createPost =async (data:any) => {
    try {
      const  res  = await api.createPost(data);
     return res
      
    } catch (error:any) {
      console.log(error.message);
      console.log('from api' , error);
    }
  };