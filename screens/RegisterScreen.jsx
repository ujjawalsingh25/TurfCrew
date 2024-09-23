import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';

import { getRegistrationProgress, saveRegistrationProgress } from '../registration-utils';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Register').then(progressData => {
      if(progressData) {
        setEmail(progressData.email || '');
      }
    });
  }, [])

  const next = () => {
    if(email.trim() !== ""){
      saveRegistrationProgress('Register', {email});
    }
    navigation.navigate("Password");
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
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>
          You're almost there
        </Text>

        <View style={styles.emailContainer}>
          <Text style={styles.emailTxt}>Enter Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.inputBox}
          />
          <Pressable
              onPress={next}
              style={[
                styles.nextBtn, 
                {backgroundColor: email?.length > 5 ? '#6495ED' : '#E0E0E0',}
              ]}
          >
            <Text style={styles.netTxt}>Next</Text>
          </Pressable>
        </View>

        <View style={styles.agreeContainer}>
          <Text style={styles.agreeText}>
            I agree to receive updates over Whatsapp
          </Text>
          <Text style={styles.termsText}>
            By Signing up, you agree to the Terms of Service and Privacy and
            Privacy Policy
          </Text>
        </View>

        <View style={styles.logo}>
          <Image 
              source={require('../public/logo.png')} // Corrected local image source
              style={styles.logoImg}
            />
          <Text style={styles.logoTxt}>Your Sports Community</Text>
          <Text style={styles.logoTxt}>&copy;Ujjawal Singh</Text>
          <Text style={[styles.logoTxt, {marginBottom: 15}]}>All Rights Reserved</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  header: {
    padding: 25,
  },
  headerTxt: {
    fontSize: 18, 
    fontWeight: '500'
  },
  emailContainer: {
    flexDirection: 'column', 
    gap: 16, 
    marginVertical: 40
  },
  emailTxt: {
    fontSize: 20, 
    color: 'gray'
  },
  inputBox: {
    padding: 15,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    borderRadius: 10,
  },
  nextBtn: {
    padding: 15,
    borderRadius: 8,
  },
  netTxt: {
    textAlign: 'center'
  },
  agreeContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  agreeText: {
    textAlign: 'center', 
    fontWeight: '500', 
    fontSize: 17,
  },
  termsText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  logo: {
    marginTop: 60,
    marginLeft: "auto", 
    marginRight: "auto"
  },
  logoImg: {
    width: 250,
    height: 150,
    resizeMode: "contain",
    marginBottom: 12,
  },
  logoTxt: {
    color: "gray",
    textAlign: "center",
    fontSize: 16,
  },
})