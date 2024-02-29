import { View, TouchableOpacity, FlatList, Dimensions, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import LoadignScreen from "./LoadignScreen";
import PageContainer from "../components/global/PageContainer";
import { fetchNewspapers } from "../api/apis";
import { Feather } from "@expo/vector-icons";
import Sizes_ from "../../utils/Sizes";
import ModalNewPaper from "../components/modals/ModalNewPaper";
const ImageDog = (props) => {
  const { navigation } = props;
  const [dataNews, setDataNews] = useState([]);
  const [datacurrentNew, setDataCurrentNew] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState("Fetch News ...");
  const [showModalNew, setShowModalNew] = useState(false);
  useFocusEffect(
    useCallback(() => {
      getNewsData();
    }, [])
  );
  const getNewsData = async () => {
    setLoading(true);
    try {
      const data = await fetchNewspapers();
      console.log("data news", data.newspapers[4]);
      data && setDataNews(data.newspapers);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetchNewspapers : ", error);
      setLoading(false);
    }
  };
  const renderItemNewPaper = (item) => {
    const auxNewPaper = item.item;
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
            flex: 0.8,
            width: "100%",
            height: "100%",
            justifyContent:'space-around',
            paddingHorizontal:10
          }}
        >
          <Text>Control Number: {auxNewPaper.lccn}</Text>
          <Text>Tittle: {auxNewPaper.title}</Text>
          <Text>State: {auxNewPaper.state}</Text>
        </View>
        <TouchableOpacity
        onPress={()=>{
          setDataCurrentNew(auxNewPaper)
          setShowModalNew(true)
        }}
          style={{
            flex: 0.2,
            width: "100%",
            height: "100%",
            borderWidth:0,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'yellow',
            borderRadius:10,

          }}
        >
          <Feather name="plus" size={Sizes_.normal} color={'black'} />
          <Text>See More</Text>
        </TouchableOpacity>
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
          data={dataNews}
          renderItem={renderItemNewPaper}
          keyExtractor={(item, index) => {
            return index
          }}
          ItemSeparatorComponent={itemSeparator}
        />
      </View>
      {showModalNew && <ModalNewPaper currentNew={datacurrentNew}  modalVisible={showModalNew} setModalVisible={setShowModalNew} />}
    </PageContainer>
  );
};

export default ImageDog;
