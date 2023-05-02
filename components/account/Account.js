import {Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl, Image, StyleSheet} from 'react-native';
import {Stack, useRouter, useSearchParams} from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {COLORS, icons, images, SIZES} from '../../constants';
import '../../assets/images/kemal.jpeg'
import ScreenHeaderBtn from '../common/header/ScreenHeaderBtn';



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
    width: 100,
    height: 100,
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
                dimension="60%"
                handlePress={() => router.back()}
                />
            ),
            headerRight:()=>(
                <ScreenHeaderBtn
                iconUrl={icons.share}
                dimension="60%"
                />
            ),
            headerTitle:''
        }}
        />
      <Image
        source={require('../../assets/images/kemal.jpeg')}
        style={styles.image}
      /> 
      <Text style={styles.text}>Anya Forger</Text>
      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('signin')}>
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