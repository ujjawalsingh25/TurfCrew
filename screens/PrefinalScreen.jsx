import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../AuthContext';
import { getRegistrationProgress } from '../registration-utils';

import Ionicons from 'react-native-vector-icons/Ionicons';

const PrefinalScreen = () => {
  const navigation = useNavigation();
  const {token, setToken} = useContext(AuthContext);
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', {screen: 'Main'});
    }
  }, [token]);

  useEffect(() => {
    getAllScreenData();
  }, []);

  const getAllScreenData = async () => {
    try {
      const screens = ['Register', 'Password', 'Name', 'Image']
      let userData = {};

      for(const screenName of screens) {
        const screenData = await getRegistrationProgress(screenName);
        if(screenData) {
          userData = {...userData, ...screenData}
        }
      }
      
      setUserData(userData);
    } catch (error) {
      console.log("Error", error);
    }
  }
  console.log("User: ", userData);

  const clearAllScreenData = async () => {
    try {
      const screens = ['Register', 'Password', 'Name', 'Image'];
      for (const screenName of screens) {
        const key = `registration_progress_${screenName}`;
        await AsyncStorage.removeItem(key);
      }
      console.log('All Screen data cleared!');
    } catch (error) {
      console.log('Error', error);
    }
  }

  const registerUser = async () => {
    try {
      const response = await axios
      .post("http://192.168.237.220:8000/register", userData)
      .then(response => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("token", token);
        setToken(token);
      });
      console.log("Res",response);
      
      clearAllScreenData();
    } catch (error) {
      console.log("ErrorA", error);
    }
  };
  
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View>
          <Image
            source={require('../public/title-logo.png')}
            style={{ height: 25, width: 220, marginLeft: 10 }}
          />
        </View>
      ),
      headerRight: () => (
        <View style={{marginHorizontal: 20}}>
        <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={35}
              color="black"
            />
        </View>
      )
    });
  }, []);

  return (
    <SafeAreaView style={styles.detailsContainer}>
      <View style={{marginTop: 80}}>
        <Text style={styles.mainTxt}>
          All set to register
        </Text>
        <Text style={styles.subText}>
          Setting up your profile for you
        </Text>
      </View>

      <Image 
        source={require('../public/animations/Finish.gif')}
        style={styles.finishAnimation}
      />

      <Pressable
        onPress={registerUser}
        style={styles.nextBtn}
      >
        <Text style={styles.nextText}> Finish Registering </Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default PrefinalScreen

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1, 
    backgroundColor: 'white', 
  },
  mainTxt: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 30,
  }, 
  subText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 10,
    marginRight: 50,
  },
  finishAnimation: { 
    height: 300, 
    width: 300, 
    marginTop: 50, 
    marginLeft: "auto", 
    marginRight: "auto" 
  },
  nextBtn: {
    backgroundColor: '#6495ED',
    marginTop: 'auto',
    marginBottom: 30,
    padding: 12,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  nextText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 23,
    fontWeight: '500',
  },
})