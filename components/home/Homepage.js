import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Animated, Text, TouchableOpacity, FlatList, ActivityIndicator, ActivityIndicatorBase, TextInput, Button, Image, StyleSheet, Easing } from 'react-native'
import {COLORS, icons, images, SIZES, FONT} from '../../constants';
import { Nearbyjobs, ScreenHeaderBtn, Welcome} from '..';
import { Stack, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import createClient, { urlFor } from '../../sanity';
import {selectBasketItems} from '../../features/basketSlice';
import { useDispatch, useSelector } from 'react-redux';



const styles = StyleSheet.create({
  navla: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    with:'100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    elevation: 5,
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
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
    backgroundColor: COLORS.tertiary,
    height: '120%',
    width: '33%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    elevation: 3,
  },
  iconButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  list: {
    columnGap: 16,
  },
  item: {
    flexDirection:'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    gap:10,
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
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.primary,
  },
  artistName: {
    fontSize: 16,
    color: COLORS.secondary,
  },
  cardsContainer: {
    width:'100%',
    marginTop: SIZES.xxLarge,
    marginBottom: SIZES.xxLarge,
    gap: SIZES.xxLarge,
    scrollbar: {
      display: 'none'
    },
  },
  rowe:{
    gap:10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  boticon:{
    width: 50,
    height: 50,
    backgroundColor:COLORS.tertiary,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    position:'absolute',
    bottom:0,
    right:0,
    zIndex:1,
    marginBottom:70,
    marginRight:10,
  },
  itemcount:{
    height:25,
    width:25,
    backgroundColor:COLORS.tertiary,
    borderRadius:50,
    position:'absolute',
    zIndex:1,
    justifyContent:'center',
    alignItems:'center',
    right:0,
    marginTop:-10,
    marginRight:3
  }
});

const Home = ({navigation}) =>{
  const route = useRouter();
  const [selected, setSelected] = useState(0);
  const [featuredCategories, setFeaturedcategories] = useState();
  const animationValues = [1, 1, 1, 1].map(() => new Animated.Value(1));
  const items = useSelector(selectBasketItems);



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

  // useEffect(()=>{
  //   createClient.fetch(
  //   `*[_type == 'featured']{
  //     ...,

  //       Supplies[]->{
  //         ...,
  //       }
  //   }`).then((data)=>{
  //     setFeaturedcategories(data);
  //   });
  // },[]);


  return (

    <SafeAreaView style={{flex:1, backgroundColor:COLORS.lightWhite}}>
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
              {items.length>0 &&(
                <View style={styles.itemcount}>
                <Text style={{textAlign:'center',}}>{items.length}</Text>
                </View>
              )}
              
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
          headerTitle:'CONSTRUCK',
        }}
      />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{flex:1,padding: SIZES.medium}}>
          <Welcome navigation={navigation} />
          <Nearbyjobs navigation={navigation}/>        
        </View>
      </ScrollView>


        <TouchableOpacity
          style={styles.boticon}
          onPress={() => navigation.navigate('chatbot')}>
          <Icon name="chat" size={30} color="white"/>
        </TouchableOpacity>

      
    <SafeAreaView style={styles.navla}>
      <TouchableOpacity onPress={() => {setSelected(0), navigation.navigate('home')}} style={iconStyles(0)}>
        <Icon name='build' size={28} color={selected === 0 ? '#fff' : '#444'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {setSelected(1), navigation.navigate('thekedar'), setSelected(0)}} style={iconStyles(1)}>
        <Icon name='people' size={28} color={selected === 1 ? '#fff' : '#444'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {setSelected(2), navigation.navigate('movers'), setSelected(0)}} style={iconStyles(2)}>
        <Icon name='local-shipping' size={28} color={selected === 2 ? '#fff' : '#444'} />
      </TouchableOpacity>
    </SafeAreaView>
    </SafeAreaView>
  )
}

export default Home;