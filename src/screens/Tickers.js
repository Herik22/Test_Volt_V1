import { useFocusEffect } from "@react-navigation/native";
import React, {useState, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import LoadingScreen from "./LoadingScreen";
import ModalTickerInfo from "../components/modals/ModalTickerInfo";
import InformationContainer from "../components/global/Information";
import PageContainer from "../components/global/PageContainer";
import { fetchTickers } from "../api/apis";
import Card from "../components/global/Card";
import Colors from "../../utils/Colors";
import ItemSeparator from "../components/global/ItemSeparator";
const Tickers = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(false);
  const [tickersData, setTickersData] = useState({});
  const [dataCurrentTicker, setDataCurrentTicker] = useState({});
  const [showModalTicker, setShowModalTicker] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getTickers();
    }, [])
  );

  const getTickers = async () => {
    setLoading(true);
    try {
      const data = await fetchTickers();
      data && setTickersData(data);
      setLoading(false);
    } catch (error) {
      alert(`Get Tickers  Error : ${error}`);
      setLoading(false);
    }
  };
  const renderItemTickersData = (item) => {
    const auxTicker = item.item;
    const atDate = new Date(auxTicker.at)
    return (
      <View>
        <Card
          onPress={() => {
            setDataCurrentTicker(auxTicker);
            setShowModalTicker(true);
          }}
        >
          <View style={styles.tickerContainer}>
            <Text
              style={styles.tickerText}
            >{`${auxTicker.baseAsset}/${auxTicker.quoteAsset}`}</Text>
          </View>
          <View style={styles.infoContainer}>
            <InformationContainer
              title="Last Price"
              value={auxTicker.lastPrice}
            />
          
            <InformationContainer
              title="Range"
              value={`${auxTicker.lowPrice} - ${auxTicker.highPrice} `}
            />
            
          </View>
        </Card>
        <Text style={styles.txtDate}> {atDate.toLocaleDateString()} </Text>
      </View>
    );
  };

  return loading ? (
    <LoadingScreen message={"Fetch Tickers ..."} />
  ) : (
    <PageContainer navigation={navigation} title="NewsPapers">
      <View
        style={styles.pageContainer}
      >
        <FlatList
          data={tickersData}
          initialNumToRender={7}
          renderItem={renderItemTickersData}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={ItemSeparator}
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

const styles = StyleSheet.create({
  tickerContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: Colors.lowContrastGray,
  },
  tickerText: {
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.main,
  },
  infoContainer: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft:0,
    gap: 20,
  },
  separator: {
    height: 10,
    width: "100%",
  },
  txtDate:{width:'100%',textAlign:'right',paddingRight:10,color:Colors.mediumContrastGray},
  pageContainer:{
    flex: 1,
    width: "100%",
    height: "100%",
  },

});
export default Tickers;
