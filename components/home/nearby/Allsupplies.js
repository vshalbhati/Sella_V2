import React, { useState, useEffect , useLayoutEffect,useRef} from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { COLORS, SIZES} from '../../../constants';
import createClient, { urlFor } from '../../../sanity';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Allsupplies = ({navigation}) => {

    const [supplies, setSupplies] = useState([])


    useEffect(()=>{
        createClient.fetch(
        `*[_type == 'supply']{
          ...,
            Supplies[]->{
              ...,
            }
        }`
        ).then((data)=>{
            setSupplies(data);
        });
      },[]);

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
            <Text style={{textAlign:'center',color:COLORS.lightWhite,fontSize:25,paddingTop:30,}}> Supplies</Text>
        </View>
        <ScrollView style={styles.container}>
            <FlatList
            data={supplies}
            renderItem={({ item }) => (
                <View
                key={item._id}
                style={styles.item}
                >
                <Image
                    source={{ uri: urlFor(item.image.asset._ref).url() }}
                    style={styles.image}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.trackTitle}>{item.name}</Text>
                    <Text style={styles.artistName}>{item.short_description}</Text>
                </View>
                </View>
            )}
            keyExtractor={(item) => item._id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{  columnGap: 10 }}
            />
        </ScrollView>
    </SafeAreaView>
  )
}

export default Allsupplies

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCFCFC',
        padding:10
      },
    item: {
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#fff',
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
        padding:30,
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