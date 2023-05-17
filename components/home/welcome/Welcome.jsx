import {useState,useEffect, useRef} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ActivityIndicatorBase, TextInput, Button, Image, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'
import { icons, SIZES} from '../../../constants';

const jobTypes =['Cement','Putti','Bricks','Patthar','Binola'];

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../../features/userSlice';
import * as Location from 'expo-location'
import axios from 'axios';


const stylis = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
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
});

const Welcome = ({navigation}) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Cement');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState();
  const [address, setAddress] = useState(null);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
        console.log(location)
        getAddressFromCoordinates(latitude, longitude);
      } else {
        console.log('Location permission not granted');
      }
    } catch (error) {
      console.log('Error getting location', error);
    }
  };

  const API_KEY = '065b23ac3ad24715b6acc48693239a7a';

  const getAddressFromCoordinates = async (latitude, longitude) => {
    // try {
    //   const response = await fetch(
    //     `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${latitude}+${longitude}&no_annotations=1`
    //   );
    //   const data = await response.json();
      
    //   if (data.results.length > 0) {
    //     const addres = data.results[0].formatted;
    //     setAddress(addres);
    //   } else {
    //     setLocation('Location not found');
    //   }
    // } catch (error) {
    //   console.error('Error fetching location:', error);
    //   setLocation('Error fetching location');
    // }
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          const response = await axios.get(url);
          const data = response.data;

          if (data.display_name) {
            const address = data.display_name;
            setAddress(address);
          }
        } catch (error) {
          console.log('Error getting address', error);
        }
  };
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hey <Text>{JSON.stringify(userInfo?.given_name,null,2)}</Text></Text>
        <TouchableOpacity onPress={()=>getLocation()}>
        <Text style={styles.welcomeMessage}>
          Choose location
        </Text>
        </TouchableOpacity>
        {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{address}</Text>
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
        <TouchableOpacity style={styles.searchBtn} onPress={() => navigation.navigate('search',{query:query})}>
          <Image
          source={icons.search}
          resizeMode='contain'
          style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>


      <View style={styles.tabsContainer}>
        <FlatList
        data={jobTypes}
        renderItem={({ item}) =>(
          <TouchableOpacity
          style={styles.tab(activeJobType, item)} 
          onPress={()=>{
            setActiveJobType(item);
            navigation.navigate('search',{query:item})
          }}
          >
            <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
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