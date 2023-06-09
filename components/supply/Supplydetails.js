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



const styles = StyleSheet.create({
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:'rgba(255,255,255,0.6)',
    borderRadius:50, 
    zIndex:1,
    marginTop:30,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
  },
  gola:{
    height:40,
    width:40,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
  },
  backgroundImage:{
    flex:1,
  },
  container:{
    flex:1,
  },
  name:{
    fontSize:22,
    fontWeight:"400", 
    textAlign:'center',
    color:COLORS.lightWhite
  },
  name_card:{
    width:150,
    height:50,
    borderRadius:10,
    backgroundColor:'#EC6170',
    justifyContent:'center',
    alignItems:'center',
  },
  price:{
    fontSize:22,
    color:COLORS.tertiary,
    textAlign:'center'
  },
  price_card:{
    width:150,
    height:50,
    borderRadius:10,
    backgroundColor:'#EBF1F1',
    justifyContent:'center',
    alignItems:'center',
  },
  description:{
    fontSize:22,
    fontWeight:"200",
    textAlign:'center'
  },
  desc_card:{
    width:'40%',
    height:120,
    borderRadius:10,
    backgroundColor:'#EBF1F1',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginTop:50
  },
  quantity:{
    flex:1,
    width:'80%',
    maxHeight:120,
    borderRadius:10,
    backgroundColor:'#EC6170',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    marginTop:50,
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
  // const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1682685797743-3a7b6b8d8149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
  // const [buttonColor, setButtonColor] = useState(null);

  // const handleImageLoad = async () => {
  //   try {
  //     const colors = await ImageColors.getColors(backgroundImage, {
  //       fallback: '#000000', // Fallback color in case extraction fails
  //       quality: 'low', // Choose between 'high', 'medium', or 'low'
  //     });
  //     setButtonColor(colors.dominantColor);
  //     console.log(colors.dominantColor) // Access the desired color value from the extracted colors
  //   } catch (error) {
  //     console.error('Error extracting color:', error);
  //   }
  // };


  return (
    <ImageBackground
    source={{uri: urlFor(imgurl).url()}}
    // source={{ uri: backgroundImage }}
    style={styles.backgroundImage}
    resizeMode="cover"
    // onLoad={handleImageLoad}
    >
    <SafeAreaView style={styles.container}>
    <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)','rgba(0,0,0,1)']} style={styles.container}>
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
      {/* <Image
      source={{uri: urlFor(imgurl).url()}}
      style={{height:(600),width:'100%',zIndex:-1}}
      /> */}
      <View style={{flex:1,marginTop:200}}>
        <View style={{flexDirection:'row',gap:20,justifyContent:'center'}}>
          <View style={{gap:20,marginTop:50,flexDirection:'column'}}>
            <View style={styles.name_card}>
              <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.price_card}>
              <Text style={styles.price}>₹{price}/pc</Text>
            </View>
          </View>
          <View style={styles.desc_card}>
            <Text style={styles.description}>{short_description}</Text>
          </View>
        </View>

        <View style={styles.quantity}>
          <View style={{justifyContent:'center',alignItems:'center',}}>
          <Text style={{fontSize:22,textAlign:'center',color:COLORS.lightWhite}}>Choose the quantity</Text>
          <View style={{flex:1, flexDirection:'row',alignSelf:'center'}}>
          <TouchableOpacity style={[styles.gola,{backgroundColor:COLORS.one}]}>
          <Icon
            name='add'
            size={28}
            onPress={()=> addbill()}
            color={'white'}
          />
          </TouchableOpacity>
              <Text style={{ fontSize:24,fontWeight:'bold',paddingLeft:10,paddingRight:10,color:COLORS.lightWhite}}>{items.length}</Text>
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
    </ScrollView>
    <Crateicon
    navigation={navigation}
    />
    </LinearGradient>
    </SafeAreaView>
    </ImageBackground>
  )
}

export default Supplydetails