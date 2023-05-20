import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants';
import { useSelector } from 'react-redux';
import { clearLocation } from '../features/locationSlice';

const styles = StyleSheet.create({
  backArrow:{
    height:40,
    width:40, 
    backgroundColor:'rgba(255,255,255,0.4)',
    borderRadius:50, 
    marginTop:30,
    marginLeft:10,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    zIndex:1
  },
  container:{
    backgroundColor: COLORS.one,
    height:200,
    padding:10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    elevation: 5,
  },
  removeButton:{
    backgroundColor:'rgba(255,255,255,0.8)',
    height:30,
    width:120,
    borderRadius:7,
    justifyContent:'center',
    alignItems:'center',
  }
});

const Delivery = ({navigation}) => {
  const locationInfo = useSelector((state) => state.location);
  const[no, setNo] = useState(0);
  const pressi =()=>{
    if(no%2==0){
      setNo(no+1)
    }
    else{
      setNo(0);
    }
    console.log(`BHAI DABGO ${no}`)
  }
  return (
    <SafeAreaView>
      <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name='arrow-back'
            size={28}
            color={COLORS.lightWhite}
            onPress={() => navigation.navigate('home')}
          />      
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={{marginTop:100}}>
        <Text>Deliver to this address</Text>
        {/* <Text>{locationInfo}</Text> */}


        {(no%2)?(
          <View>
            <View style={{flexDirection:'row'}}>
            <Text>Addressssss</Text>
            <Icon
            name='arrow-right'
            size={20}
            color={COLORS.two}
            style={{ transform: [{ rotate: '90deg' }]}}       
            />
            </View>
          <TouchableOpacity style={styles.removeButton} onPress={pressi}>
          <Text>Remove address</Text>
          </TouchableOpacity>
          </View>
        ):(
          <View>
                  <View style={{flexDirection:'row'}}>
                  <Text>No adress selected</Text>
                  <Icon
                  name='arrow-right'
                  size={20}
                  color={COLORS.two}
                  style={{ transform: [{ rotate: '90deg' }]}}       
                  />
                  </View>
          <TouchableOpacity style={styles.removeButton} onPress={pressi}>
          <Text>Add address</Text>
          </TouchableOpacity>
          </View>
        )}

        </View>
        
      </View>
    </SafeAreaView>
  )
}

export default Delivery