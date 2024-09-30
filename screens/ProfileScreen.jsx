import axios from 'axios';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AuthContext } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const {userId, setToken, setUserId} = useContext(AuthContext);

  const clearAuthToken = async () => {
    try{
      await AsyncStorage.removeItem("token");
      setToken("");
      setUserId("");
      navigation.replace("Start")
    } catch(error){
      console.log("Error",error)
    }
  }

  const fetchUser = async () => {
    try {
      // console.log('UserId: ', userId);
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View>
          {/* <Text style={{marginLeft: 25}}>TurfCrew</Text> */}
          <Image 
            source={require('../public/title-logo.png')}
            style={{ height:25, width: 220, marginLeft: 25}}
          />
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRt}>
          {/* <Ionicons name="settings" size={30} color="black" /> */}
        </View>
      )
    })
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{padding: 12}}>
          <View style={styles.optionContainer}>
            
            <View style={[styles.option3, {marginTop: 0}]}>
              <Image 
                style={styles.accountImg}
                source={{
                  uri: user?.user?.image ? user?.user.image : "https://cdn-icons-png.flaticon.com/128/4140/4140061.png",
                }}
              />
              <View style={{}}>
                <Text style={styles.accountName}>
                  {user?.user?.firstName} {user?.user?.lastName}
                </Text>
                <Text style={styles.accountStatus}>
                  Status that the user added..!!
                </Text>
              </View>
            </View>
            <View style={styles.break}/>

            <View style={styles.option}>
              <View style={styles.icon}>
                <Ionicons name="calendar-sharp" size={28} color="green" />
              </View>
              <View style={{}}>
                <Text style={styles.optionTxt}>My Bookings</Text>
                <Text style={styles.optionsSubTxt}>
                  View Transactions & Receipts
                </Text>
              </View>
            </View>
            <View style={styles.break2}/>

            <View style={styles.option}>
              <View style={styles.icon}>
                <FontAwesome name="group" size={28} color="green" />
              </View>
              <View style={{}}>
                <Text style={styles.optionTxt}>Playpals</Text>
                <Text style={styles.optionsSubTxt}>
                  View & Manage Players
                </Text>
              </View>
            </View>
            <View style={styles.break2}/>

            <View style={styles.option}>
              <View style={styles.icon}>
                <FontAwesome name="wechat" size={28} color="green" />
              </View>
              <View style={{}}>
                <Text style={styles.optionTxt}>Chats & Blogs</Text>
                <Text style={styles.optionsSubTxt}>
                  Connect with players & Share photos
                </Text>
              </View>
            </View>
            <View style={styles.break2}/>

            {/* <View style={styles.option}>
              <View style={styles.icon}>
                <FontAwesome5 name="blog" size={28} color="green" />
              </View>
              <View style={{}}>
                <Text style={styles.optionTxt}>Blogs</Text>
                <Text style={styles.optionsSubTxt}>
                  Share games photos and videos
                </Text>
              </View>
            </View>
            <View style={styles.break2}/> */}

            <View style={styles.optionLast}>
              <View style={styles.icon}>
                <MaterialIcons name="energy-savings-leaf" size={28} color={'green'} />
              </View>
              <View style={{}}>
                <Text style={styles.optionTxt}>
                  Preference and Privacy
                </Text>
                <Text style={styles.optionsSubTxt}>
                  Who can access your account?
                </Text>
              </View>
            </View>

          </View>
        </View>


        <View style={{padding: 12}}>
          <View style={styles.optionContainer}>

            <View style={[styles.option3, {marginTop: 0}]}>
              <View style={styles.icon}>
                <MaterialCommunityIcons name="offer" size={30} color="green" />
              </View>
              <View style={{}}>
                <Text style={styles.optionTxt}>Offers</Text>
                <Text style={styles.optionsSubTxt}>
                  Get coupons and new offers
                </Text>
              </View>
            </View>
            <View style={styles.break}/>

            <View style={styles.option3}>
              <View style={styles.icon}>
                <MaterialIcons name="account-balance" size={30} color="green" />
              </View>
              <View style={{}}>
                <Text style={styles.optionTxt}>Paasbook</Text>
                <Text style={styles.optionsSubTxt}>
                  Manage TurfCredits and Account balance
                </Text>
              </View>
            </View>
            <View style={styles.break}/>

            <View style={styles.option3}>
              <View style={styles.icon}>
                <AntDesign name="addusergroup" size={30} color="green" />
              </View>
              <View style={{}}>
                <Text style={styles.optionTxt}>Invite & Earn</Text>
                <Text style={styles.optionsSubTxt}>
                  Send referrals and get benifits
                </Text>
              </View>
            </View>
            <View style={styles.break}/>

            <View style={styles.option2}>
              <View style={styles.icon}>
                <MaterialIcons name="support-agent" size={30} color="green" />
              </View>
              <View style={{}}>
                <Text style={styles.optionTxt}>Help & Support</Text>
                <Text style={styles.optionsSubTxt}>
                  We are here to assits you
                </Text>
              </View>
            </View>
            <View style={styles.break2}/>

            <View style={styles.option2}>
              <View style={styles.icon}>
                <MaterialCommunityIcons name="logout" size={30} color="green" />
              </View>
              <Pressable onPress={clearAuthToken}>
                <Text style={styles.optionTxt}>Logout</Text>
                <Text style={styles.optionsSubTxt}>
                  Login to another account
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  accountImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  accountName: {
    fontSize: 22,
    fontWeight: "600",
  },
  accountStatus: {
    fontSize: 16,
    // fontWeight: "600",
    marginTop: 3, 
    color: 'gray',
  },
  headerRt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginRight: 25,
  },
  container: {
    // flex: 1,
    backgroundColor: "#F8F8F8",
  },
  break: {
    height: 1,
    borderColor: '#E0E0E0',
    borderWidth: 0.5,
    marginTop: 15,
  },
  break2: {
    height: 1, 
    borderColor: '#E0E0E0', 
    borderWidth: 0.5
  },
  optionContainer: {
    backgroundColor: 'white', 
    padding: 10, 
    borderRadius: 10
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 15,
  },
  option2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  option3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  optionLast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTxt: {
    fontSize: 16, 
    fontWeight: '500'
  },
  optionsSubTxt: {
    marginTop: 7, 
    color: 'gray',
  },
})