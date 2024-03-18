import {NativeStackScreenProps} from '@react-navigation/native-stack';


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
    DashboardScreen:undefined
  };
export type HomeParams = {
    Home: undefined;
   Settings:undefined
   PostDetails:{product:Product}
  };

  export interface Product {
    id: number;
            description: string;
            duration: string;
            productName: string;
            imgSrc: any;
            startingBid: number;
  }
  export type AuthNavigationProp = NativeStackScreenProps<
  AuthStackParams,
  'Confirm'
>;

export type HomeNavigationProp = NativeStackScreenProps<
  HomeParams,
  'Home'
>;
export type PostDetailsNavigationProp = NativeStackScreenProps<
  HomeParams,
  'PostDetails'
>;

export type DashboardNavigationProp = NativeStackScreenProps<
DashboardStackParams,
  'DashboardScreen'
>;