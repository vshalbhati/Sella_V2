import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput,SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLoocation } from '../features/locationSlice';

const Locate = () => {
  const locationInfo = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const [address, setAddress] = useState('No Location Added');

  const [sector, setSector] = useState("");

  const decideSector=()=>{
    for (let i = 0; i < address.length; i++) {
      if ((address[i] == 'S' || address[i] == 's') &&
          address[i + 1] == 'e' &&
          address[i + 2] == 'c' &&
          address[i + 3] == 't' &&
          address[i + 4] == 'o' &&
          address[i + 5] == 'r' &&
          (address[i+6]==' ' || ((address[i+6]>='a' && address[i+6]<='z') || (address[i+6]>='A' && address[i+6]<='D')))
        ){
        let s="";
          for(let j=0; j<=address.length;j++){
            if(address[i+7+j] == ',' || address[i+7+j] == ' '){
              break;
            }
            else{
              s+=address[i+7+j];
            }
          }
          console.log(s);
          setSector(s);
        break;
      }
    }
    dispatch(setLoocation(address));
  }


  return (
    <SafeAreaView>

        <View>
          <Text>Regrets we couldn't identify your location correctly!</Text>
          <View>
          <Text>Please Input your location</Text>
          <Text>(*please mention the sector)</Text>
          <TextInput
          placeholder='Enter the location'
          onChangeText={text => setAddress(text)}
          />
          <TouchableOpacity onPress={()=>decideSector()}>
          <Text>Submit</Text>
          </TouchableOpacity>
          </View>
        </View>
        {sector && (
        <Text>{sector}</Text>
      )}
      <Text>Current selected location: </Text>
      <Text>{locationInfo.location}</Text>
    </SafeAreaView>
  );
};
export default Locate;