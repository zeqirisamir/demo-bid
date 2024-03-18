import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNav";
import LoginScreen from "../screens/Auth/Login";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import AuthStack from "./AuthStack";
import DashboardStack from "./DashboardStack";

const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

const AuthNavigator = () => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  const userType = useSelector(
    (state: RootState) => state.authReducer.userType
  );

  console.log("user", user);

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
