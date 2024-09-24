import React, { useContext } from 'react'
import { StyleSheet } from 'react-native'
import { AuthContext } from '../AuthContext';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import BookScreen from '../screens/BookScreen';
import NameScreen from '../screens/NameScreen';
import SelectImage from '../screens/SelectImage';
import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PasswordScreen from '../screens/PasswordScreen';
import PrefinalScreen from '../screens/PrefinalScreen';
import TurfsInfoScreen from '../screens/TurfsInfoScreen';

import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CreateActivity from '../screens/CreateActivity';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    const { token } = useContext(AuthContext);

    function BottomTabs() {
        return (
            <Tab.Navigator screenOptions={{
              tabBarStyle: {
                height: 62, 
                paddingBottom: 10, 
              },
            //   headerShown: false          //   -->> To remove headers
            }}>
                <Tab.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{
                        tabBarActiveTintColor: "green",
                        // headerShown: false,
                        tabBarIcon: ({focused}) => focused ? (
                            <Ionicons name="home" size={28} color="green" />
                        ) : (
                            <Ionicons name="home" size={28} color="#989898" />
                        )
                    }}
                />
                <Tab.Screen 
                    name="Play" 
                    component={PlayScreen} 
                    options={{
                        tabBarActiveTintColor: "green",
                        // headerShown: false, 
                        // headerStyle: { backgroundColor: '#223536', },
                        tabBarIcon: ({focused}) => focused ? (
                            <Ionicons name="game-controller" size={30} color="green" />
                        ) : (
                            <AntDesign name="addusergroup" size={30} color="#989898" />
                        )
                    }}
                />
                <Tab.Screen 
                    name="Book" 
                    component={BookScreen} 
                    options={{
                        tabBarActiveTintColor: "green",
                        tabBarIcon: ({focused}) => focused ? (
                            <MaterialIcons name="stadium" size={30} color="green" />
                        ) : (
                            <Fontisto name="ticket-alt" size={30} color="#989898" />
                        )
                    }}
                />
                <Tab.Screen 
                    name="Profile" 
                    component={ProfileScreen} 
                    options={{
                        tabBarActiveTintColor: "green",
                        tabBarIcon: ({focused}) => focused ? (
                            <MaterialCommunityIcons name="account-circle" size={35} color="green" />
                        ) : (
                            <MaterialCommunityIcons name="account" size={35} color="#989898" />
                        )
                    }}
                />
            </Tab.Navigator>
        )
    }

    const AuthStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen 
                    name='Start' 
                    component={StartScreen} 
                    options={{headerShown: false}}    
                />
                <Stack.Screen 
                    name='Login' 
                    component={LoginScreen} 
                    options={{headerShown: false}}    
                />
                <Stack.Screen 
                    name='Register' 
                    component={RegisterScreen} 
                    // options={{headerShown: false}}    
                />
                <Stack.Screen 
                    name='Password' 
                    component={PasswordScreen} 
                    // options={{headerShown: false}}    
                />
                <Stack.Screen 
                    name='Name' 
                    component={NameScreen} 
                    // options={{headerShown: false}}    
                />
                <Stack.Screen 
                    name='Image' 
                    component={SelectImage} 
                    // options={{headerShown: false}}    
                />
                <Stack.Screen 
                    name='PreFinal' 
                    component={PrefinalScreen} 
                    // options={{headerShown: false}}    
                />
            </Stack.Navigator>
        )
    }

    function MainStack () {
        return (
            <Stack.Navigator>
                <Stack.Screen 
                    name="Main" 
                    component={BottomTabs} 
                    options={{headerShown: false }}
                />

                <Stack.Screen 
                    name="Turfs" 
                    component={TurfsInfoScreen} 
                    options={{headerShown: false }}
                />

                <Stack.Screen 
                    name="Create" 
                    component={CreateActivity} 
                    // options={{headerShown: false }}
                />
            </Stack.Navigator>
        )
    }

  return (
    <NavigationContainer>
        {token === null || token === '' ? <AuthStack /> :  <MainStack /> }
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})