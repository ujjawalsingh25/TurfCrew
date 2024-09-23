import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';


import Ionicons from 'react-native-vector-icons/Ionicons';

const PrefinalScreen = () => {
  const navigation = useNavigation();

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
        // onPress={registerUser}
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