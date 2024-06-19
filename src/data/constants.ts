import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser, setUserType } from "../redux/auth/AuthReducer";

export const LOCAL_STORAGE_TOKEN_NAME = "x-access-token";
export const LOCAL_STORAGE_USER_DATA = "userData";
export const SELECTED_LANGUAGE = "SELECTED_LANGUAGE";
export const USER_TYPE = "userType";

export const getUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    return token;
  } catch (error) {
    console.error("Error retrieving user token:", error);
    return null;
  }
};

export const handleLogout = async (dispatch: any) => {
  try {
    await AsyncStorage.removeItem("userData");
    dispatch(setUser(null)); // Clear user data in Redux
    dispatch(setUserType(null)); // Clear user type in Redux
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
