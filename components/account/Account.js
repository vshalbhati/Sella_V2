import {Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Image, StyleSheet} from 'react-native';
import {Stack, useRouter, useSearchParams} from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {COLORS, icons, images, SIZES, Darkmode} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../features/userSlice';
import { clearPhoneUser } from '../../features/phoneUserSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import { setdarkmode } from '../../features/darkmodeSlice';
import firebase from '../../config/firebase'; // Assuming you named the file 'firebase.js'



const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  image: {
    height: 50,
    width:50,
    resizeMode: 'cover',
    borderRadius: 50,

  },
  backArrow:{
    height:40,
    width:40, 
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
  text: {
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    gap: 20,
    padding: 10,
    borderRadius: 20,
    margin: 20,
    height: 90,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.65,
    shadowRadius: 3.84,
  },
  itemText: {
    fontSize: 18,
  },
  modeButton:{
    height:30,
    width:80, 
    borderRadius:30, 
    marginTop:40,
    marginRight: 20,
    position:'absolute',
    top:0,
    right:0,
    zIndex:1,
    justifyContent:'center',
  }
});


const Account = ({navigation}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user);
    const defaultImageSource = 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png';

    const darkmode = useSelector((state) => state.darkmode.darkmode);
    const [darkmood, setDarkmood] = useState(darkmode);

    const toggleDarkModeHandler = () => {
      setDarkmood(!darkmode);
      dispatch(setdarkmode(!darkmode));
    };


    const handleRemoveUser = async () => {
      try {
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('@user');
        dispatch(clearUser()); 
        dispatch(clearPhoneUser()); 
        navigation.navigate('login'); 
      } catch (error) {
        console.log('Error removing user info from AsyncStorage:', error);
      }
    };
    const phoneUserInfo = useSelector((state) =>state.phoneUser)

  return (
    <SafeAreaView style={[styles.container,{backgroundColor: darkmood?Darkmode.white:COLORS.white,}]}>

      <View style={[styles.backArrow,{backgroundColor: darkmode?Darkmode.gray2:COLORS.tertiary}]}>
        <TouchableOpacity>
          <Icon
            name='arrow-back'
            size={28}
            color={darkmood?Darkmode.lightWhite:COLORS.lightWhite}
            onPress={() => navigation.goBack()}
          />      
        </TouchableOpacity>
      </View>

      <View style={[styles.modeButton,{backgroundColor:darkmood?Darkmode.lightWhite:COLORS.tertiary}]}>
        {darkmood?(
          <TouchableOpacity style={{marginLeft:50}} onPress={toggleDarkModeHandler}>
            <Icon name="brightness-2" size={24} color={COLORS.white} />
          </TouchableOpacity>

        ):(
          <TouchableOpacity style={{marginLeft:10}} onPress={toggleDarkModeHandler}>
            <Icon name="brightness-4" size={24} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>

      <View style={{marginTop:100,width:'90%',justifyContent:'center',alignSelf:'center'}}>

        
      <View style={{position: 'relative',justifyContent:'center'}}>
      <View style={{height: 1,backgroundColor:darkmood?'gray':'black',marginVertical: 10,}} />
      <Text style={{position: 'absolute',top: -10,backgroundColor: darkmood?Darkmode.white:COLORS.white, paddingHorizontal: 10,alignSelf:'center',fontSize:20,color:darkmood?'gray':'black'}}>Profile</Text>
      </View>

      <TouchableOpacity onPress={()=>navigation.navigate('userdetails')} style={[styles.item,{backgroundColor:darkmood?Darkmode.lightWhite:COLORS.lightWhite,}]}>
        <Image
            source={{ uri: userInfo?.picture || defaultImageSource }}
            style={styles.image}
          />
        <View style={{flexDirection:'column'}}>
        <Text style={styles.text}>{ userInfo?.name || phoneUserInfo.user?.name || 'Guest User'}</Text>
        <Text style={styles.text}>{phoneUserInfo.user?.phoneNumber || 'Add phone number'}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> navigation.navigate('orders')} style={[styles.item,{backgroundColor:darkmood?Darkmode.lightWhite:COLORS.lightWhite,}]}>
        <View style={{flexDirection:'row',gap:20}}>
        <Icon name='shopping-cart' size={30} color={!darkmood?'gray':'black'} />
        <Text style={styles.text}>My Orders</Text>
        </View>
      </TouchableOpacity>

      <View style={{position: 'relative',justifyContent:'center',marginVertical: 10,}}>
      <View style={{height: 1,backgroundColor:darkmood?'gray':'black',marginVertical: 10,}} />
      <Text style={{position: 'absolute',top: -10,backgroundColor: darkmood?Darkmode.white:COLORS.white, paddingHorizontal: 10,alignSelf:'center',fontSize:20,color:darkmood?'gray':'black'}}>Settings</Text>
      </View>

      <View style={[styles.item,{backgroundColor:darkmood?Darkmode.lightWhite:COLORS.lightWhite,}]}>
        <View style={{flexDirection:'row',gap:20}}>
        <Icon name="language" size={30} color={!darkmood?'gray':'black'} />
        <Text style={styles.text}>Change Language</Text>
        </View>
      </View>
      <View style={[styles.item,{backgroundColor:darkmood?Darkmode.lightWhite:COLORS.lightWhite,}]}>
        <View style={{flexDirection:'row',gap:20}}>
        <Icon name="mail" size={30} color={!darkmood?'gray':'black'} />
        <Text style={styles.text}>Contact Us</Text>
        </View>
      </View>
      <View style={[styles.item,{backgroundColor:darkmood?Darkmode.lightWhite:COLORS.lightWhite,}]}>
        <View style={{flexDirection:'row',gap:20}}>
        <Icon name="description" size={30} color={!darkmood?'gray':'black'}/>
        <Text style={styles.text}>Terms and Policies</Text>
        </View>
      </View>
    </View>
    <Text 
    style={{color: 'red', paddingHorizontal: 10,alignSelf:'center',fontSize:25,paddingVertical: 10}}
    onPress={()=> handleRemoveUser()}>
      Log out
    </Text>
    </SafeAreaView>
  )
}



export default Account


// https://auth.expo.io
// https://auth.expo.io/@vshalbhati_294/sella