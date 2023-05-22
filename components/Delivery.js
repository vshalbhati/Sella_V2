import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView,TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants';
import { useSelector } from 'react-redux';
import { clearLocation } from '../features/locationSlice';
import { useDispatch } from 'react-redux';
import * as Location from 'expo-location'
import { setLoocation } from '../features/locationSlice';
import axios from 'axios';



const styles = StyleSheet.create({
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:'rgba(255,255,255,0.4)',
    borderRadius:50, 
    marginTop:30,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    zIndex:1
  },
  container:{
    backgroundColor: COLORS.one,
    height:250,
    padding:10,
    borderBottomWidth: 3,
    borderColor: '#ddd',
    elevation: 5,
  },
  removeButton:{
    backgroundColor:'rgba(255,255,255,0.8)',
    height:30,
    width:120,
    borderRadius:7,
    justifyContent:'center',
    alignItems:'center',
  },
  dropdown:{
    backgroundColor:'#fff',
    width:370,
    zIndex:1,
    position:'absolute',
    left:0,
    borderRadius:10,
    padding:10,
    marginTop:20,
    maxHeight: 150,
  }
});

const Delivery = ({navigation,route}) => {
  const { sector } = route.params;
  const locationInfo = useSelector((state) => state.location)
  
  return (
    <SafeAreaView>
      <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name='arrow-back'
            size={28}
            color={COLORS.lightWhite}
            onPress={() => navigation.navigate('home')}
          />      
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={{marginTop:100}}>
        <Text>Delivering to this address</Text>
        <Text>{locationInfo.location}</Text>

        <Text>{sector}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Delivery