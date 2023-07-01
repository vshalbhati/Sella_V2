import React, { useState, useEffect , useLayoutEffect,useRef} from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ActivityIndicatorBase, TextInput, Button, Image, StyleSheet } from 'react-native'
import {useRouter} from 'expo-router'
import styles from './nearbyjobs.style'
import { COLORS, SIZES, FONT} from '../../../constants';
import createClient, { urlFor } from '../../../sanity';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';



const Nearbyjobs = ({navigation,darkmode}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const windowWidth = Dimensions.get('window').width;
  const paddingHorizontal = 0;
  const itemWidth = (windowWidth - paddingHorizontal * 2) / 2;

  const [sellers, setSellers] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featured, setFeatured] = useState([])
  const zoneNo = useSelector(state => state.zone);

  useEffect(()=>{
    createClient.fetch(`*[_type == 'featured']{...,}`)
    .then((data)=>{
      setFeatured(data);
    });
  },[]);

  useEffect(() => {
    setIsLoading(true);
    createClient
      .fetch(`*[_type == 'supply' && zone=='${zoneNo+1}']{...}`)
      .then((data) => {
        if(data.length==0){setError(true)}
        else{setError(false)}
        setSellers(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, []);
  


  const flatListRef = useRef(null);

  // useEffect(() => {
  //   const interval = setInterval(scrollToNextItem, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  // const scrollToNextItem = () => {
  //   if (sellers.length > 0) {
  //     const nextIndex = (currentIndex + 1) % sellers.length;
  //     flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
  //     setCurrentIndex(nextIndex);
  //   }
  // };
  
  return (

    <View style={{flex:1}}>


      {isLoading ? (
      <View style={stylis.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    ) : error ? (
      <View style={stylis.errorContainer}>
        <Image
          source={require('../../../assets/images/wrong.png')}
          style={stylis.errorImage}
        />
        <Text style={stylis.errorText}>Failed to load items</Text>
      </View>
    ) : (
      <View style={stylis.container}>
                <View style={styles.header}>
        <Text style={styles.headerTitle(darkmode)}>Featured supplies</Text>
        </View>
        <FlatList
          data={featured}
          renderItem={({ item }) => (
          <TouchableOpacity
            key={item._id}
            style={[stylis.featureditem]}
            onPress={()=>navigation.navigate('allfeatured',{ 
              id: item._id,
              name:item.name,
              short_description: item.short_description,
              imgurl:item.image.asset._ref
          }
            )}
          >
            <Image
              source={{ uri: urlFor(item.image.asset._ref).url() }}
              style={{position:'absolute',zIndex:-1,height:100,width:'100%'}}
            />
            <View style={[stylis.featuredtextContainer]}>
              <Text style={stylis.featuredtrackTitle}>{item.name}</Text>
              <Text style={stylis.featuredartistName}>{item.short_description}</Text>
            </View>
          </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ paddingHorizontal, columnGap: 10 }}
        />

        <View style={styles.header}>
        <Text style={styles.headerTitle(darkmode)}>Popular supplies</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('allsuply')}>
          <Text style={styles.headerBtn(darkmode)} >Show all</Text>
        </TouchableOpacity>
        </View>
        <FlatList
          ref={flatListRef}
          data={sellers}
          renderItem={({ item }) => (
          <TouchableOpacity
            key={item._id}
            style={[stylis.item]}
            onPress={() => navigation.navigate('supplydetails', {
              id: item._id,
              name: item.name,
              short_description: item.short_description,
              price: item.price,
              imgurl: item.image[0].asset._ref,
              measure: item.quantity
            })}
          >
            <Image
              source={{ uri: urlFor(item.image[0].asset._ref).url() }}
              style={stylis.image}
            />
            <View style={stylis.textContainer}>
              <Text style={stylis.trackTitle}>{item.name}</Text>
              <Text style={stylis.artistName}>{item.short_description}</Text>
            </View>
          </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ paddingHorizontal, columnGap: 10 }}
        />
      </View>
    )}
    </View>
  );
};

const stylis = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  item: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
    alignItems: 'center',
    gap:5,
    elevation: 5,
    marginBottom:10,
    marginTop:10,
    shadowColor: COLORS.tertiary,
    marginLeft:5,
    width:170
  },
  featureditem:{
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
    alignItems: 'center',
    gap:5,
    elevation: 5,
    marginBottom:10,
    marginTop:10,
    shadowColor: COLORS.tertiary,
    marginLeft:5,
    width:110,
    overflow:'hidden',
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
  featuredtextContainer:{
    backgroundColor:'rgba(255,255,255,0.7)',
    flex: 1,
    justifyContent:'flex-end',
    height:80,
    width:'100%',
    padding:5
  },
  trackTitle: {
    fontSize: 20,
    marginBottom: 4,
    color: '#222',
    fontFamily: FONT.regular,
  },
  featuredtrackTitle:{
    fontSize: 16,
    color: '#222',
    fontFamily: FONT.regular,
  },
  featuredartistName:{
    fontSize: 13,
    color: '#222',
    fontFamily: FONT.regular,
  },
  artistName: {
    fontSize: 16,
    color: '#777',
    fontFamily: FONT.regular,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorImage: {
    width: 200,
    height: 200,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.primary,
    fontFamily: FONT.regular,
  },
});
export default Nearbyjobs