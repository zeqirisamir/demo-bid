import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser, setUserType } from "../redux/auth/AuthReducer";
import moment from "moment";

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

export const calculateRemainingTime = (
  createdAt: string,
  duration: string
): string => {
  const createdDate = moment(createdAt);
  const durationDays = parseInt(duration, 10);
  const endDate = createdDate.add(durationDays, "days");
  const now = moment();

  const diff = moment.duration(endDate.diff(now));
  const days = Math.floor(diff.asDays());
  const hours = diff.hours();
  const minutes = diff.minutes();

  if (days > 0) {
    return `${days} days ${hours} hours ${minutes} minutes left`;
  } else if (hours > 0) {
    return `${hours} hours ${minutes} minutes left`;
  } else if (minutes > 0) {
    return `${minutes} minutes left`;
  } else {
    return "Expired";
  }
};
