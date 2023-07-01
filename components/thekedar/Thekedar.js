import { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Animated, Text, TouchableOpacity, FlatList, Image, StyleSheet, Easing } from 'react-native'
import {COLORS, icons, images, SIZES,FONT,Darkmode} from '../../constants';
import { Stack, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import createClient, { urlFor } from '../../sanity';
import { useDispatch, useSelector } from 'react-redux';
import {selectBasketItems} from '../../features/basketSlice';



const styles = StyleSheet.create({
    navla: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width:'100%',
      height: 50,
      backgroundColor: COLORS.lightWhite,
      borderTopWidth: 1,
      borderColor: '#ddd',
      elevation: 5,
      position:'absolute',
      bottom:0,
      left:0,
      right:0
    },
    itemcount:{
      height:25,
      width:25,
      borderRadius:50,
      position:'absolute',
      zIndex:1,
      justifyContent:'center',
      alignItems:'center',
      right:0,
      marginTop:-10,
      marginRight:3
    },
    icon: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.lightWhite,
      height: '100%',
      width: '33%',
    },
    selectedIcon: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '33%',
      elevation: 3,
      borderTopColor:COLORS.tertiary,
      borderTopWidth:3
    },
    iconButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
    catext:{
      transform: [{ rotate: '-90deg' }],
      marginLeft:-160,
      color:'rgba(255,255,255,0.4)',
      fontSize:17
    },
    seek: {
      height: 600,
      width: 50,
      backgroundColor: COLORS.two,
      position: 'absolute',
      bottom: 0,
      marginBottom: 50,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: 'hidden',
      zIndex:1,
      elevation: 5,
    },
    textcontainer: {
      width: 150,
      justifyContent: 'center',
      alignItems:'center',
      marginLeft: 20,
      backgroundColor:COLORS.two,
      flex:1
    },
    selectedtext: {
      color:'rgba(255,255,255,1)',
      justifyContent: 'center',
      alignSelf:'center',
      marginTop: 30,
    },
    slider: {
      height: 70,
      width: 8,
      backgroundColor: COLORS.lightWhite,
      marginTop: -45,
      marginLeft: -90,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
    item: {
      padding: 16,
      borderRadius: 10,
      backgroundColor: COLORS.white,
      alignItems: 'center',
      gap:5,
      elevation: 5,
      marginBottom:10,
      marginLeft:75,
      width:'70%',
    },
    image: {
      width: 90,
      height: 90,
      marginRight: 16,
      borderRadius: 8,
    },
    dealertextContainer: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
    },
    trackTitle: {
      fontSize: 20,
      marginBottom: 4,
      color: '#222',
      fontFamily: FONT.regular,
    },
    artistName: {
      fontSize: 16,
      color: '#777',
      fontFamily: FONT.regular,
    },
    heartBox:{
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'rgba(128,128,128,0.2)',
      position:'absolute',
      right:0,
      marginRight:10,
      marginTop:10,
      height:40,
      width:40,
      borderRadius:50
    },
    headerImage:{
      width:200,
      height:40
    },
    heading:{
      fontFamily:FONT.bold,
      fontSize:SIZES.xxLarge,
      color:COLORS.two
    },
    dealerscontainer:{
      flex:1
    }
  });


const Thekedar = ({navigation}) => {
    const [selected, setSelected] = useState(1);
    const animationValues = [1, 1, 1, 1].map(() => new Animated.Value(1));

    const [selectedText, setSelectedText] = useState(0);
    const [dealers, setDealers] = useState(0);
    const [liked, setLiked] = useState(false);
    const darkmode = useSelector((state) => state.darkmode.darkmode);
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

    const handleContainerPress = (itemIndex) => {
      setSelectedText(itemIndex);
    };
  
    const renderSlider = (itemIndex) => {
      if (selectedText === itemIndex) {
        return <View style={styles.slider} />;
      }
      return null;
    };
  
    const renderText = (text, itemIndex) => {
      const isTextSelected = selectedText === itemIndex;
      return (
        <TouchableOpacity
          key={itemIndex}
          style={styles.textcontainer}
          onPress={() => handleContainerPress(itemIndex)}
        >
          <Text style={[styles.catext, isTextSelected && styles.selectedtext]}>{text}</Text>
          {renderSlider(itemIndex)}
        </TouchableOpacity>
      );
    };

    useEffect(()=>{
      createClient.fetch(
      `*[_type == 'dealer']{
        ...,
      }`
      ).then((data) => {
        setDealers(
          data.map((dealer) => ({
            ...dealer,
            liked: false,
          }))
        );
      });
  }, []);

    const handleLikeToggle = (index) => {
      setDealers((prevDealers) => {
        const updatedDealers = [...prevDealers];
        updatedDealers[index].liked = !updatedDealers[index].liked;
        return updatedDealers;
      });
    };
  
  return (
    <SafeAreaView style={{ backgroundColor:darkmode?Darkmode.white:COLORS.lightWhite,flex:1}}>
        <Stack.Screen 
        options={{
          headerStyle: { backgroundColor:darkmode?Darkmode.white:COLORS.lightWhite},
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 24,
            color: COLORS.gray,
            paddingHorizontal: 16,
          },
          headerRight: () => (
            <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('cart')}>
              {items.length>0 &&(
                <View style={[styles.itemcount,{backgroundColor:darkmode?Darkmode.gray2:COLORS.tertiary}]}>
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
          headerTitle: () => (
            <Image source={require('../../assets/images/name-removed.png')} style={styles.headerImage} />
          ),        
        }}
      />


      <View style={{marginLeft:20}}>
        <Text style={styles.heading}>Dealers</Text>
      </View>


      <View style={styles.seek}>
        {renderText('Personal', 0)}
        {renderText('Commercial', 1)}
        {renderText('Appartment', 2)}
      </View>


        <View style={styles.dealerscontainer}>
        <FlatList
          data={dealers}
          renderItem={({ item, index }) => (
          <TouchableOpacity
            key={item._id}
            style={[styles.item]}
            onPress={() => navigation.navigate('thekedarcard', {
              id: item._id,
              name: item.name,
              short_description: item.short_description,
              price: item.price,
              images: item.image[0].asset._ref,
            })}
          >
              <TouchableOpacity style={styles.heartBox} onPress={() => handleLikeToggle(index)}>
                <Icon name="favorite" color={item.liked ? COLORS.tertiary : COLORS.gray} size={24} />
              </TouchableOpacity>
            <Image
              source={{ uri: urlFor(item.image[0].asset._ref).url() }}
              style={styles.image}
            />
            <View style={styles.dealertextContainer}>
              <Text style={styles.trackTitle}>{item.name}</Text>
              <Text style={styles.artistName}>{item.short_description}</Text>
            </View>
          </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: 10 }}
        />

        </View>


      <View style={styles.navla}>
        <TouchableOpacity onPress={() => {setSelected(0), navigation.navigate('home'), setSelected(1)}} style={iconStyles(0)}>
          <Icon name='build' size={28} color={selected === 0 ? COLORS.tertiary : COLORS.gray} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setSelected(1), navigation.navigate('thekedar')}} style={iconStyles(1)}>
          <Icon name='people' size={28} color={selected === 1 ? COLORS.tertiary : COLORS.gray} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setSelected(2), navigation.navigate('movers'), setSelected(1)}} style={iconStyles(2)}>
          <Icon name='local-shipping' size={28} color={selected === 2 ? COLORS.tertiary : COLORS.gray} />
        </TouchableOpacity>
      </View>    
    </SafeAreaView>
  )
}

export default Thekedar