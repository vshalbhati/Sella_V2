import React, { useState, useEffect , useLayoutEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ActivityIndicatorBase, TextInput, Button, Image, StyleSheet } from 'react-native'
import {useRouter} from 'expo-router'

import styles from './nearbyjobs.style'
import { COLORS, SIZES} from '../../../constants';
import createClient, { urlFor } from "../../../sanity";

const Nearbyjobs = ({navigation}) => {
  const router = useRouter();
  const isLoading=false;
  const error = false;

  const [sellers, setSellers] = useState([])


  useEffect(()=>{
    createClient.fetch(
    `*[_type == "supply"]{
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
        <Text style={styles.headerTitle}>Popular Sellers</Text>
          <TouchableOpacity>
            <Text style={styles.headerBtn} >Show all</Text>
          </TouchableOpacity>
      </View>

<View style={styles.cardsContainer}>
      <FlatList
        data={sellers}
        renderItem={({ item }) => (
          <TouchableOpacity
           style={stylis.item}
           onPress={() => navigation.navigate('supplydetails',{
            id:item._id, 
            name:item.name, 
            short_description:item.short_description,
            price:item.price,
            imgurl:item.image.asset._ref
          })}
          >
              <Image
                source={{ uri: urlFor(item.image.asset._ref).url(),}}
                style={stylis.image}
              />
            <View style={stylis.textContainer}>
              <Text style={stylis.trackTitle}>{item.name}</Text>
              <Text style={stylis.artistName}>{item.short_description}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={stylis.list}
        showsHorizontalScrollIndicator={false}
        horizontal
      />

      {/* {sellers?.map((item)=>(
          <NearbyJobCard
            key={item._id}
            id={item._id}
            name={item.name}
            short_description={item.short_description}
          />
           ))
      } */}

    </View>
    </View>
  );
};

const stylis = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 16,
    paddingTop: 40,
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222222',
  },
  list: {
    columnGap: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
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
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222222',
  },
  artistName: {
    fontSize: 16,
    color: '#777777',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  playIcon: {
    width: 24,
    height: 24,
  },
});

export default Nearbyjobs