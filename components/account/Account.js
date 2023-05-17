import {Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Image, StyleSheet} from 'react-native';
import {Stack, useRouter, useSearchParams} from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {COLORS, icons, images, SIZES} from '../../constants';
import ScreenHeaderBtn from '../common/header/ScreenHeaderBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../features/userSlice';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    padding: SIZES.medium,
    paddingBottom: 100,
    width: 110,
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: SIZES.medium,
  },
  button: {
    padding: SIZES.medium,
    borderRadius: 10,
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  continer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: SIZES.medium,
    marginVertical: SIZES.medium,
    left:0,
  },
  item: {
    paddingVertical: SIZES.small,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
});


const Account = ({navigation}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.user);

    const handleRemoveUser = async () => {
      try {
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('@user');
        dispatch(clearUser()); // Dispatch the clearUser action to remove the user info from Redux
        navigation.navigate('login'); // Navigate back to the login page
      } catch (error) {
        console.log('Error removing user info from AsyncStorage:', error);
      }
    };

  return (
    <SafeAreaView style={styles.container}>
          <Stack.Screen
        options={{
            headerStyle:{backgroundColor: COLORS.lightWhite},
            headerShadowVisible:false,
            headerBackVisible:false,
            headerLeft:()=>(
                <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension='60%'
                handlePress={() => router.back()}
                />
            ),
            headerRight:()=>(
                <ScreenHeaderBtn
                iconUrl={icons.share}
                dimension='60%'
                />
            ),
            headerTitle:''
        }}
        />
      <Image
        source={{ uri: userInfo?.picture }}
        style={styles.image}
      /> 
      <Text style={styles.text}>{JSON.stringify(userInfo?.name,null,2)}</Text>
      <TouchableOpacity style={styles.button} onPress={()=> handleRemoveUser()}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      <View style={styles.continer}>
      <TouchableOpacity style={styles.item} >
        <Text style={styles.itemText}>My Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Terms and Conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Aur Baki Chizein</Text>
      </TouchableOpacity>
    </View>
      
    </SafeAreaView>
  )
}



export default Account