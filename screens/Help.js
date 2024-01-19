import React,{useState} from 'react'
import axios from 'axios';
import { TextInput,ScrollView,ActivityIndicator, Text,SafeAreaView,View,Image, KeyboardAvoidingView,TouchableOpacity,Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from '../assets/css/styles';
import Header from '../components/header';
const Help = () => {
    const navigation = useNavigation();
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [email,setEmail]=useState('');
    const [message,setMessage]=useState('');
    const [isLoading,setLoading]=useState(false);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    const sendRequest=async()=>{
      if(firstName=="" || lastName=="" || email=="" || message==""){
        Alert.alert(
          'Warning',
          'All field are required!',
          [
            {
              text: 'Ok',
              onPress: () =>{
                navigation.navigate('Help')
            }
            },
          ],
          { cancelable: false}
        )
      }
      else if(reg.test(email) === false){
        Alert.alert(
          'Warning',
          `Email is invalid, correct it and try again`,
          { cancelable: true}
        )
      }
      else{
        setLoading(true)
        try{
        const customer = JSON.stringify({
          firstName:firstName,
          lastName:lastName,
          email:email,
          message:message
        });
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
              };
    const response = await axios.post('https://reservation-zeta.vercel.app/customer/request', customer, config);
      if(response.data.error){
        setLoading(false)
        Alert.alert(
        'Notification',
        `${response.data.error}`,
        [
          {
            text: 'Ok',
            onPress: () =>{
              navigation.navigate('Help')
          }
          },
        ],
        { cancelable: false}
      )
     }
     else{
      setLoading(false)
      Alert.alert(
         'Success',
         'Your request was Accepted, we will reach you soon!',
         [
           {
             text: 'Ok',
             onPress: () =>{
               navigation.navigate('Home')
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
    return (
      <ScrollView  style={styles.scontainer}>
      {isLoading?
          <View style= {styles.activityIndicator}>
            <ActivityIndicator
            style= {styles.indicator}
            size={70}
            /><Text style={styles.signup}>Sending...</Text></View>:(
      <View style={styles.section}>
      <View style={[styles.contactForm, styles.elevation]}>
      <View>
            <Image style={styles.mainlogo} source={require("../assets/icon.png")} />
        </View> 
        <Text style={styles.subtitle}>
            Help Request
          </Text>
          <View style={styles.line}/>
      <Text style={styles.heading}>First name</Text>
          <TextInput 
          style={styles.input}
          onChangeText={(text)=>setFirstName(text)}
          />
      <Text style={styles.heading}>Last name</Text>
          <TextInput 
          style={styles.input}
          onChangeText={(text)=>setLastName(text)}
          />
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <Text style={styles.heading}>Email</Text>
          <TextInput 
          style={styles.input}
          onChangeText={(text)=>setEmail(text)}
          />

      <Text style={styles.heading}>Describe your Problem</Text>
          <TextInput 
          style={styles.variableInput}
          multiline
        numberOfLines={10}
        onChangeText={(text)=>setMessage(text)}
          />
      
      <TouchableOpacity
        style={styles.button}
        onPress={()=>sendRequest()}
      >
        <Text style={styles.heading}>Send</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
      </View>
      </View>
            )}
            </ScrollView>
    )
}
export default Help
