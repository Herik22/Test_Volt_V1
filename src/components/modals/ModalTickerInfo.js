import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
  } from "react-native";
  import Modal from "react-native-modal";
  import React, { useEffect, useState } from "react";
  import { Feather } from "@expo/vector-icons";
  import InformationContainer from "../global/Information";
import Sizes_ from "../../../utils/Sizes";
import Colors from "../../../utils/Colors";
  
  const ModalTickerInfo = ({ setModalVisible, modalVisible, currentTicker }) => {
   
    const _renderModalContent = () => (
      <View style={[styles.modalContent]}>
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
            padding: 20,
            alignItems: "center",
            borderWidth: 0,
          }}
        >
          {/* Symbol */}
          <View
            style={{ width: "100%", paddingBottom: 10, borderBottomWidth: 0.5 }}
          >
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {currentTicker.baseAsset}/{currentTicker.quoteAsset}
            </Text>
          </View>
  
          <View
            style={{
              width: "100%",
              marginTop: 10,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <InformationContainer
              title="Open Price"
              value={currentTicker.openPrice}
              hasBorders
            />
            <InformationContainer
              title="Low Price"
              value={currentTicker.lowPrice}
              hasBorders
            />
            <InformationContainer
              title="High Price"
              value={currentTicker.highPrice}
              hasBorders
            />
            <InformationContainer
              title="Last Price"
              value={currentTicker.lastPrice}
              hasBorders
            />
            <InformationContainer
              title="Volume"
              value={currentTicker.volume}
              hasBorders
            />
            <InformationContainer
              title="Bid Price"
              value={currentTicker.bidPrice}
              hasBorders
            />
            <InformationContainer
              title="Ask Price"
              value={currentTicker.askPrice}
              hasBorders
            />
            
          </View>
        </View>
       
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Modal
          onBackdropPress={() => setModalVisible(!modalVisible)}
          backdropOpacity={0.5}
          style={{ justifyContent: "flex-end", margin: 0 }}
          isVisible={modalVisible}
        >
          {_renderModalContent()}
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: { flex: 0.5, justifyContent: "center", alignItems: "center" },
    button: {
      backgroundColor: "aqua",
      justifyContent: "center",
      alignItems: "center",
      borderColor: "aqua",
      width: "100%",
      height: "100%",
    },
    modalContent: {
      height: Dimensions.get("window").height * 0.25,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: "100%",
      backgroundColor: "white",
    },
  
    textBlanco: {
      color: "white",
    },
    textClose:{ fontSize: Sizes_.small,color:Colors.mediumContrastGray,fontWeight:'bold' }
  });
  
  export default ModalTickerInfo;