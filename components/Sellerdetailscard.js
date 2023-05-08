import { View, Text, ScrollView, FlatList, StyleSheet, Image } from 'react-native'
import { useState, useEffect } from 'react';
import createClient, { urlFor } from '../sanity';
import { COLORS, FONT, SIZES } from '../constants';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';


const styles = StyleSheet.create({
    backArrow:{
      height:40,
      width:40, 
      backgroundColor:'rgba(255,255,255,0.6)',
      padding:5, 
      borderRadius:50, 
      position:'absolute',
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
      backgroundColor:'rgba(0,255,0,0.5)',
      borderRadius:50,
      padding:6
    },
    cartbar:{
      height:50,
      width:'90%',
      marginLeft:20,
      marginBottom:10,
      backgroundColor:'orange',
      position:'absolute',
      bottom:0,
      borderRadius:10,
      display:'block',
      flex:1,
      flexDirection:'row',
      color:COLORS.lightWhite,
      fontSize:24
    }
  });


const Sellerdetailscard = (props) => {
    const [bill, setBill] = useState(0);
    const [quantity, setQuantity] = useState({});
    const dispatch = useDispatch();
    const key = props.keyValue;
    const { id } = props;
    const items = useSelector((state) => selectBasketItemsWithId(state, key));

    const addbill=()=>{
        dispatch(addToBasket(key))
      }

      const removebill=()=>{
        // if(bill>0){
        // setBill(prevBill => prevBill - 10);
        // }
    
        //   setQuantity(prevQuantity => {
        //     const newQuantity = { ...prevQuantity };
        //     newQuantity[itemId] = Math.max(0, (newQuantity[itemId] || 0) - 1);
        //     return newQuantity;
        //   });
      }
  return (
    <View>
             <View>
                <Text>{props.keyValue}</Text>
              <View style={{flex:1, flexDirection:'row'}}>
              <TouchableOpacity style={styles.gola}>
              <Icon
                name='add'
                size={28}
                onPress={()=> addbill()}
                />
                </TouchableOpacity>
                <Text style={{ fontSize:24,fontWeight:'bold',paddingLeft:10,paddingRight:10}}>{items.length}</Text>
                <TouchableOpacity style={styles.gola}>
                <Icon
                name='remove'
                size={28}
                onPress={()=> removebill()}
                />
              </TouchableOpacity>
              </View>
              </View>
    </View>
  )
}
export default Sellerdetailscard