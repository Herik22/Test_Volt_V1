import { View, FlatList, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import LoadingScreen from "./LoadingScreen";
import PageContainer from "../components/global/PageContainer";
import { fetchJournals } from "../api/apis";
import Card from "../components/global/Card";
import InformationContainer from "../components/global/Information";
import Sizes_ from "../../utils/Sizes";
import Colors from "../../utils/Colors";
import ItemSeparator from "../components/global/ItemSeparator";
const Journals = (props) => {
  const { navigation } = props;
  const [dataJournals, setDataJournals] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getNewsData();
    }, [])
  );
  const getNewsData = async () => {
    setLoading(true);
    try {
      const data = await fetchJournals();
      data && setDataJournals(data.message.items);
      setLoading(false);
    } catch (error) {
      alert(`Get Journals  Error : ${error}`);
      setLoading(false);
    }
  };
  const rendeItemJournal = (item) => {
    const auxJournal = item.item;
    const topics = auxJournal.subjects.map((value) => value.name);
    const issnTypes = auxJournal["issn-type"].map((value) => value.type);
    const lastStatusDate = new Date(auxJournal["last-status-check-time"]);
    return (
      <Card hasSeeMore={false}>
        <View style={styles.containerCardJournal}>
          <Text style={styles.tittleJournal}>{auxJournal.title}</Text>
          {auxJournal.ISSN.length > 0 && (
            <InformationContainer
              title={"ISSN:"}
              value={auxJournal.ISSN.join(", ")}
              inLine
            />
          )}
          {auxJournal["issn-type"].length > 0 && (
            <InformationContainer
              title={"ISSN Types:"}
              value={issnTypes.join(", ")}
              inLine
            />
          )}
          <InformationContainer
            title={"Publisher:"}
            value={auxJournal.publisher}
            inLine
          />
          {auxJournal.subjects.length > 0 && (
            <InformationContainer
              title={"Topic:"}
              value={topics.join(", ")}
              inLine
            />
          )}
          {
            <InformationContainer
              title={"Total Dois:"}
              value={auxJournal.counts["total-dois"]}
              inLine
            />
          }
          <InformationContainer
            title={"Last Status Check:"}
            value={lastStatusDate.toLocaleDateString()}
            inLine
          />
        </View>
      </Card>
    );
  };

  return loading ? (
    <LoadingScreen message={"Fetch Journals ..."} />
  ) : (
    <PageContainer navigation={navigation} title="NewsPapers">
      <View style={styles.containerPage}>
        <FlatList
          data={dataJournals}
          initialNumToRender={5}
          renderItem={rendeItemJournal}
          keyExtractor={(item, index) => {
            return index;
          }}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  tittleJournal: {
    fontSize: Sizes_.x_small,
    color: Colors.main,
    fontWeight: "bold",
    alignSelf: "center",
  },
  containerCardJournal: { width: "100%", alignItems: "flex-start", gap: 5 },
  containerPage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
export default Journals;
