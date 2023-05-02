import { View, Text, ScrollView, FlatList, StyleSheet, Image } from 'react-native'
import { useState, useEffect } from 'react';
import createClient, { urlFor } from '../sanity';
import { COLORS, FONT, SIZES } from '../constants';
import { useParams } from 'react-router-dom';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:"rgba(255,255,255,0.6)",
    padding:5, 
    borderRadius:50, 
    position:"fixed",
    zIndex:2,
    marginTop:8,
    marginLeft:8,
  },
  name:{
    flex: 1,
    fontSize: 34, 
    fontWeight: 'bold', 
    color: '#333',
    padding:8
  },
  description:{
    flex: 1, 
    fontSize: 18,  
    color: '#333',
    padding:8
  },
  gola:{
    height:40,
    width:40,
    backgroundColor:"rgba(0,255,0,0.5)",
    borderRadius:50,
    padding:6
  },
  cartbar:{
    height:50,
    width:"90%",
    marginLeft:20,
    marginBottom:10,
    backgroundColor:"orange",
    position:"fixed",
    bottom:0,
    borderRadius:10,
    display:"block",
    flex:1,
    flexDirection:'row',
    color:COLORS.lightWhite,
    fontSize:24
  }
});

const Supplydetails = ({navigation}) => {
  const route = useRoute();
  const { id, imgurl, name, short_description ,supplies} = route.params;

  return (
    <ScrollView>
      <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name="arrow-back"
            size={28}
            onPress={() => navigation.goBack()}
          />      
        </TouchableOpacity>
      </View>
      <Image
      source={{uri: urlFor(imgurl).url()}}
      style={{ width: "100%", height: 200 }}
      />
      <Text>{id}</Text>
    </ScrollView>
  )
}

export default Supplydetails