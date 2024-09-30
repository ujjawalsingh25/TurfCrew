import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable, ImageBackground } from 'react-native';

import axios from 'axios';
import 'core-js/stable/atob';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../AuthContext';
import spotlight from '../api/data/spot-light';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const HomeScreen = () => {
  const navigation = useNavigation(); 
  const [user, setUser] = useState(null);
  const {userId, setToken, setUserId} = useContext(AuthContext);
  const [upcomingGames, setUpcomingGames] = useState([]);

  // const clearAuthToken = async () => {
  //   try{
  //     await AsyncStorage.removeItem("token");
  //     setToken("");
  //     setUserId("");
  //     navigation.replace("Start")
  //   } catch(error){
  //     console.log("Error",error)
  //   }
  // }
  
  // useEffect(() => {
  //   clearAuthToken();
  // },[])

  const fetchUser = async () => {
    try {
      console.log('UserId: ', userId);
      const response = await axios.get(`http://192.168.237.220:8000/user/${userId}`);
      console.log('Fetched user:', response.data);  
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  // console.log('user', userId);

  useEffect(() => {
    if (userId) {
      fetchUpcomingGames();
    }
  }, [userId]);

  const fetchUpcomingGames = async () => {
    try {
      // console.log('UpcomingGame: ', userId);
      const response = await axios.get(
        `http://192.168.237.220:8000/upcoming?userId=${userId}`,
      );
      setUpcomingGames(response.data);
    } catch (error) {
      console.error('Failed to fetch upcoming games:', error);
    }
  };
  // console.log('user', upcomingGames?.length);



  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View>
          {/* <Text style={{marginLeft: 25}}>TurfCrew</Text> */}
          <Image 
            source={require('../public/title-logo.png')}
            style={{ height:25, width: 220, marginLeft: 10}}
          />
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
                // uri: uri ? "https://cdn-icons-png.flaticon.com/128/4140/4140061.png"
                uri: user?.user?.image ? user.user.image : "https://cdn-icons-png.flaticon.com/128/4140/4140061.png",
              }}
            />
           </Pressable>
        </View>
      )
    })
  }, [user]);

  return (
    <ScrollView style={styles.container} >
      <View style={styles.viewContainer1}>
        <View>
          <Image 
            style={styles.imageBox}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/785/785116.png'
            }}
          />
        </View>

        <View>
          <View style={styles.viewContainer2}>
            <Text>Set Your Weekly Fit Goal</Text>
            <Image 
              style={styles.imageBox}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/426/426833.png'
              }}
          />
          </View>
          <Text style={{marginTop: 8, color: "gray"}}>Keep Yourself Fit</Text>
        </View>
      </View>

        <View style={styles.viewContainer3}>
          <View style={styles.viewContainer3b}>
            <Text style={{color:"#484848", fontSize: 13}}>GEAR UP FOR YOUR GAME</Text>
          </View>

          <View style={styles.viewContainer4}>
            <Text style={{fontSize: 16}}>Badminton Activity</Text>
            <Pressable style={styles.viewBtn}>
              <Text style={{textAlign: 'center'}}>View</Text>
            </Pressable>
          </View>

          <Text style={{marginTop: 4, color: "gray"}}>You have no Games Today</Text>

          <Pressable
            onPress={() => navigation.navigate("Play", {initialOption: 'Calendar'})}
            style={{marginTop: 10, marginBottom: 5, marginLeft: "auto", marginRight: "auto"}}
          >
            <Text style={{fontSize: 15, fontWeight: 600, textDecorationLine: "underline"}}>View Calendar</Text>
          </Pressable>
        </View>

        <View style={{flexDirection: "row", padding: 13, alignItems: "center", gap: 20}}>
          <Pressable 
            onPress={() => navigation.navigate('Play')}
            style={{flex:1}}
          >
            <View style={{borderRadius:10}}>
              <Image 
                style={{width: 200, height: 120, borderRadius: 10}}
                source={{
                  uri: 'https://superblog.supercdn.cloud/site_cuid_clr6oh1no0006rmr89yhkxgu8/images/dsc5239-1024x684-1024x516-1708090338044-compressed.webp'
                }}
              />
            </View>
            <Pressable 
              onPress={() => navigation.navigate('Play')}
              style={{backgroundColor: "white", padding: 12, width: 200, borderRadius: 10}}
            >
              <View>
                <Text style={{fontSize: 15, fontWeight: 500}}>PLAY</Text>
                <Text style={{fontSize: 15, color: "gray", marginTop: 7}}>Find PLayers and join their activities</Text>
              </View>
            </Pressable>
          </Pressable>
          
          <Pressable 
            style={{flex:1}}
            onPress={() => navigation.navigate('Book')}
          >
            <View style={{borderRadius:10}}>
              <Image 
                style={{width: 200, height: 120, borderRadius: 10}}
                source={{
                  uri: 'https://imgmedia.lbb.in/media/2018/09/5ba537b9d85eb11320ee2c30_1537554361300.jpg'
                }}
              />
            </View>
            <Pressable 
              onPress={() => navigation.navigate('Book')}
              style={{backgroundColor: "white", padding: 12, width: 200, borderRadius: 10}}
            >
              <View>
                <Text style={{fontSize: 15, fontWeight: 500}}>BOOK</Text>
                <Text style={{fontSize: 15, color: "gray", marginTop: 7}}>Book Your Slot in Venues Nearby</Text>
              </View>
            </Pressable>
          </Pressable>
        </View>

        <View style={{padding: 13}}>
          <View style={styles.viewContainer5}>
            <View style={styles.viewContainer5a}>
              <AntDesign name="addusergroup" size={30} color="white" />
            </View>
            <View>
              <Text style={{fontWeight: "bold"}}>GROUPS</Text>
              <Text style={{marginTop: 10, color: "gray"}}>Connect, Compete and Discuss</Text>
            </View>
          </View>
          
          <View style={[styles.viewContainer5, {marginTop: 15}]}>
            <View style={[styles.viewContainer5a, {backgroundColor: '#6495ED'}]}>
              <MaterialIcons name="sports-kabaddi" size={30} color="white" />
            </View>
            <View>
              <Text style={{fontWeight: "bold"}}>GAME TIME ACTIVITIES</Text>
              <Text style={{marginTop: 10, color: "gray"}}>50+ Turf Hosted Games</Text>
            </View>
          </View>
        </View>

        <View style={{padding: 10}}>
          <View style={{padding: 10, backgroundColor: "white", borderRadius: 10}}>
            <Text style={{fontSize: 15, fontWeight: 500}}>SpotLight</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {spotlight?.map((item ,index) => (
                <ImageBackground 
                  key={item.id}
                  style={styles.imgBg} 
                  imageStyle={{borderRadius: 10}}
                  source={{uri: item?.image }} 
                />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* <View>
          <View style={{marginLeft: "auto", marginRight: "auto"}}>
            <Image 
              source={require('../public/logo.png')} // Corrected local image source
              style={styles.logoImg}
            />
          </View>
          <Text style={styles.logoTxt}>Your Sports Community</Text>
          <Text style={styles.logoTxt}>&copy;Ujjawal Singh</Text>
          <Text style={[styles.logoTxt, {marginBottom: 15}]}>All Rights Reserved</Text>
        </View> */}
    </ScrollView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  accountImg: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  headerRt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    margin: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  imageBox: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  imgBg: {
    width: 200, 
    height: 280,
    elevation: 3,
    resizeMode: "contain",
    marginRight: 10,
    marginVertical: 15,
  },
  viewContainer1: {
    padding: 13,
    backgroundColor: "white",
    margin: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 5,
  },
  viewContainer2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewContainer3: {
    padding: 13,
    backgroundColor: "white",
    marginHorizontal: 13,
    marginVertical: 16,
    borderRadius: 12,
  },
  viewContainer3b: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    width: 200,
    marginVertical: 5,
  },
  viewContainer4: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
  },
  viewBtn: {
    backgroundColor: "#FBFCF8",
    borderRadius: 7,
    padding: 10,
    shadowColor: "#212121",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    width: 80, 
  },
  viewContainer5: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10
  },
  viewContainer5a: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#29AB87",
    elevation: 3,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImg: {
    width: 220,
    height: 150,
    resizeMode: "contain",
  },
  logoTxt: {
    color: "gray",
    textAlign: "center",
    fontSize: 16,
  },
})