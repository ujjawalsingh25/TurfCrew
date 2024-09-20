import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'

import VenueCard from '../components/VenueCard';
import groundData from "../api/turf-grounds"

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BookScreen = () => {

  const [turfGrounds, setTurfGround] = useState([]);
  const navigation = useNavigation(); 

  // Set the turfGrounds data
  useEffect(() => {
    setTurfGround(groundData);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={styles.logoContainer}>
          <Image 
            // source={require('../public/dark-title-logo.png')}
            source={require('../public/title-logo.png')}
            style={{ height:25, width: 220, marginLeft: 10}}
          />
          <MaterialIcons name="keyboard-arrow-down" size={30} color="black" />
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRt}>
           <Ionicons name="chatbox-outline" size={30} color="black" />
           <Ionicons name="notifications-outline" size={30} color="black" />
           <Pressable>
            <Image 
              style={styles.accountImg}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/4140/4140061.png"
              }}
            />
           </Pressable>
        </View>
      )
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../public/title-logo.png')}
            style={{ height:25, width: 220, marginLeft: 10}}
          />
          <MaterialIcons name="keyboard-arrow-down" size={30} color="black" />
        </View>

          <View style={styles.headerIcon}>
            <Ionicons name="chatbox-outline" size={30} color="black" />
            <Ionicons name="notifications-outline" size={30} color="black" />
            <Image 
              style={styles.accountImg}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/4140/4140061.png"
              }}
            />
          </View>
        </View> */}

        <View style={styles.search}>
          <TextInput placeholder='Search Turf Grounds' />
          <FontAwesome name="search" size={30} color="gray" />
        </View>

        <Pressable style={styles.otherOption}>
          <View style={styles.otherOptionsBtn}>
             <Text>Sports & Availability</Text>
          </View>
          <View style={styles.otherOptionsBtn}>
             <Text>Favorites</Text>
          </View>
          <View style={styles.otherOptionsBtn}>
             <Text>Offers</Text>
          </View>
        </Pressable>

        <FlatList 
          data={turfGrounds} 
          renderItem={({item}) => <VenueCard item={item} />}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        />
    </SafeAreaView>
  )
}

export default BookScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  headerRt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    margin: 15,
  },
  accountImg: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  headerIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  search: {
    backgroundColor: "#E8E8E8",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 12,
    padding: 12, 
  },
  otherOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 13,
  },
  otherOptionsBtn: {
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 10, 
    padding: 10,
  }
})