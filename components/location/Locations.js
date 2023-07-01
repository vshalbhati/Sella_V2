import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FONT, SIZES, COLORS} from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';



const Locations = ({navigation}) => {
    const locationInfo = useSelector((state) => state.location);

  return (
    <SafeAreaView style={{flex:1}}>
        <View style={{flexDirection:'row',gap:20,alignItems:'center',margin:10,marginTop:40}}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image
                source={require('../../assets/icons/chevron-left.png')}
                style={{height:30,width:30}}
                />
            </TouchableOpacity>
            <Text style={{fontFamily:FONT.medium,fontSize:SIZES.xLarge}}>Select Location</Text>
        </View>

        <View style={{margin:20,padding:10}}>
            <TouchableOpacity onPress={()=>navigation.goBack()} style={{flexDirection:'row',gap:20,alignItems:'center',marginBottom:20}}>
                <Image
                source={require('../../assets/icons/location.png')}
                style={{height:30,width:30}}
                />
                <View>
                    <Text>Use Current Location</Text>
                    <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">
                        {locationInfo.location.length>0? locationInfo.location : 'dnhcjedsfncnedjdjcnejs'}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('location')} style={{flexDirection:'row',gap:20,alignItems:'center',marginBottom:20}}>
                <Icon 
                    name='add'
                    size={30} 
                    color={COLORS.gray}
                />
                <View>
                    <Text>Add Address</Text>
                </View>
            </TouchableOpacity>
        </View>

        <Text style={{fontFamily:FONT.medium,fontSize:SIZES.xLarge,marginLeft:10}}>Recent Locations</Text>

    </SafeAreaView>
  )
}

export default Locations

const styles = StyleSheet.create({
    addressText:{
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        marginTop: 2,
      },
})