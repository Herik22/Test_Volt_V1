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
import { fetchExtraDataNewPaper } from "../../api/apis";
import InformationContainer from "../global/Information";
import Colors from "../../../utils/Colors";

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
      data && setDataNew(data);

      setLoading(false);
    } catch (error) {
      alert(`Get ExtraData News  Error : ${error}`);
      setLoading(false);
    }
  };
  const renderDataContainer = (dataNew) => {
    return (
      <ScrollView style={styles.containerScroll}>
        <View style={styles.containerData}>
          <Text style={styles.titleNews}>{`${dataNew.name}`}</Text>
          <InformationContainer
            title={"Publisher"}
            value={dataNew.publisher}
            inLine
          />
          <InformationContainer title={"Place"} value={dataNew.place} inLine />
          <InformationContainer
            title={"Place of Publication"}
            value={dataNew.place_of_publication}
            inLine
          />
          <InformationContainer
            title={"Start Year"}
            value={dataNew.start_year}
            inLine
          />
          <InformationContainer
            title={"End Year"}
            value={dataNew.end_year}
            inLine
          />
          <InformationContainer
            title={"Number of Issues"}
            value={dataNew.issues.length}
            inLine
          />
          <InformationContainer
            title={"Subjects"}
            value={dataNew.subject.length}
            inLine
          />
        </View>
      </ScrollView>
    );
  };
  const _renderModalContent = () => (
    <View style={[styles.modalContent]}>
      <View style={styles.dataModalContainer}>
        {loading && <ActivityIndicator size="large" color={Colors.main} />}
        {!loading && dataNew && (
          <View style={styles.subModalContainer}>
            {renderDataContainer(dataNew)}
          </View>
        )}
      </View>

      <View style={styles.buttonCloseModalContainer}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.buttonClose}
        >
          <Text style={styles.textClose}>Close</Text>
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
  textClose: {
    fontSize: Sizes_.small,
    color: Colors.mediumContrastGray,
    fontWeight: "bold",
  },
  containerScroll: { width: "100%", height: "100%" },
  containerData: {
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    gap: 10,
    alignItems: "flex-start",
  },
  titleNews: {
    alignSelf: "center",
    fontSize: Sizes_.x_small,
    fontWeight: "bold",
    color: Colors.main,
  },
  dataModalContainer: {
    flex: 0.8,
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    padding: 20,
    alignItems: "center",
    borderWidth: 0,
  },
  subModalContainer: { width: "100%", height: "100%" },
  buttonCloseModalContainer: {
    flex: 0.2,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    borderWidth: 0.3,
    flexDirection: "row",
  },
  buttonClose: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ModalNewPaper;
