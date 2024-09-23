import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'

import { getRegistrationProgress, saveRegistrationProgress } from '../registration-utils';

import Ionicons from 'react-native-vector-icons/Ionicons';

const SelectImage = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState();

  useEffect(() => {
    getRegistrationProgress('Image').then(progressData => {
      if (progressData) {
        setImage(progressData.image || '');
      }
    });    
  }, [])

  const saveImage = () => {
    if(image.trim() !== '') {
      saveRegistrationProgress('Image', {image});
    }
    navigation.navigate("PreFinal");
  }

  const images = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/4140/4140061.png',
    },
    {
      id: '1',
      image: 'https://st2.depositphotos.com/2703645/7303/v/450/depositphotos_73039841-stock-illustration-male-avatar-icon.jpg',
    },
    {
      id: '2',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683469.png',
    },
    {
      id: '3',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683439.png',
    },
    {
      id: '4',
      image: 'https://cdn-icons-png.flaticon.com/128/4202/4202835.png',
    },
    {
      id: '5',
      image: 'https://cdn-icons-png.flaticon.com/128/3079/3079652.png',
    },
  ];

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
      <SafeAreaView style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Complete Your Profile
          </Text>

          <Text style={styles.subHeaderTxt}>
            What would you like your mates to see you? 
          </Text>
        </View>

        <View style={{marginVertical: 25}}>
          <View style={styles.imgBox}>
            <Image
              style={styles.imgSelect}
              source={{uri: image ? image : images[0]?.image}}
            />
          </View>

          <View style={styles.imgOpt}>
            {images?.map((item, index) => (
              <Pressable
                onPress={() => setImage(item?.image)}
                style={styles.allAvatars}
                key={index}
              >
                <Image
                  style={[
                    styles.avatarSelect,
                    {borderColor: image == item?.image ? 'green' : 'transparent',}
                  ]}
                  source={{uri: item.image}}
                />
              </Pressable>
            ))}
          </View>

          <Text style={styles.or}>
            OR
          </Text>
          <View style={{marginHorizontal: 20, marginVertical: 20}}>
            <View>
              <Text style={{fontSize: 20}}>
                Enter Image link
              </Text>
              <TextInput 
                value={image}
                onChangeText={setImage}
                placeholder="Image link"
                style={styles.imgLinkInput}              
              />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <Pressable
        onPress={saveImage}
        style={styles.nextBtn}
      >
        <Text style={styles.nextText}>Next</Text>
      </Pressable>
    </>
  )
}

export default SelectImage

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
  imgBox: {
    justifyContent: 'center', 
    alignItems: 'center'
  },
  imgSelect: {
    width: 120,
    height: 120,
    borderRadius: 50,
    borderColor: 'green',
    borderWidth: 5,
    resizeMode: 'cover',
  },
  imgOpt: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: "wrap",
    marginVertical: 25,
    marginHorizontal: 25,
    justifyContent: 'center',
  },
  avatarSelect: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 2,
    resizeMode: 'contain',
  },
  allAvatars: {
    margin: 15, 
    gap: 20,
  },
  or: {
    textAlign: 'center', 
    color: 'gray', 
    fontSize: 25
  },
  imgLinkInput: {
    fontSize: 16,
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