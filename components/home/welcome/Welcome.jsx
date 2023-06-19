import {useState,useEffect, useRef} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ActivityIndicatorBase, TextInput, Button, Image, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'
import { COLORS, icons, SIZES} from '../../../constants';

const jobTypes =['Cement','Putti','Bricks','Patthar','Binola'];
const zones =[[30,31,32,33],[20,21,22,23],[10,11,12,13],[40,41,43,44]];

import { useSelector, useDispatch } from 'react-redux';
import * as Location from 'expo-location'
import axios from 'axios';
import { setLoocation } from '../../../features/locationSlice';
import { setZone } from '../../../features/zoneSlice';


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
    backgroundColor:COLORS.tertiary,
    padding:20,
    borderRadius:10,
    elevation:5,
    shadowColor:COLORS.tertiary,
    overflow:'hidden'
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

const Welcome = ({navigation,darkmode}) => {
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
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${28.444032}&lon=${77.319494}`;
          const response = await axios.get(url);
          const data = response.data;

          if (data.display_name) {
            const address = data.display_name;
            setAddress(address);
            dispatch(setLoocation(address));

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
              const sectorIndex = zone.indexOf(parseInt(sector, 10));
          
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

  return (
    <View>
      <View style={stylis.uparcard}>
            <View style={stylis.circle1}></View>
          <View style={styles.container}>
            <Text style={styles.userName}>Hello, { userInfo?.name || 'Guest User'}
            </Text>
            {locationInfo.location.length>0?(
              <TouchableOpacity onPress={()=>getLocation()}>
              <Text style={styles.welcomeMessage}>
                Change location
              </Text>
              </TouchableOpacity>
            ):(
              <TouchableOpacity onPress={()=>getLocation()}>
              <Text style={styles.welcomeMessage}>
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
            <TouchableOpacity style={styles.searchBtn} disabled={query.length==0} onPress={() => navigation.navigate('search',{query:query})}>
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