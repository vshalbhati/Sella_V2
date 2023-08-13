import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet,ActivityIndicator } from 'react-native'
import React,{useState, useEffect} from 'react'
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../constants';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    textInput: {
        backgroundColor: COLORS.gray2,
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
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
        marginLeft:10,
    },
    navi:{
        flexDirection:'row',
        padding: 16,
    },
    itemContainer: {
        backgroundColor: COLORS.lightWhite,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      itemText: {
        fontSize: 16,
      },
});

const Chatbot = ({navigation}) => {
    const [data, setData] = useState([]);
    const apiKey = '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';
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

    const textData = [
        { key: 'q1', question: 'Want to talk to an executive?' },
        { key: 'q2', question: 'Have a question for us?' },
        { key: 'q3', question: 'Want to go YOLO?' },
      ];
      
      const ListItem = ({ item }) => {
        return (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.question}</Text>
          </View>
        );
      };

      const LoadingScreen = () => {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      };

      const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
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
      {/* <FlatList
      data={data}
      keyExtractor={(item,index) => index.toString()}
      renderItem={({item}) => (
        <View style={{
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
      /> */}
      <FlatList
      keyboardShouldPersistTaps="always"
      data={textData}
      renderItem={({ item }) => <ListItem item={item} />}
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