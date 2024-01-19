import React, { useState } from 'react'
import Header from '../components/header';
import { View, Text, SafeAreaView, Alert, TouchableOpacity,ImageBackground } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import styles from '../assets/css/styles';
function useInput() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }
    return {
        date,
        showDatepicker,
        show,
        mode,
        onChange
    }
}

const Home = () => {
    const input = useInput(new Date())
    const input2 = useInput(new Date())
    const navigation = useNavigation();

        function goToList() {
      if(input==null || input2==null)
      {
        Alert.alert(
          'Warning',
          'All field are required!',
          [
            {
              text: 'Ok',
              onPress: () =>{
                this.props.navigation.navigate('Home')
            }
            },
          ],
          { cancelable: false}
        )
      }
      else if(input2.date.getFullYear()==input.date.getFullYear())
      {
        if(input2.date.getMonth()<input.date.getMonth())
        Alert.alert(
          'Warning',
          'Check out date must be greater than or equal check in date! (check months)',
          { cancelable: true}
        )
        else if(input2.date.getMonth()==input.date.getMonth() && input2.date.getDate()<input.date.getDate()){
          Alert.alert(
            'Warning',
            'Check out date must be greater than or equal to check in date! (check dates)',
            { cancelable: true}
          )
        }
        else{
            navigation.navigate('List',{check_in_date:input.date.toISOString("dd/mm/yyyy").split( "T" )[0],check_out_date:input2.date.toISOString("dd/mm/yyyy").split( "T" )[0]})
        }
      }
      else if(input2.date.getFullYear()<input.date.getFullYear())
      {
        Alert.alert(
          'Warning',
          'Check out date must be greater than or equal check in date (check on years)!',
          { cancelable: true}
        )
      }
      else{
       navigation.navigate('List',{check_in_date:input.date.toISOString("dd/mm/yyyy").split( "T" )[0],check_out_date:input2.date.toISOString("dd/mm/yyyy").split( "T" )[0]})
       
      }
      }    
return (
        <SafeAreaView >
        <Header/>
        <ImageBackground source={require('../assets/car1.jpg')} style={styles.imagebg}>
        <View style={[styles.check, styles.elevation]}>
        <Text style={styles.theading}>Check available Car</Text>
        <View style={styles.line}/>
        <Text style={styles.heading}>Arrival</Text>
           <TouchableOpacity             
              onPress={input.showDatepicker}
              style={styles.dateinput}
              >
              {input.show && (
                   <DateTimePicker
                   testID="dateTimePicker1"
                   value={input.date}
                   format="DD-MM-YYYY"
                   mode={input.mode}
                   is24Hour={true}
                   display="default"
                   minimumDate={new Date()}
                   style={{width: "50%", marginTop: 15}}
                   onChange={input.onChange}
                   />
               )}
               <Text>{input.date.getFullYear()}{"-"}{input.date.getMonth()+1}{"-"}{input.date.getDate()}</Text>
               </TouchableOpacity>
               <Text style={styles.heading}>Departure</Text>
               <TouchableOpacity              
              onPress={input2.showDatepicker}
              style={styles.dateinput}
              >
              {input2.show && (
                   <DateTimePicker
                   testID="dateTimePicker2"
                   value={input2.date}
                   format="DD-MM-YYYY"
                   mode={input2.mode}
                   is24Hour={true}
                   display="default"
                   minimumDate={new Date()}
                   style={{width: "50%", marginTop: 15}}
                   onChange={input2.onChange}
                    />
              )}
              <Text>{input2.date.getFullYear()}{"-"}{input2.date.getMonth()+1}{"-"}{input2.date.getDate()}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                    style={styles.mainbutton}
                        onPress={() => goToList()}>
                        <Text style={styles.heading}>Hire car</Text>
                    </TouchableOpacity>
              </View>
              </ImageBackground>
              </SafeAreaView>
  )
}
export default Home;


