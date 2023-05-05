import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {COLORS, icons, images, SIZES} from '../../constants';
import ScreenHeaderBtn from '../common/header/ScreenHeaderBtn';
import {Stack, useRouter, useSearchParams} from 'expo-router';
import { ActivityIndicator } from 'react-native';


const Signin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async() => {
    if (!email.includes('@')) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (password.trim() === '') {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    setIsLoading(true);
    try {
      const response = await 
      fetch('http://localhost:3000/signin', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.json()).then(
        data => {
          if(data.error){
            alert('Something went wrong!');
          }
          else{
            alert('Login Successfull!');
            navigation.navigate('home');
          }
        }
      )
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);

  };

  return (
    <View style={styles.container}>
  <Stack.Screen
    options={{
      headerStyle: { backgroundColor: COLORS.lightWhite },
      headerShadowVisible: false,
      headerBackVisible: false,
      headerLeft: () => (
        <ScreenHeaderBtn
          iconUrl={icons.homeicon}
          dimension='60%'
          handlePress={() => navigation.navigate('home')}
        />
      ),
      headerTitle: ''
    }}
  />
  <Text style={styles.title}>Sign In</Text>
  <TextInput
    style={[styles.input, { borderColor: emailError ?'red' : 'gray' },]}
    placeholder='Enter your Email'
    onChangeText={(text) => setEmail(text)}
    value={email}
    keyboardType='email-address'
    autoCapitalize='none'
  />
  {emailError && (
        <Text style={styles.error}>Please enter a valid email</Text>
      )}
  <TextInput
    style={[styles.input, { borderColor: passwordError ? 'red' : 'gray' },]}
    placeholder='Enter your Password'
    onChangeText={(text) => setPassword(text)}
    value={password}
    secureTextEntry
  />
  {passwordError && (
        <Text style={styles.error}>Please enter a valid password</Text>
  )}

  <TouchableOpacity 
      style={[
          styles.button,
          { opacity: isLoading ? 0.5 : 1 },
      ]}
      onPress={handleSignIn}
      disabled={isLoading}
  >
        {isLoading ? (
          <ActivityIndicator size='small' color={COLORS.white} />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}  
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate('signup')}>
    <Text style={styles.signupText}>Don't have an account?</Text>
  </TouchableOpacity>
  <Text style={styles.orText}>OR Login with</Text>
  <View style={styles.socialBtnsContainer}>
    <TouchableOpacity style={styles.socialBtn}>
      <Image source={require('../../assets/icons/google.png')} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.socialBtn}>
      <Image source={require('../../assets/icons/microsoft.png')} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.socialBtn}>
      <Image source={require('../../assets/icons/apple.png')} />
    </TouchableOpacity>
  </View>
</View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold'
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  orText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  socialBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  socialBtn: {
    backgroundColor: COLORS.lightGray,
    height:1,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10
  }
});


export default Signin;
