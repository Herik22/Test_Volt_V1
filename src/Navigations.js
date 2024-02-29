import React from "react";
import { TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ImageDog from "./screens/ImageDog";
import NewsPapers from "./screens/NewsPapers";
import Journals from "./screens/Journals";
import Tickers from "./screens/Tickers";
import Login from "./screens/Login";
import { useLogin } from "../context/ContextProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../utils/Colors";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const LoginStackNavigator = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <LoginStackNavigator.Navigator initialRouteName="Login">
      <LoginStackNavigator.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </LoginStackNavigator.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { contextUserInfo, setContextUserInfo, setIsLoggedIn } = useLogin();
  const logOut = () => {
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    setContextUserInfo("");
    setIsLoggedIn(false);
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Log out",
                "Are you sure?",
                [
                  {
                    text: "No",
                    onPress: () => {},
                  },
                  { text: "Yes", onPress: () => logOut() },
                ],
                { cancelable: false }
              );
            }}
            style={styles.headerRightStyle}
          >
            <Image
              source={{ uri: contextUserInfo?.user?.photo }}
              style={styles.imgUser}
            />
          </TouchableOpacity>
        ),
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let colorI = focused ? Colors.main : Colors.mediumContrastGray;
          if (route.name === "ImageDog") {
            iconName = "dog";
          } else if (route.name === "NewsPapers") {
            iconName = "sticky-note";
          } else if (route.name === "Journals") {
            iconName = "journal-whills";
          } else if (route.name === "Tickers") {
            iconName = "money-bill-wave";
          }

          // Puedes ajustar el color y tamaño aquí
          return <FontAwesome5 name={iconName} size={size} color={colorI} />;
        },
        tabBarActiveTintColor: Colors.main, // Color cuando la tab está activa/focuseada
        tabBarInactiveTintColor: Colors.mediumContrastGray, // Color cuando la tab está inactiva
      })}
    >
      <Tab.Screen name="ImageDog" component={ImageDog} />
      <Tab.Screen name="NewsPapers" component={NewsPapers} />
      <Tab.Screen name="Journals" component={Journals} />
      <Tab.Screen name="Tickers" component={Tickers} />
    </Tab.Navigator>
  );
};

export default NavigationApp = () => {
  const { isLoggedIn } = useLogin();
  return isLoggedIn ? <MainTabs /> : <LoginStack />;
};

const styles = StyleSheet.create({
  headerRightStyle: { marginRight: 20 },
  imgUser: { width: 30, height: 30, borderRadius: 15 },
});
