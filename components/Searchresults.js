import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      position: 'absolute',
      width: '100%',
      height: height,
      zIndex:-1,
    },
    textBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      padding: 20,
      borderRadius:10
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });
  

const Searchresults = ({name, short_description,price,imgurl}) => {
  return (
    <ScrollView contentContainerStyle={{ height }}>
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

    <Text style={styles.text}>{price}</Text>
    </View>
</View>
</ScrollView>

  )
}

export default Searchresults