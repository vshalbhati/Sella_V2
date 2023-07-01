import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES } from '../../constants'
import {LinearGradient} from 'expo-linear-gradient';

const Welcomeinfo = ({navigation}) => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
        <LinearGradient
            colors={['#FFFD37', '#F4C430']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >
            <View style={styles.imgcontainer}>
                <Image
                    source={require('../../assets/images/apinfo.jpg')}
                    style={styles.badimage}
                />
            </View>
            
        <View style={{marginTop:20}}>
            <Text style={{textAlign:'center',fontFamily:FONT.bold,fontSize:SIZES.xxLarge,color:COLORS.secondary}}>CONSTRUCK</Text>
        </View>
        <View style={{margin:90,marginTop:40}}>
            <Text style={{fontFamily:FONT.medium,fontSize:SIZES.medium,textAlign:'center',color:COLORS.secondary}}>"Building success at your fingertips!"</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('login')}>
            <Text style={{fontFamily:FONT.bold,fontSize:SIZES.medium,color:COLORS.white}}>Let's Continue !</Text>
        </TouchableOpacity>
        </LinearGradient>
    </SafeAreaView>
  )
}

export default Welcomeinfo

const styles = StyleSheet.create({
    imgcontainer:{
        height:300,
        width:300,
        borderRadius:200,
        justifyContent:'center',
        alignSelf:'center',
        backgroundColor:COLORS.white,
        overflow:'hidden',
        marginBottom:50,
        marginTop:190
    },
    badimage:{
        height:300,
        width:300
    },
    button:{
        backgroundColor:COLORS.secondary, 
        height:50,
        width:'60%',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        borderRadius:10,
        marginBottom:50
    }
})