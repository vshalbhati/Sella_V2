import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView,Alert } from 'react-native'
import React, { useMemo ,useEffect, useRef} from 'react';
import {COLORS, Darkmode, FONT, icons, images, SIZES} from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectSupply } from '../../features/supplyslice';
import { selectBasketItems, basketTotal, removeFromBasket, selectBasketTotal, addToBasket } from '../../features/basketSlice';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import createClient, { urlFor } from '../../sanity';
import { addToOrder } from '../../features/orderSlice';
import {firebase} from '../../config/firebase'
import { TextInput } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { setDelivery } from '../../features/deliverySlice';
import { setDocumentId } from '../../features/firestoreidSlice';
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
      title: "Wohoo!! Payment Complete.",
      body: 'Your order has been placed.',
      data: { data: 'goes here' },
    },
    trigger: null,
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
  }

  return token;
}

const db = getFirestore(firebase);

const Cart = ({navigation}) => {
    const locationInfo = useSelector((state) => state.location);
    const distance = useSelector((state) => state.distance.distance);
    const supply = useSelector(selectSupply);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal)
    const darkmode = useSelector((state) => state.darkmode.darkmode);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const [address, setAddress] = useState(locationInfo.location);
    const [sector, setSector] = useState("");
    const dispatch = useDispatch();
    const [refferalCode, setReferralCode] = useState('')
    const [discount, setDiscount] = useState(1)
    const [saved, setSaved]= useState(false)
    const stripe = useStripe();
    console.log(items)


    useMemo(() => {
      const groupedItems = items.reduce((results, item) => {
        (results[item.id] = results[item.id] || []).push(item);
        return results;
      }, {});
      setGroupedItemsInBasket(groupedItems);
    },[items]);


    useEffect(() => {
      setAddress(locationInfo.location)
      const sectorno = () =>{
        for (let i = 0; i < address.length; i++) {
          if ((address[i] == 'S' || address[i] == 's') &&
          (address[i + 1] == 'e' || address[i + 1] == 'E') &&
          (address[i + 2] == 'c' || address[i + 2] == 'C') &&
          (address[i + 3] == 't' || address[i + 3] == 'T') &&
          (address[i + 4] == 'o' || address[i + 4] == 'O') &&
          (address[i + 5] == 'r' || address[i + 5] == 'R') &&
          (address[i+6]==' ' || ((address[i+6]>='a' && address[i+6]<='z') || (address[i+6]>='A' && address[i+6]<='D')))
        ) {
            let s="";
              for(let j=0; j<=address.length;j++){
                if(address[i+7+j] == ',' || address[i+7+j] == ' '){
                  break;
                }
                else{
                  s+=address[i+7+j];
                }
              }
              setSector(s);
            break;
          }
        }
      }
      sectorno()
    }, [address])

    const couponcheck=()=>{
        createClient.fetch(`*[_type == 'coupons' && name=='${refferalCode}']{...,}`)
        .then((data)=>{
        setDiscount(1-((data[0].discount)/100))
        setSaved(true)
      })
    };

    const pay = async()=>{
      // const response = await fetch('http://192.168.1.14:3000/payment',{
      //   method: 'POST',
      //   body: JSON.stringify({
      //     amount : Math.floor(((basketTotal*discount) + (basketTotal? Math.floor(Math.max((distance)*12,5000)):0)) * 100),
      //   }),
      //   headers:{
      //     "Content-Type":"application/json",
      //   },
      // });
      // const data = await response.json();
      // if(!response.ok) return Alert.alert(data.message);
      // const clientSecret = data.paymentIntent;
      // const initSheet = await stripe.initPaymentSheet({
      //   paymentIntentClientSecret: clientSecret,
      //   googlePay: true,
      //   merchantDisplayName: 'Construck',
      // });
      // if(initSheet.error) return Alert.alert(initSheet.error.message);
      // const presentSheet = await stripe.presentPaymentSheet({
      //   clientSecret,
      // })
      // if(presentSheet.error) return Alert.alert(presentSheet.error.message);

      await schedulePushNotification()

      dispatch(setDelivery(false));
      dispatch(addToOrder({ items: groupedItemsInBasket }));
      try {
        const collectionRef = collection(db, 'basketItems');
        const docRef = await addDoc(collectionRef, groupedItemsInBasket);
        const documentId = docRef.id;
        dispatch(setDocumentId(documentId))
        navigation.navigate('prepare');
      } catch (error) {
        console.error('Error storing basket items:', error);
      }
    }


    useEffect(() => {
      const requestNotificationPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Notification permissions denied!');
        }
      };
    
      requestNotificationPermissions();
    }, []);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

  return (
    <SafeAreaView style={[styles.container,{backgroundColor:darkmode?Darkmode.white: COLORS.white,}]}>

      <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name='arrow-back'
            size={28}
            color={COLORS.lightWhite}
            onPress={() => navigation.goBack()}
          />      
        </TouchableOpacity>
      </View>


      <ScrollView style={{height:100,marginBottom:60}}>

      <View style={[styles.deliverytimecontainer,{backgroundColor:darkmode?COLORS.secondary:COLORS.lightWhite,}]}>
        <View></View>
          <Icon
            name='local-shipping'
            size={28}
            color={COLORS.gray}
          /> 
          <Text style={{color:darkmode?COLORS.lightWhite:COLORS.gray}}>Delivery in <Text style={{fontFamily:FONT.medium}}>{Math.floor(distance*3)}-{Math.floor(distance*5)} min</Text></Text>
      </View>

      <View style={styles.containerheading}>
      <Text style={{textAlign:'center',color:COLORS.gray}}>ITEM(S) ADDED</Text>
      </View>
      <ScrollView style={styles.itemsContainer}>
        {Object.entries(groupedItemsInBasket).map(([key, items]) => (
          <View key={key} style={{flexDirection:'row', alignItems:'center',padding:10,width:'100%'}}>
            <Image
            source={{uri: urlFor(items[0]?.imgurl).url()}}
            style={styles.cartItemImage}
            />
            <View style={{width:'70%'}}>
            <Text style={styles.cartItemName}>{items[0]?.name}</Text>
            <Text style={styles.cartItemPrice}>
              ₹{items[0]?.price} /{items[0]?.minimum} {items[0]?.measure}
            </Text>
            {/* <Text style={styles.cartItemPrice}>
              {items[0]?.zone}
            </Text> */}

              <View style={styles.controls}>
                <View style={styles.controlbox}>
                  <TouchableOpacity >
                    <Icon 
                    name='add'
                    size={20} 
                    color={COLORS.white}
                    onPress={() => dispatch(addToBasket({id:key,price:items[0]?.price}))}
                    />
                  </TouchableOpacity>
                  <Text style={{color:COLORS.white,fontFamily:FONT.bold}}>{items.length * items[0].minimum}</Text>
                  <TouchableOpacity >
                    <Icon 
                    name='delete'
                    size={20} 
                    color={COLORS.white}
                    onPress={() => dispatch(removeFromBasket({id:key}))}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cartItemPrice}>₹{(items[0]?.price)*(items.length)}</Text>
              </View>
            
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.containerheading}>
      <Text style={{textAlign:'center',color:COLORS.gray}}>BILL SUMMARY</Text>
      </View>
      <View style={{backgroundColor:'rgb(255,255,255)',padding:5,marginTop:10,width:'90%',alignSelf:'center', borderRadius:10}}>
        <View style={{flex:1, flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.footerText}>Subtotal</Text>
        <Text style={{fontSize: 16,color:COLORS.gray,right:0,position:'absolute',marginRight:5}}>
          ₹{Math.floor(basketTotal*discount)}
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
          ₹{(basketTotal*discount) + (basketTotal? Math.floor(Math.max((distance)*12,5000)):0)}
        </Text>
        </View>
        {saved &&(
          <Text style={{fontSize: 16,color:COLORS.gray,fontWeight:'bold',textAlign:'right', marginRight:5}}>
          Congrats! You saved ₹{Math.round(basketTotal*(1-discount))}
        </Text>
        )}
        
      </View>

        <View style={styles.containerheading}>
        <Text style={{textAlign:'center',color:COLORS.gray}}>SAVINGS CORNER</Text>
        </View>

        <View style={styles.couponcontainer}>
          <Text style={{textAlign:'center',fontFamily:FONT.medium, fontSize:SIZES.medium}}>Save upto 30% by the refferal code!</Text>
          <TextInput
          placeholder="Enter Code"
            onChangeText={(text) => setReferralCode(text)}
            style={styles.referralinput}
          />
          <TouchableOpacity style={styles.applybutton} onPress={couponcheck}>
            <Text style={{textAlign:'center',color:COLORS.lightWhite}}>Apply</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>




      {sector.length>0 ? (
      <View style={[styles.dabba,{backgroundColor:darkmode?COLORS.secondary:COLORS.lightWhite,}]}>
        <Icon
            name='location-on'
            size={45}
            color={COLORS.gray}
            style={{marginTop:4}}
          /> 
        <View style={{justifyContent:'center'}}>
          <View style={{flexDirection:'row'}}>
            <Text style={{color:darkmode?COLORS.lightWhite:COLORS.secondary,width:'75%'}}>Delivering to this address</Text>
            <TouchableOpacity style={styles.selectLocationButton} onPress={() => navigation.navigate('locations')}>
              <Text style={{color:darkmode?COLORS.lightWhite:COLORS.secondary}}>Change </Text>
            </TouchableOpacity>
          </View>
          <Text style={{color:darkmode?COLORS.lightWhite:COLORS.secondary,fontSize:16,textAlign:'left'}} numberOfLines={1} ellipsizeMode="tail">{locationInfo.location}</Text>
        </View>
      </View>
    ):(
        <View style={[styles.dabba,{backgroundColor:darkmode?COLORS.secondary:COLORS.lightWhite,}]}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:darkmode?COLORS.lightWhite:COLORS.secondary,margin:10,width:'75%'}}>we couldn't get your location</Text>
            <TouchableOpacity style={styles.selectLocationButton} onPress={() => navigation.navigate('locations')}>
              <Text style={{color:darkmode?COLORS.lightWhite:COLORS.secondary}}>CHANGE</Text>
            </TouchableOpacity>
          </View>
        </View>
    )}



      

      <View style={styles.paycontainer}>
        <View style={{justifyContent:'center'}}>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
              <Image
                source={require('../../assets/images/razor.png')}
                resizeMode='contain'
                style={{height:20,width:48}}
              />
              <Text style={{marginLeft:3}}>PAY USING</Text>
            </View>
          <Text style={{marginLeft:8}}>Stripe</Text>
        </View>
        <TouchableOpacity style={[styles.checkoutButton,{backgroundColor:((items.length >0) && (sector.length >0) )  ? COLORS.one :'#BDC3C7'}]}
          disabled={items.length==0 && sector.length==0}
          onPress={pay}
          >
            <View style={{flexDirection:'row'}}>
              <View style={{width:120,marginLeft:10}}>
                <Text style={{fontFamily:FONT.medium,fontSize:SIZES.medium,color: '#fff'}}>₹{(basketTotal*discount) + (basketTotal? Math.floor(Math.max((distance)*12,5000)):0)}</Text>
                <Text style={{color: '#fff'}}>Total</Text>
              </View>
            <Text style={styles.checkoutButtonText} >Checkout</Text>
            </View>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  applybutton:{
    width:'80%',
    height:40,
    borderRadius:10,
    alignSelf:'center',
    backgroundColor:COLORS.one,
    margin:10,
    justifyContent:'center',

  },
  referralinput:{
    alignSelf:'center',
    backgroundColor:COLORS.white,
    width:'80%',
    height:40,
    borderRadius:10,
    paddingHorizontal: 16,

  },
  couponcontainer:{
    width:'90%',
    height:150,
    backgroundColor:COLORS.lightWhite,
    justifyContent:'center',
    borderRadius:10,
    alignSelf:'center',
    marginBottom: 20,

  },
  controlbox:{
    flexDirection:'row',
    gap:10,
    backgroundColor:COLORS.one,
    height:30,
    borderRadius:10,
    alignItems:'center',
    padding: 5,

  },
  controls:{
    position:'absolute',
    right:0,
    justifyContent:'center',
    alignItems:'center',
  },
  paycontainer:{
    flexDirection:'row',
    width:'100%',
    backgroundColor:COLORS.lightWhite,
    justifyContent:'center',
    alignItems:'center',
  },
  container: {
    flex: 1,
  },
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:COLORS.one,
    borderRadius:50, 
    marginTop:40,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
  },
  header: {
    height: 60,
    backgroundColor: COLORS.lightWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  cartItemContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray2,
    },
    footerText: {
      fontSize: 16,
      color:COLORS.gray,
      marginLeft:5
    },
    checkoutButton: {
      height:50,
      width:'60%',
      marginBottom:5,
      borderRadius:10,
      alignSelf:'center',
      justifyContent:'center',
      marginRight:10,
      marginLeft:30,
      marginTop:5,
    },
    checkoutButtonText: {
      color: '#fff',
      fontSize: 20,
      textAlign:'right',
      marginTop:5,
    },
    changeButton:{
      backgroundColor:COLORS.one,
      width:120,
      justifyContent:'center',
      alignSelf:'center',
      alignItems:'center'
    },
    selectLocationButton: {
      marginRight:10,
      marginLeft:10,
    },
    dabba:{
      height:60,
      backgroundColor:COLORS.lightWhite,
      position:'absolute',
      bottom:0,
      marginBottom:60,
      width:'100%',
      zIndex:1,
      borderBottomWidth: 2,
      borderColor: 'rgba(0,0,0,0.1)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.65,
      flexDirection:'row',
      borderTopLeftRadius:10,
      borderTopRightRadius:10,
    },
    cartText:{
      marginTop:60,
      color:COLORS.lightWhite
    },
    itemsContainer:{
      backgroundColor:COLORS.lightWhite,
      width:'90%',
      alignSelf:'center',
      borderRadius:10
    },
    deliverytimecontainer:{
      flexDirection:'row',
      borderRadius:10,
      gap:20,
      width:'90%',
      marginHorizontal:'auto',
      alignSelf:'center',
      alignItems:'center',
      marginTop:10,
      padding:10
    },
    containerheading:{
      marginBottom:10,
      marginTop:20,
    }
  });

export default Cart