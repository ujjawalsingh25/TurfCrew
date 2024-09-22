import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'


import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PasswordScreen = () => {
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate("Name");
  }

  return (
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

        <TouchableOpacity 
          onPress={handleNext} 
          activeOpacity={0.8} 
          style={{marginTop:30,marginLeft:"auto"}}
        >
            <MaterialCommunityIcons
            style={{alignSelf:"center",marginTop:20}}
              name="arrow-right-circle"
              size={50}
              color="green"
            />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PasswordScreen

const styles = StyleSheet.create({
  passwordContainer: {
    marginTop: 90, 
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
    marginTop: 15,
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
    fontSize: 16, 
    marginTop: 7
  }
})