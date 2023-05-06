import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import {Stack, useRouter, useSearchParams} from 'expo-router';
import {COLORS, icons, images, SIZES} from '../../constants';
import ScreenHeaderBtn from '../common/header/ScreenHeaderBtn';
import { ActivityIndicator } from 'react-native';



const Signup = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cpasswordError, setCpasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (username.trim() === '') {
      setUsernameError(true);
      return;
    } else {
      setUsernameError(false);
    }
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
    if(password != cpassword){
      setCpasswordError(true);
      return;
    } else{
      setCpasswordError(false);
    }

    setIsLoading(true);
    try {
      const response = await 
      fetch('http://localhost:3000/verify', {
  method: 'POST',
  body: JSON.stringify({
    username: username,
    email: email,
    password: password,
  }),
  headers: {'Content-Type': 'application/json'}
})
.then(res => res.json()).then(
  data =>{
    if(data.error){
      alert('something went wrong!');
    }
    else if(data.message === 'Verification code has been sent to your email!'){
      alert(data.message);
      navigation.navigate('verification', { userdata: data.udata})
    }
    // else{
    //   alert('Account created succesfully!');
    //   navigation.navigate('signin');
    // }
  }

)
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
            headerStyle:{backgroundColor: COLORS.lightWhite},
            headerShadowVisible:false,
            headerBackVisible:false,
            headerLeft:()=>(
                <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension='60%'
                handlePress={() => navigation.navigate('signin')}
                />
            ),
            headerRight: () => (
              <ScreenHeaderBtn
                iconUrl={icons.homeicon}
                dimension='60%'
                handlePress={() => navigation.navigate('home')}
              />
            ),
            headerTitle:''
        }}
        />
    <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: usernameError ? 'red' : 'gray' },
        ]}
        placeholder='Username'
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      {usernameError && (
        <Text style={styles.error}>Please enter a valid username</Text>
      )}
      <TextInput
        style={[
          styles.input,
          { borderColor: emailError ?'red' : 'gray' },
        ]}
        placeholder='Email'
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      {emailError && (
        <Text style={styles.error}>Please enter a valid email</Text>
      )}
      <TextInput
        style={[
          styles.input,
          { borderColor: passwordError ? 'red' : 'gray' },
        ]}
        placeholder='Password'
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      {passwordError && (
        <Text style={styles.error}>Please enter a valid password</Text>
      )}
      <TextInput
        style={[
          styles.input,
          { borderColor: cpasswordError ? 'red' : 'green' },

        ]}
        placeholder='Confirm Password'
        secureTextEntry={true}
        onChangeText={(text) => setCpassword(text)}
        value={cpassword}
      />
      {cpasswordError && (
        <Text style={styles.error}>Password and Confirm Password should be same</Text>
      )}
      <TouchableOpacity
        style={[
          styles.button,
          { opacity: isLoading ? 0.5 : 1 },
        ]}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size='small' color={COLORS.white} />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightWhite,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    width: '80%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    width: '80%',
  },
  buttonText: {
    color: COLORS.lightWhite,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default Signup