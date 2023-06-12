import { SafeAreaView, StyleSheet, Text, View ,Image, Dimensions, TextInput} from 'react-native'
import React,{useState, useEffect} from 'react'
import { ScrollView } from 'react-native'
import { COLORS, FONT } from '../../constants'
import { TouchableOpacity } from 'react-native'
import PhoneInput from 'react-native-phone-number-input';
import * as Google from "expo-auth-session/providers/google"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/userSlice';
import { ANDROID_CLIENT_ID, WEB_CLIENT_ID,EXPO_CLIENT_ID } from '@env';
import firebase from '../../hook/firebaseConfig';
import auth from '@react-native-firebase/auth';

const {height} = Dimensions.get('window');

WebBrowser.maybeCompleteAuthSession();

const Login = ({navigation}) => {
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const handlePhoneInputChange = (text) => {
      setPhoneNumber(text);
    };

    const [userInfo, setUserInfo] = React.useState(null)
    const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: ANDROID_CLIENT_ID,
      webClientId: WEB_CLIENT_ID,
      expoClientId: EXPO_CLIENT_ID
    })
    React.useEffect(() =>{
      handleSignInWithGoogle();
    }, [response]);
  
    async function handleSignInWithGoogle(){
      const user = await AsyncStorage.getItem("@user");
      if(!user){
        if(response?.type === "success"){
          await getUserInfo(response.authentication.accessToken);
          await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
      }
      else{
        setUserInfo(JSON.parse(user));
      }
    }
  
    const getUserInfo = async(token)=>{
      if(!token) return ;
      try {
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers:{Authorization: `Bearer ${token}`},
          }
        );
        const user = await response.json();
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserInfo(user);
        dispatch(setUser(user));
        navigation.navigate('home');
      } catch(error){
        console.log(error);
      }
    }

    // const handleSendCode = async () => {
    //   try {
    //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    //     setVerificationId(confirmation.verificationId);
    //   } catch (error) {
    //     console.log('Phone authentication error:', error);
    //   }
    // };
    const signInWithPhoneNumber = async () =>{
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      navigation.navigate('otp')
      console.log(confirmation);
    }
    // const handleVerifyCode = async () => {
    //   try {
    //     const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    //     await firebase.auth().signInWithCredential(credential);
    //   } catch (error) {
    //     console.log('Verification code error:', error);
    //   }
    // };

  return (
    <SafeAreaView style={{flex:1,width:'100%'}}>
    <Image
      source={require('../../assets/images/back.jpg')}
      style={{width:'100%',zIndex:-1}}
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
        <TouchableOpacity 
            style={[styles.button,{backgroundColor:(phoneNumber.length==13)?COLORS.one:COLORS.gray2}]}
            onPress={()=>
              navigation.navigate('otp')
              // signInWithPhoneNumber()
            }
            disabled={phoneNumber.length !== 13}
        >
            <Text style={{padding:7,fontFamily:FONT.medium, color:COLORS.lightWhite}}>Send OTP</Text>
        </TouchableOpacity>

        <View style={{position: 'relative',justifyContent:'center',marginVertical: 50}}>
      <View style={{height: 1,backgroundColor: 'black',marginVertical: 10,width:'80%',alignSelf:'center'}} />
      <Text style={{position: 'absolute',top: -5,backgroundColor: COLORS.lightWhite, paddingHorizontal: 10,alignSelf:'center',fontSize:20}}>or</Text>
      </View>

        <View style={{ flexDirection:'row',gap:55,marginLeft:'22%'}}>
        <TouchableOpacity onPress={()=>promptAsync()}>
        <Image style={styles.socialBtn} source={require('../../assets/icons/google.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
            <Image style={styles.socialBtn} source={require('../../assets/icons/microsoft.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
            <Image style={styles.socialBtn} source={require('../../assets/icons/apple.png')} />
        </TouchableOpacity>
        </View>

        <View style={{ flexDirection:'row',gap:10,marginLeft:'20%',marginTop:'10%'}}>
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
export default Login;


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
        height:45,
        justifyContent: 'center',

    },
    socialBtn:{
        height:40,
        width:40,
        marginTop:20,
    }
})