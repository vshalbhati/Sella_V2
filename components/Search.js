import { View, Text, FlatList, Image} from 'react-native'
import React,{useEffect, useState} from 'react'
import { useRoute } from '@react-navigation/native'
import createClient, { urlFor } from '../sanity';
import Searchresults from './Searchresults';

const Search = ({navigation}) => {
    const route = useRoute();
  const { query } = route.params;
  const [results, setResults] = useState([])

  useEffect(()=>{
    createClient.fetch(
    `*[_type == 'supply' && name == '${query}']{
      ...,
    }[0]`
    ).then((data)=>{
      setResults(data);
    });
  },[]);
  return (
    <View>
      <Searchresults
      name={results.name}
      // imgurl={results.image.asset._ref}
      short_description={results.short_description}
      price={results.price}
      navigation={navigation}
      />
    </View>
  )
}

export default Search