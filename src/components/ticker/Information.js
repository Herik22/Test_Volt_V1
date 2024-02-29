import { Text, View } from "react-native";

const InformationContainer = ({ title, value, hasBorders = false }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: hasBorders ? 0.5 : 0,
        padding: hasBorders ? 4 : 0,
        borderRadius: 5,
      }}
    >
      <Text style={{ fontSize: 12, color: "#000", opacity: 50 }}>{title}</Text>
      <Text style={{ fontSize: 12 }}>{value}</Text>
    </View>
  );
};

export default InformationContainer;