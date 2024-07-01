import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNav";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import AuthStack from "./AuthStack";
import DashboardStack from "./DashboardStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../components/SplashScreen/SplashScreen";
import { setCurrentValue, setUser } from "../redux/auth/AuthReducer";
import { UserData } from "../service/types";

const Stack = createStackNavigator();

const MainApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const AuthNavigator = () => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPreviousEmails = async () => {
      const previousUserData = await AsyncStorage.getItem("userData");
      console.log("prev data", previousUserData);

      if (previousUserData) {
        const userData: UserData = JSON.parse(previousUserData) as UserData;
        dispatch(setUser(userData));
        dispatch(setCurrentValue(userData?.currentValue));
      }
    };
    getPreviousEmails();
  }, []);

  return (
    <Stack.Navigator>
      {user?._id && user?.userType === "buyer" ? (
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      ) : user?._id && user?.userType === "seller" ? (
        <Stack.Screen
          name="DashboardStack"
          component={DashboardStack}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainApp;
