import { StatusBar } from 'expo-status-bar';
import { Button, Dimensions, StyleSheet, Text, View,Image } from 'react-native';
import { GoogleSignin,GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useEffect,useState } from 'react';
import Sizes_ from '../../utils/Sizes';
import { useLogin } from '../../context/ContextProvider';


const Login = () => {
    const {setIsLoggedIn,setContextUserInfo} = useLogin()
  const [error,setError]=useState('')
  const [userInfo,setUserInfo]=useState('')
  useEffect(()=>{
    GoogleSignin.configure({
      webClientId:"456230115063-dj2ph04qj3knfo9ogt2n7v8vpognk4bn.apps.googleusercontent.com"
    })
  },[])

  const signIn= async () =>{
    try {
      await GoogleSignin.hasPlayServices()
      const auxUser = await GoogleSignin.signIn()
      setUserInfo(auxUser)
      setContextUserInfo(auxUser)
      setIsLoggedIn(true)
    } catch (error) {
      setError('')
    }  
  }
  const logOut = ()=>{
    setUserInfo('')
    setIsLoggedIn(false)
    GoogleSignin.revokeAccess()
    GoogleSignin.signOut()
  }
  const rederInfoUser=(userInfo)=>{
    return <View style={{width:'100%',height:Dimensions.get('window').height*0.3,backgroundColor:'grey',alignItems:'center',padding:10}}>
      <View style={{width:'100%',height:'20%'}}>
      <Text style={{textAlign:'center',fontSize:Sizes_.normal,color:'white'}}> {`Bienvenido, ${userInfo?.user?.givenName}`} </Text>
      </View>
      
      <View style={{width:'40%',height:'80%',borderRadius:200, overflow: 'hidden'}}>
    <Image source={{
      uri:userInfo?.user?.photo
    }} style={{width:'100%',height:'100%',resizeMode:'contain'}} />
      </View>
    </View>
  }
  return (
    <View style={styles.container}>
       <Text>{error && JSON.stringify(error)}</Text>     
       {userInfo && rederInfoUser(userInfo)}
       {userInfo?<Button title='LogOut' onPress={logOut}/>:<GoogleSigninButton size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Dark} onPress={signIn} />}
       <StatusBar style="auto" />
     </View>
   );
  
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login