import React, { useState, useEffect , useLayoutEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ActivityIndicatorBase, TextInput, Button, Image, StyleSheet } from 'react-native'
import {useRouter} from 'expo-router'

import styles from './nearbyjobs.style'
import { COLORS, SIZES} from '../../../constants';
import createClient, { urlFor } from '../../../sanity';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';


const Nearbyjobs = ({navigation}) => {
  const router = useRouter();
  const isLoading=false;
  const error = false;

const windowWidth = Dimensions.get('window').width;
const paddingHorizontal = 0;
const itemWidth = (windowWidth - paddingHorizontal * 2) / 2;

  const [sellers, setSellers] = useState([])


  useEffect(()=>{
    createClient.fetch(
    `*[_type == 'supply']{
      ...,
        Supplies[]->{
          ...,
        }
    }`
    ).then((data)=>{
      setSellers(data);
    });
  },[]);
  // console.log(sellers);

  return (
    <View>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular supplies</Text>
          <TouchableOpacity>
            <Text style={styles.headerBtn} >Show all</Text>
          </TouchableOpacity>
      </View>

      <View style={stylis.container}>
  <FlatList
    data={sellers}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={[stylis.item,{width: itemWidth}]}
        onPress={() => navigation.navigate('supplydetails', {
          id: item._id,
          name: item.name,
          short_description: item.short_description,
          price: item.price,
          imgurl: item.image.asset._ref,
        })}
      >
        <Image
          source={{ uri: urlFor(item.image.asset._ref).url() }}
          style={stylis.image}
        />
        <View style={stylis.textContainer}>
          <Text style={stylis.trackTitle}>{item.name}</Text>
          <Text style={stylis.artistName}>{item.short_description}</Text>
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={(item) => item.id}
    showsHorizontalScrollIndicator={false}
    horizontal
    contentContainerStyle={{ paddingHorizontal, columnGap:10 }}
  />
</View>
    </View>
  );
};

const stylis = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
    overflow: 'hidden',
    padding:10
  },
  item: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    gap:10
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 16,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222',
  },
  artistName: {
    fontSize: 16,
    color: '#777',
  },
});

export default Nearbyjobs