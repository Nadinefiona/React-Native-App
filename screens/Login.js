import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TextInput, Text, ScrollView,View, TouchableOpacity,ActivityIndicator,Alert,Image} from 'react-native'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import styles from '../assets/css/styles';
const Login = () => {
   const navigation = useNavigation();
   const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [isLoading,setLoading]=useState(false);
    const Signin=async()=>{
      if(email=="" || email==""){
        Alert.alert(
          'Warning',
          'All field are required!',
          [
            {
              text: 'Ok',
              onPress: () =>{
                navigation.navigate('Login')
            }
            },
          ],
          { cancelable: false}
        )
      }
      else{
        setLoading(true)
        try{
          const customer = JSON.stringify({
            email:email,
            password:password
          });
          const config = {
              headers: {
              'Content-Type': 'application/json'
              }
                };
      const response = await axios.post('https://reservation-zeta.vercel.app/customer/login', customer, config);
      if(response.data.error){
        setLoading(false)
          Alert.alert(
            'Error',
            `${response.data.error}`,
            [
              {
                text: 'Ok',
                onPress: () =>{
                  navigation.navigate('Login')
              }
              },
            ],
            { cancelable: false}
          )
        }
        else{
          setLoading(false)
          await AsyncStorage.setItem('token',response.data.token);
          navigation.navigate('Home') 
        }
          }
          catch(e){
          }
        }}
    return (
      <ScrollView style={styles.container}>
      <View style={styles.main}>
          {isLoading?
          <View style= {styles.activityIndicator}>
            <ActivityIndicator
            style= {styles.indicator}
            size={70}
            /><Text style={styles.signup}>Logging in...</Text></View>:(
            <View style={styles.section}>
      <View style={[styles.loginForm, styles.elevation]}>
      <View>
            <Image style={styles.mainlogo} source={require("../assets/icon.png")} />
        </View> 

        <Text style={styles.subtitle}>Welcome Back</Text>
        <View style={styles.line}/>

        <View style={styles.inputs}>
      <View style={styles.icons}>
      <Feather name="mail" size={24} color="yellow" />
      </View>
      <View style={{flex:8}}>
          <TextInput 
           onChangeText={(text)=>setEmail(text)}
           placeholder="email"
          style={styles.input_login}
          />
          </View>
           </View>
      <View style={styles.inputs}>
      <View style={styles.icons}>
      <AntDesign name="lock" size={32} color="yellow" />
      </View>
      <View style={{flex:8}}>
          <TextInput 
           onChangeText={(text)=>setPassword(text)}
           placeholder="password"
          secureTextEntry={true} 
          style={styles.input_login}
          >
          </TextInput>
          </View></View>
          <TouchableOpacity
        style={styles.button}
        onPress={()=>Signin()}
      >
      <Text style={styles.heading}>Login</Text>
      </TouchableOpacity>

      
      <Text style={styles.cover}>Forgot Password?</Text>
      </View>
      
      <View style={styles.miniForm}>
      <View style={styles.account}>
      <Text style={styles.pheading}>Not a member?</Text>
      <TouchableOpacity
      onPress={()=>navigation.navigate("Signup")}
      >
      <Text style={styles.signup}>Sign up</Text>
      </TouchableOpacity>
      
      </View>
      </View>
      </View>
      )}
      </View>
      </ScrollView>
    )
}
export default Login