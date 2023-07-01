import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONT, SIZES } from '../../../constants';
import { setPhoneUser } from '../../../features/phoneUserSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';




const EditUser = ({navigation}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const phoneUserInfo = useSelector((state) =>state.phoneUser);
  const userInfo = useSelector((state) => state.user);


  const handlePress=()=>{
    if(!name || !email){
        Alert.alert('Please fill all the fields!')
    }else{
      if(phoneUserInfo.user?.phoneNumber){
        dispatch(setPhoneUser({ name:name, email:email,phoneNumber:phoneUserInfo.user?.phoneNumber}));
      }
      else{
        dispatch(setPhoneUser({ name:name, email:email, phoneNumber:phoneNumber}));
      }
        navigation.goBack();
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name='arrow-back'
            size={28}
            color={'rgba(255,255,255,0.9)'}
            onPress={() => navigation.goBack()}
          />      
        </TouchableOpacity>
      </View>
        <View style={{marginTop:90}}>
            <Text style={styles.text}>Your name</Text>
            <TextInput
                placeholder={ userInfo?.name|| phoneUserInfo.user?.name || 'Guest User'}
                style={styles.inputContainer}
                onChangeText={(text) =>{setName(text)}}
            />
        </View>
        
        <View>
            <Text style={styles.text}>Your email</Text>
            <TextInput
                placeholder={ userInfo?.email || phoneUserInfo.user?.email || 'guest@construck.com'}
                style={styles.inputContainer}
                onChangeText={(text) =>{setEmail(text)}}
            />
        </View>

        <View>
            <Text style={styles.text}>Your phone number</Text>
            <TextInput
                placeholder={phoneUserInfo.user?.phoneNumber || 'Add phone number'}
                style={styles.inputContainer}
                onChangeText={(text) =>{setphoneNumber(text)}}
                editable={!phoneUserInfo.user?.phoneNumber}
            />
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={{fontFamily:FONT.medium,fontSize:SIZES.medium,color:COLORS.white}}>LET'S CONTINUE</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default EditUser

const styles = StyleSheet.create({
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:COLORS.one,
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
inputContainer:{
    backgroundColor:COLORS.gray2, 
    height:50,
    width:'80%',
    justifyContent:'center',
    alignSelf:'center',
    borderRadius:10,
    margin:10,
    paddingHorizontal: 16,
},
button:{
    backgroundColor:COLORS.one, 
    height:50,
    width:'80%',
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    borderRadius:10,
    marginTop:50
},
text:{
    fontFamily:FONT.medium,
    fontSize:SIZES.medium,
    marginLeft:40
},
})