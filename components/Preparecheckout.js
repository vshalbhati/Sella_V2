import { View, Text, SafeAreaView,Dimensions, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import { SlideInUp } from 'react-native-reanimated'
import { COLORS } from '../constants'
import * as Progress from 'react-native-progress';
const {height} = Dimensions.get('window');

const Preparecheckout = ({navigation,route }) => {
    const { sector } = route.params;
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('delivery',{ sector: sector });
        }, 3000);
    },[]);
  return (
    <SafeAreaView style={{backgroundColor:'black', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animatable.Image
            source={require('../assets/images/load.gif')}
            animation="fadeInUp"
            iterationCount={1}
            style={{height:height,width:'100%'}}
        />
        <Animatable.Text
            animation="slideInDown"
            iterationCount={1}
            style={{color:COLORS.lightWhite, textAlign:'center', fontSize:20, position:'absolute'}}
        >
            Woohoooo!
        </Animatable.Text>
        <Progress.Bar size={30} color='#00CCBB' width={200} indeterminate={true}/>
    </SafeAreaView>
  )
}

export default Preparecheckout