import axios from "axios";
import { setUser } from "../../redux/auth/AuthReducer";


const apiUrl = 'http://localhost:5000/api/auth'
export const signIn = async(data:any) => {
  let res:  any
  let err : any
  const url = `${apiUrl}/sign_in`;
      try {
       
        res = await axios.post(url, data)
      } catch (error) {
        err = error
      }
      console.log("from auht ", res);
      
      return {res, err};
  };

  export const signUp = async (data:any, isBuyer: boolean) => {
    let res: {data: any} | undefined;
    let err : any
    if(isBuyer){
      try {
        
        const url = `${apiUrl}/sign_up_buyer`;
         res = await axios.post(url, data)
      } catch (error:any) {
        err = error
        console.log("signup error:",error);
        
      }
    }else{
      try {
        
        const url = `${apiUrl}/sign_up_seller`;
         res = await axios.post(url, data)
      } catch (error:any) {
        err = error
        console.log("signup error:",error);
        
      }
    }
      
      return {res, err};
  };
  
  export const logout = () => {
    return async(dispatch:any)=>{
      dispatch(setUser({}));
    } 
  };
  