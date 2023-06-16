import React, { useState, useEffect , useLayoutEffect,useRef} from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { COLORS, SIZES} from '../../../constants';
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
    <SafeAreaView style={{flex:1}}>
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
        <View style={styles.Textheading}>
            <Text style={{textAlign:'center',color:COLORS.lightWhite,fontSize:25,paddingTop:30,}}> {name}</Text>
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
        padding:10
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
    backArrow:{
        height:40,
        width:40, 
        backgroundColor:'rgba(255,255,255,0.6)',
        borderRadius:50, 
        marginTop:40,
        marginLeft:10,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        left:0,
        zIndex:3
      },
      Textheading:{
        padding:13,
        backgroundColor:COLORS.two,
        justifyContent:'center',
        alignItems:'center',
        elevation: 5,
        shadowColor: COLORS.two,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.65,
        shadowRadius: 3.84,
      }
})