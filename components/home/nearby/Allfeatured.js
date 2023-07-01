import React, { useState, useEffect , useLayoutEffect,useRef} from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { COLORS, FONT, SIZES} from '../../../constants';
import createClient, { urlFor } from '../../../sanity';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';


const Allfeatured = ({navigation}) => {
    const route = useRoute();
    const {id,name, short_description, imgurl} = route.params;

    // const [supplies, setSupplies] = useState([])


    // useEffect(()=>{
    //     createClient.fetch(
    //     `*[_type == 'featured' && _id == '${id}']{
    //       ...,
    //     }[0]`
    //     ).then((data)=>{
    //         setSupplies(data);
    //     });
    //   },[]);

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.backArrow}>
            <TouchableOpacity>
                <Icon
                    name='arrow-back'
                    size={28}
                    color={COLORS.gray}
                    onPress={() => navigation.goBack()}
                />      
            </TouchableOpacity>
        </View>
        <View style={styles.Textheading}>
            <Text style={{textAlign:'center',color: COLORS.lightWhite,fontSize:SIZES.xLarge,fontFamily:FONT.bold,paddingTop:30,}}> {name}</Text>
        </View>

        <Image
            source={{ uri: urlFor(imgurl).url() }}
            style={styles.image}
        />
        <View style={styles.textContainer}>
            <Text style={styles.artistName}>{short_description}</Text>
        </View>
    </SafeAreaView>
  )
}

export default Allfeatured

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flex:1
      },
    image: {
        width: '100%',
        height: 300,
        position:'absolute',
        top:0,
        zIndex:-1
    },
    textContainer: {
        marginTop:220,
        padding: 16,
    },
    artistName: {
        fontSize: SIZES.large,
        color: '#777',
    },
    backArrow:{
        height:40,
        width:40, 
        backgroundColor:COLORS.lightWhite,
        borderRadius:50, 
        marginTop:40,
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        left:0,
        zIndex:1,
        elevation:4
      },
      Textheading:{
        padding:13,
        justifyContent:'center',
        alignItems:'center',
      }
})