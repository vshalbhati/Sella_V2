import React, { useState, useEffect , useLayoutEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ActivityIndicatorBase, TextInput, Button, Image, StyleSheet, SafeAreaView } from 'react-native'
import {useRouter} from 'expo-router'

import { COLORS, SIZES} from '../../../../constants';
import createClient, { urlFor } from '../../../../sanity';
import styles from './nearbyjobcard.style'

const NearbyJobCard = ({id, title, description}) => {
  const [supply, setSupply] = useState([]);

  // useEffect(()=>{
  //   createClient.fetch(
  //   `
  //   *[_type == 'sellers']{
  //     ...,
  //       Supplies[]->{
  //         ...,
  //       }
  //   }
  //   `).then((data)=>{
  //     setSupply(data);
  //   });
  // },[]);
    //   console.log(supply);


  return (
    <SafeAreaView>
      <Text>NearbyJobCard</Text>
    </SafeAreaView>
  )
}

export default NearbyJobCard