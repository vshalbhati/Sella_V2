import {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, ActivityIndicatorBase, TextInput, Button, Image, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './welcome.style'
import { icons, SIZES} from '../../../constants';

const jobTypes =["Cement","Karesar","Rodi","Patthar","Concrete"];
import {username} from "../../signin/Signup"


const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Cement');
  const isLoading=false;
  const error = false;

  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);

  const searchSongs = async () => {
    try {
      const response = await fetch(`https://shazam.p.rapidapi.com/search?term=${query}`, {
        headers: {
          'x-rapidapi-host': 'shazam.p.rapidapi.com',
          // 'x-rapidapi-key': '4c281832ccmsh01bafa44beb87fap18e2c5jsn1b8f0b733086'
        }
      });
      const data = await response.json();
      setSongs(data.tracks);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hey Anya{username}</Text>
        <Text style={styles.welcomeMessage}>Find your seller</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            onChangeText={text => setQuery(text)}
            value={query}
            placeholder="what are you looking for?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={searchSongs}>
          <Image
          source={icons.search}
          resizeMode="contain"
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
            router.push(`/search/${item}`)
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
        <FlatList
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
    />
      </View>
    </View>
  )
}

export default Welcome