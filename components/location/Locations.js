import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import { FONT, SIZES, COLORS} from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoocation } from '../../features/locationSlice';



const Locations = ({navigation}) => {
    const dispatch = useDispatch();
    const locationInfo = useSelector((state) => state.location);
    const [dataArray, setDataArray] = useState([]);
    const [selected, setSelected] = useState(-1);

    useEffect(() => {
      fetchArrayFromStorage();
    }, []);
  
    const fetchArrayFromStorage = async () => {
      try {
        const serializedArray = await AsyncStorage.getItem('arrayKey');
        if (serializedArray !== null) {
          const array = JSON.parse(serializedArray);
          setDataArray(array);
        } else {
          setDataArray([]);
        }
      } catch (error) {
        console.log('Error fetching array:', error);
      }
    };

    const deleteItemFromArray = async (index) => {
      try {
        const updatedArray = dataArray.filter((_, i) => i !== index);
        setDataArray(updatedArray);
        await AsyncStorage.setItem('arrayKey', JSON.stringify(updatedArray));
      } catch (error) {
        console.log('Error deleting item:', error);
      }
    };

    const adressa =(index)=>{
        dispatch(setLoocation(dataArray[index]));
        setSelected(index)
    }

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
                        {locationInfo.location.length>0? locationInfo.location : `You haven't added any location`}
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
        {dataArray.map((address, index) => (
            <TouchableOpacity key={index} style={styles.addresscard} onPress={()=>adressa(index)}>
            <View style={[styles.radiogola,{backgroundColor:selected===index?COLORS.one:COLORS.lightWhite}]}/>
            <View style={{width:'80%'}}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={{fontFamily:FONT.regular,fontSize:SIZES.medium,margin:10,marginRight:10}}>{address}</Text>
            </View>
            <TouchableOpacity onPress={async()=>await deleteItemFromArray(index)}>
              <Icon
              name='delete'
              size={20}
              />
            </TouchableOpacity>
            </TouchableOpacity>
      ))}
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
    addresscard:{
        backgroundColor:COLORS.lightWhite,
        height:70,
        borderRadius:10,
        marginVertical:6,
        width:'95%',
        elevation:5,
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center'
    },
    radiogola:{
        height:15,
        width:15,
        borderRadius:10,
        borderWidth:1,
        borderColor:COLORS.gray,
        margin:10

    }
})