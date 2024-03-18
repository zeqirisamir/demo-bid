import { ViewStyle } from "react-native";

export interface UserPicture {
    url: string;
    base64: string;
  }


  export interface EditPhotoButtonProps {
   
    containerStyle?: ViewStyle;
    btnContainerStyle?: ViewStyle;
    disableBtn?: boolean;
    onPress?: () => void;
    hasError?: boolean;
    form?: 'circle';
    showAddText?: boolean;
    userPictureUrl?: string;
    imageUpdateKey?: number;
  }