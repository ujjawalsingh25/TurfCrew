import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { saveRegistrationProgress } from '../registration-utils';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PasswordScreen = () => {
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleNext = () => {
    if(password.trim() !== '') {
      saveRegistrationProgress('Password', {password});
    }
    navigation.navigate("Name");
  }

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
    <>
      <ScrollView style={{backgroundColor: "white"}}>
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <View style={styles.passwordContainer}>
            <View style={styles.unlock}>
              <View style={styles.unlockIcon}>
                <AntDesign name="lock1" size={30} color="green" />
              </View>
              <Image
                style={{width: 100, height: 40}}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
                }}
              />
            </View>

            <Text style={styles.passInputHeader}>
                Please choose a password
            </Text>
            <TextInput
              autoFocus={true}
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="Enter your password"
              placeholderTextColor={'#BEBEBE'}
              style={[styles.passInput, {fontSize: password ? 22 : 16}]}
            />
            <Text style={styles.noteTxt}>
              Note: Your details will be safe with us
            </Text>

            <View>
                <Text style={styles.ReEnterTxt}>Re-enter Password</Text>
                <TextInput 
                  autoFocus={true}
                  secureTextEntry={true}
                  placeholder='Should be same as given above'
                  style={styles.ReEnterInput}
                />
              </View>

            <TouchableOpacity 
              onPress={handleNext} 
              activeOpacity={0.8} 
              style={styles.next}
            >
                <MaterialCommunityIcons
                style={{alignSelf:"center",marginTop:20}}
                  name="arrow-right-circle"
                  size={50}
                  color="green"
                />
                <Image 
                  source={require('../public/animations/password.gif')}
                  style={styles.passwordAnimation}
              />
              </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  )
}

export default PasswordScreen

const styles = StyleSheet.create({
  passwordContainer: {
    marginTop: 40, 
    marginHorizontal: 20
  },
  unlock: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  unlockIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passInputHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 25,
  },
  passInput: {
    width: 340,
    marginVertical: 10,
    marginTop: 25,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  noteTxt: {
    color: 'gray', 
    fontSize: 17, 
    marginTop: 7
  },
  ReEnterTxt: {
    marginTop: 40,
    fontSize: 20,   
    color: 'gray'
  },
  ReEnterInput: {
    padding: 18,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  next: {
    flexDirection: "row-reverse",
    marginTop:30,
    marginLeft:"auto", 
    gap:10,
  },
  passwordAnimation: { 
    height: 150, 
    width: 150, 
    // marginTop: 20, 
    marginLeft: "auto", 
    marginRight: "auto" 
  },
  constraints: {
    marginLeft: 30,
  },
  list: {
    color: "gray",
    fontSize: 20,
  },
  lists: {
    color: "gray",
    fontSize: 18,
  }
})