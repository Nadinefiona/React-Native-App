import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { Image,Text, View, TouchableOpacity, SafeAreaView,TextInput, ActivityIndicator,FlatList,RefreshControl} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { EvilIcons } from '@expo/vector-icons'; 
import styles from '../assets/css/styles';
import Header from '../components/header';
const Cars = () => {
  const url='';
  const [isLoading,setLoading]=useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const [Cars, setCars] = useState([]);

  const getCars=async ()=>{
    try{
      const response=await axios.get(url);
      setCars(response.data)
      setFilteredCars(response.data)
      setLoading(false)
    }
    catch(e){
    }
  } 
  const searchFilter = (text) => {
    if (text) {
      const newCar = Cars.filter(function (item) {
        const carData = item.name
        const textData = text;
        return carData.indexOf(textData) > -1;
      });
      setFilteredCars(newCar);
      setSearch(text);
    } else {
      setFilteredCars(Cars);
      setSearch(text);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getCars()
      setRefreshing(false);
    }, 5000);
  };
  useEffect(()=>{getCars()},[]);
    const navigation = useNavigation();
    return(
      <SafeAreaView style={styles.container}>
        <Header />
        {isLoading? 
          <View style= {styles.activityIndicator}>
            <ActivityIndicator
            style= {styles.indicator}
            size={70}
            /><Text style={styles.signup}>Loading Cars...</Text></View>:(
              <View>
              <View  style={styles.search}>
       <View style={styles.sinput}>
      <View style={styles.sicon}>
      <EvilIcons name="search" size={29} color="yellow" />
      </View>
      <View style={{flex:8}}>
          <TextInput 
           onChangeText={(text) => searchFilter(text)}
          onBlur={(text) => searchFilter('')}
          onCancel={(text) => searchFilter('')}
          placeholder="Search for a car here"
          value={search}
          style={styles.input_search}
          />
          </View>
          </View>

        </View>
        <View style={styles.list}>
        <FlatList
        data={filteredCars}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => 
        <TouchableOpacity
            onPress={()=>navigation.navigate("Details",{rid:item._id})}
            >
        <View style={styles.Cars}>
        <Image style={styles.image} source={{uri: item.image}}/> 
        <View style={styles.tags}>
            <View>
            <Text style={styles.name}>{item.name}</Text>
            </View>
            <View>
            <Text style={styles.price} ><Text>$ </Text>{item.price}<Text> /day</Text></Text>
            </View>
            <View style={styles.specials}>
              <Text style={{width:70}}> Free Driver</Text>
              <Text style={{width:60}}>|Snacks and drink</Text>
              <Text style={{width:70}}>|Phone chargers</Text>
              <Text style={{width:120}}>|Free wifi</Text>
              <Text style={{width:60}}>|Games and playing cards</Text>
            </View>
        </View>
        </View>
        </TouchableOpacity>
        }
        refreshControl={
        <RefreshControl refreshing={refreshing} 
          onRefresh={onRefresh}/>
      } 
      />   
      </View>
      </View>
      )}
        </SafeAreaView>
    )
  }
export default Cars