import {
    Button,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar
  } from "react-native";
  import {
    GoogleSignin,
    GoogleSigninButton,
  } from "@react-native-google-signin/google-signin";
  import { useEffect, useState } from "react";
  import Sizes_ from "../../utils/Sizes";
  import LoadignScreen from "./LoadignScreen";
  
  const Journals = () => {
    const [loading, setLoading] = useState(false);
    const [messageLoading, setMessageLoading] = useState(
      "Cargando Información ..."
    );
    return loading ? (
      <LoadignScreen message={messageLoading} />
    ) : (
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
          <Text style={{fontSize:Sizes_.normal}}> SOY EL JOURNALS   </Text>
      </View>
    );
  };
  
  export default Journals;
  