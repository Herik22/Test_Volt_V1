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
  import InformationContainer from "../ticker/Information";
  
  const ModalTickerInfo = ({ setModalVisible, modalVisible, currentTicker }) => {
    const _renderModalContent = () => (
      <View style={[styles.modalContent]}>
        <View
          style={{
            flex: 0.7,
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
              gap: 10,
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
            <InformationContainer
              title="At"
              value={currentTicker.at}
              hasBorders
            />
          </View>
        </View>
  
        {/* "baseAsset": "btc",
          "quoteAsset": "inr",
          "openPrice": "4980952",
          "lowPrice": "4960550.0",
          "highPrice": "5493000.0",
          "lastPrice": "5329999.0",
          "volume": "29.85749",
          "bidPrice": "5316000.0",
          "askPrice": "5329999.0",
          "at": 1709179187000 */}
        <View
          style={{
            flex: 0.3,
            width: "100%",
            height: "100%",
            justifyContent: "flex-start",
            borderWidth: 0.3,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{
              width: "100%",
              height: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Close</Text>
          </TouchableOpacity>
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
      height: Dimensions.get("window").height * 0.3,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: "100%",
      backgroundColor: "white",
    },
  
    textBlanco: {
      color: "white",
    },
  });
  
  export default ModalTickerInfo;