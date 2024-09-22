import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const NameScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigation = useNavigation();

  const saveName = () => {
    navigation.navigate('Image');
  }

  return (
    <>
      <SafeAreaView style={styles.detailsContainer}>
        <View style={styles.iconBack}>
        <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="black"
            />
        </View>
        
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Complete your Profile
          </Text>
          <Text style={styles.subHeaderTxt}>
            What would you like your mates to call you? ❤️
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
        </View>
      </SafeAreaView>

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
    marginTop: 45
  },
  iconBack: {
    marginHorizontal: 10
  },
  header: {
    marginHorizontal: 10, 
    marginVertical: 15
  },
  headerText: {
    fontSize: 20, 
    fontWeight: 'bold'
  },
  subHeaderTxt: {
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
})