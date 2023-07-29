import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, FONT, SIZES } from '../../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { setUser } from '../../../features/userSlice';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserDetails = ({navigation}) => {
    const userInfo = useSelector((state) => state.user);
    const phoneUserInfo = useSelector((state) =>state.phoneUser);
    const locationInfo = useSelector((state) => state.location);
    const textRef = React.useRef(null);
    const defaultImageSource = 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png';
    const dispatch = useDispatch();

    React.useEffect(() => {
        (async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission denied');
          }
        })();
      }, []);
      
    const handleImageSelection = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            const selectedImage = result.uri;
            await AsyncStorage.setItem('selectedImageURI', selectedImage);
            dispatch(setUser({ picture: selectedImage }));        
        }
    };

    const [asyncusername, setAsyncUserName] = useState(null);
    const [asyncusernumber, setAsyncUserNumber] = useState(null);
    const [asyncuserEmail, setAsyncUserEmail] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('phoneUser');

        if (data) {
          const { name, phoneNumber, email } = JSON.parse(data);
          setAsyncUserName(name);
          setAsyncUserNumber(phoneNumber);
          setAsyncUserEmail(email);
        }
      } catch (error) {
        console.log('Error occurred while fetching data:', error);
      }
    };
    fetchData();
  }, []);

      

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name='arrow-back'
            size={28}
            color={COLORS.one}
            onPress={() => navigation.goBack()}
          />      
        </TouchableOpacity>
      </View>
        <View style={styles.upardabba}>
            <Image
            style={{height:300,width:'100%',position:'absolute',zIndex:-1}}
            source={require('../../../assets/images/orangeback.jpg')}
            />
            <Image
            source={{ uri: userInfo?.picture || defaultImageSource }}
            style={styles.image}
            />
            <TouchableOpacity style={styles.cameracontainer}>
                <Icon
                    name='camera'
                    size={34}
                    color={COLORS.white}
                    onPress={handleImageSelection}
                />
            </TouchableOpacity>
            
        </View> 


        <View style={styles.infocontainer}>
            <View style={[styles.cameracontainer,{marginTop:10,marginLeft:310}]}>
                <Icon
                    name='edit'
                    size={28}
                    color={COLORS.white}
                    onPress={() => navigation.navigate('edituser')}

                />
            </View>
                <View>
                    <Text >Name</Text>
                    <Text style={styles.text}>
                        { userInfo?.name|| phoneUserInfo.user?.name || asyncusername || 'Guest User'}
                    </Text>
                </View>
                
                <View>
                    <Text >Contact Number</Text>
                    <Text style={styles.text}>
                    {phoneUserInfo.user?.phoneNumber || asyncusernumber || 'Add phone number'}
                    </Text>
                </View>

                <View>
                    <Text >Contact Email</Text>
                    <Text style={styles.text}>
                        { userInfo?.email || asyncuserEmail || phoneUserInfo.user?.email || 'guest@construck.com'}
                    </Text>
                </View>

                <View>
                    <Text >Delivery Address</Text>
                    <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{locationInfo.location.length>0? locationInfo.location : 'Desho me desh hai haryana'}</Text>
                </View>
        </View>

        <Text style={[styles.text,{textAlign:'center',marginBottom:0}]}>Your Stats</Text>
        <View style={[styles.infocontainer,{marginTop:10,height:170,}]}>
            <View >
                <Text>You are just 1 purchase away from getting a 20% discount</Text>
                <Text style={{textAlign:'right'}}>67%</Text>
                <Progress.Bar size={30} color={COLORS.one} width={300} progress={0.67} style={{marginTop:10}}/>
                {/* <Progress.Circle size={30} progress={0.67} /> */}
            </View>
        </View>
            
            
    </SafeAreaView>
  )
}

export default UserDetails

const styles = StyleSheet.create({
    cameracontainer:{
        height:50,
        width:50,
        borderRadius:50,
        backgroundColor:COLORS.one,
        zIndex:1,
        position:'absolute',
        left:0,
        marginLeft:240,
        marginTop:200,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 1,
        borderColor: COLORS.white,
    },
    infocontainer:{
        width:'90%',
        alignSelf:'center',
        height:300,
        backgroundColor:COLORS.lightWhite,
        elevation:5,
        borderRadius:20,
        padding:30,
        marginBottom:20,
    },
    container: {
        flex:1,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    image: {
        height: 150,
        width:150,
        resizeMode: 'cover',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: COLORS.white,
        position:'absolute',
        alignSelf:'center',
        marginTop:100,
    },
    backArrow:{
        height:40,
        width:40, 
        backgroundColor:'rgba(255,255,255,0.9)',
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
    upardabba:{
        height:300,
        elevation:5,
    },
    text: {
        fontFamily:FONT.medium,
        fontSize:SIZES.medium,
        marginBottom:20
    },


})