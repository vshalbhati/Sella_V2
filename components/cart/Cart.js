import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useMemo ,useEffect} from 'react';
import {Stack, useRouter} from 'expo-router';
import {COLORS, icons, images, SIZES} from '../../constants';
import ScreenHeaderBtn from '../common/header/ScreenHeaderBtn';
import { useDispatch, useSelector } from 'react-redux';
import { selectSupply } from '../../features/supplyslice';
import { selectBasketItems, basketTotal, removeFromBasket, selectBasketTotal, addToBasket } from '../../features/basketSlice';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { urlFor } from '../../sanity';
import { addToOrder, removeFromOrder } from '../../features/orderSlice';
import {firebase} from '../../config/firebase'

const db = getFirestore(firebase);

const Cart = ({navigation}) => {
    const router = useRouter();
    const locationInfo = useSelector((state) => state.location);
    const supply = useSelector(selectSupply);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const [address, setAddress] = useState(locationInfo.location);
    const [sector, setSector] = useState("");
    const dispatch = useDispatch();

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
              console.log(s);
              setSector(s);
            break;
          }
        }
      }
      sectorno()
    }, [address])




  return (
    <SafeAreaView style={styles.container}>
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

      {sector.length>0 ? (
      <View style={styles.dabbafter}>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:16,color:COLORS.lightWhite}}>Delivering to this address</Text>
          <TouchableOpacity style={styles.changeLocationButton} onPress={() => navigation.navigate('location')}>
            <Text style={{textAlign:'center',color:COLORS.lightWhite}}>Change </Text>
          </TouchableOpacity>
        </View>
        
        <Text style={{color:COLORS.lightWhite,fontSize:16}}>
          {locationInfo.location}
        </Text>
        </View>
    ):(
        <View style={styles.dabba}>
          <Text style={{textAlign:'center',color:COLORS.lightWhite}}>Regrets that we couldn't detect your location correctly</Text>
          <TouchableOpacity style={styles.selectLocationButton} onPress={() => navigation.navigate('location')}>
            <Text style={{textAlign:'center'}}>Select location</Text>
          </TouchableOpacity>
        </View>
)
}

      <View style={styles.cartText}>
        <Text style={{textAlign:'center',color:COLORS.lightWhite}}>
          {items.length>0?'These items are in your cart!':'Your cart is empty!'}
        </Text>
        <Text style={{textAlign:'center',color:COLORS.lightWhite}}>
          {items.length>0?` `:'The items that you add to cart will appear here.'}
        </Text>
      </View>
      <ScrollView style={styles.itemsContainer}>
        {Object.entries(groupedItemsInBasket).map(([key, items]) => (
          <View key={key} style={{flexDirection:'row', alignItems:'center',padding:10}}>
            <Image
            source={{uri: urlFor(items[0]?.imgurl).url()}}
            style={styles.cartItemImage}
            />
            <View >
            <Text style={styles.cartItemName}>{items[0]?.name}</Text>
            <Text style={styles.cartItemPrice}>
              ₹{items[0]?.price} /{items[0]?.measure}
            </Text>
            <View style={{flexDirection:'row', gap:10}}>
            <TouchableOpacity >
              <Icon 
               name='add'
               size={20} 
               color='#333'
               onPress={() => dispatch(addToBasket({id:key,price:items[0]?.price}))}
               />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity >
              <Icon 
               name='delete'
               size={20} 
               color='#333'
               onPress={() => dispatch(removeFromBasket({id:key}))}
               />
            </TouchableOpacity>
            </View>
            </View>
          </View>
        ))}
      </ScrollView>
      
      <View style={{backgroundColor:'rgba(255,255,255,0.9)',padding:5,position:'absolute',bottom:0, width:'100%'}}>

        <View style={{flex:1, flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={styles.footerText}>Subtotal</Text>
        <Text style={{fontSize: 16,color:COLORS.gray,right:0,position:'absolute',marginRight:5}}>
          ₹{basketTotal}
        </Text>
        </View>

        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.footerText}>Delivery Fee (Free above 1000)</Text>
        <Text style={{fontSize: 16,color:COLORS.gray,right:0,position:'absolute',marginRight:5}}>
          ₹{(basketTotal == 0 || basketTotal>=100000)? 0: 5000}
        </Text>
        </View>

        <View style={{flex:1, flexDirection:'row', alignItems:'center', alignContent:'center'}}>
        <Text style={{fontSize: 16,color:COLORS.gray,fontWeight:'bold', marginLeft:5}}>Order Total</Text>
        <Text style={{fontSize: 16,color:COLORS.gray,fontWeight:'bold',right:0,position:'absolute', marginRight:5}}>
          ₹{basketTotal +((basketTotal == 0 || basketTotal>=100000)? 0: 5000)}
        </Text>
        </View>

        <TouchableOpacity style={[styles.checkoutButton,{backgroundColor:(items.length) >0 ? COLORS.one :'#BDC3C7'}]}
        disabled={items.length==0}
        onPress={async () => {
          dispatch(addToOrder({ items: groupedItemsInBasket }));
        
          try {
            const collectionRef = collection(db, 'basketItems');
            await addDoc(collectionRef, groupedItemsInBasket);
            navigation.navigate('prepare', { sector: sector });
          } catch (error) {
            console.error('Error storing basket items:', error);
          }
        }}        
        
        >
          <Text style={styles.checkoutButtonText} >Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
      height:40,
      width:'90%',
      marginBottom:10,
      backgroundColor:COLORS.one,
      borderRadius:10,
      alignSelf:'center',
    },
    checkoutButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign:'center',
      marginTop:7,
    },
    changeButton:{
      backgroundColor:COLORS.one,
      width:120,
      justifyContent:'center',
      alignSelf:'center',
      alignItems:'center'
    },
    selectLocationButton: {
      backgroundColor: COLORS.one,
      borderRadius: 5,
      width:200,
      justifyContent:'center',
      alignSelf:'center',
      margin:10,
      height:30
    },
    changeLocationButton:{
      borderRadius: 5,
      width:100,
      justifyContent:'center',
      alignSelf:'center',
      height:30,
      borderColor:COLORS.one,
      borderWidth:1,
      marginLeft:40,
    },
    dabba:{
      height:180,
      backgroundColor:COLORS.two,
      position:'absolute',
      width:'100%',
      zIndex:-1,
      padding:55,
      borderBottomWidth: 2,
      borderColor: 'rgba(0,0,0,0.1)',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.65,
    },
    dabbafter:{
      height:180,
      backgroundColor:COLORS.two,
      position:'absolute',
      width:'100%',
      zIndex:-1,
      paddingTop:40,
      paddingLeft:55,
      borderBottomWidth: 2,
      borderColor: 'rgba(0,0,0,0.1)',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.65,
    },
    cartText:{
      marginTop:60,
      color:COLORS.lightWhite
    },
    itemsContainer:{
      height:565,
      width:'100%',
      position:'absolute',
      marginTop:180,
      overflow:'scroll'
    },
  });

export default Cart