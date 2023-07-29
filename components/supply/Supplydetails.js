import { View, Text, ScrollView, FlatList, StyleSheet, Image,ImageBackground ,Dimensions,TextInput} from 'react-native'
import { useState, useEffect } from 'react';
import createClient, { urlFor } from '../../sanity';
import { COLORS, FONT, SIZES, Darkmode } from '../../constants';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../../features/basketSlice';
import Crateicon from '../cart/Crateicon';
import { setSupply } from '../../features/supplyslice';
import { SafeAreaView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';





const Supplydetails = ({navigation}) => {
  const route = useRoute();
  const { id, imgurl, name, short_description ,price,measure,minimum,zone} = route.params;
  const dispatch = useDispatch();
  const items = useSelector(state => selectBasketItemsWithId(state, id));
  const [supplyImages, setSupplyImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemquantity, setItemQuantity]= useState(items.length);
  const [trucks, setTrucks] = useState(null)
  const [liked, setLiked] = useState(false)
  const [showMessage, setShowMessage] = useState(true);
  const darkmode = useSelector((state) => state.darkmode.darkmode);


  const calculateTrucks =()=>{
    setTrucks(Math.ceil(itemquantity /3 ));
  }
  const addbill=(key)=>{
    dispatch(addToBasket({id, name, short_description, imgurl, price, measure,minimum,zone}))
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 4000);

    return () => clearTimeout(timer); 
  }, []);

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

      <TouchableOpacity style={styles.heartcontainer} onPress={()=>setLiked(!liked)}>
        <Icon name="favorite" color={liked?COLORS.tertiary:COLORS.gray2} size={24} />
      </TouchableOpacity> 
      {liked && showMessage &&(
        <View style={{position:'absolute',top:0,marginTop:80,width:'80%',height:30,backgroundColor:COLORS.gray,borderRadius:20,justifyContent:'center',alignSelf:'center'}}>
          <Text style={{color:COLORS.white,textAlign:'center'}}>{name} has been added to wishlist</Text>
        </View>
      )}
      

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



      <View style={[styles.infocard,{backgroundColor:darkmode?Darkmode.white:COLORS.lightWhite,}]}>
        <View style={styles.textcontent}>
            <Text style={[styles.name,{color:darkmode&&COLORS.one}]}>{name}</Text>
            <Text style={[styles.description,{color:darkmode&&COLORS.gray2}]}>{short_description}</Text>
            <Text style={styles.price}>₹{price} <Text style={{fontSize:SIZES.medium,fontFamily:FONT.medium}}>/{minimum}{measure}</Text></Text>
        </View>


        <View style={styles.quantityheaderbox}>
          <Text style={[styles.quantityheader,{color:darkmode&&COLORS.gray2}]}>Select the quantity</Text>
          <View style={{height:3,width:175,backgroundColor:COLORS.one,marginTop:5}}/>
        </View>


        <View style={styles.quantity}>
          <View style={{justifyContent:'center',alignItems:'center', flexDirection:'row'}}>
            <Text style={{fontSize:22,textAlign:'center',color:darkmode?COLORS.gray2:COLORS.primary,marginLeft:20}}>{measure}(s)</Text>
            <View style={{ flexDirection:'row',alignSelf:'center',marginLeft:100}}>
              <TouchableOpacity style={[styles.gola,{backgroundColor:COLORS.one}]}>
              <Icon
                name='add'
                size={28}
                onPress={()=> addbill()}
                color={'white'}
              />
              </TouchableOpacity>
                  <Text style={{ fontSize:24,fontWeight:'bold',paddingLeft:20,paddingRight:20,color:darkmode?COLORS.gray2:COLORS.primary}}>{items.length*minimum}</Text>
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
          <Icon name='local-shipping' size={24} color={COLORS.gray}/>
          <Text style={{ fontSize:16,fontWeight:'bold',color:darkmode?COLORS.gray2:COLORS.primary}}> x {Math.floor(items.length /2 )} {items.length%2!=0 && (<Text> (One truck will be half loaded)</Text>)}</Text>
        </View>
      </View>


    <Crateicon
    navigation={navigation}
    />

    {/* <View style={styles.footer}>
      <View style={styles.heartcontainer}>
        <Image
          source={require('../../assets/icons/heart-ol.png')}
          style={{ height:30,width:30 }}
        />
      </View>
        <TouchableOpacity style={styles.cartbutton}>
          <Text style={styles.checkoutButtonText}>View in cart</Text>
        </TouchableOpacity>
    </View> */}
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
    height:40,
    width:40,
    backgroundColor:COLORS.lightWhite,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,
    marginRight:10,
    position:'absolute',
    right:0,
    elevation:5
  },
  footer:{
    position:'absolute',
    bottom:0,
    marginBottom:10,
    flexDirection:'row'
  },
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:COLORS.white,
    borderRadius:50, 
    marginTop:40,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    left:0,
    zIndex:1,
    elevation:5

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
    marginTop:10,
    color:COLORS.one
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
    marginBottom:505,
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