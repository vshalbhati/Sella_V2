import { OPEN_AI_API_KEY } from '@env';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../constants';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BDC3C7',
        padding: 16,
    },
    textInput: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        width:'90%'
    },
    sendButton: {
        alignSelf: 'flex-end',
        height:40,
        width:40, 
        backgroundColor:COLORS.one,
        borderRadius:50,    
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10
    },
    backArrow:{
        height:40,
        width:40, 
        backgroundColor:COLORS.one,
        borderRadius:50, 
        position:'absolute',
        zIndex:2,
        justifyContent:'center',
        alignItems:'center',
    },
    navi:{
        flexDirection:'row',
    }
});

const Chatbot = ({navigation}) => {
    const [data, setData] = useState([]);
    const apiKey = OPEN_AI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions'
    const [textInput, setTextInput] = useState('');

    const handleSend = async() =>{
        const prompt = textInput
        const response = await axios.post(apiUrl,{
            prompt: prompt,
            max_tokens: 1024,
            temperature: 0.5,
        },{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const text = response.data.choices[0].text;
        setData([...data,{type:'user','text': textInput}, {type:'bot', 'text':text}]);
        setTextInput('');
    }
  return (
    <View style={styles.container}>
        <View style={styles.backArrow}>
        <TouchableOpacity>
          <Icon
            name='arrow-back'
            size={28}
            onPress={() => navigation.goBack()}
            color={"white"}
          />      
        </TouchableOpacity>
      </View>      
      <Text style={{alignSelf:'center'}}>Chatbot</Text>
      <FlatList
      data={data}
      keyExtractor={(item,index) => index.toString()}
      renderItem={({item}) => (
        <View sstyle={{
            flexDirection: 'row',
            padding: 10,
            marginBottom: 10,
            backgroundColor: item.type === 'user' ? '#C8E6C9' : '#FFCDD2',
            alignSelf: item.type === 'user' ? 'flex-end' : 'flex-start',
            borderRadius: 8,
            maxWidth: '70%',
          }}>
            <Text style={{fontWeight:'bold', color:item.type ==='user'? 'green': 'red'}}>{item.type === 'user'? 'BRO: ': 'BOT: '}</Text>
            <Text>{item.text}</Text>
        </View>
      )}
      />
      <View style={styles.navi}>
    <TextInput
        style={styles.textInput}
        value={textInput}
        onChangeText={text => setTextInput(text)}
        placeholder="Ask me anything"
        placeholderTextColor="#9E9E9E"
    />
    <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <Icon name="send" size={30} color={'white'} />
    </TouchableOpacity>
    </View>
    </View>
    )
    }

export default Chatbot;