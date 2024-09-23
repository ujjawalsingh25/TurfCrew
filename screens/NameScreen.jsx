import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { getRegistrationProgress, saveRegistrationProgress } from '../registration-utils';

import Ionicons from 'react-native-vector-icons/Ionicons';

const NameScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Name').then(progressData => {
      if (progressData) {
        setFirstName(progressData.firstName || '');
        setLastName(progressData.lastName || '');
      }
    });
  }, [])

  const saveName = () => {
    if(firstName.trim() !== '') {
      saveRegistrationProgress('Name', {firstName, lastName});
    }
    navigation.navigate('Image');
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
        <SafeAreaView style={styles.detailsContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Complete your Profile
            </Text>
            <Text style={styles.subHeaderTxt}>
              What would you like your mates to call you? 
            </Text>
          </View>

          <View style={styles.nameContainer}>
            <View>
              <Text style={styles.nameTxt}>First Name *</Text>
              <TextInput 
                value={firstName}
                onChangeText={setFirstName}
                style={styles.firstNameInput}
              />
            </View>
            <View>
              <Text style={styles.nameTxt}>Last Name</Text>
              <TextInput 
                value={lastName}
                onChangeText={setLastName}
                style={styles.lastNameInput}
              />
            </View>
            <View>
              <Text style={styles.nameTxt}>Age</Text>
              <TextInput 
                placeholder='Should be greater than 8'
                style={styles.lastNameInput}
              />
            </View>

            <Image 
              source={require('../public/animations/hello.gif')}
              style={styles.helloAnimation}
            />
          </View>
        </SafeAreaView>
      </ScrollView>

      <Pressable 
        onPress={saveName}
        style={styles.nextBtn}
      >
        <Text style={styles.nextText}>Next</Text>
      </Pressable>
    </>
  )
}

export default NameScreen

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1, 
    backgroundColor: 'white',
  },
  header: {
    marginHorizontal: 10, 
    marginVertical: 15
  },
  headerText: {
    fontSize: 25, 
    fontWeight: 'bold'
  },
  subHeaderTxt: {
    fontSize: 17,
    marginTop: 10, 
    color: 'gray'
  },
  nameContainer: {
    backgroundColor: 'white',
    marginHorizontal: 12,
    marginVertical: 25,
    flexDirection: 'column',
    gap: 20,
  },
  nameTxt: {
    fontSize: 16,   
    color: 'gray'
  },
  firstNameInput: {
    padding: 18,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  lastNameInput: {
    padding: 18,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  nextBtn: {
    backgroundColor: '#6495ED',
    marginTop: 'auto',
    marginBottom: 30,
    padding: 10,
    marginHorizontal: 30,
    borderRadius: 8,
  },
  nextText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  helloAnimation: { 
    height: 200, 
    width: 200, 
    // marginTop: 20, 
    marginLeft: "auto", 
    marginRight: "auto" 
  },
})