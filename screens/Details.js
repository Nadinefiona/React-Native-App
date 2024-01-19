
import React ,{useState, useEffect}from 'react';
import axios from 'axios';
import { Image,Text,ScrollView, View, TouchableOpacity,ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';  
import styles from '../assets/css/styles';
import COLORS from '../assets/colors/colors';
const Details = ({route}) => {
    const [isLoading,setLoading]=useState(true);
    const [name,setName]=useState('');
    const [specifications,setSpecifications]=useState('');
    const [price,setPrice]=useState('');
    const [image,setImage]=useState('');
    const getCar=async (id)=>{
        try{
      const response=await axios.get(''+id);
      const data=response.data;
      setName(data.name)
      setSpecifications(data.specifications)
      setPrice(data.price)
      setImage(data.image)
      setLoading(false)
        }
        catch(e){
        }
      }
      useEffect(()=>{getCar(route.params.rid)},[])
    const navigation = useNavigation();
    return(
        <ScrollView>
        
      <View style={styles.section}>
      {isLoading? <View style= {styles.activityIndicator}>
            <ActivityIndicator
            style= {styles.indicator}
            size={70}
            /><Text style={styles.signup}>Loading...</Text></View>:(
      <View style={styles.detailsForm}>
      
        <Image style={styles.carimage} source={{uri: image}} />
        <View style={styles.details}>
            <Text style={styles.heading}>{name}</Text>
            <Text style={styles.price} >$ {price} /day</Text>
            <Text style={styles.specs}>{specifications}</Text>
            
            
        </View>
        <Text style={styles.additional}>
        <Ionicons name="ios-wifi" size={21} color={COLORS.main} />
        <Text> Free wifi</Text>
        
        <Text> | <MaterialCommunityIcons name="fridge-outline" size={19} color="black" /> Fridge</Text>

        
        <Text> | <FontAwesome name="tv" size={19} color="black" /> Flat TV</Text>
        <Text> | Italian breakfast</Text>
        </Text>
        <View>
        <TouchableOpacity
            style={styles.button}
            onPress={()=>navigation.navigate("Home")}
        >
        <Text>Hire car</Text>
        </TouchableOpacity>
        </View>
        </View>
      )}
        </View>
        </ScrollView>
        
    )}

export default Details