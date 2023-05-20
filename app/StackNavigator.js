import Signin from '../components/signin/Signin';
import Signup from '../components/signin/Signup';
import {createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Homepage';
import Account from '../components/account/Account';
import Verification from '../components/signin/Verification';
import Cart from '../components/Cart';
import Thekedar from '../components/Thekedar';
import Movers from '../components/Movers';
import Preparecheckout from '../components/Preparecheckout';
import Delivery from '../components/Delivery';
import Sellerdetails from '../components/Sellerdetails';
import Supplydetails from '../components/Supplydetails'
import Search from '../components/Search';
import Login from '../components/Login';
import 'react-native-url-polyfill/auto';
import { useSelector, useDispatch } from 'react-redux';
import Chatbot from '../components/chatbot/Chatbot';

const Stack = createStackNavigator();

 const StackNavigator=({navigation}) => {

  const user = useSelector(state => state.user);

  return (
      <Stack.Navigator>
        {/* {user? ( */}
        {/* //   <> */}
        {/* <Stack.Screen name='home' component={Home} />
        <Stack.Screen name='signin' component={Signin} />
        <Stack.Screen name='account' component={Account} options={{presentation:'transparentModal'}}/>
        <Stack.Screen name='signup' component={Signup}/>
        <Stack.Screen name='cart' component={Cart} options={{presentation:'modal', headerShown:false}}/>
        <Stack.Screen name='thekedar' component={Thekedar}/>
        <Stack.Screen name='movers' component={Movers}/>
        <Stack.Screen name='prepare' component={Preparecheckout} options={{headerShown:false,presentation:'modal'}}/> */}
        <Stack.Screen name='delivery' component={Delivery} options={{headerShown:false}}/>
        <Stack.Screen name='verification' component={Verification} options={{headerShown:false}}/>
        <Stack.Screen name='sellerdetails' component={Sellerdetails} options={{headerShown:false}}/>
        <Stack.Screen name='supplydetails' component={Supplydetails} options={{headerShown:false}}/>
        <Stack.Screen name='search' component={Search} options={{headerShown:false}}/>
        <Stack.Screen name='chatbot' component={Chatbot} options={{headerShown:false,presentation:'modal'}}/>
        {/* </> */}
        {/* // ):( */}
        <Stack.Screen name='login' component={Login} options={{headerShown:false}} />
        {/* // ) */}
        {/* } */}
      </Stack.Navigator>
  );
}
export default StackNavigator;