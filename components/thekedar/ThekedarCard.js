import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import createClient, { urlFor } from '../../sanity';
import { COLORS, FONT } from '../../constants';




const ThekedarCard = ({navigation}) => {
    const route = useRoute();
    const { id, images, name, short_description} = route.params;

    const [dealerImages, setDealerImages] = useState([]);
    const [dealerServices, setDealerServices] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(()=>{
      createClient.fetch(
        `*[_type == 'dealer' && _id == '${id}'] {
          image[]{
            asset->{
              ...,
            }
          }
        }`
      ).then((data)=>{
        setDealerImages(data[0].image);
      });
    },[]);

    useEffect(()=>{
      createClient.fetch(
        `*[_type == 'dealer' && _id == '${id}'] {
          ...,
        }`
      ).then((data)=>{
        setDealerServices(data[0].services);
      });
    },[]);


  return (
    <SafeAreaView style={{flex:1,}}>
         <View style={styles.backArrow}>
             <TouchableOpacity>
                 <Icon
                     name='arrow-back'
                     size={28}
                     onPress={() => navigation.goBack()}
                 />      
             </TouchableOpacity>
       </View> 

      <Image
        source={{ uri: selectedImage || urlFor(images).url() }}
        style={styles.badimage}
      />

      <View style={styles.imagesarray}>
        <FlatList
          data={dealerImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => setSelectedImage(item.asset.url)}
            >
              <Image
                source={{ uri: item.asset.url }}
                style={{ height: 30, width: 30, borderRadius: 5 }}
              />
            </TouchableOpacity>
          )}
        />
      </View>


      <View style={styles.infocard}>
        <View style={styles.textcontent}>
          <Text style={styles.name}>{name}</Text>   
          <Text style={styles.description}>{short_description}</Text>
          <View style={styles.servicesbox}>
            <Text style={styles.serviceheader}>Services</Text>
            <FlatList
              data={dealerServices}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={{padding:20}}>
                  <Text style={{fontFamily:FONT.regular}}>{item}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
         
   </SafeAreaView>
  )
}

export default ThekedarCard

const styles = StyleSheet.create({
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
      infocard:{
        position:'absolute',
        backgroundColor:COLORS.white,
        bottom:0,
        width:'100%',
        height:500,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        elevation:3,
        padding:30
      },
      name:{
        fontSize:25,
        fontFamily:FONT.bold,
        textAlign:'left'
      },
      description:{
        fontSize:15,
        fontFamily:FONT.regular,
        textAlign:'left'
      },
      textcontent:{
        justifyContent:'center',
        marginTop:50
      },
      servicesbox:{
        marginTop:10
      },
      serviceheader:{
        fontSize:18,
        fontFamily:FONT.medium,
        textAlign:'left'
      },
      imagesarray:{
        flex:1,
        position:'absolute',
        marginBottom:520,
        bottom:0,
        width:'100%',
        alignItems:'center',
        rowGap:50
      },
      badimage:{
        height:600,
        width:'100%',
        zIndex:-1
      }

})