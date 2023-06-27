import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React,{useState} from 'react'
import { useRoute } from '@react-navigation/native';
import { COLORS, FONT, SIZES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setPhoneUser } from '../../features/phoneUserSlice';

const Nameinfo = ({navigation}) => {
    const route = useRoute();
    const {phoneNumber } = route.params;

    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handlePress=()=>{
        if(!name || !email){
            Alert.alert('Please fill all the fields!')
        }else{
            dispatch(setPhoneUser({ name,phoneNumber, email}));
            navigation.navigate('home')
        }
    }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
        <View style={{height:450,width:'100%',backgroundColor:COLORS.one,justifyContent:'center',alignItems:'center'}}>
            <Image
                source={require('../../assets/images/working.png')}
                style={styles.badimage}
            />
        </View>
        <View style={{marginTop:20}}>
            <Text style={{textAlign:'center',fontFamily:FONT.bold,fontSize:SIZES.xLarge}}>Tell us about you!</Text>
        </View>
        <View style={{marginTop:30}}>
            <Text style={styles.text}>Your name</Text>
            <TextInput
                placeholder='your name'
                style={styles.inputContainer}
                onChangeText={(text) =>{setName(text)}}
            />
        </View>
        
        <View>
            <Text style={styles.text}>Your email</Text>
            <TextInput
                placeholder='your email'
                style={styles.inputContainer}
                onChangeText={(text) =>{setEmail(text)}}
            />
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={{fontFamily:FONT.medium,fontSize:SIZES.medium,color:COLORS.white}}>LET'S CONTINUE</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Nameinfo

const styles = StyleSheet.create({
    badimage:{
        height:400,
        width:'90%'
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