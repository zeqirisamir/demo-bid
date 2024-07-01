import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserData } from "../service/types";

export type AuthStackParams = {
  SignIn: undefined;
  SignUp: undefined;
  Confirm: {
    email: string;
    password: string;
  };
  ForgotPassword: undefined;
};
export type DashboardStackParams = {
  DashboardScreen: undefined;
  CreatePostScreen: undefined;
};
export type HomeParams = {
  Home: undefined;
  Settings: undefined;
  PostDetails: { product: Product };
  Profile: undefined;
  ProfileMenu: undefined;
  WalletScreen: undefined;
  MyBids: undefined;
};
export interface SignInResData {
  data: SignInRes;
}

export interface SignInRes {
  status: number;
  data: UserData;
}
export interface BidTypes {
  user: UserData;
  post: Product;
  amount: number;
}
export interface Product {
  post: Product;
  _id: number;
  description: string;
  duration: string;
  productName: string;
  imgSrc: any;
  startingBid: number;
  userName?: string;
  category?: string;
  createdAt?: string;
}
export type AuthNavigationProp = NativeStackScreenProps<
  AuthStackParams,
  "Confirm"
>;

export type HomeNavigationProp = NativeStackScreenProps<HomeParams, "Home">;
export type PostDetailsNavigationProp = NativeStackScreenProps<
  HomeParams,
  "PostDetails"
>;

export type DashboardNavigationProp = NativeStackScreenProps<
  DashboardStackParams,
  "DashboardScreen"
>;
