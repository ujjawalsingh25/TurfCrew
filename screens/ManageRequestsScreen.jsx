import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ManageRequestsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [players, setPlayers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [option, setOption] = useState('Requests');
  
  const userId = route?.params?.userId;
  const gameId = route?.params?.gameId;
  console.log(userId);
  console.log(gameId);


  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `http://192.168.237.220:8000/games/${gameId}/requests`,
      );
      setRequests(response.data);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };
  console.log("Requests: ", requests);

  const acceptRequest = async userId => {
    try {
      const user = {
        gameId: gameId,
        userId: userId,
      };
      console.log(user);
      const response = await axios.post('http://192.168.237.220:8000/accept', user);
      if (response.status === 200) {
        Alert.alert('Success', 'Request accepted');
        await fetchRequests();
        await fetchPlayers();     // Optionally, refresh the data or update the stat
      }
    } catch (error) {
      console.error('Failed to accept request:', error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        `http://192.168.237.220:8000/game/${gameId}/players`,
      );
      setPlayers(response.data);
    } catch (error) {
      console.error('Failed to fetch players:', error);
    }
  };  
  console.log("Players: ", players);

  useLayoutEffect(() => {
    navigation.setOptions({
        headerTitle: "",
        headerStyle: { backgroundColor: '#223536' }, //#294461
        headerLeft: () => (
        <View style={styles.topHeader}>
            <Text style={styles.topHeaderTxt}>Manage</Text>
            <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back" size={35} color="white"
            />
        </View>),
        headerRight: () => (
          <View style={styles.topHeaderRt}>
            <View style={styles.matchFull}>
              <Text style={styles.matchFullTxt}> Match Full </Text>
              <FontAwesome
                // onPress={() => toggleMatchFullStatus(route?.params?.item?._id)}
                // name={
                //   matchFull || route?.params?.item?.matchFull == true
                //     ? 'toggle-on'
                //     : 'toggle-off'
                // }
                name="toggle-on" size={24} color="white"
              />
            </View>
            <AntDesign name="plussquareo" size={30} color="white" />
          </View>
        )
    })
  }, []);  

  return (
    <SafeAreaView>
      <View style={styles.nav}>
        <View style={styles.navBtn}>
          
          <Pressable onPress={() => setOption('Requests')}>
            <Text
              style={{
                fontWeight: '500',
                color: option == 'Requests' ? '#1dd132' : 'white',
              }}>
              {/* Requests ({route?.params?.requests?.length})   ////cmtOFF */} 
              Requests({requests?.length})
            </Text>
          </Pressable>

          <Pressable onPress={() => setOption('Invited')}>
            <Text
              style={{
                fontWeight: '500',
                color: option == 'Invited' ? '#1dd132' : 'white',
              }}>
              Invited(0)
            </Text>
          </Pressable>

          <Pressable onPress={() => setOption('Playing')}>
            <Text
              style={{
                fontWeight: '500',
                color: option == 'Playing' ? '#1dd132' : 'white',
              }}>
              Playing({players?.length})
            </Text>
          </Pressable>

          <Pressable onPress={() => setOption('Retired')}>
            <Text
              style={{
                fontWeight: '500',
                color: option == 'Retired' ? '#1dd132' : 'white',
              }}>
              Retired(0)
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.card}>
        <View>
          {option == 'Requests' && (
            <View>
              {/* {route?.params?.requests?.map((item, index) => ( */}  
              {requests?.map((item, index) => (
                <Pressable style={styles.cardContainer}>
                  
                  <View style={styles.reqUser}>
                    <Image
                      style={styles.reqUserImg}
                      source={{uri: item?.image}}
                    />
                    <View style={{flex: 1}}>
                      <Text style={styles.reqUserName}>
                        {item?.firstName} {item?.lastName}
                      </Text>
                      <View
                        style={styles.tags}>
                        <Text style={{fontSize: 13}}>INTERMEDIATE</Text>
                      </View>
                    </View>

                    <View>
                      <Image
                        style={styles.logoImg}
                        source={require('../public/logo.png')} 
                      />
                    </View>
                  </View>

                  <Text style={styles.commentTxt}>{item?.comment}</Text>

                  <View style={styles.break}/>
                  <View style={styles.lowerTabs}>
                    <View>
                      <View style={styles.showsRepu}>
                        <Text style={styles.showsTxt}>0 NO SHOWS</Text>
                      </View>
                      <Text style={styles.repuTxt}>See Reputation</Text>
                    </View>

                    <View style={styles.actions}>
                      <Pressable style={styles.retireBtn}>
                        <Text style={styles.retireTxt}>RETIRE</Text>
                      </Pressable>

                      <Pressable
                        onPress={() => acceptRequest(item.userId)}
                        style={styles.acceptBtn}
                      >
                        <Text style={styles.acceptTxt}>ACCEPT</Text>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>

      <View style={styles.playerContainer}>
        <View>
          {option == 'Playing' && (
            <>
              <View style={{}}>
                {players?.map((item, index) => (
                  <>
                    <View style={styles.players}>
                      <Pressable key={index} style={styles.playerCard}>
                        <View>
                          <Image
                            style={styles.playerImg}
                            source={{uri: item?.image}}
                          />
                        </View>

                        <View>
                          <Text style={styles.playerName}>
                            {item?.firstName} {item?.lastName}
                          </Text>
                          <View style={styles.tags}>
                            <Text style={styles.intermedTxt}>
                              INTERMEDIATE
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                      <View>
                        <Image
                          style={styles.logoImg}
                          source={require('../public/logo.png')} 
                        />
                      </View>
                    </View>
                    <View style={styles.break}/>
                  </>
                ))}
              </View>
            </>
          )}
        </View>
      </View>      
    </SafeAreaView>
  )
}

export default ManageRequestsScreen;

const styles = StyleSheet.create({
  topHeader: {
    flexDirection:"row-reverse", 
    alignItems: "center",
    gap: 30, 
    marginHorizontal: 12,
  },
  topHeaderTxt: {
      fontSize: 22, 
      fontWeight: 'bold', 
      color: 'white',
  },
  topHeaderRt: {
    flexDirection: "row", 
    alignItems: "center",
    gap: 15,
  },
  matchFull: {
    flexDirection: "row-reverse", 
    alignItems: "center",
    justifyContent: "center",
  },
  matchFullTxt: {
    fontSize: 17, 
    fontWeight: '500', 
    color: 'white'
  }, 
  
  break: {
    height: 1,
    borderColor: '#E0E0E0',
    borderWidth: 0.7,
    marginVertical: 15,
  },
  container: {
      // flex: 1,
      backgroundColor: 'white',
      // padding: 10,
  },
  nav: {
    padding: 12, 
    backgroundColor: '#223536'
  },
  navBtn: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },    
  card: {
    marginTop: 10, 
    marginHorizontal: 15
  },
  cardContainer: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 6,
  },
  reqUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
  },
  reqUserImg: {
    width: 50, 
    height: 50, 
    borderRadius: 25
  },
  reqUserName: {
    fontWeight: '600'
  },
  tags: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 10,
    borderRadius: 20,
    borderColor: '#E0E0E0',
    backgroundColor: "#E0E0E0",
    borderWidth: 2,
    alignSelf: 'flex-start',
    elevation: 3,
  },
  logoImg: {
    width: 110,
    height: 60, 
    resizeMode: 'contain'
  },
  commentTxt: {
    marginTop:8
  },
  lowerTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  showsRepu: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  showsTxt: {
    fontSize: 14, 
    color: 'gray'
  },
  repuTxt: {
    marginTop: 10,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  retireBtn: {
    padding: 10,
    borderRadius: 6,
    borderColor: '#E60026',
    backgroundColor: "#E60026",
    borderWidth: 1,
    width: 100,
  },
  retireTxt: {
    textAlign: 'center',
    color: 'white'
  },
  acceptBtn: {
    padding: 10,
    borderRadius: 6,
    borderColor: '#26bd37',
    backgroundColor: '#26bd37',
    borderWidth: 1,
    width: 100,
  },
  acceptTxt: {
    textAlign: 'center', 
    color: 'white',
  },
  playerContainer: {
    marginTop: 10, 
    marginHorizontal: 15,
    padding: 12,
  },
  players: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between"
  },
  playerCard: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playerName: {
    fontWeight: "600",
    fontSize: 20,
  },
  playerImg: {
    width: 60, 
    height: 60, 
    borderRadius: 30,
  },
  intermedTxt: {
    fontSize: 12, 
    fontWeight: '400'
  },
})

