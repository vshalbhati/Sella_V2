import {Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Image, StyleSheet} from 'react-native';
import {Stack, useRouter, useSearchParams} from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {COLORS, icons, images, SIZES} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../features/userSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';



const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: COLORS.white,
  },
  image: {
    height: 50,
    width:50,
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
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
  text: {
    fontSize: 16,
  },
  continer: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    marginVertical: SIZES.medium,
    left:0,
  },
  item: {
    flexDirection: 'row',
    gap: 20,
    backgroundColor: COLORS.lightWhite,
    padding: 10,
    borderRadius: 20,
    margin: 20,
    height: 90,
    borderWidth: 1,
    borderColor: 'black',
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
});


const Account = ({navigation}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user);
    const defaultImageSource = 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png';


    const handleRemoveUser = async () => {
      try {
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('@user');
        dispatch(clearUser()); 
        navigation.navigate('login'); 
      } catch (error) {
        console.log('Error removing user info from AsyncStorage:', error);
      }
    };

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

      <View style={{marginTop:100,width:'90%',justifyContent:'center',alignSelf:'center'}}>

        
      <View style={{position: 'relative',justifyContent:'center'}}>
      <View style={{height: 1,backgroundColor: 'black',marginVertical: 10,}} />
      <Text style={{position: 'absolute',top: -10,backgroundColor: COLORS.white, paddingHorizontal: 10,alignSelf:'center',fontSize:20}}>Profile</Text>
      </View>

      <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('userdetails')}>
        <Image
            source={{ uri: userInfo?.picture || defaultImageSource }}
            style={styles.image}
      />
        <View style={{flexDirection:'column'}}>
        <Text style={styles.text}>{ userInfo?.name || 'Guest User'}</Text>
        <Text style={styles.text}>8572862193</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> navigation.navigate('orders')} style={styles.item}>
        <View style={{flexDirection:'row',gap:20}}>
        <Icon name='shopping-cart' size={30} color={COLORS.gray} />
        <Text style={styles.text}>My Orders</Text>
        </View>
      </TouchableOpacity>

      <View style={{position: 'relative',justifyContent:'center',marginVertical: 10,}}>
      <View style={{height: 1,backgroundColor: 'black',marginVertical: 10,}} />
      <Text style={{position: 'absolute',top: -10,backgroundColor: COLORS.white, paddingHorizontal: 10,alignSelf:'center',fontSize:20}}>Settings</Text>
      </View>

      <View style={styles.item}>
        <View style={{flexDirection:'row',gap:20}}>
        <Icon name="language" size={30} color={COLORS.gray} />
        <Text style={styles.text}>Change Language</Text>
        </View>
      </View>
      <View style={styles.item}>
        <View style={{flexDirection:'row',gap:20}}>
        <Icon name="mail" size={30} color={COLORS.gray} />
        <Text style={styles.text}>Contact Us</Text>
        </View>
      </View>
      <View style={styles.item}>
        <View style={{flexDirection:'row',gap:20}}>
        <Icon name="description" size={30} color={COLORS.gray}/>
        <Text style={styles.text}>Terms and Policies</Text>
        </View>
      </View>
    </View>
    <Text 
    style={{color: 'red', paddingHorizontal: 10,alignSelf:'center',fontSize:25,paddingVertical: 10}}
    onPress={()=> handleRemoveUser()}>
      LogOut?
    </Text>
    </SafeAreaView>
  )
}



export default Account


// https://auth.expo.io
// https://auth.expo.io/@vshalbhati_294/sella