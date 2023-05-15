import { SafeAreaView, StyleSheet, Text, View ,Image, TextInput, Dimensions} from 'react-native'
import React,{useState, useEffect} from 'react'
import * as Location from 'expo-location'


const Location = () => {
    const [location, setLocation] = useState();

    useEffect(() => {
      const getPermissions = async () =>{
        let {status} = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        if(status !== 'granted'){
          console.log("Please grant the location permissions");
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        console.log("Location:");
        console.log(currentLocation);
      };
      getPermissions();
    },[]);
  return (
    <View>
      <Text>Location</Text>
    </View>
  )
}

export default Location