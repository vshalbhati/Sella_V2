import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView,Image,Alert,Linking } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONT, SIZES } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { selectBasketItems, selectBasketTotal,  } from '../../features/basketSlice';
import { urlFor } from '../../sanity';
import {setDelivery} from '../../features/deliverySlice';
import {firebase} from '../../config/firebase'
import { getFirestore, collection, deleteDoc, doc } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Order has been cancelled!",
      body: 'Your refund will be initiated soon.',
      data: { data: 'goes here' },
    },
    trigger: null,
  });
}


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
    marginBottom:10,
    marginTop:5,
  },
  instructionsContainer:{
    width:'90%',
    flexDirection:'row',
    gap:20,
    marginTop:20,
    justifyContent:'center',
    alignSelf:'center',
    marginBottom:20,

  },
  instructions:{
    height:110,
    width:110,
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
  },
  userpop:{
    flex:1,
    height:400,
    width:'80%',
    position:'absolute',
    left:0,
    backgroundColor:'rgba(255,255,255,1)',
    zIndex:2,
    borderRadius:20,
    justifyContent:'center',
    alignItems: 'center',
    marginLeft:40,
    marginTop:220,
    elevation:5,

  },
  userpopupbuttons:{
    width:'100%',
    height:50,
    position:'absolute',
    bottom:0,
    backgroundColor:COLORS.one,
    flexDirection:'row',
    gap:70,
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
    justifyContent:'center',
    alignItems: 'center',
  },
  warningicon:{
    alignSelf:'center'
  },
  buttontext:{
    color:COLORS.lightWhite
  }
});

const Delivery = ({navigation}) => {
  const db = getFirestore(firebase);
  const dispatch = useDispatch();
  const locationInfo = useSelector((state) => state.location);
  const distance = useSelector((state) => state.distance.distance);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const documentID = useSelector(state => state.documentId)
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [rating, setRating] = useState(0);



  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  },[items]);

  const cancelOrder= async()=>{
      try {
        const collectionRef = collection(db, 'basketItems');
        await deleteDoc(doc(collectionRef, documentID));
      } catch (error) {
        console.error('Error deleting document:', error);
      }

      await schedulePushNotification()

      dispatch(setDelivery(true))
      setShowMessage(!showMessage)
      navigation.navigate('home')
  }
  const handlePhoneCall = () => {
    const phoneNumber = '1234567890'; 
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };
  const handleInstructionsButtonPress = () => {
    const phoneNumber = '1234567890'; 
    const smsUrl = `sms:${phoneNumber}`;
    Linking.openURL(smsUrl);
  };
  

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


    <ScrollView>

      <View style={styles.container}>
          <Text>Delivering to this address</Text>
          <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
            {locationInfo.location.length>0? locationInfo.location : 'Desho me desh hai haryana! Ek hi baat hai yaha bolna or Gariayana'}
          </Text>
      </View>

      <View style={styles.container}>
          <Text>Your delivery is on the way!</Text>
          <Text style={styles.text}>The estimated time of delivery is <Text style={{fontFamily:FONT.bold}}>{Math.floor(distance*3)} mins</Text> </Text>
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
                  ₹{items[0]?.price} /{items[0]?.minimum} {items[0]?.measure}
                </Text>
              </View>
              <View>
                <Text>{items.length*items[0]?.minimum}</Text>
                <Text>₹{(items.length)*(items[0]?.price)}</Text>
              </View>
            </View>
          ))}
      </ScrollView>

      <View style={styles.instructionsContainer}>
        <TouchableOpacity style={styles.instructions} onPress={handlePhoneCall}>
          <Icon
            name='phone'
            size={28}
            color={COLORS.gray2}
          /> 
            <Text style={{marginTop:10,fontFamily:FONT.medium}}>Call the agent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.instructions} onPress={handleInstructionsButtonPress}>
          <Icon
            name='note'
            size={28}
            color={COLORS.gray2}
          /> 
          <Text style={{marginTop:10,fontFamily:FONT.medium}}>Give Instructions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.instructions} onPress={()=>setShowRate(true)}>
          <Icon
            name='star'
            size={28}
            color={COLORS.gray2}
          /> 
          <Text style={{marginTop:10,fontFamily:FONT.medium}}>Rate the agent</Text>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.cartbutton} onPress={()=>setShowMessage(!showMessage)}>
          <Text style={styles.checkoutButtonText}>Cancel Order</Text>
        </TouchableOpacity>
      </View>

      {showMessage && (
        <View style={styles.userpop}>
          <View>
            <Icon name="error" size={120} color={COLORS.one} style={styles.warningicon}/>
            <Text style={{textAlign:'center',fontFamily:FONT.bold,fontSize:SIZES.large,}}>Cancel the order?</Text>
            <Text style={{textAlign:'center',fontFamily:FONT.medium,fontSize:SIZES.medium,padding:20}}>Delivery charges are non-refundable! Do you still want to cancel?</Text>          
          </View>
          <View style={styles.userpopupbuttons}>
            <Text style={styles.buttontext} onPress={()=>setShowMessage(false)}>NO, EXIT</Text>
            <Text style={styles.buttontext} onPress={cancelOrder}>YES, CANCEL</Text>
          </View>
        </View>
      )}

      {showRate && (
        <View style={styles.userpop}>
          <View>
            <Icon name="star" size={120} color={COLORS.one} style={styles.warningicon}/>
            <Text style={{textAlign:'center',fontFamily:FONT.bold,fontSize:SIZES.large,}}>Rate the agent</Text>
            <Text style={{textAlign:'center',fontFamily:FONT.medium,fontSize:SIZES.medium,padding:20}}>Your small effort can mean the world to them!</Text>          
          </View>
          <View style={{flexDirection:'row',gap:20}}>
          <Icon
            name='star'
            size={28}
            color={rating >= 1 ? COLORS.one : COLORS.gray2}
            onPress={() => setRating(1)}          
          /> 
          <Icon
            name='star'
            size={28}
            color={rating >= 2 ? COLORS.one : COLORS.gray2}
            onPress={() => setRating(2)}          
          /> 
          <Icon
            name='star'
            size={28}
            color={rating >= 3 ? COLORS.one : COLORS.gray2}
            onPress={() => setRating(3)}          
          /> 
          <Icon
            name='star'
            size={28}
            color={rating >= 4 ? COLORS.one : COLORS.gray2}
            onPress={() => setRating(4)}          
          /> 
          <Icon
            name='star'
            size={28}
            color={rating >= 5 ? COLORS.one : COLORS.gray2}
            onPress={() => setRating(5)}          
          /> 
          </View>
          {rating>0 &&(
            <View style={styles.userpopupbuttons}>
            <Text style={styles.buttontext} onPress={()=>setShowRate(false)}>Submit</Text>
          </View>
          )}
          
          
        </View>
      )}


    </SafeAreaView>
  )
}

export default Delivery