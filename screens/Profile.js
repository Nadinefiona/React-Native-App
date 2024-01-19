import React, {useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ActivityIndicator, FlatList,Text,SafeAreaView, View,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import styles from '../assets/css/styles';
import Header from '../components/header';
const Profile = () => {
  const navigation=useNavigation()
    const [isLoading,setLoading]=useState(true);
    const [lname,setLastName]=useState('');
    const [fname,setFirstName]=useState('');
    const [username,setUserName]=useState('');
    const [prebooking,setPreBooking]=useState([]);
const profile_url='https://reservation-zeta.vercel.app/customer/me/profile';
const reservations_url='https://reservation-zeta.vercel.app/me/reservations';


  const getData=async ()=>{
    try{
        const token=await AsyncStorage.getItem('token');
        const response=await axios.get(profile_url,{headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
        }});
        const data=response.data;
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setUserName(data.email)

        const prebooking=await axios.get(reservations_url,{headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
          }});
          setPreBooking(prebooking.data);
        setLoading(false)
    }
    catch(e){
    }
  }
  const formatDate=(item)=>{
    let date=new Date(item)
    const fDate=date.toString().split(' ')
    return fDate[0]+" "+fDate[1]+" "+fDate[2]+" "+fDate[3]
  }
  const removeToken=async()=>{
    try{
      setLoading(true)
      const logout_url='https://reservation-zeta.vercel.app/logout'
        const token=await AsyncStorage.getItem('token');
        await axios.post(logout_url,{
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
        );
        await AsyncStorage.removeItem('token');
        setLoading(false)
        navigation.navigate("Home")
        
    }
    catch(e){
    }
  }
  useEffect(()=>{getData()},[]);
    return(
      <SafeAreaView>
        <Header/>
        <View style={styles.section}>
        {isLoading?
          <View style= {styles.activityIndicator}>
            <ActivityIndicator
            style= {styles.indicator}
            size={70}
            /><Text style={styles.signup}>Loading...</Text></View>:(
              <View>
      <View style={styles.profile}>
        <View style={styles.label}>
        <Ionicons name="person" size={26} color="yellow" />
            <Text style={styles.titles}>{lname}{' '}{fname}{'\n'}</Text>
            </View>
            <View style={styles.label}>
            <Ionicons name="md-mail" size={26} color="yellow" />
            <Text style={styles.titles}>{username}{'\n'}</Text>
        </View>
        <View style={styles.label}>
        <AntDesign name="logout" size={24} color="yellwo" />
        <TouchableOpacity
      onPress={()=>removeToken()}
      >
      <Text style={styles.signup}>Logout</Text>
      </TouchableOpacity>
      
        </View>
        <View style={styles.label}>
        <AntDesign name="deleteuser" size={24} color="black" />
        <TouchableOpacity
      onPress={()=>{navigation.navigate('DeleteAccount')}}
      >
      <Text style={styles.signup}>Delete My Account</Text>
      </TouchableOpacity>
      
        </View>
        
        </View>
        <View style={styles.profile}>
      <View style={styles.label}>
        <Text style={styles.pheading}>{'My Bookings\n'}</Text>
            </View>
            <FlatList
        data={prebooking}
        renderItem={({item}) => 
            <View style={styles.prebooking}>
        <View style={styles.label}>
        <Octicons name="cross-reference" size={24} color="yellow" />
            <Text style={styles.titles}>{item.reference}{'\n'}</Text>
            </View>
            <View style={styles.label}>
            <FontAwesome name="bed"  size={24} color="yellow"/>
            <Text style={styles.titles}>{item.car_name}{'\n'}</Text>
            </View>
            <View style={styles.label}>
            <FontAwesome name="calendar-check-o" size={24} color="yellow" />
            <Text style={styles.titles}>{formatDate(item.checkInDate)}{'\n'}</Text>
        </View>
        <View style={styles.label}>
        <MaterialCommunityIcons name="clock-check-outline" size={24} color="yellow" />
            <Text style={styles.titles}>{formatDate(item.checkOutDate)}{'\n'}</Text>
        </View>
        <View style={styles.label}>
        <MaterialCommunityIcons name="clock-check-outline" size={24} color="yellow" />
            <Text style={styles.titles}>{item.status}{'\n'}</Text>
        </View>
        </View>
        }/>
        </View>
        </View>
        )
      }
        </View>
        </SafeAreaView>

    )}

export default Profile