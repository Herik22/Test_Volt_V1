import { View,FlatList,StyleSheet} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import LoadingScreen from "./LoadingScreen";
import PageContainer from "../components/global/PageContainer";
import { fetchNewspapers } from "../api/apis";
import ModalNewPaper from "../components/modals/ModalNewPaper";
import ItemSeparator from "../components/global/ItemSeparator";
import Card from "../components/global/Card";
import InformationContainer from "../components/global/Information";

const NewsPapers = (props) => {
  const { navigation } = props;
  const [dataNews, setDataNews] = useState([]);
  const [datacurrentNews, setDataCurrentNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModalNews, setShowModalNews] = useState(false);
  useFocusEffect(
    useCallback(() => {
      getNewsData();
    }, [])
  );
  const getNewsData = async () => {
    setLoading(true);
    try {
      const data = await fetchNewspapers();
      data && setDataNews(data.newspapers);
      setLoading(false);
    } catch (error) {
      alert(`Get News  Error : ${error}`);
      setLoading(false);
    }
  };
  const renderItemNewsPaper = (item) => {
    const auxNewsPaper = item.item;
    return <Card onPress={()=>{
      setDataCurrentNews(auxNewsPaper)
      setShowModalNews(true)
    }}> 
      <View style={styles.containerCard}>
        <InformationContainer title={'Control Number'} value={auxNewsPaper.lccn} inLine/>
        <InformationContainer title={'Title'} value={auxNewsPaper.title} inLine/>
        <InformationContainer title={'State'} value={auxNewsPaper.state} inLine/>
 
      </View>
    </Card>;
  };
 

  return loading ? (
    <LoadingScreen message={"Fetch News ..."} />
  ) : (
    <PageContainer navigation={navigation} title="NewsPapers">
      <View
        style={styles.container}
      >
        <FlatList
          data={dataNews}
          initialNumToRender={7}
          renderItem={renderItemNewsPaper}
          keyExtractor={(item, index) => item.lccn}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
      {showModalNews && <ModalNewPaper currentNew={datacurrentNews}  modalVisible={showModalNews} setModalVisible={setShowModalNews} />}
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  containerCard:{width:'100%',alignItems:'flex-start'},
  container:{
    flex: 1,
    width: "100%",
    height: "100%",
  },
})
export default NewsPapers;
