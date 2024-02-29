import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import Sizes_ from "../../utils/Sizes";

const LoadingScreen = (props) => {
  const { message } = props;
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      {message && <Text style={styles.textStyle}>{message}</Text>}
      <ActivityIndicator
        size="large"
        color={Colors.main}
        style={styles.activityStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: Sizes_.small,
    color: Colors.main,
    fontWeight: "bold",
  },
  activityStyle: {
    marginVertical: 20,
  },
});

export default LoadingScreen;
