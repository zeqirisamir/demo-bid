import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNav";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import AuthStack from "./AuthStack";
import DashboardStack from "./DashboardStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "../components/SplashScreen/SplashScreen";

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
  const [hasToken, setHasToken] = useState(false);
  const userType = useSelector(
    (state: RootState) => state.authReducer.userType
  );

  const getTokenFromStorage = async () => {
    try {
      const token = await AsyncStorage.getItem("userData");
      return token;
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
      return null;
    }
  };

  const checkAuthentication = async () => {
    const token = await getTokenFromStorage();
    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
  };
  useEffect(() => {
    checkAuthentication();
  }, []);
  return (
    <Stack.Navigator>
      {user?.data?._id && userType === "buyer" ? (
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      ) : user?.data?._id && userType === "seller" ? (
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
