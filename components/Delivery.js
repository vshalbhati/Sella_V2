import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants';

const styles = StyleSheet.create({
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:COLORS.one,
    borderRadius:50, 
    position:'absolute',
    zIndex:2,
    marginTop:30,
    marginLeft:8,
    justifyContent:'center',
    alignItems:'center',
  }
});

const Delivery = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name='arrow-back'
            size={28}
            color={COLORS.lightWhite}
            onPress={() => navigation.navigate('home')}
          />      
        </TouchableOpacity>
      </View>
      <Text>This is hte delivery page</Text>
    </SafeAreaView>
  )
}

export default Delivery