import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, images} from '../../constants';
  
const Searchresults = ({name, short_description,price,imgurl,navigation}) => {
  return (
  <ImageBackground
      source={require('../../assets/images/back.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
    <SafeAreaView>
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
    </SafeAreaView>
   </ImageBackground>

  )
}

export default Searchresults;

const styles = StyleSheet.create({
  backgroundImage: {
    flex:0,
    height:900
  },
  container: {
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  textBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:COLORS.two,
    borderRadius:50, 
    marginTop:30,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
    zIndex:1
  },
  });

