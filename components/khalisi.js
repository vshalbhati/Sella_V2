import React from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../features/userSlice';

const Khalisi = ({navigation}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const handleRemoveUser = async () => {
    try {
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('@user');
      dispatch(clearUser());
      navigation.navigate('login');
    } catch (error) {
      console.log('Error removing user info from AsyncStorage:', error);
    }
  };

  return (
    <View>
      <Text>User Info:</Text>
      <Text>{JSON.stringify(userInfo)}</Text>
      <Text>{JSON.stringify(userInfo?.name,null,2)}</Text>
      <Text>{JSON.stringify(userInfo?.email,null,2)}</Text>
      <Button title="Remove User" onPress={handleRemoveUser} />
    </View>
  );
};

export default Khalisi;
