import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONT, SIZES } from '../../constants';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal,  } from '../../features/basketSlice';
import { urlFor } from '../../sanity';

const styles = StyleSheet.create({
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:COLORS.two,
    borderRadius:50, 
    marginTop:40,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
    zIndex:1
  },
  container:{
    backgroundColor: COLORS.lightWhite,
    height:100,
    width:'90%',
    padding:20,
    elevation: 5,
    alignSelf:'center',
    borderRadius:20,
    marginTop:10,
    marginBottom:10,
  },
  itemsContainer:{
    backgroundColor: COLORS.lightWhite,
    width:'90%',
    alignSelf:'center',
    borderRadius:20,
    elevation: 5,
    padding:20,
    marginTop:10,
  },
  text: {
    fontFamily:FONT.medium,
    fontSize:SIZES.medium,
  },
  checkoutButtonText: {
    color: '#fff',
    fontFamily:FONT.bold,
    fontSize:SIZES.large,
  },
  cartbutton:{
    height:50,
    width:250,
    backgroundColor:COLORS.two,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    marginBottom:20,
    marginTop:20,
  },
  instructionsContainer:{
    width:'90%',
    flexDirection:'row',
    gap:30,
    marginTop:20,
    justifyContent:'center',
    alignSelf:'center',
    marginBottom:20,

  },
  instructions:{
    height:100,
    width:80,
    borderRadius:10,
    elevation:5,
    padding:10,
    backgroundColor: COLORS.lightWhite,
  },
  cartItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    alignItems: 'center',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  containerheading:{
    marginBottom:10,
    marginTop:20,
  },
  footerText: {
    fontSize: 16,
    color:COLORS.gray,
    marginLeft:5
  },
  billcontainer:{
    backgroundColor:'rgb(255,255,255)',
    padding:5,
    marginTop:10,
    width:'90%',
    alignSelf:'center',
    borderRadius:10,
    marginBottom:10,
  }
});

const Delivery = ({navigation,route}) => {
  const locationInfo = useSelector((state) => state.location);
  const distance = useSelector((state) => state.distance.distance);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal)
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  },[items]);

  return (
    <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
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


    <ScrollView style={{height:100}}>

      <View style={styles.container}>
          <Text>Delivering to this address</Text>
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {locationInfo.location.length>0? locationInfo.location : 'Desho me desh hai haryana! Ek hi baat hai yaha bolna or Gariayana'}
          </Text>
      </View>

      <View style={styles.container}>
          <Text>Your delivery is on the way!</Text>
          <Text style={styles.text}>The estimated time of delivery is <Text style={{fontFamily:FONT.bold}}>{distance*2} mins</Text> </Text>
      </View>
      
      <View style={styles.containerheading}>
      <Text style={{textAlign:'center',color:COLORS.gray}}>ORDER SUMMARY</Text>
      </View>

      <ScrollView style={styles.itemsContainer}>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View key={key} style={{flexDirection:'row', alignItems:'center',padding:10,width:'100%'}}>
              <Image
              source={{uri: urlFor(items[0]?.imgurl).url()}}
              style={styles.cartItemImage}
              />
              <View style={{width:'55%'}}>
                <Text style={styles.cartItemName}>{items[0]?.name}</Text>
                <Text style={styles.cartItemPrice}>
                  ₹{items[0]?.price} /{items[0]?.measure}
                </Text>
              </View>
              <View>
                <Text>{items.length}</Text>
                <Text>₹{(items.length)*(items[0]?.price)}</Text>
              </View>
              

            </View>
          ))}
      </ScrollView>

      <View style={styles.instructionsContainer}>
        <View style={styles.instructions}>
          <Icon
            name='phone'
            size={28}
            color={COLORS.gray2}
          /> 
            <Text style={{marginTop:10,fontFamily:FONT.medium}}>Call the agent</Text>
        </View>
        <View style={styles.instructions}>
          <Icon
            name='note'
            size={28}
            color={COLORS.gray2}
          /> 
          <Text style={{marginTop:10,fontFamily:FONT.medium}}>Give Instructions</Text>
        </View>
        <View style={styles.instructions}>
          <Icon
            name='favorite'
            size={28}
            color={COLORS.gray2}
          /> 
          <Text style={{marginTop:10,fontFamily:FONT.medium}}>Tip the agent</Text>
        </View>
      </View>

      <View style={styles.containerheading}>
      <Text style={{textAlign:'center',color:COLORS.gray}}>BILL SUMMARY</Text>
      </View>

      <View style={styles.container}>
        <View style={{flex:1, flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.footerText}>Subtotal</Text>
        <Text style={{fontSize: 16,color:COLORS.gray,right:0,position:'absolute',marginRight:5}}>
          ₹{basketTotal}
        </Text>
        </View>

        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.footerText}>delivery fee</Text>
        <Text style={{fontSize: 16,color:COLORS.gray,right:0,position:'absolute',marginRight:5}}>
          ₹{basketTotal? Math.floor(Math.max((distance)*12,5000)):0}
        </Text>
        </View>

        <View style={{flex:1, flexDirection:'row', alignItems:'center', alignContent:'center'}}>
        <Text style={{fontSize: 16,color:COLORS.gray,fontWeight:'bold', marginLeft:5}}>Grand Total</Text>
        <Text style={{fontSize: 16,color:COLORS.gray,fontWeight:'bold',right:0,position:'absolute', marginRight:5}}>
          ₹{basketTotal + (basketTotal? Math.floor(Math.max((distance)*12,5000)):0)}
        </Text>
        </View>
      </View>

      </ScrollView>

      <View>
        <TouchableOpacity style={styles.cartbutton}>
          <Text style={styles.checkoutButtonText}>Cancel Order</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  )
}

export default Delivery