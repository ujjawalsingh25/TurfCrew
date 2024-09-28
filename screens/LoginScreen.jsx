import { 
  View, 
  Text, 
  Image, 
  TextInput, 
  Pressable, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView,
  ScrollView, 
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import { AuthContext } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userId, setUserId, token, setToken} = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', {screen: 'Main'});
    }
  }, [token, navigation]);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios.post('http://192.168.237.220:8000/login', user).then(response => {
      const token = response.data.token;
      console.log("token",token)
      AsyncStorage.setItem('token', token);
      setToken(token);
    });
  };

  return (
    <SafeAreaView  style={styles.container}>
      <View  style={styles.container2}>
        <KeyboardAvoidingView>
          <View style={styles.auth}>
            <Image 
              source={require('../public/animations/login.gif')} // Corrected local image source
              style={styles.authImg}
              />
          </View>
          <View style={styles.header}>
            <Text style={styles.headerTxt}>
              Login to your account
            </Text>
          </View>

          <ScrollView>
            <View style={{marginTop: 50}}>
              <View>

                <Text style={styles.emailTxt}>Email</Text>
                <View>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#BEBEBE"
                    placeholder="Enter your email"
                    style={[styles.inputTxt, {fontSize: email ? 15 : 15,}]}
                  />
                </View>

                <Text
                  style={styles.passwordTxt}>Password</Text>
                <View>
                  <TextInput
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    placeholderTextColor="#BEBEBE"
                    placeholder="Enter your password"
                    style={[styles.inputTxt, {fontSize: email ? 15 : 15,}]}
                  />
                </View>
              </View>

              <Pressable
                onPress={handleLogin}
                style={styles.login}
              >
                <Text style={styles.loginTxt}>Login</Text>
              </Pressable>

              <Pressable 
                onPress={() => navigation.navigate('Register')}
                style={styles.signupBtn}
              >
                <View style={{flexDirection: "row", gap: 5}}>
                  <Text style={styles.signupQues}>Don't have an account? </Text>
                  <Text style={styles.signup}>Sign Up</Text>
                </View>
              </Pressable>
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
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'white'
  },
  container2: {
    padding: 10, 
    alignItems: 'center'
  },
  auth: {
    // backgroundColor: "#6594ED",
    alignItems: "center",
    marginTop: 20,
  },
  authImg: {
    width: 300,
    height: 200,
    resizeMode: "contain", 
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTxt: {
    fontSize: 25, 
    fontWeight: "500",
  },

  emailTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
  },
  passwordTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
    marginTop: 25,
  },
  inputTxt: {
    width: 340,
    marginTop: 15,
    borderBottomColor: '#BEBEBE',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  login: {
    width: 200,
    backgroundColor: '#6495ED',
    padding: 12,
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 6,
  },
  loginTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signup: {
    color:"#E97451",
    fontSize:20,
  },
  signupQues: {
    color:"#212121",
    fontSize:20,
  },
  logo: {
    marginTop: 20,
    marginLeft: "auto", 
    marginRight: "auto"
  },
  logoImg: {
    width: 200,
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