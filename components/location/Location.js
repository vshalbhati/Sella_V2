import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Animated, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLoocation } from '../../features/locationSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, icons, images, SIZES} from '../../constants';
const zones =[
  [67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89],
  [6,7,8,9,10,'11B','11C','11D','11E',12,13,14,15,'15A',16,'16A',17,18,19,28,29,30,31,32,33,34,35,36,37],
  [38,39,41,42,43],
  [27,'27A',45,46,47,48,49,'21A','21B','21C','21D'],
  [22,23,24,25,50,51,52,53,54,55,56,'56A'],
];
import { setZone } from '../../features/zoneSlice';



const Locate = ({navigation}) => {
  const locationInfo = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const [flat, setFlat] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [town, setTown] = useState('');


  const [address, setAddress] = useState('No Location Added');

  const handlePress = () => {
    const Finaladdress = `${flat}, ${area}, ${landmark}, ${town}`.trim()
    setAddress(Finaladdress);
    decideSector(Finaladdress);
    startAnimation();
  };

  const [sector, setSector] = useState("");

  const decideSector=(Finaladdress)=>{
    
    for (let i = 0; i < address.length; i++) {
      if ((Finaladdress[i] == 'S' || Finaladdress[i] == 's') &&
          Finaladdress[i + 1] == 'e' &&
          Finaladdress[i + 2] == 'c' &&
          Finaladdress[i + 3] == 't' &&
          Finaladdress[i + 4] == 'o' &&
          Finaladdress[i + 5] == 'r' &&
          (Finaladdress[i+6]==' ' || ((Finaladdress[i+6]>='a' && Finaladdress[i+6]<='z') || (Finaladdress[i+6]>='A' && Finaladdress[i+6]<='D')))
        ){
        let s="";
          for(let j=0; j<=Finaladdress.length;j++){
            if(Finaladdress[i+7+j] == ',' || Finaladdress[i+7+j] == ' '){
              break;
            }
            else{
              s+=Finaladdress[i+7+j];
            }
          }
          setSector(s);
        break;
      }
    }
    dispatch(setLoocation(Finaladdress));
    for (let i = 0; i < zones.length; i++) {
      const zone = zones[i];
      const sectorIndex = zone.findIndex(zoneSector => String(zoneSector) === sector);
      if (sectorIndex !== -1) {
        dispatch(setZone(i));
        break;
      }
    }
    
  }


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
          <Text style={styles.label}>Flat, House no, Building, Company, Apartment</Text>
          <TextInput
            style={styles.input}
            placeholder=''
            onChangeText={text => setFlat(text)}
          />
          <Text style={styles.label}>Area, Street, Sector, Village</Text>
          <Text style={styles.hint}>(*please mention the sector)</Text>
          <TextInput
            style={styles.input}
            placeholder=''
            onChangeText={text => setArea(text)}
          />
          <Text style={styles.label}>Landmark</Text>
          <TextInput
            style={styles.input}
            placeholder=''
            onChangeText={text => setLandmark(text)}
          />
          <Text style={styles.label}>Town, City</Text>
          <TextInput
            style={styles.input}
            placeholder=''
            onChangeText={text => setTown(text)}
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
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:COLORS.two,
    borderRadius:50, 
    marginTop:40,
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
    marginTop: 100,
    textAlign: 'center',
    color:'#FCFCFC',
    marginBottom: 30,

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
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginTop: 10,
    elevation: 5,
  },
  locationContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    width:370
  },
  
})