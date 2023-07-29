import {useState,useEffect, useRef} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ActivityIndicatorBase, TextInput, Button, Image, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'
import { COLORS, icons, SIZES, Darkmode, FONT} from '../../../constants';

const jobTypes =['Cement','Putti','Bricks','Patthar','Binola'];
const zones =[
  [67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89],
  [6,7,8,9,10,'11B','11C','11D','11E',12,13,14,15,'15A',16,'16A',17,18,19,28,29,30,31,32,33,34,35,36,37],
  [38,39,41,42,43],
  [27,'27A',45,46,47,48,49,'21A','21B','21C','21D'],
  [22,23,24,25,50,51,52,53,54,55,56,'56A'],
];

import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location'
import axios from 'axios';
import { setLoocation } from '../../../features/locationSlice';
import { setZone } from '../../../features/zoneSlice';
import { getDistance } from 'geolib';
import { setDistance } from '../../../features/distanceSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';



const stylis = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  locationContainer: {
    marginTop: 20,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  uparcard:{
    padding:20,
    borderRadius:10,
    elevation:5,
    overflow:'hidden',
    elevation: 5,

  },
  circle1:{
    height:130,
    width:130,
    position:'absolute',
    backgroundColor:'rgba(255,255,255,0.3)',
    borderRadius:130,
    marginRight:300,
    marginTop:-30,
    zIndex:-1

  },
  circle2:{
    height:40,
    width:40,
    position:'absolute',
    backgroundColor:'rgba(255,255,255,0.6)',
    borderRadius:50,
    bottom:0,
    zIndex:-1,
    marginBottom:-10,
    marginRight:-10,
    right:0
  }
});

const Welcome = ({navigation,darkmode,name}) => {
  const locationInfo = useSelector((state) => state.location);
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Cement');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState();
  const [address, setAddress] = useState('No Location Added');
  const [sector, setSector] = useState("");

  const dispatch = useDispatch();


  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
        getAddressFromCoordinates(latitude, longitude);
      } else {
        console.log('Location permission not granted');
      }
    } catch (error) {
      console.log('Error getting location', error);
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          const response = await axios.get(url);
          const data = response.data;

          if (data.display_name) {
            const address = data.display_name;
            setAddress(address);
            dispatch(setLoocation(address));
            const fetchArrayFromStorage = async () => {
              try {
                const serializedArray = await AsyncStorage.getItem('arrayKey');
                if (serializedArray !== null) {
                  const array = JSON.parse(serializedArray);
                  return array;
                } else {
                  return [];
                }
              } catch (error) {
                console.log('Error fetching array:', error);
                return [];
              }
            };
        
            const existingArray = await fetchArrayFromStorage();
            const addressExists = existingArray.includes(address);

            if (!addressExists) {
              existingArray.push(address);
              await AsyncStorage.setItem('arrayKey', JSON.stringify(existingArray));
              console.log('Address added to the array and stored successfully.');
            } else {
              console.log('Address already exists in the array.');
            }
            const sectorno = () =>{
              for (let i = 0; i < address.length; i++) {
                if ((address[i] == 'S' || address[i] == 's') &&
                (address[i + 1] == 'e' || address[i + 1] == 'E') &&
                (address[i + 2] == 'c' || address[i + 2] == 'C') &&
                (address[i + 3] == 't' || address[i + 3] == 'T') &&
                (address[i + 4] == 'o' || address[i + 4] == 'O') &&
                (address[i + 5] == 'r' || address[i + 5] == 'R') &&
                (address[i+6]==' ' || ((address[i+6]>='a' && address[i+6]<='z') || (address[i+6]>='A' && address[i+6]<='D')))
              ) {
                  let s="";
                    for(let j=0; j<=address.length;j++){
                      if(address[i+7+j] == ',' || address[i+7+j] == ' '){
                        break;
                      }
                      else{
                        s+=address[i+7+j];
                      }
                    }
                    setSector(s);
                  break;
                }
              }
            }
            sectorno()
            for (let i = 0; i < zones.length; i++) {
              const zone = zones[i];
              const sectorIndex = zone.findIndex(zoneSector => String(zoneSector) === sector);
              if (sectorIndex !== -1) {
                dispatch(setZone(i));
                break;
              }
            }
          }
        } catch (error) {
          console.log('Error getting address', error);
        }
  };
          const userInfo = useSelector((state) => state.user);
          const phoneUserInfo = useSelector((state) =>state.phoneUser);


        const dealerLocation = {
          latitude: 28.134284,
          longitude: 77.324066,
        };
        if(location){
        const distanceInMeters = getDistance(dealerLocation, location);
        dispatch(setDistance(distanceInMeters/1000))
      }
  return (
    <View>
      <View style={[stylis.uparcard,{backgroundColor: darkmode?Darkmode.white:COLORS.tertiary,shadowColor:darkmode?Darkmode.gray:COLORS.tertiary,}]}>
            <View style={stylis.circle1}></View>
          <View style={styles.container}>
            <Text style={styles.userName(darkmode)}>Hello, { userInfo?.name || phoneUserInfo.user?.name || name || 'Guest User' }
            </Text>
            {locationInfo.location.length>0?(
              <TouchableOpacity onPress={()=>getLocation()}>
              <Text style={styles.welcomeMessage(darkmode)}>
                Change location
              </Text>
              </TouchableOpacity>
            ):(
              <TouchableOpacity onPress={()=>getLocation()}>
              <Text style={styles.welcomeMessage(darkmode)}>
                Choose location
              </Text>
              </TouchableOpacity>
            )}
            {address && (
            <View style={styles.addressContainer}>
              <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">
                {locationInfo.location}
              </Text>
            </View>
          )}
          </View>
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                onChangeText={text => setQuery(text)}
                value={query}
                placeholder='what are you looking for?'
              />
            </View>
            <TouchableOpacity style={styles.searchBtn(darkmode)} disabled={query.length==0} onPress={() => navigation.navigate('search',{query:query})}>
              <Image
              source={icons.search}
              resizeMode='contain'
              style={styles.searchBtnImage}
              />
            </TouchableOpacity>
          </View>
          <View style={stylis.circle2}></View>
      </View>

      <View style={styles.tabsContainer}>
        <Text style={[styles.addressText,{marginBottom:10,fontSize: SIZES.large,fontFamily: FONT.medium,color:darkmode? Darkmode.gray2:COLORS.primary}]}>Popular searches</Text>
        <FlatList
        data={jobTypes}
        renderItem={({ item}) =>(
          <TouchableOpacity
          style={styles.tab(activeJobType, item,darkmode)} 
          onPress={()=>{
            setActiveJobType(item);
            navigation.navigate('search',{query:item})
          }}
          >
            <Text style={styles.tabText(activeJobType, item,darkmode)}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        contentContainerStyle={{columnGap:SIZES.small}}
        showsHorizontalScrollIndicator={false}
        horizontal
        />
      </View>
    </View>
  )
}

export default Welcome