import { View, Text, ScrollView, FlatList, StyleSheet, Image,ImageBackground ,Dimensions} from 'react-native'
import { useState, useEffect } from 'react';
import createClient, { urlFor } from '../../sanity';
import { COLORS, FONT, SIZES } from '../../constants';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../../features/basketSlice';
import Crateicon from '../cart/Crateicon';
import { setSupply } from '../../features/supplyslice';
import { SafeAreaView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
// import ImageColors from 'react-native-image-colors';





const Supplydetails = ({navigation}) => {
  const route = useRoute();
  const { id, imgurl, name, short_description ,price} = route.params;
  const dispatch = useDispatch();
  const items = useSelector(state => selectBasketItemsWithId(state, id));
  const [supplyImages, setSupplyImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);


  const addbill=(key)=>{
    dispatch(addToBasket({id, name, short_description, imgurl, price}))
  }

  const removebill=(itemId)=>{
    if(!items.length >0) return;
    dispatch(removeFromBasket({id}));
  }

  useEffect(()=>{
    createClient.fetch(
      `*[_type == 'supply' && _id == '${id}'] {
        image[]{
          asset->{
            ...,
          }
        }
      }`
    ).then((data)=>{
      setSupplyImages(data[0].image);
    });
  },[]);

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
    <SafeAreaView style={styles.container}>
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
        source={{ uri: selectedImage || urlFor(imgurl).url() }}
        style={styles.badimage}
      />

      <View style={styles.imagesarray}>
        <FlatList
          data={supplyImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => setSelectedImage(item.asset.url)}
            >
              <Image
                source={{ uri: item.asset.url }}
                style={{ height: 30, width: 30, borderRadius: 5 }}
              />
            </TouchableOpacity>
          )}
        />
      </View>



      <View style={styles.infocard}>
        <View style={styles.textcontent}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{short_description}</Text>
            <Text style={styles.price}>₹{price}/pc</Text>

        </View>

        <View style={styles.quantity}>
          <View style={{justifyContent:'center',alignItems:'center', flexDirection:'row'}}>
          <Text style={{fontSize:22,textAlign:'center',color:COLORS.lightWhite,marginLeft:20}}>Tons(s)</Text>
          <View style={{flex:1, flexDirection:'row',alignSelf:'center',marginLeft:50}}>
          <TouchableOpacity style={[styles.gola,{backgroundColor:COLORS.one}]}>
          <Icon
            name='add'
            size={28}
            onPress={()=> addbill()}
            color={'white'}
          />
          </TouchableOpacity>
              <Text style={{ fontSize:24,fontWeight:'bold',paddingLeft:20,paddingRight:20,color:COLORS.lightWhite}}>{items.length}</Text>
          <TouchableOpacity disabled={!items.length} style={[styles.gola,{backgroundColor:(items.length) >0 ? COLORS.one : '#BDC3C7'}]}>
          <Icon
            name='remove'
            size={28}
            onPress={()=> removebill()}
            color={'white'}
          />
          </TouchableOpacity>
        </View>
          </View>

      </View>
      </View>
    <Crateicon
    navigation={navigation}
    />
    </SafeAreaView>
  )
}

export default Supplydetails

const styles = StyleSheet.create({
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:'rgba(255,255,255,0.6)',
    borderRadius:50, 
    marginTop:40,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    left:0,
    zIndex:3
  },
  gola:{
    height:40,
    width:40,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
  },
  container:{
    flex:1,
  },
  name:{
    fontSize:25,
    fontFamily:FONT.bold,
    textAlign:'left'
  },
  price:{
    fontSize:20,
    color:COLORS.tertiary,
  },
  description:{
    fontSize:15,
    fontFamily:FONT.regular,
    textAlign:'left'
  },

  quantity:{
    flex:1,
    width:'90%',
    maxHeight:80,
    borderRadius:10,
    backgroundColor:'#EC6170',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginTop:50,
  },
  imagesarray:{
    flex:1,
    position:'absolute',
    marginBottom:520,
    bottom:0,
    width:'100%',
    alignItems:'center',
    rowGap:50
  },
  badimage:{
    height:600,
    width:'100%',
    zIndex:-1
  },
  infocard:{
    position:'absolute',
    backgroundColor:COLORS.white,
    bottom:0,
    width:'100%',
    height:500,
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    elevation:3,
    padding:30
  },
  textcontent:{
    justifyContent:'center',
    marginTop:50
  },

});