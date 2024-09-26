import React, { useLayoutEffect, useState } from 'react'
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const PlayScreen = () => {
  const navigation = useNavigation(); 
  const [option, setOptions] = useState("My Sports");
  const [sport, setSport] = useState("Cricket");


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
    <SafeAreaView>
      <View style={styles.header}>
        {/* <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../public/title-logo.png')}
              style={{ height:25, width: 220, marginLeft: 10}}
            />
            <MaterialIcons name="keyboard-arrow-down" size={30} color="black" />
          </View>
          <View style={styles.navIcon}>
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

        <View style={styles.navContainer}>
          <Pressable onPress={() => setOptions('Calendar')}>
            <Text style={[
              styles.navText,
              {color: option == "Calendar" ? "#007FFF" : "black"}
            ]}>Calendar</Text>
          </Pressable>
          <Pressable onPress={() => setOptions('My Sports')}>
            <Text style={[
              styles.navText,
              {color: option == "My Sports" ? "#007FFF" : "black"}
            ]}>My Sports</Text>
          </Pressable>
          <Pressable onPress={() => setOptions('Other Sports')}>
            <Text style={[
              styles.navText,
              {color: option == "Other Sports" ? "#007FFF" : "black"}
            ]}>Other Sports</Text>
          </Pressable>
        </View>

        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable 
              onPress={() => setSport('Cricket')}
              style={[
                styles.sportItem, 
                {borderWidth: sport == "Cricket" ? 0 : 1},
                {backgroundColor: sport == "Cricket" ? "#6495ED" : "transparent"}
              ]}
            >
              <Text style={[
                styles.sportItemText,
                {color: sport == "Cricket" ? "white" : "black"}]}
              >Cricket</Text>
            </Pressable>
            <Pressable 
              onPress={() => setSport('Football')}
              style={[
                styles.sportItem, 
                {borderWidth: sport == "Football" ? 0 : 1},
                {backgroundColor: sport == "Football" ? "#6495ED" : "transparent"}
              ]}
            >
              <Text style={[
                styles.sportItemText,
                {color: sport == "Football" ? "white" : "black"}]}
              >Football</Text>
            </Pressable>
            <Pressable 
              onPress={() => setSport('Badminton')}
              style={[
                styles.sportItem, 
                {borderWidth: sport == "Badminton" ? 0 : 1},
                {backgroundColor: sport == "Badminton" ? "#6495ED" : "transparent"}
              ]}
            >
              <Text style={[
                styles.sportItemText,
                {color: sport == "Badminton" ? "white" : "black"}]}
              >Badminton</Text>
            </Pressable>
            <Pressable 
              onPress={() => setSport('Kabaddi')}
              style={[
                styles.sportItem, 
                {borderWidth: sport == "Kabaddi" ? 0 : 1},
                {backgroundColor: sport == "Kabaddi" ? "#6495ED" : "transparent"}
              ]}
            >
              <Text style={[
                styles.sportItemText,
                {color: sport == "Kabaddi" ? "white" : "black"}]}
              >Kabaddi</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>

      <View style={styles.actionBar}>
        <Pressable onPress={() => navigation.navigate('Create')}>
          <Text style={{fontWeight: "bold"}}>Create Game</Text>
        </Pressable>
        <View style={styles.actionFunc}>
          <Pressable>
            <Text style={{fontWeight: "bold"}}>Filter</Text>
          </Pressable>
          <Pressable>
            <Text style={{fontWeight: "bold"}}>Sort</Text>
          </Pressable>
        </View>
      </View>

      
    </SafeAreaView>
  )
}

export default PlayScreen

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    // backgroundColor: "#223536",
    padding: 12,
    // marginTop: 30,
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
  navIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  accountImg: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  navContainer: {
    flexDirection: "row", 
    alignItems: "center",
    gap: 10,
    marginVertical: 13,
  },
  navText: {
    fontWeight: "500",
    fontSize: 15
  },
  sportItem: {
    borderColor: 'black',
    // borderColor: 'white',
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
  },
  sportItemText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 15,
  },
  actionBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginTop: 2,
    // backgroundColor: "#E5E4E2"
    // backgroundColor: "#FAF9F6"
    backgroundColor: "#fff"
  },
  actionFunc: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  }
})