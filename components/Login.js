import { SafeAreaView, StyleSheet, Text, View ,Image, TextInput, Dimensions} from 'react-native'
import React,{useState} from 'react'
import { ScrollView } from 'react-native'
import { COLORS, FONT } from '../constants'
import { TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import PhoneInput from 'react-native-phone-number-input';

const {height} = Dimensions.get('window');

const Login = () => {
    const [selectedValue, setSelectedValue] = useState('dgfvd');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneInputChange = (text) => {
      setPhoneNumber(text);
    };

  return (
    <SafeAreaView style={{width:'100%',height:(height+40)}}>
    <Image
      source={require('../assets/images/back.jpg')}
      style={{width:'100%',height:(height-400),zIndex:-1}}
    />
    <ScrollView style={styles.dabba}>
        <View style={{flex:1,flexDirection:'row',gap:10,marginTop:110,alignSelf:'center'}}>
            <View style={styles.container}>
            <PhoneInput
                defaultCode='IN'
                placeholder='Phone number'
                value={phoneNumber}
                onChangeFormattedText={handlePhoneInputChange}
                containerStyle={styles.inputContainer}
                textInputStyle={styles.inputText}
                textContainerStyle={styles.inputTextContainer}
            />
            </View>
        </View>
        <TouchableOpacity style={[styles.button,,{backgroundColor:(phoneNumber.length==13)?COLORS.one:COLORS.gray2}]}>
            <Text style={{padding:7,fontFamily:FONT.medium, color:COLORS.lightWhite}}>Send OTP</Text>
        </TouchableOpacity>
        <View style={{height:1,width:'90%',backgroundColor:'black',marginTop:50,alignSelf:'center',}}/>
        <View style={{position:'absolute',marginTop:'66%',marginLeft:'37%',alignContent:'center',backgroundColor:'#FCFCFC'}}>
        <Text style={{textAlign:'center'}}>or</Text>
        </View>

        <View style={{ flexDirection:'row',gap:55,marginLeft:'22%',marginTop:'10%'}}>
        <TouchableOpacity>
            <Image style={styles.socialBtn} source={require('../assets/icons/google.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
            <Image style={styles.socialBtn} source={require('../assets/icons/microsoft.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
            <Image style={styles.socialBtn} source={require('../assets/icons/apple.png')} />
        </TouchableOpacity>
        </View>

        <View style={{ flexDirection:'row',gap:10,marginLeft:'20%',marginTop:'20%'}}>
            <Text style={{textAlign:'center'}} onPress={() => console.log('bhai')}>
               Not registered yet? 
            </Text>
            <Text style={{textAlign:'center',fontWeight:'bold'}} onPress={() => console.log('bhai')}>
               Create Account
            </Text>
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
    dabba:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        backgroundColor: '#FCFCFC',
        height:'60%',
        borderTopLeftRadius:70,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    inputContainer: {
        width: '80%',
        height: 60,
        borderRadius: 10,
        backgroundColor: '#F1F5F5',
        paddingHorizontal: 10,
      },
      inputText: {
        fontSize: 16,
        color: '#333333',
      },
      inputTextContainer: {
        backgroundColor: '#F1F5F5',
        padding: 10,
      },
    button:{
        width:'80%',
        marginTop:30,
        alignItems:'center',
        alignSelf:'center',
        borderRadius:10,      
        height:35
    },
    socialBtn:{
        height:40,
        width:40,
        marginTop:20,
    }
})