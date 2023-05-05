import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { COLORS, FONT, SIZES } from '../constants';
import CurrencyFormat from 'react-currency-format';


const style = StyleSheet.create({
    container:{
        flex: 1,
        width:'90%',
        marginBottom:10,
        backgroundColor:COLORS.one,
        position:'absolute',
        bottom:0,
        borderRadius:10,
        alignSelf:'center',
        flexDirection:'row',
        zIndex:1,
    },
    curr:{
        color:'white',
        fontSize:24,
        fontWeight:'bold',
        paddingRight:5    
    }
})
const Crateicon = ({navigation}) => {
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);

    if(items.length === 0) return null;
  return (
    <View style={[style.container, {display:items.length>0 ?'block': 'none'}]}>
        <TouchableOpacity
         style={{flex:1,flexDirection:'row',gap:10,alignItems:'center',padding:4}}
         onPress={() => navigation.navigate('cart')}
        >
        <Text style={{color:COLORS.lightWhite, fontWeight:'extrabold', fontSize:24, paddingLeft:5}}>{items.length}</Text>
        <Text style={{flex:1, color:COLORS.lightWhite, textAlign:'center'}}>View Crate</Text>
        <Text style={style.curr}>
            <Text>
            <CurrencyFormat value={basketTotal} displayType={'text'} prefix={'₹'}/>
            </Text>
        </Text>
        </TouchableOpacity>
    </View>
  )
}

export default Crateicon