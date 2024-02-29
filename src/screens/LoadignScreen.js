import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, StyleSheet,ActivityIndicator, Text, View,Image } from 'react-native';


const LoadignScreen = (props)=>{
    const {message} = props
    return <View style={{flex:1,width:'100%',height:'100%',backgroundColor:'aqua',justifyContent:'center',alignItems:'center'}}>
     <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
     { message && <Text>{message}</Text>}
     <ActivityIndicator size="large" color="#232d53" />
    </View>

}

export default LoadignScreen