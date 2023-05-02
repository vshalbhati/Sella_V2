import { View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useMemo } from 'react';
import {Stack, useRouter} from 'expo-router';
import {COLORS, icons, images, SIZES} from '../constants';
import ScreenHeaderBtn from '../components/common/header/ScreenHeaderBtn';
import { useDispatch, useSelector } from 'react-redux';
import { selectSupply } from '../features/supplyslice';
import { selectBasketItems, basketTotal, removeFromBasket, selectBasketTotal } from '../features/basketSlice';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { urlFor } from '../sanity';
import CurrencyFormat from 'react-currency-format';



const Cart = ({navigation}) => {
    const router = useRouter();
    const supply = useSelector(selectSupply);
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal)
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();

    useMemo(() => {
      const groupedItems = items.reduce((results, item) => {
        (results[item.id] = results[item.id] || []).push(item);
        return results;
      }, {});
      setGroupedItemsInBasket(groupedItems);
    },[items])
    console.log(items)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shopping Cart</Text>
      </View>
      <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name="arrow-back"
            size={28}
            color={COLORS.lightWhite}
            onPress={() => navigation.goBack()}
          />      
        </TouchableOpacity>
      </View>
      {/* <View style={styles.cartItemContainer}>
        <View style={styles.cartItem}>
          <Image source={require('../assets/images/kemal.jpeg')} style={styles.cartItemImage} />
          <View style={styles.cartItemDetails}>
            <Text style={styles.cartItemName}>Product 1</Text>
            <Text style={styles.cartItemPrice}>$20</Text>
          </View>
        </View>
      </View> */}
      <ScrollView>
        {Object.entries(groupedItemsInBasket).map(([key, items]) => (
          <View key={key} style={{flex:1, flexDirection:"row", alignItems:"center",padding:10}}>
            <Image
            source={{uri: urlFor(items[0]?.imgurl).url()}}
            style={styles.cartItemImage}
            />
            <View >
            <Text style={styles.cartItemName}>{items[0]?.name}</Text>
            <Text style={styles.cartItemPrice}>
            <CurrencyFormat value={items[0]?.price} displayType={'text'} prefix={'₹'}/>
            </Text>
            <View style={{flex:1, flexDirection:"row", gap:10}}>
            <Text>{items.length}</Text>
            <TouchableOpacity >
              <Icon 
               name="delete"
               size={20} 
               color="#333"
               onPress={() => dispatch(removeFromBasket({id:key}))}
               />
            </TouchableOpacity>
            </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{backgroundColor:"rgba(255,255,255,0.9)",padding:5,position:"absolute",bottom:0, width:"100%"}}>

        <View style={{flex:1, flexDirection:"row",justifyContent:'space-between'}}>
        <Text style={styles.footerText}>Subtotal</Text>
        <Text style={{fontSize: 16,color:COLORS.gray,right:0,position:"absolute",marginRight:5}}>
        <CurrencyFormat value={basketTotal} displayType={'text'} prefix={'₹'}/>
        </Text>
        </View>

        <View style={{flex:1, flexDirection:"row"}}>
        <Text style={styles.footerText}>Delivery Fee</Text>
        <Text style={{fontSize: 16,color:COLORS.gray,right:0,position:"absolute",marginRight:5}}>
        <CurrencyFormat value={200} displayType={'text'} prefix={'₹'}/>
        </Text>
        </View>

        <View style={{flex:1, flexDirection:"row", alignItems:'center', alignContent:'center'}}>
        <Text style={{fontSize: 16,color:COLORS.gray,fontWeight:"bold", marginLeft:5}}>Grand Total</Text>
        <Text style={{fontSize: 16,color:COLORS.gray,fontWeight:"bolder",right:0,position:"absolute", marginRight:5}}>
        <CurrencyFormat value={basketTotal +200} displayType={'text'} prefix={'₹'}/>
        </Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('prepare')}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
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
    padding:5, 
    borderRadius:50, 
    position:"absolute",
    zIndex:1,
    marginTop:8,
    marginLeft:8,
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
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    footerText: {
      fontSize: 16,
      color:COLORS.gray,
      marginLeft:5
    },
    checkoutButton: {
      height:40,
      width:"90%",
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
  });

export default Cart