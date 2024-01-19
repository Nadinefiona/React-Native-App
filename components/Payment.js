import React from 'react';
import { View, Text,TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../assets/css/styles';
import { useStripe } from '@stripe/stripe-react-native';

const Payment = ({total,check_in_date,check_out_date,rid,special}) => {
  const navigation = useNavigation();
  const amount = total;
  const {initPaymentSheet,presentPaymentSheet} = useStripe();

    const Start = async () =>{
        try {
            const res = await axios.post("https://reservation-zeta.vercel.app/reserve/pay",{amount});
            const data = await res.data;
            const { clientSecret } = data;
            const initSheet = await initPaymentSheet({
                merchantDisplayName: "La Posh Hotel",
                paymentIntentClientSecret:clientSecret,
                defaultBillingDetails: {
                    name: 'Jean Claude',
                  }
            });
            if(initSheet.error) return Alert.alert(initSheet.error.message);
            const openPaymentSheet = await presentPaymentSheet({clientSecret});
            if(openPaymentSheet.error) return Alert.alert(openPaymentSheet.error.message);
            const url=`https://reservation-zeta.vercel.app/reservation/${check_in_date}/${check_out_date}/${rid}`
              const token=await AsyncStorage.getItem('token');
              const booking = JSON.stringify({
                special_info:special,
              });
              const config = {
                  headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                  }
                    };
              const response = await axios.post(url, booking, config);
              Alert.alert(
                'Success',
                'Your booking was recorded',
                [
                  {
                    text: 'Ok',
                    onPress: () =>{
                      navigation.navigate('s')
                  }
                  },
                ],
                { cancelable: false}
              )
              
          }
          catch(e){
            Alert.alert(
              'Warning',
              `${e}`,
              { cancelable: true}
            )
          }
    }
  return (
    <View>
            
          <TouchableOpacity
        style={styles.button}
         onPress={()=>Start()}
      >
      <Text style={styles.heading}>Send</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Payment;