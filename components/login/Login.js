import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions, TextInput,Alert } from 'react-native';
import React, { useState, useEffect,useRef } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONT } from '../../constants';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { setUser } from '../../features/userSlice';
import PhoneInput from 'react-native-phone-number-input';
import { getAuth, PhoneAuthProvider, signInWithCredential, signInWithPhoneNumber, PhoneAuthState } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from '../../config/firebase';

const { height } = Dimensions.get('window');

WebBrowser.maybeCompleteAuthSession();
const auth = getAuth(firebase);


const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const recaptchaVerifier = React.useRef(null);
  const [code, setCode] = useState('');
  const codeInputRefs = useRef([]);

  const handlePhoneInputChange = (text) => {
    setPhoneNumber(text);
  };

  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '679645096836-hk12ep2qpaorsnseoqa2vh0hq8htv318.apps.googleusercontent.com',
    webClientId: '679645096836-775l66pkib93nmrlgf8thqpokgmig79d.apps.googleusercontent.com',
    expoClientId: '679645096836-mahgotb3027r33k3jthcsnji64jomakg.apps.googleusercontent.com',
  });

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  const handleSignInWithGoogle = async () => {
    const user = await AsyncStorage.getItem('@user');
    if (!user) {
      if (response?.type === 'success') {
        await getUserInfo(response.authentication.accessToken);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfo(user);
      dispatch(setUser(user));
      navigation.navigate('home');
    } catch (error) {
      console.log(error);
    }
  };

  const sendOTP = async () => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      console.log('OTP sent on ',phoneNumber);
      navigation.navigate('otp', { verificationId,phoneNumber });
    } catch (error) {
      console.log('Error sending OTP', error);
    }
  };


  const handleCodeChange = (index, value) => {
    const updatedCode = code.split('');
    updatedCode[index] = value;
    setCode(updatedCode.join(''));

    if (value === '' && index > 0) {
      for (let i = index - 1; i >= 0; i--) {
        if (code[i]) {
          codeInputRefs.current[i].focus();
          break;
        }
      }
    } else if (value !== '' && index < codeInputRefs.current.length - 1) {
      codeInputRefs.current[index + 1].focus();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, width: '100%' }}>
      <Image source={require('../../assets/images/back.jpg')} style={{ width: '100%', zIndex: -1 }} />
      <ScrollView style={styles.dabba}>


          <View>
        <View style={{ flex: 1, flexDirection: 'row', gap: 10, marginTop: 110, alignSelf: 'center' }}>
          <View style={styles.container}>
            <PhoneInput
              defaultCode="IN"
              placeholder="Phone number"
              value={phoneNumber}
              onChangeFormattedText={handlePhoneInputChange}
              containerStyle={styles.inputContainer}
              textInputStyle={styles.inputText}
              textContainerStyle={styles.inputTextContainer}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: phoneNumber.length === 13 ? COLORS.one : COLORS.gray2 }]}
          onPress={sendOTP}
          disabled={phoneNumber.length !== 13}
        >
          <Text style={{ padding: 7, fontFamily: FONT.medium, color: COLORS.lightWhite }}>Send OTP</Text>
        </TouchableOpacity>
        </View>

        <View style={{ position: 'relative', justifyContent: 'center', marginTop: 60 }}>
          <View style={{ height: 1, backgroundColor: 'black', marginVertical: 10, width: '80%', alignSelf: 'center' }} />
          <Text style={{ position: 'absolute', top: -5, backgroundColor: COLORS.white, paddingHorizontal: 10, alignSelf: 'center', fontSize: 20 }}>or</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 55, marginLeft: '22%', marginTop: 60 }}>
          <TouchableOpacity onPress={() => promptAsync()}>
            <Image style={styles.socialBtn} source={require('../../assets/icons/google.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('home')}>
            <Image style={styles.socialBtn} source={require('../../assets/icons/microsoft.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('otp')}>
            <Image style={styles.socialBtn} source={require('../../assets/icons/apple.png')} />
          </TouchableOpacity>
        </View>


      </ScrollView>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.options}
      />

    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  dabba: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    height: '60%',
    borderTopLeftRadius: 70,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputContainer: {
    width: '80%',
    height: 60,
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
    paddingHorizontal: 10,
  },
  inputText: {
    fontSize: 16,
    color: '#333333',
  },
  inputTextContainer: {
    backgroundColor: COLORS.lightWhite,
    padding: 10,
  },
  button: {
    width: '80%',
    marginTop: 30,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    height: 45,
    justifyContent: 'center',
  },
  socialBtn: {
    height: 40,
    width: 40,
    marginTop: 20,
  },
});