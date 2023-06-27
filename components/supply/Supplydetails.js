import { View, Text, ScrollView, FlatList, StyleSheet, Image,ImageBackground ,Dimensions,TextInput} from 'react-native'
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
  const { id, imgurl, name, short_description ,price,measure} = route.params;
  const dispatch = useDispatch();
  const items = useSelector(state => selectBasketItemsWithId(state, id));
  const [supplyImages, setSupplyImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemquantity, setItemQuantity]= useState(items.length);
  const [trucks, setTrucks] = useState(null)

  const calculateTrucks =()=>{
    setTrucks(Math.ceil(itemquantity /3 ));
  }
  const addbill=(key)=>{
    dispatch(addToBasket({id, name, short_description, imgurl, price, measure}))
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
            <Text style={styles.description}>{short_description} Bhai tera india me rap kare hindi wala tu samjhe eminem hi rapgod hai. Surya teri zubaan bhot chalti hai, mere hath zada chalte hein</Text>
            <Text style={styles.price}>₹{price} <Text style={{fontSize:SIZES.medium,fontFamily:FONT.medium}}>/{measure}</Text></Text>
        </View>


        <View style={styles.quantityheaderbox}>
          <Text style={styles.quantityheader}>Select the quantity</Text>
          <View style={{height:3,width:175,backgroundColor:COLORS.one,marginTop:5}}/>
        </View>


        <View style={styles.quantity}>
          <View style={{justifyContent:'center',alignItems:'center', flexDirection:'row'}}>
            <Text style={{fontSize:22,textAlign:'center',color:COLORS.primary,marginLeft:20}}>{measure}</Text>
            <View style={{ flexDirection:'row',alignSelf:'center',marginLeft:100}}>
              <TouchableOpacity style={[styles.gola,{backgroundColor:COLORS.one}]}>
              <Icon
                name='add'
                size={28}
                onPress={()=> addbill()}
                color={'white'}
              />
              </TouchableOpacity>
                  <Text style={{ fontSize:24,fontWeight:'bold',paddingLeft:20,paddingRight:20,color:COLORS.primary}}>{items.length}</Text>
              <TouchableOpacity disabled={!items.length} style={[styles.gola,{backgroundColor:(items.length) >0 ? COLORS.one : COLORS.gray2}]}>
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

      <View style={{flexDirection:'row',margin:10}}>
        <Icon name='local-shipping' size={21} color={COLORS.gray}/>
        <Text> x {Math.floor(items.length /3 )}</Text>
      </View>


      </View>
    <Crateicon
    navigation={navigation}
    />

    <View style={styles.footer}>
      <View style={styles.heartcontainer}>
        <Image
          source={require('../../assets/icons/heart-ol.png')}
          style={{ height:30,width:30 }}
        />
      </View>
        <TouchableOpacity style={styles.cartbutton}>
          <Text style={styles.checkoutButtonText}>View in cart</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default Supplydetails

const styles = StyleSheet.create({
  checkoutButtonText: {
    color: '#fff',
    fontFamily:FONT.bold,
    fontSize:SIZES.large,
  },
  cartbutton:{
    height:50,
    width:250,
    backgroundColor:COLORS.one,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:50
  },
  heartcontainer:{
    height:50,
    width:50,
    backgroundColor:'rgb(255, 222, 173)',
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:30
  },
  footer:{
    position:'absolute',
    bottom:0,
    marginBottom:20,
    flexDirection:'row'
  },
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
    fontFamily:FONT.bold,
    fontSize:SIZES.xxLarge,
  },
  price:{
    fontSize:SIZES.large,
    fontFamily:FONT.bold,
    color:COLORS.one,
    marginTop:10,
  },
  description:{
    fontSize:15,
    fontFamily:FONT.regular,
    textAlign:'left',
    marginTop:10,
  },
  quantity:{
    flex:1,
    maxHeight:80,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginTop:20,
    borderColor:COLORS.one,
    borderWidth:2,
    padding:10
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
  },
  quantityheaderbox:{
    marginTop:20,
  },
  quantityheader:{
    fontSize:SIZES.large,
    fontFamily:FONT.regular,
  },
  itemlength:{
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    color: COLORS.lightWhite,
  },

});