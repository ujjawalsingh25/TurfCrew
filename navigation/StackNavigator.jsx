import React from 'react'
import { StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import BookScreen from '../screens/BookScreen';
import ProfileScreen from '../screens/ProfileScreen';

import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

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
            </Stack.Navigator>
        )
    }

  return (
    <NavigationContainer>
        <MainStack />
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})