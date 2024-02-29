import { Text, View, StyleSheet } from "react-native";
import Colors from "../../../utils/Colors";
import Sizes_ from "../../../utils/Sizes";

const InformationContainer = ({
  title,
  value,
  hasBorders = false,
  inLine = false,
}) => {
  const flexDirection = inLine ? "row" : "column";
  const gap = inLine ? 5 : 0;
  const alignItems = inLine ? "flex-start" : "center";
  return (
    <View
      style={[
        styles.container,
        hasBorders && styles.containerWithBorders,
        { flexDirection: flexDirection, gap: gap, alignItems: alignItems },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
   
  },
  containerWithBorders: {
    borderWidth: 0.3,
    padding: 4,
    borderColor:Colors.mediumContrastGray
  },
  title: {
    fontSize: Sizes_.x_small,
    fontWeight: "bold",
    color: Colors.main,
  },
  value: {
    maxWidth: "100%",
    overflow: "hidden",
    fontSize: Sizes_.x_small,
  },
});

export default InformationContainer;
