import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './navigation/StackNavigator';

export default function App() {
  return (
    <StackNavigator />
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
