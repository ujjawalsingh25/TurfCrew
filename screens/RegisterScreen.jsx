import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={{padding: 13}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          You're almost there
        </Text>

        <View style={{flexDirection: 'column', gap: 16, marginVertical: 40}}>
          <Text style={{fontSize: 16, color: 'gray'}}>Enter Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.inputBox}
          />
          <Pressable
              // onPress={sendOTP}
              onPress={() => navigation.navigate("Password")}
              style={[
                styles.nextBtn, 
                {backgroundColor: email?.length > 5 ? '#6495ED' : '#E0E0E0',}
              ]}
          >
            <Text style={{textAlign: 'center'}}>Next</Text>
          </Pressable>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{textAlign: 'center', fontWeight: '500', fontSize: 15}}>
            I agree to receive updates over Whatsapp
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: 'gray',
              textAlign: 'center',
              marginTop: 20,
            }}>
            By Signing up, you agree to the Terms of Service and Privacy and
            Privacy Policy
          </Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
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
})