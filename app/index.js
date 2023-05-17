import {createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from '../store';

// import 'react-native-url-polyfill/auto';

import StackNavigator from './StackNavigator';
const Stack = createStackNavigator();

export default function App() {
  return (
     <Provider store={store}>
      <StackNavigator/>
     </Provider>
  );
}