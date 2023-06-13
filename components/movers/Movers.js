import { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, Animated, Text, TouchableOpacity, FlatList, StyleSheet, Easing, ScrollView,Image,ImageBackground } from 'react-native'
import {COLORS, icons, images, SIZES,FONT} from '../../constants';
import { Stack } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import createClient, { urlFor } from '../../sanity';

const styles = StyleSheet.create({
    navla: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 60,
      width:'100%',
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderColor: '#ddd',
      elevation: 5,
      position:'absolute',
      bottom:0,
      left:0,
      right:0
    },
    icon: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      height: '100%',
      width: '33%',
    },
    selectedIcon: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '33%',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      elevation: 3,
    },
    iconButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    image: {
      width: '100%',
      zIndex:-1,
      position:'absolute',
      top:0,
      left:0,
      bottom:0,
      right:0
    },
    content: {
      width: '90%',
      height: 210,
      alignSelf: 'center',
      borderColor:'black',
      borderWidth:1,
      borderRadius:10,
      margin:10,
      overflow:'hidden',
      elevation:5
    },
    info:{
      position:'absolute',
      bottom:0,
      backgroundColor:'rgba(0,0,0,0.4)',
      left:0,
      right:0,
      padding:10
    },
    headerImage:{
      width:200,
      height:40
    },
  });


const Movers = ({navigation}) => {
    const [vehicle, setVehicle] = useState([]);


    const [selected, setSelected] = useState(2);
    const animationValues = [1, 1, 1, 1].map(() => new Animated.Value(1));
  
    const onPress = (index) => {
      setSelected(index);
      Animated.sequence([
        Animated.timing(animationValues[index], {
          toValue: 1.5,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(animationValues[index], {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]).start();
    };
    const iconStyles = (index) => [
      styles.icon,
      selected === index && styles.selectedIcon,
      {
        transform: [{ scale: animationValues[index] }],
      },
    ];
    useEffect(()=>{
      createClient.fetch(
      `*[_type == 'movers']{
        ...,
      }`
      ).then((data)=>{
        setVehicle(data);
      });
    },[]);

    const starthogya =false;
    
  return (
    <SafeAreaView style={{ backgroundColor:COLORS.lightWhite,flex:1}}>
        <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 24,
            color: COLORS.darkGray,
            paddingHorizontal: 16,
          },
          headerRight: () => (
            <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('cart')}>
              <Icon name='shopping-cart' size={32} color={COLORS.gray} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={()=> navigation.navigate('account')}
            >
              <Icon name='person' size={36} color={COLORS.gray} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Image source={require('../../assets/images/name-removed.png')} style={styles.headerImage} />
          ), 
                }}
      />

        {(!starthogya)?(
          <View style={{flex:1,justifyContent:'center'}}>
          <Image
          source={require('../../assets/images/working.png')}
          style={{width:'100%',height:400}}
          />
          <Text style={{textAlign:'center',fontFamily:FONT.regular,fontSize:20}}>Our team is working on this feature!</Text>
          <Text style={{textAlign:'center',fontFamily:FONT.regular,fontSize:16}}>We'll get back soon</Text>

          </View>
        ):(
      <View>
      <View style={{justifyContent:'center',marginVertical: 10,alignItems:'center'}}>
      <View style={{height: 1.7,backgroundColor: 'black',marginVertical: 5,width:'90%'}}/>
      <Text style={{position: 'absolute',top: -10,backgroundColor: COLORS.lightWhite, paddingHorizontal: 10,alignSelf:'center',fontSize:20}}>Movers</Text>
      </View>  

      <View style={{justifyContent:'center'}}>
      <FlatList
          style={{marginBottom:90}}
          data={vehicle}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.content}
              key={item._id}
              onPress={() => navigation.navigate('moverscard', {
                id: item._id,
                name: item.name,
                short_description: item.short_description,
                price: item.price,
                imgurl: item.image.asset._ref,
              })}
            >
              <Image
                source={{ uri: urlFor(item.image.asset._ref).url() }}
                style={styles.image}
              />
              <View style={styles.info}>
                <Text style={{fontWeight:'bold',color:COLORS.lightWhite}}>{item.name}</Text>
                <Text style={{color:COLORS.lightWhite}}>₹{item.price}/hr</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        </View>
        </View>
        )}
      

    <SafeAreaView style={styles.navla}>
      <TouchableOpacity onPress={() => {setSelected(0), navigation.navigate('home'), setSelected(1)}} style={iconStyles(0)}>
        <Icon name='build' size={28} color={selected === 0 ? '#fff' : '#444'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {setSelected(1), navigation.navigate('thekedar')}} style={iconStyles(1)}>
        <Icon name='people' size={28} color={selected === 1 ? '#fff' : '#444'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {setSelected(2), navigation.navigate('movers'), setSelected(2)}} style={iconStyles(2)}>
        <Icon name='local-shipping' size={28} color={selected === 2 ? COLORS.tertiary : '#444'} />
      </TouchableOpacity>
    </SafeAreaView>    
    </SafeAreaView>
  )
}

export default Movers