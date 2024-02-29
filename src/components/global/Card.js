import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../../utils/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

const Card = ({ onPress, children, hasSeeMore = true }) => {
  const contentWidth = hasSeeMore ? "88%" : "100%";

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={[styles.contentContainer, { width: contentWidth }]}>
        {children}
      </View>
      {hasSeeMore && (
        <View style={styles.iconContainer}>
          <FontAwesome5 name="eye" size={14} color={Colors.main} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    minHeight: Dimensions.get("window").height * 0.1,
    maxHeight: Dimensions.get("window").height * 0.2,
    borderWidth: 1,
    borderTopWidth: 8,
    borderRadius: 10,
    borderTopColor: Colors.lowContrastGray,
    borderColor: Colors.lowContrastGray,
    flexDirection: "row",
    padding: 8,
  },
  contentContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  iconContainer: {
    width: "12%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Card;
