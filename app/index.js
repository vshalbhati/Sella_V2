import { Provider } from 'react-redux';
import { store } from '../store';
import StackNavigator from './StackNavigator';
import { useState, useEffect, useRef } from 'react';
import * as Animatable from 'react-native-animatable'
const {height} = Dimensions.get('window');
import { SafeAreaView, Dimensions } from 'react-native'
import { StripeProvider } from '@stripe/stripe-react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  }

  return token;
}


export default function App() {
  const [showStackNavigator, setShowStackNavigator] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowStackNavigator(true);
    }, 2000);
  }, []);
  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51NOGCkSATxdzOLbjJ8LKldJj1I0vQHHr4HOvXJDA3ejzxUy8OberkflLzPZ0gr28mXLQ3zKJ7HvErWzwyP75APoY0071B3Kjfw">

        {showStackNavigator ? (
          <StackNavigator />
        ) : (
          <SafeAreaView style={{backgroundColor:'black', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Animatable.Image
                source={require('../assets/images/splash.gif')}
                iterationCount={1}
                style={{height:height,width:'100%'}}
              />        
          </SafeAreaView>
        )} 

      </StripeProvider>    
    </Provider>
  );
}