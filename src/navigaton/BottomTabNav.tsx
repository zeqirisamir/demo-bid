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
import { View } from "react-native";
import Profile from "../screens/Profile/Profile";
import ProfileMenu from "../screens/Profile/ProfileMenu";
import WalletScreen from "../screens/Profile/WalletScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator<HomeParams>();
const SettingsStack = createStackNavigator();
const BidsStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="PostDetails" component={PostDetails} />
    <HomeStack.Screen name="Settings" component={Settings} />
    <HomeStack.Screen name="Profile" component={Profile} />
    <HomeStack.Screen name="ProfileMenu" component={ProfileMenu} />
    <HomeStack.Screen name="WalletScreen" component={WalletScreen} />
    <HomeStack.Screen name="MyBids" component={MyBids} />
  </HomeStack.Navigator>
);
// const BidsStackSceen = () => (
//   <BidsStack.Navigator screenOptions={{ headerShown: false }}>
//     <BidsStack.Screen name="MyBids" component={MyBids} />
//   </BidsStack.Navigator>
// );
// const SettingsStackScreen = () => (
//   <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
//     <SettingsStack.Screen
//       options={{ headerShown: false }}
//       name="Settings"
//       component={Settings}
//     />
//   </SettingsStack.Navigator>
// );

// const BottomTabNavigator = () => {
//   return (
//     <View style={{ backgroundColor: Colors.dark_grey, flex: 1 }}>
//       <Tab.Navigator
//         initialRouteName="Home"
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;

//             if (route.name === "Home") {
//               iconName = "home-outline";
//             } else if (route.name === "Settings") {
//               iconName = "settings-outline";
//             } else {
//               iconName = "cart";
//             }

//             return (
//               <Ionicons name={iconName as "key"} size={size} color={color} />
//             );
//           },
//         })}
//       >
//         <Tab.Screen
//           options={{ headerShown: false }}
//           name="Home"
//           component={HomeStackScreen}
//         />
//         <Tab.Screen
//           options={{ headerShown: false }}
//           component={BidsStackSceen}
//           name="Bids"
//         />
//         <Tab.Screen
//           options={{ headerShown: false }}
//           name="Settings"
//           component={SettingsStackScreen}
//         />
//       </Tab.Navigator>
//     </View>
//   );
// };

export default HomeStackScreen;
