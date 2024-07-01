import axios from "axios";
import { setUser } from "../../redux/auth/AuthReducer";
import {
  login,
  signUpBuyer,
  signUpSeller,
  updateCurentValue,
  updateUserInfo,
} from "../../api";

export const signIn = async (data: any) => {
  let res: any;
  let err: any;
  try {
    res = await login(data);
    console.log("from inside login", res);
  } catch (error) {
    err = error;
  }

  return { res, err };
};

export const updateValue = async (data: any, token: string) => {
  let res: any;
  let err: any;
  try {
    res = await updateCurentValue(data, token);
    console.log("from inside update value", res);
  } catch (error) {
    err = error;
  }

  return { res, err };
};
export const updateUser = async (data: any, token: string) => {
  let res: any;
  let err: any;
  try {
    res = await updateUserInfo(data, token);
    console.log("from inside update user", res);
  } catch (error) {
    err = error;
  }

  return { res, err };
};

export const signUp = async (data: any, isBuyer: boolean) => {
  let res: any | undefined;
  let err: any;
  if (isBuyer) {
    try {
      res = await signUpBuyer(data);
    } catch (error: any) {
      err = error;
      console.log("signup signup:", error);
    }
  } else {
    try {
      res = await signUpSeller(data);
    } catch (error: any) {
      err = error;
      console.log("signup error:", error);
    }
  }

  return { res, err };
};
