import { View, Text, ScrollView, FlatList, StyleSheet, Image,ImageBackground ,Dimensions} from 'react-native'
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
import { SafeAreaView } from 'react-native';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:'rgba(255,255,255,0.6)',
    borderRadius:50, 
    position:'absolute',
    zIndex:2,
    marginTop:30,
    marginLeft:8,
    justifyContent:'center',
    alignItems:'center',
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
    justifyContent:'center',
    alignItems:'center',
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

const Supplydetails = ({navigation}) => {
  const route = useRoute();
  const { id, imgurl, name, short_description ,price} = route.params;
  const dispatch = useDispatch();
  const items = useSelector(state => selectBasketItemsWithId(state, id));

  const addbill=(key)=>{
    dispatch(addToBasket({id, name, short_description, imgurl, price}))
  }

  const removebill=(itemId)=>{
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
    <SafeAreaView >
    <View style={{height:(height)}}>

    <ScrollView>
      <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name='arrow-back'
            size={28}
            onPress={() => navigation.goBack()}
          />      
        </TouchableOpacity>
      </View>
      <Image
      source={{uri: urlFor(imgurl).url()}}
      style={{height:(300),width:'100%'}}
      />
      <View>
      <Text style={{fontSize:26,fontWeight:"200"}}>{name}</Text>
      <Text style={{fontSize:22,fontWeight:"100"}}>{short_description}</Text>
      <Text style={{fontSize:22,color:COLORS.tertiary}}>₹{price}/pc</Text>
      <Text style={{fontSize:22}}>Choose the quantity</Text>

      <View style={{flex:1, flexDirection:'row'}}>
      <TouchableOpacity style={[styles.gola,{backgroundColor:COLORS.one}]}>
        <Icon
            name='add'
            size={28}
            onPress={()=> addbill()}
        />
      </TouchableOpacity>
          <Text style={{ fontSize:24,fontWeight:'bold',paddingLeft:10,paddingRight:10}}>{items.length}</Text>
      <TouchableOpacity disabled={!items.length} style={[styles.gola,{backgroundColor:(items.length) >0 ? COLORS.one : '#BDC3C7'}]}>
        <Icon
          name='remove'
          size={28}
          onPress={()=> removebill()}
        />
      </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
    <Crateicon
    navigation={navigation}
    />
    </View>
    </SafeAreaView>
  )
}

export default Supplydetails