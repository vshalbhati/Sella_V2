import { View, Text, ScrollView, FlatList, StyleSheet, Image } from 'react-native'
import { useState, useEffect } from 'react';
import createClient, { urlFor } from '../sanity';
import { COLORS, FONT, SIZES } from '../constants';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';
import Crateicon from './Crateicon';
import { setSupply } from '../features/supplyslice';

const styles = StyleSheet.create({
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:"rgba(255,255,255,0.6)",
    padding:5, 
    borderRadius:50, 
    position:"absolute",
    zIndex:2,
    marginTop:8,
    marginLeft:8,
  },
  name:{
    flex: 1,
    fontSize: 34, 
    fontWeight: 'bold', 
    color: '#333',
    padding:8
  },
  description:{
    flex: 1, 
    fontSize: 18,  
    color: '#333',
    padding:8
  },
  gola:{
    height:40,
    width:40,
    borderRadius:50,
    padding:6
  },
  cartbar:{
    height:50,
    width:"90%",
    marginLeft:20,
    marginBottom:10,
    backgroundColor:"orange",
    position:"absolute",
    bottom:0,
    borderRadius:10,
    display:"block",
    flex:1,
    flexDirection:'row',
    color:COLORS.lightWhite,
    fontSize:24
  }
});

const Supplydetails = ({navigation}) => {
  const route = useRoute();
  const { id, imgurl, name, short_description ,price} = route.params;
  const dispatch = useDispatch();
  const items = useSelector(state => selectBasketItemsWithId(state, id));

  const addbill=(key)=>{
    // setBill(prevBill => prevBill + 10);
    // setQuantity(prevQuantity => {
    //   const newQuantity = { ...prevQuantity };
    //   newQuantity[itemId] = (newQuantity[itemId] || 0) + 1;
    //   return newQuantity;
    // });  
    dispatch(addToBasket({id, name, short_description, imgurl, price}))
  }
  console.log(items)

  const removebill=(itemId)=>{
    // if(bill>0){
    // setBill(prevBill => prevBill - 10);
    // }
    //   setQuantity(prevQuantity => {
    //     const newQuantity = { ...prevQuantity };
    //     newQuantity[itemId] = Math.max(0, (newQuantity[itemId] || 0) - 1);
    //     return newQuantity;
    //   });
    if(!items.length >0) return;
    dispatch(removeFromBasket({id}));

  }

  useEffect(() => {
    dispatch(
      setSupply({
        id,
        imgurl,
        name,
        short_description,
        price,
      })
    )
  },[]);

  return (
    <>
    <Crateicon
    navigation={navigation}/>
    <ScrollView>
      <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name="arrow-back"
            size={28}
            onPress={() => navigation.goBack()}
          />      
        </TouchableOpacity>
      </View>
      <Image
      source={{uri: urlFor(imgurl).url()}}
      style={{ width: "100%", height: 200 }}
      />
      <Text>{name}</Text>
      <Text>{short_description}</Text>
      <Text>{price}</Text>
      <Text>Choose the quantity</Text>

      <View style={{flex:1, flexDirection:"row"}}>
      <TouchableOpacity style={[styles.gola,{backgroundColor:COLORS.one}]}>
        <Icon
            name="add"
            size={28}
            onPress={()=> addbill()}
        />
      </TouchableOpacity>
          <Text style={{ fontSize:24,fontWeight:"bold",paddingLeft:10,paddingRight:10}}>{items.length}</Text>
      <TouchableOpacity disabled={!items.length} style={[styles.gola,{backgroundColor:(items.length) >0 ? COLORS.one :"rgba(127,127,127,0.8)"}]}>
        <Icon
          name="remove"
          size={28}
          onPress={()=> removebill()}
        />
      </TouchableOpacity>
      </View>
    </ScrollView>
    </>
  )
}

export default Supplydetails