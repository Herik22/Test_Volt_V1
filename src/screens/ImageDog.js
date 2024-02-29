import {
  View,
  Image
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import {useState,useCallback } from "react";
import LoadignScreen from "./LoadignScreen";
import PageContainer from "../components/global/PageContainer";
import { fetchRandomDogImage } from "../api/apis";
const ImageDog = (props) => {
  const {navigation}=props
  const [dataDogs, setDataDogs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(
    "Cargando Información ..."
  );
  useFocusEffect(
    useCallback(() => {
      getDogData();

    }, [])
  );
  const getDogData = async ()=>{
    setLoading(true)
    try{
      const data = await fetchRandomDogImage()
      console.log('data dogs',data)
      data.status == 'success' && setDataDogs(data)
      setLoading(false)

    }catch (error) {
      console.error("Failed to fetch dog image: ", error);
      setLoading(false)
    }
  }
  return loading ? (
    <LoadignScreen message={messageLoading} />
  ) : (
    <PageContainer navigation={navigation} title="Image Dog">
       <View style={{ flex: 1, width: "100%", height: "100%",justifyContent:'center',alignItems:'center' }}>
        <View style={{width:'100%',height:'90%',borderRadius:20}}>
         <Image source={{uri:dataDogs.message}} style={{width:'100%',height:'100%',resizeMode:'cover',borderRadius:20}} />
        </View>
    </View>
    </PageContainer>
   
  );
};

export default ImageDog;
