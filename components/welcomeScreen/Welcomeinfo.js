import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES } from '../../constants'

const Welcomeinfo = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
        <View style={{height:500,width:'100%',backgroundColor:COLORS.one,justifyContent:'center',alignItems:'center'}}>
            <Image
                source={require('../../assets/images/name.jpg')}
                style={styles.badimage}
            />
        </View>
        <View style={{marginTop:20}}>
            <Text style={{textAlign:'center',fontFamily:FONT.bold,fontSize:SIZES.xxLarge}}>CONSTRUCK</Text>
        </View>
        <View style={{margin:20,marginTop:40}}>
            <Text style={{fontFamily:FONT.medium,fontSize:SIZES.medium}}>Bhai pata nhi kya likhna hai yaha pe me to bas likhe ja rha hu baki sab dekha jayega. Yoooo bro who let em cook!</Text>
        </View>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('login')}>
                <Text style={{fontFamily:FONT.medium,fontSize:SIZES.medium,color:COLORS.white}}>LET'S CONTINUE</Text>
            </TouchableOpacity>
    
    </SafeAreaView>
  )
}

export default Welcomeinfo

const styles = StyleSheet.create({
    badimage:{
        height:80,
        width:'90%'
    },
    button:{
        backgroundColor:COLORS.one, 
        height:50,
        width:'80%',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderRadius:10,
        position:'absolute',
        bottom:0,
        marginBottom:50
    }
})