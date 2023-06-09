import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Animated, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLoocation } from '../../features/locationSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, icons, images, SIZES} from '../../constants';


const Locate = ({navigation}) => {
  const locationInfo = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const [address, setAddress] = useState('No Location Added');

  const [sector, setSector] = useState("");

  const decideSector=()=>{
    for (let i = 0; i < address.length; i++) {
      if ((address[i] == 'S' || address[i] == 's') &&
          address[i + 1] == 'e' &&
          address[i + 2] == 'c' &&
          address[i + 3] == 't' &&
          address[i + 4] == 'o' &&
          address[i + 5] == 'r' &&
          (address[i+6]==' ' || ((address[i+6]>='a' && address[i+6]<='z') || (address[i+6]>='A' && address[i+6]<='D')))
        ){
        let s="";
          for(let j=0; j<=address.length;j++){
            if(address[i+7+j] == ',' || address[i+7+j] == ' '){
              break;
            }
            else{
              s+=address[i+7+j];
            }
          }
          console.log(s);
          setSector(s);
        break;
      }
    }
    dispatch(setLoocation(address));
  }
  const handlePress = () => {
    decideSector();
    startAnimation();
  };

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const buttonScale = {
    transform: [{ scale: scaleValue }],
  };


  return (
    <ImageBackground
      source={require('../../assets/images/map_bg.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >

    <SafeAreaView style={styles.container}>
      <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name='arrow-back'
            size={28}
            color={COLORS.lightWhite}
            onPress={() => navigation.navigate('cart')}
          />      
        </TouchableOpacity>
      </View>
      <View >
        <Text style={styles.regret}>Regrets we couldn't identify your location correctly!</Text>
        <View style={styles.inputdabba}>
          <Text style={styles.label}>Please Input your location</Text>
          <Text style={styles.hint}>(*please mention the sector)</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter the location'
            onChangeText={text => setAddress(text)}
          />
          <TouchableOpacity
          style={[styles.submitButton, buttonScale]}
            onPress={handlePress}
            activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.locationContainer}>
      <Text style={styles.locationLabel}>Current selected location:</Text>
      <Text style={styles.location}>{locationInfo.location}</Text>
      </View>
      
    </SafeAreaView>
    </ImageBackground>
  );
};
export default Locate;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:COLORS.two,
    borderRadius:50, 
    marginTop:30,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:0,
    left:0,
    zIndex:1
  },
  regret: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 100,
    textAlign: 'center',
    color:COLORS.two,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  hint: {
    fontSize: 12,
    marginBottom: 10,
    color: '#888',
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,

  },
  submitButton: {
    backgroundColor: COLORS.two,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationLabel: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  location: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  inputdabba:{
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity as needed
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginTop: 10,
    elevation: 5,
  },
  locationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    width:370
  },
  
})