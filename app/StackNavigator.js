import {createStackNavigator } from '@react-navigation/stack';
import Home from '../components/home/Homepage';
import Account from '../components/account/Account';
import Verification from '../components/signin/Verification'
import Cart from '../components/cart/Cart';
import Thekedar from '../components/thekedar/Thekedar';
import Movers from '../components/movers/Movers';
import Preparecheckout from '../components/cart/Preparecheckout';
import Delivery from '../components/delivery/Delivery';
import Sellerdetails from '../components/seller/Sellerdetails';
import Supplydetails from '../components/supply/Supplydetails'
import Search from '../components/search/Search';
import Login from '../components/login/Login';
import 'react-native-url-polyfill/auto';
import { useSelector, useDispatch } from 'react-redux';
import Chatbot from '../components/chatbot/Chatbot';
import Locate from '../components/location/Location';
import MoverCard from '../components/movers/MoverCard';
import Otp from '../components/login/Otp';
import Allsupplies from '../components/home/nearby/Allsupplies';
import Orders from '../components/account/orders/Orders';
import UserDetails from '../components/account/userdetails/UserDetails';
import ThekedarCard from '../components/thekedar/ThekedarCard';
import Allfeatured from '../components/home/nearby/Allfeatured';
import Welcomeinfo from '../components/welcomeScreen/Welcomeinfo';
import Nameinfo from '../components/welcomeScreen/Nameinfo';
import EditUser from '../components/account/userdetails/EditUser';
import Locations from '../components/location/Locations';

const Stack = createStackNavigator();

 const StackNavigator=({navigation}) => {

  const userInfo = useSelector((state) => state.user);

  return (
    <Stack.Navigator>


        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="edituser" component={EditUser} options={{ presentation: 'modal', headerShown: false }}/>
        <Stack.Screen name="appinfo" component={Welcomeinfo} options={{  headerShown: false }}/>

        <Stack.Screen name="locations" component={Locations} options={{  headerShown: false }}/>

        <Stack.Screen name="userdetails" component={UserDetails} options={{ presentation: 'modal', headerShown: false }}/>
        <Stack.Screen name="nameinfo" component={Nameinfo} options={{  headerShown: false }}/>


        <Stack.Screen name="delivery" component={Delivery} options={{ headerShown: false }} />  
        <Stack.Screen name="cart" component={Cart} options={{ presentation: 'modal', headerShown: false }} />


        {/* Thekedar Screens */}
        <Stack.Screen name="thekedar" component={Thekedar} />
        <Stack.Screen name="thekedarcard" component={ThekedarCard} options={{headerShown: false, presentation: 'modal'}}/>

        <Stack.Screen name="prepare" component={Preparecheckout} options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="verification" component={Verification} options={{ headerShown: false }} />
        <Stack.Screen name="sellerdetails" component={Sellerdetails} options={{ headerShown: false }} />
        <Stack.Screen name="supplydetails" component={Supplydetails} options={{ headerShown: false }} />
        <Stack.Screen name="search" component={Search} options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="chatbot" component={Chatbot} options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="location" component={Locate} options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="moverscard" component={MoverCard} options={{ headerShown: false, presentation: 'modal' }} />
        <Stack.Screen name="allsuply" component={Allsupplies} options={{headerShown: false,  presentation: 'modal' }} />
        <Stack.Screen name="allfeatured" component={Allfeatured} options={{headerShown: false,  presentation: 'modal' }} />

        <Stack.Screen name="movers" component={Movers} />

        {/* Account Screens */}
        <Stack.Screen name="account" component={Account} options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="orders" component={Orders} options={{ presentation: 'modal', headerShown: false }}/>

        {/* Login Screens */}
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="otp" component={Otp} options={{headerShown: false,  presentation: 'transparentModal' }} />

  </Stack.Navigator>
  );
}
export default StackNavigator;