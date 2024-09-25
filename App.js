import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import {ModalPortal} from 'react-native-modals';

import { AuthProvider } from './AuthContext';
import StackNavigator from './navigation/StackNavigator';

export default function App() {
  return (
    <AuthProvider>
      <StackNavigator />
      <ModalPortal />
    </AuthProvider>
  );
}

// "mongodb+srv://ujjawal:ujjawal@cluster0.wciqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
