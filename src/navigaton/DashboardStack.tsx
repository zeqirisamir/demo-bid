import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DashboardStackParams } from "./Types";
import DashboardScreen from "../screens/SelllerDashboard/DashboardScreen";
import CreatePostScreen from "../screens/SelllerDashboard/CreatePostScreen";

const Stack = createStackNavigator<DashboardStackParams>();

const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="DashboardScreen"
        options={{ headerShown: false }}
        component={DashboardScreen}
      />
      <Stack.Screen
        name="CreatePostScreen"
        component={CreatePostScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DashboardStack;
