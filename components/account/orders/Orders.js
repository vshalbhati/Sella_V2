import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useState, useEffect , useLayoutEffect,useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {selectOrderItems} from '../../../features/orderSlice';
import createClient, { urlFor } from '../../../sanity';




const Orders = ({navigation}) => {
  const items = useSelector(selectOrderItems);

  const [pastOrders, setPastOrders] = useState([])

  let groqQuery = '*[_type == "supply" && (';

  items.forEach((item, index) => {
    Object.keys(item.items).forEach((itemId, subIndex) => {
      groqQuery += `_id == '${itemId}'`;
      if (index !== items.length - 1 || subIndex !== Object.keys(item.items).length - 1) {
        groqQuery += ' || ';
      }
    });
  });
  

groqQuery += ')] { ... }';

useEffect(()=>{
  createClient.fetch(groqQuery).then((data)=>{
    setPastOrders(data);
  });
},[]);

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

      <View style={styles.cartText}>
        <Text style={{textAlign:'center'}}>
          {items.length>0?'Items you ordered in the past!':`You haven't ordered anything!`}
        </Text>
        <Text style={{textAlign:'center'}}>
          {items.length>0?` `:'The items that you have ordered in the past will appear here.'}
        </Text>
      </View>
      
        <FlatList
          data={pastOrders}
          renderItem={({ item }) => (
            <View key={item._id} style={{flexDirection:'row',padding:20}}>
              <Image
                source={{ uri: urlFor(item.image.asset._ref).url() }}
                style={styles.cartItemImage}
              />
              <View style={{flexDirection:'column',marginHorizontal:30}}>
                <Text >{item.name}</Text>
                <Text >₹{item.price}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{  columnGap: 10 }}
        />
     </SafeAreaView>
  )
}

export default Orders

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#FCFCFC',
  },
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:COLORS.two,
    borderRadius:50, 
    marginTop:40,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:0,
    left:0,
    zIndex:1
  },
  cartText:{
    marginTop:80,
  },
  cartItemImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 10,
  },
})