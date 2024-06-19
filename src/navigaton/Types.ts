import { NativeStackScreenProps } from "@react-navigation/native-stack";

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
};
export type HomeParams = {
  Home: undefined;
  Settings: undefined;
  PostDetails: { product: Product };
  Profile: undefined;
  ProfileMenu: undefined;
};

export interface Product {
  like: any;
  _id: number;
  description: string;
  duration: string;
  productName: string;
  imgSrc: any;
  startingBid: number;
  userName?: string;
  category?: string;
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
