import { useState } from "react";
import { View, ScrollView, SafeAreaView, Animated, Text, TouchableOpacity, FlatList, ActivityIndicator, ActivityIndicatorBase, TextInput, Button, Image, StyleSheet, Easing } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import {COLORS, icons, images, SIZES} from '../constants';
import account from "./account/Account";
import { Stack, useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    navla: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 60,
      width:"100%",
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderColor: '#ddd',
      elevation: 5,
      position:"absolute",
      bottom:0,
      left:0,
      right:0
    },
    icon: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      height: '100%',
      width: "33%",
    },
    selectedIcon: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.tertiary,
      height: '120%',
      width: "33%",
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      elevation: 3,
    },
    iconButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
  });


const Movers = ({navigation}) => {
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
  
  return (
    <SafeAreaView style={{ backgroundColor:COLORS.lightWhite, height:"100%"}}>
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
              <Icon name="shopping-cart" size={32} color={COLORS.gray} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={()=> navigation.navigate('account')}
            >
              <Icon name="person" size={36} color={COLORS.gray} />
            </TouchableOpacity>
          ),
          headerTitle:"CONSTRO",
        }}
      />
<SafeAreaView style={styles.navla}>
      <TouchableOpacity onPress={() => {setSelected(0), navigation.navigate('home'), setSelected(1)}} style={iconStyles(0)}>
        <Icon name="build" size={28} color={selected === 0 ? "#fff" : "#444"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {setSelected(1), navigation.navigate('thekedar')}} style={iconStyles(1)}>
        <Icon name="people" size={28} color={selected === 1 ? "#fff" : "#444"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {setSelected(2), navigation.navigate('movers'), setSelected(2)}} style={iconStyles(2)}>
        <Icon name="local-shipping" size={28} color={selected === 2 ? "#fff" : "#444"} />
      </TouchableOpacity>
    </SafeAreaView>    
    </SafeAreaView>
  )
}

export default Movers