import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import Sizes_ from "../../utils/Sizes";
import { useLogin } from "../../context/ContextProvider";
import GoogleIcon from "../../assets/googleIcon.png";
import VoltLogo from "../../assets/voltLogo.png";
import Colors from "../../utils/Colors";
import Config from "react-native-config";

const Login = () => {
  const { setIsLoggedIn, setContextUserInfo } = useLogin();
  const [error, setError] = useState("");
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const auxUser = await GoogleSignin.signIn();
      setContextUserInfo(auxUser);
      setIsLoggedIn(true);
    } catch (error) {
      setError(error);
      alert(`SignIn Error : ${error}`);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerName}>
        <Text style={styles.textName}>Test done by Herik for </Text>
        <Image source={VoltLogo} style={styles.imgVoltStyle} />
      </View>

      <View style={styles.containerSignIn}>
        <Text
          style={[
            styles.textSignIn,
            {
              fontSize: Sizes_.big,
              textAlign: "center",
            },
          ]}
        >
          Hi, Sign In
        </Text>
        <Text style={styles.textSignIn}>With your Google account.</Text>
      </View>

      {
        <TouchableOpacity onPress={signIn} style={styles.buttonGoogle}>
          <View style={styles.containerImgGoogle}>
            <Image source={GoogleIcon} style={styles.imgGoogle} />
          </View>
          <View style={styles.containerLabelGoogle}>
            <Text style={styles.txtButtonGoogle}> Sign in with Google </Text>
          </View>
        </TouchableOpacity>
      }
      <Text style={styles.textError}>{error && JSON.stringify(error)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4284F3",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  containerName: {
    width: "50%",
    position: "absolute",
    top: "10%",
    left: 20,
    height: "5%",
  },
  textName: { color: "white", fontSize: Sizes_.x_small },
  textError: {
    fontSize: Sizes_.x_small,
    color: Colors.red,
  },
  imgVoltStyle: { width: "30%", height: "50%", resizeMode: "contain" },
  containerSignIn: { marginBottom: 20 },
  textSignIn: {
    color: "white",
    fontSize: Sizes_.small,
    marginBottom: 5,
    fontWeight: "bold",
  },
  buttonGoogle: {
    width: "100%",
    height: Dimensions.get("window").height * 0.05,
    borderRadius: 20,
    backgroundColor: "white",
    flexDirection: "row",
    padding: 5,
  },
  containerImgGoogle: { flex: 0.2, width: "100%", height: "100%" },
  imgGoogle: { width: "100%", height: "100%", resizeMode: "contain" },
  containerLabelGoogle: {
    flex: 0.8,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  txtButtonGoogle: { color: "gray", fontWeight: "bold" },
});

export default Login;
