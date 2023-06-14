import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, UIManager, findNodeHandle } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';



const UserDetails = ({navigation}) => {
    const userInfo = useSelector((state) => state.user);
    const textRef = React.useRef(null);
    const defaultImageSource = 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png';
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
        <View style={styles.upardabba}>
            <Image
            style={{height:300,position:'absolute',zIndex:-1}}
            source={require('../../../assets/images/back.jpg')}
            />
            <Image
            source={{ uri: userInfo?.picture || defaultImageSource }}
            style={styles.image}
            />
            
        </View> 


        <View style={{marginTop:30,width:'90%',justifyContent:'center',alignSelf:'center'}}>
            <View style={{position: 'relative',justifyContent:'center',marginTop:50}}>
                <View style={{height: 1,backgroundColor: 'black',marginVertical: 10,}} />
                <Text style={styles.text}>
                    { userInfo?.name || 'Guest User'}
                </Text>
            </View>
            <View style={{position: 'relative',justifyContent:'center',marginTop:50}}>
                <View style={{height: 1,backgroundColor: 'black',marginVertical: 10,}} />
                <Text style={styles.text}>
                    8572862193
                </Text>
            </View>
            <View style={{position: 'relative',justifyContent:'center',marginTop:50}}>
                <View style={{height: 1,backgroundColor: 'black',marginVertical: 10,}} />
                <Text style={styles.email}>
                    { userInfo?.email || 'guest@construck.com'}
                </Text>
            </View>
        </View>
            
            
    </SafeAreaView>
  )
}

export default UserDetails

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLORS.white,
    },
    image: {
        height: 150,
        width:150,
        resizeMode: 'cover',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#000',
        position:'absolute',
        alignSelf:'center',
        marginTop:200,
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
    upardabba:{
        height:300,
        elevation:5,
    },
    text: {
        position: 'absolute',
        top: -6,
        backgroundColor: COLORS.two,
        paddingHorizontal: 10,
        alignSelf:'center',
        fontSize:22,   
        width:'50%' ,
        textAlign:'center',
        borderRadius:50, 
        color:COLORS.lightWhite
    },
    email: {
        position: 'absolute',
        top: -4,
        backgroundColor: COLORS.two,
        paddingHorizontal: 10,
        alignSelf:'center',
        fontSize:20,   
        width:'80%' ,
        textAlign:'center',
        borderRadius:50, 
        color:COLORS.lightWhite
    },

})