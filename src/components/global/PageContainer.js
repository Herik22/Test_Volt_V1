import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import Sizes_ from "../../../utils/Sizes";

const PageContainer = ({
  children,
  styles,
}) => {
  return (
    <View
    style={{paddingHorizontal:10,alignItems:'center',justifyContent:'flex-start',flex:1,width:'100%',height:'100%',backgroundColor:'white',...styles}}
    >

      {(
        <TouchableOpacity 
        onPress={()=>{
            alert('Cerrando Session')
        }}
        style={{alignSelf:'flex-end',alignItems:'center'}}>
        <Feather name="log-out" size={Sizes_.normal} color={'black'} />
          <Text style={{color:'black',fontSize:Sizes_.small}} >LogOut</Text>
        </TouchableOpacity>
      )}
      {children}
    </View>
  );
};

export default PageContainer;
