import { ViewStyle } from "react-native";

export const TAGS = ["All", "Technology", "Home", "Food", "Cars"];

export interface UserPicture {
  url: string;
  base64: string;
}
export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: string;
  profilePic: string;
  currentValue?: string;
}

export interface EditPhotoButtonProps {
  containerStyle?: ViewStyle;
  btnContainerStyle?: ViewStyle;
  disableBtn?: boolean;
  onPress?: () => void;
  hasError?: boolean;
  form?: "circle";
  showAddText?: boolean;
  userPictureUrl?: string;
  imageUpdateKey?: number;
}

export interface SvgProps {
  width?: number;
  height?: number;
  fill?: string;
}

export interface MoneySummaryProps {
  containerStyle?: ViewStyle;
  coins?: number;
  linearGradientBorder?: string[];
  mode?: "dark" | "light";
  onPress?: () => void;
  disabled?: boolean;
  svgUri?: string;
}

export interface AllBidsTypes {
  amount: string;
  createdAt: string;
  user: string;
  _id: string;
}
