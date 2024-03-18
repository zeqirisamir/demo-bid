import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import { DashboardStackParams } from "./Types";
import DashboardScreen from "../screens/SelllerDashboard/Dashboard";

const Stack = createStackNavigator<DashboardStackParams>();

const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DashboardStack;
