import { Provider } from 'react-redux';
import { store } from '../store';
import StackNavigator from './StackNavigator';
import { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable'
const {height} = Dimensions.get('window');
import { SafeAreaView, Dimensions } from 'react-native'
import { StripeProvider } from '@stripe/stripe-react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function App() {
  const [showStackNavigator, setShowStackNavigator] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowStackNavigator(true);
    }, 3000);
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
                animation="fadeInUp"
                iterationCount={1}
                style={{height:height,width:'100%'}}
              />        
          </SafeAreaView>
        )} 

      </StripeProvider>    
    </Provider>
  );
}