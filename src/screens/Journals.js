import { View, TouchableOpacity, FlatList, Dimensions, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import LoadignScreen from "./LoadignScreen";
import PageContainer from "../components/global/PageContainer";
import { fetchJournals } from "../api/apis";
import { Feather } from "@expo/vector-icons";
import Sizes_ from "../../utils/Sizes";
const Journals = (props) => {
  const { navigation } = props;
  const [dataJournals, setDataJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState("Fetch News ...");

  useFocusEffect(
    useCallback(() => {
      getNewsData();
    }, [])
  );
  const getNewsData = async () => {
    setLoading(true);
    try {
      const data = await fetchJournals();
      console.log("data journal", data.message.items[0]);
      data && setDataJournals(data.message.items);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetchJournals : ", error);
      setLoading(false);
    }
  };
  const rendeItemJournal = (item) => {
    const auxJournal = item.item;
    const lastStatusDate = new Date (auxJournal["last-status-check-time"])
    
    return (
      <View
        style={{
          width: '100%' ,
          height: Dimensions.get("window").height * 0.15,
          borderWidth: 0.3,
          borderRadius:10,
          flexDirection: "row",
          
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent:'space-around',
            paddingHorizontal:10
          }}
        >
          <Text>ISSN: {auxJournal.ISSN.length>0?auxJournal.ISSN:'Not Have'}</Text>
          <Text>Tittle: {auxJournal.title}</Text>
          <Text>Publisher: {auxJournal.publisher}</Text>
          
          <Text>Counts:</Text>
          
          <Text>Last Status Check: {lastStatusDate.toLocaleDateString()}</Text>
        </View>
       
      </View>
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
          data={dataJournals}
          renderItem={rendeItemJournal}
          keyExtractor={(item, index) => {
            return index
          }}
          ItemSeparatorComponent={itemSeparator}
        />
      </View>
    </PageContainer>
  );
};

export default Journals;
