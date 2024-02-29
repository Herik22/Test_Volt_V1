import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import ImageDog from "./screens/ImageDog";
import NewsPapers from "./screens/NewsPapers";
import Journals from "./screens/Journals";
import Tickets from "./screens/Tickets";
import Login from "./screens/Login";
import { useLogin } from "../context/ContextProvider";

const LoginStackNavigator = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <LoginStackNavigator.Navigator initialRouteName="Login">
      <LoginStackNavigator.Screen name="Login" component={Login} />
    </LoginStackNavigator.Navigator>
  );
};
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ImageDog" component={ImageDog} />
      <Tab.Screen name="NewsPapers" component={NewsPapers} />
      <Tab.Screen name="Journals" component={Journals} />
      <Tab.Screen name="Tickets" component={Tickets} />
    </Tab.Navigator>
  );
};

export default NavigationApp = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <MainTabs /> : <LoginStack />;
};
