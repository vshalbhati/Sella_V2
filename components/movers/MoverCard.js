import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../constants';
import { useRoute } from '@react-navigation/native';
import createClient, { urlFor } from '../../sanity';




const MoverCard = ({navigation}) => {
  const route = useRoute();
  const { id, imgurl, name, short_description ,price} = route.params;
  return (
    <SafeAreaView>
      <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name='arrow-back'
            size={28}
            onPress={() => navigation.goBack()}
            color={COLORS.lightWhite}
          />      
        </TouchableOpacity>
      </View>
      <Image
      source={{uri: urlFor(imgurl).url()}}
      style={styles.imagi}
      />

      <ScrollView style={styles.info}>

          <View style={styles.name_card}>
            <Text style={styles.name}>{name}</Text>
          </View>
        <Text style={styles.description}>{short_description}</Text>
          <View style={styles.price_card}>
            <Text style={styles.price}>₹{price}/pc</Text>
          </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default MoverCard

const styles = StyleSheet.create({
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:COLORS.tertiary,
    borderRadius:50, 
    zIndex:99,
    marginTop:40,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
  },
  imagi:{
    height:900,
    width:'100%',
    zIndex:-1,
    top:0,
    position:'absolute',
    left:0,
    right:0,
  },
  info:{
    position:'absolute',
    width:'100%',
  },
  name_card:{
    height:100,
    backgroundColor:'rgba(255,255,255,0.6)',
    justifyContent:'center',
    alignItems:'center',
    top:0
  },
  name:{
    fontSize:22,
    fontWeight:"400", 
    textAlign:'center',
    marginTop:40,

  },
  price:{
    fontSize:22,
    color:COLORS.tertiary,
    textAlign:'center'
  },
  description:{
    fontSize:22,
    fontWeight:"200",
    textAlign:'center'
  },

})