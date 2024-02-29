import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import Sizes_ from "../../../utils/Sizes";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { fetchExtraDataNewPaper } from "../../api/apis";

const ModalNewPaper = ({ setModalVisible, modalVisible, currentNew }) => {
  const [loading, setLoading] = useState(false);
  const [dataNew, setDataNew] = useState(false);
  useEffect(() => {
    getNewData();
  }, []);

  const getNewData = async () => {
    setLoading(true);
    try {
      const data = await fetchExtraDataNewPaper(currentNew.url);
      console.log("data new", { ...data, issues: data.issues.length });
      data && setDataNew(data);

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch fetchExtraDataNewPaper: ", error);
      setLoading(false);
    }
  };
  const renderDataContainer = (dataNew) => {
    return (
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <Text>{`Title: ${dataNew.name}`}</Text>
          <Text>{`Start Year: ${dataNew.start_year}`}</Text>
          <Text>{`End Year: ${dataNew.end_year}`}</Text>
          <Text>{`Issues: ${dataNew.issues.length}`}</Text>
          <Text>{`Place: ${dataNew.place}`}</Text>
          <Text>{`Place of Publication: ${dataNew.place_of_publication}`}</Text>
          <Text>{`Publisher: ${dataNew.publisher}`}</Text>
          <Text>{`Subject: ${dataNew.subject}`}</Text>
        </View>
      </ScrollView>
    );
  };
  const _renderModalContent = () => (
    <View style={[styles.modalContent]}>
      <View
        style={{
          flex: 0.7,
          width: "100%",
          height: "100%",
          justifyContent: "space-around",
          padding: 20,
          alignItems: "center",
          borderWidth: 0,
        }}
      >
        {loading && <ActivityIndicator size="large" color="pink" />}
        {!loading && dataNew && (
          <Text style={{ textAlign: "justify", fontSize: Sizes_.small }}>
            {renderDataContainer(dataNew)}
          </Text>
        )}
      </View>

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
          <Text style={{ fontSize: Sizes_.small }}>Close</Text>
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
    height: Dimensions.get("window").height * 0.35,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    backgroundColor: "white",
  },

  textBlanco: {
    color: "white",
    fontSize: Sizes_.small,
  },
});

export default ModalNewPaper;
