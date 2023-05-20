import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, icons, images, SIZES} from '../constants';



const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    backgroundImage: {
      position: 'absolute',
    },
    textBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      padding: 20,
      borderRadius:10
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      justifyContent: 'center',
      textAlign:'center'
    },
    backArrow:{
      height:40,
      width:40, 
      backgroundColor:COLORS.one,
      borderRadius:50, 
      zIndex:1,
      marginTop:30,
      marginLeft:10,
      justifyContent:'center',
      alignItems:'center',
    },
  });
  
const Searchresults = ({name, short_description,price,imgurl,navigation}) => {
  return (
    <ScrollView contentContainerStyle={{ height }}>
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
    <View style={styles.container}>
  <Image
    source={require('../assets/images/back.jpg')}
    style={styles.backgroundImage}
  />

  <View style={styles.textBox}>
    <Text style={styles.text}>{name}</Text>
  </View>
  <View style={styles.textBox}>

  <Text style={styles.text}>{short_description}</Text>
  </View>
  <View style={styles.textBox}>

    <Text style={styles.text}>₹{price}</Text>
    </View>
</View>
</ScrollView>

  )
}

export default Searchresults