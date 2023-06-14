import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONT} from '../../constants';
import createClient, { urlFor } from '../../sanity';
import { useRoute } from '@react-navigation/native'

  
const Searchresults = ({navigation,name, short_description,price,imgurl}) => {

  return (
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

      {name?(
          <View style={styles.container}>
                <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('supplydetails', {
                    name: name,
                    short_description: short_description,
                    price: price,
                    imgurl: imgurl,
                  })}
                >
                <Image
                    source={{ uri: urlFor(imgurl).url() }}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.trackTitle}>{name}</Text>
                    <Text style={styles.artistName}>{short_description}</Text>
                </View>
                </TouchableOpacity>

        </View>

      ):(
        <View >
          <Image
          source={require('../../assets/images/wrong.png')}
          style={{width:'100%',height:400}}
          />
          <Text style={{textAlign:'center',fontFamily:FONT.regular,fontSize:20}}>
            Could not find the searched item!
          </Text>
        </View>
      )}
   </SafeAreaView>


  )
}

export default Searchresults;

const styles = StyleSheet.create({
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
    marginTop:40,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
    zIndex:1
  },
  item: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
    gap:10,
    flexDirection:'row'
},
image: {
    width: 70,
    height: 70,
    marginRight: 16,
    borderRadius: 8,
},
textContainer: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
},
trackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#222',
},
artistName: {
    fontSize: 16,
    color: '#777',
},
  });

