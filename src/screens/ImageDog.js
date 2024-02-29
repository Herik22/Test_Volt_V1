import { View, Image, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import LoadingScreen from "./LoadingScreen";
import PageContainer from "../components/global/PageContainer";
import { fetchRandomDogImage } from "../api/apis";
const ImageDog = (props) => {
  const { navigation } = props;
  const [dataDogs, setDataDogs] = useState(false);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getDogData();
    }, [])
  );
  const getDogData = async () => {
    setLoading(true);
    try {
      const data = await fetchRandomDogImage();
      data.status == "success" && setDataDogs(data);
      setLoading(false);
    } catch (error) {
      alert(`Get Dogt Data  Error : ${error}`);
      setLoading(false);
    }
  };
  return loading ? (
    <LoadingScreen message={"Fetch Dog ..."} />
  ) : (
    <PageContainer navigation={navigation} title="Image Dog">
      <View style={styles.container}>
        <View style={styles.containerImgDog}>
          <Image source={{ uri: dataDogs.message }} style={styles.imgDog} />
        </View>
      </View>
    </PageContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerImgDog: { width: "100%", height: "90%", borderRadius: 20 },
  imgDog: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
});
export default ImageDog;
