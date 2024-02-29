import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState,useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import LoadignScreen from "./LoadignScreen";
import ModalTickerInfo from "../components/modals/ModalTickerInfo";
import InformationContainer from "../components/ticker/Information";
import PageContainer from "../components/global/PageContainer";
import { fetchTickers } from "../api/apis";
  const Tickets = (props) => {
    const {navigation}=props
    const [loading, setLoading] = useState(false);
    const [tickersData, setTickersData] = useState({});
    const [dataCurrentTicker, setDataCurrentTicker] = useState({});
    const [messageLoading, setMessageLoading] = useState("Fetching Tickers ...");
    const [showModalTicker, setShowModalTicker] = useState(false);

  

    useFocusEffect(
      useCallback(() => {
        getTickers();
      }, [])
    );

    const getTickers= async () => {
      setLoading(true);
      try {
        const data = await fetchTickers();
        console.log("data tickers", data[0]);
        data && setTickersData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetchTickers? : ", error);
        setLoading(false);
      }
    };
    const renderItemTickersData = (item) => {
      const auxTicker = item.item;
      return (
        <TouchableOpacity
          style={{
            width: "100%",
            height: Dimensions.get("window").height * 0.1,
            borderWidth: 0.4,
            borderRadius: 10,
            borderColor: "#2c2c2c",
            flexDirection: "row",
            padding: 10,
          }}
          onPress={() => {
            setDataCurrentTicker(auxTicker);
            setShowModalTicker(true);
          }}
        >
          <View
            style={{
              width: "20%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderRightWidth: 0.4,
            }}
          >
            <Text
              style={{
                textTransform: "uppercase",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {auxTicker.baseAsset}/{auxTicker.quoteAsset}
            </Text>
          </View>
  
          <View
            style={{
              width: "70%",
              height: "100%",
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
              borderRightWidth: 0.4,
            }}
          >
            <InformationContainer
              title="Open Price"
              value={auxTicker.openPrice}
            />
            <InformationContainer title="Low price" value={auxTicker.lowPrice} />
            <InformationContainer
              title="High Price"
              value={auxTicker.highPrice}
            />
            {/* <InformationContainer title="Volume" value={auxTicker.volume} /> */}
          </View>
  
          <View
            style={{
              width: "10%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="eye" size={12} color="black" />
          </View>
        </TouchableOpacity>
      );
    };
  
    const itemSeparator = () => {
      
      return <View style={{ height: 5, width: "100%" }} />;
    };
  
    return loading ? (
        <LoadignScreen message={messageLoading} />
    ) : (
      <PageContainer navigation={navigation} title="NewsPapers">
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <FlatList
            data={tickersData}
            renderItem={renderItemTickersData}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={itemSeparator}
          />
        </View>
        {showModalTicker && (
          <ModalTickerInfo
            currentTicker={dataCurrentTicker}
            modalVisible={showModalTicker}
            setModalVisible={setShowModalTicker}
          />
        )}
      </PageContainer>
    );
  };
  
  export default Tickets;
  