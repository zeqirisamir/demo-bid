import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home/Home";
import Settings from "../screens/Setttings/Settings";
import { Colors } from "../theme/Colors";
import PostDetails from "../screens/Home/PostDetaills";
import { HomeParams } from "./Types";
import MyBids from "../screens/MyBids/MyBids";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator<HomeParams>();
const SettingsStack = createStackNavigator();
const BidsStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="PostDetails" component={PostDetails} />
  </HomeStack.Navigator>
);
const BidsStackSceen = () => (
  <BidsStack.Navigator screenOptions={{ headerShown: false }}>
    <BidsStack.Screen name="MyBids" component={MyBids} />
  </BidsStack.Navigator>
);
const SettingsStackScreen = () => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen
      options={{ headerShown: false }}
      name="Settings"
      component={Settings}
    />
  </SettingsStack.Navigator>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors.main_blue,
        inactiveTintColor: "gray",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Settings") {
            iconName = "settings-outline";
          } else {
            iconName = "cart";
          }

          return (
            <Ionicons name={iconName as "key"} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeStackScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        component={BidsStackSceen}
        name="Bids"
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={SettingsStackScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
