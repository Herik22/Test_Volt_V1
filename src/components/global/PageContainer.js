import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../../utils/Colors";

const PageContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.white,
  },
});
export default PageContainer;
