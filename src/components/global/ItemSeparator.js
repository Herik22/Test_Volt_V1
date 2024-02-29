import { StyleSheet,View } from "react-native";
const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
    width: "100%",
  },
});

export default ItemSeparator;
