import React, {useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TextInput,SafeAreaView,ScrollView, Text, View, KeyboardAvoidingView,TouchableOpacity,ActivityIndicator,Alert,Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from '../assets/css/styles';
const DeleteAccount = () => {
    const navigation = useNavigation();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [isLoading,setLoading]=useState(false);
    const profile_url='';
    const getData=async ()=>{
        try{
            setLoading(true)
            const token=await AsyncStorage.getItem('token');
            const response=await axios.get(profile_url,{headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
            }});
            const data=response.data;
            setEmail(data.email)
            setLoading(false)
        }
        catch(e){
        }
      }
    const Delete=async()=>{
      if( password==""){
        Alert.alert(
          'Warning',
          'Provide your password to continue!',
          { cancelable: false}
        )
      }
      else{
        
        try{
        setLoading(true)
        const customer = JSON.stringify({
          email:email,
          password:password
        });
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
              };
              
    const res = await axios.post('https://reservation-zeta.vercel.app/deleteaccount', customer, config);
    setLoading(false)
      if(res.data.error){
        Alert.alert(
        'Notification',
        `${res.data.error}`,
        { cancelable: false}
      )
     }
     else{
      await AsyncStorage.removeItem('token')
      setLoading(false)
      Alert.alert(
         'Success',
         'account was successfully deleted!',
         [
           {
             text: 'Ok',
             onPress: () =>{
               navigation.navigate('Signup')
           }
           },
         ],
         { cancelable: true}
       )
      }
    }
    catch(e){
    }
    
  }

    }
    useEffect(()=>{getData()},[]);
    return (
      <SafeAreaView style={styles.container}>
      {isLoading?
          <View style= {styles.activityIndicator}>
            <ActivityIndicator
            style= {styles.indicator}
            size={70}
            /><Text style={styles.signup}>loading...</Text></View>:(
      <ScrollView style={styles.main}>
      
      <View style={styles.miniForm}>
      <View style={styles.account}>
      <Text style={styles.pheading}>Please don't go,let's verify if it's you!! </Text>
      </View>
      </View>
      <View style={[styles.loginForm, styles.elevation]}>
        <Text style={styles.subtitle}>Confirm account deletion</Text>
        <View style={styles.line}/>
      <KeyboardAvoidingView>
      <Text style={styles.heading}>Email</Text>
          <TextInput 
           onChangeText={(text)=>setEmail(text)}
           value={email}
          style={styles.input}
          />
      <Text style={styles.heading}>Password</Text>
          <TextInput 
          onChangeText={(text)=>setPassword(text)}
          secureTextEntry={true}
          style={styles.input}
          />
          </KeyboardAvoidingView>
          <TouchableOpacity
        style={styles.button}
        onPress={()=>Delete()}
      >
        <Text style={styles.heading}>Delete account</Text>
      </TouchableOpacity>
      
      </View>
      </ScrollView>  
      )}
      </SafeAreaView>
    )
}
export default DeleteAccount
