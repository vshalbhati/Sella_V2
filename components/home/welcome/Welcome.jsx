import {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ActivityIndicatorBase, TextInput, Button, Image, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'
import { icons, SIZES} from '../../../constants';

const jobTypes =['Cement','Putti','Bricks','Patthar','Binola'];

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../../features/userSlice';


const stylis = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const Welcome = ({navigation}) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Cement');
  const isLoading=false;
  const error = false;

  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);



  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hey <Text>{JSON.stringify(userInfo?.given_name,null,2)}</Text></Text>
        <Text style={styles.welcomeMessage}>CHoose location</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            onChangeText={text => setQuery(text)}
            value={query}
            placeholder='what are you looking for?'
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => navigation.navigate('search',{query:query})}>
          <Image
          source={icons.search}
          resizeMode='contain'
          style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
        data={jobTypes}
        renderItem={({ item}) =>(
          <TouchableOpacity
          style={styles.tab(activeJobType, item)} 
          onPress={()=>{
            setActiveJobType(item);
            navigation.navigate('search',{query:item})
          }}
          >
            <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        contentContainerStyle={{columnGap:SIZES.small}}
        showsHorizontalScrollIndicator={false}
        horizontal
        />
        {/* <FlatList
      data={songs}
      renderItem={({ item }) => (
        <View style={stylis.container}>
          {item.track.images && item.track.images.coverart && (
            <Image
              source={{ uri: item.track.images.coverart }}
              style={stylis.image}
            />
          )}
          <Text style={stylis.title}>{item.track.title}</Text>
        </View>
      )}
      keyExtractor={item => item.track.key}
      showsHorizontalScrollIndicator={false}
      horizontal
    /> */}
      </View>
    </View>
  )
}

export default Welcome