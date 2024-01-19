import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { TextInput,SafeAreaView, ActivityIndicator,Text,ScrollView,Alert, View, KeyboardAvoidingView} from 'react-native'
import styles from '../assets/css/styles';
import { StripeProvider } from '@stripe/stripe-react-native';
import {PUBLISHABLE_KEY} from '@env';
import Payment from '../components/Payment';

const Bookcar = ({route}) => {
  const rid=route.params.rid;
  const check_in_date=route.params.pick_up_date;
  const check_out_date=route.params.drop_up_date;
  const price=route.params.price;
  const name=route.params.name;
  const [special,setSpecial]=useState('');

  let daysCount=-1
  const cindate=new Date(check_in_date);
  const coutdate=new Date(check_out_date);
  if(coutdate.getDay()-cindate.getDay()==0){
    daysCount=1;
  }
  else{
    daysCount=coutdate.getDay()-cindate.getDay();
  }
  const total=daysCount*price
  const [amount,setAmount]=useState(total);

    return (
      <SafeAreaView style={styles.main}>
         <ScrollView style={styles.section}>
          <Text style={styles.subtitle}>
            Booking information
          </Text> 
      <View style={[styles.loginForm, styles.elevation]}>
      <Text style={styles.heading}>Check-in-Date</Text>
          <TextInput 
          style={styles.input}
          value={check_in_date}
          />
      <Text style={styles.heading}>Check-out-Date</Text>
          <TextInput 
          style={styles.input}
          value={check_out_date}
          />
      <Text style={styles.heading}>Car</Text>
          <TextInput 
          style={styles.input}
          value={name}
          />
          <KeyboardAvoidingView
          >
      <Text style={styles.heading}>
            Anything else? tell us
          </Text>
          <TextInput 
            multiline
            numberOfLines={2}
            onChangeText={(text)=>setSpecial(text)}
            style={styles.variableInput}
            >
          </TextInput>
          </KeyboardAvoidingView>
      <View style={styles.container}>
      <StripeProvider
      publishableKey={PUBLISHABLE_KEY}
      merchantIdentifier={`merchant.com.Native`}>
        <Payment 
        total={amount} 
        check_in_date={check_in_date} 
        check_out_date={check_out_date} 
        rid={rid} special={special} 
        />
      </StripeProvider>
    </View>
      </View>
      </ScrollView>
      </SafeAreaView>
    )
}
export default Bookcar