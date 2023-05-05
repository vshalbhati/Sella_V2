import { View, Text, ScrollView, FlatList, StyleSheet, Image } from 'react-native'
import { useState, useEffect } from 'react';
import createClient, { urlFor } from '../sanity';
import { COLORS, FONT, SIZES } from '../constants';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';
import Sellerdetailscard from './Sellerdetailscard';


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


const Sellerdetails = ({navigation}) => {
  const route = useRoute();
  const { URLSearchParams } = require('url-search-params');
const params = new URLSearchParams();
params.set('param', 'value');

  const { id, imgurl, name, short_description ,supplies} = route.params;
  const [supply, setSupply] = useState([]);

  const [ispressed, setIspressed] = useState(false);
  const [isremoved, setIsremoved] = useState(true);
  const [bill, setBill] = useState(0);
  const [quantity, setQuantity] = useState({});
  const dispatch = useDispatch();
  const items = useSelector(state => selectBasketItemsWithId(state, id));



  const addbill=(key)=>{
    // setBill(prevBill => prevBill + 10);
    // setQuantity(prevQuantity => {
    //   const newQuantity = { ...prevQuantity };
    //   newQuantity[itemId] = (newQuantity[itemId] || 0) + 1;
    //   return newQuantity;
    // });  
    dispatch(addToBasket(key))
  }


  const removebill=(itemId)=>{
    if(bill>0){
    setBill(prevBill => prevBill - 10);
    }

      setQuantity(prevQuantity => {
        const newQuantity = { ...prevQuantity };
        newQuantity[itemId] = Math.max(0, (newQuantity[itemId] || 0) - 1);
        return newQuantity;
      });
  }


  useEffect(()=>{
  createClient.fetch(
    `*[_type == 'seller'  && _id == $id]{
      ...,

        Supplies[]->{
          ...,
          image{
            asset->{
              _ref
            }
          }
        }
    }[0]`,{id}).then((data)=>{
      setSupply(data);
    });
  },[]);
  
  
  return (
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
      style={{ width: '100%', height: 200 }}
      />

       <Text style={styles.name}>{name || 'No name'}</Text>
        <Text style={styles.description}>{short_description}</Text>

        <View>  
          <View>
            <Text style={{color:'rgba(0,255,0,0.5)',fontSize:26}}>Supplies</Text>
            {supply.supplies && supply.supplies.map((item) => (
              <View>
              <Text key={item._key}>{item._key}</Text>
              <View style={{flex:1, flexDirection:'row'}}>
              <TouchableOpacity style={styles.gola}>
                <Icon
                name='add'
                size={28}
                onPress={()=> addbill(item._key)}
                />
                </TouchableOpacity>
                <Text style={{ fontSize:24,fontWeight:'bold',paddingLeft:10,paddingRight:10}}>{items.length}</Text>
                <TouchableOpacity style={styles.gola}>
                <Icon
                name='remove'
                size={28}
                onPress={()=> removebill(item._key)}
                />
              </TouchableOpacity>
              </View>
              </View>
              // <Sellerdetailscard
              // key={item._key}
              // keyValue={item._key}
              // />
            ))}
</View>
</View>
<View style={[styles.cartbar, { display: (bill>0) ? 'block' : 'none' }]}>
<Text style={{color:COLORS.lightWhite,fontSize:30, paddingLeft:'5%'}}>Total</Text>
<Text style={{color:COLORS.lightWhite,fontSize:24, paddingLeft:'60%'}}>{bill}</Text>
</View> 
      </ScrollView>
  )
}

export default Sellerdetails