import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react'
import { set } from 'react-native-reanimated';
import {COLORS, icons, images, SIZES} from '../../constants';


const Verification = ({navigation, route}) => {
  const {userdata} = route.params;

  const [errormsg, setErrormsg] = useState(null);
  const [code, setCode] = useState('XXXXXX');
  const [reqcode, setReqcode] = useState(null);

  useEffect(() => {
      setReqcode(userdata[0]?.verificationCode);
  },[])

  const comparecode=() =>{
    if(reqcode == code){
      const usdata={
        username: userdata[0]?.username,
        email: userdata[0]?.email,
        password: userdata[0]?.password,
      }
      fetch('http://localhost:3000/signup', {
      method: 'POST',
      body: JSON.stringify(usdata),
      headers: {'Content-Type': 'application/json'}
      })
      .then(res => res.json())
      .then(data => {
          if(data.message === 'User Registered Successfully'){
          alert(data.message);
          navigation.navigate('signin');
          }
        })
      }
    else if(code =='' || code == 'XXXXXX'){
      alert('Please enter the code!')
    }
    else{
      alert('The code didnt match!')
    }
}
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text>A code has been sent to your email</Text>
      <TextInput
      style={[styles.input]}
      placeholder='Enter the 6 digit code'
      secureTextEntry={true}
      onChangeText={(text) => setCode(text)}
      onPressIn={()=> setErrormsg(null)}
      />
      <TouchableOpacity
            style={[
              styles.button,
              // { opacity: isLoading ? 0.5 : 1 },
          ]}
          onPress={() => comparecode()}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  )
}
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
});

export default Verification