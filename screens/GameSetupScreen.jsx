import axios from 'axios';
import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { AuthContext } from '../AuthContext';
import {BottomModal} from 'react-native-modals';
import {ModalContent} from 'react-native-modals';
import {SlideAnimation} from 'react-native-modals';

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GameSetupScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [query, setQuery] = useState("");
  const [comment, setComment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const {userId, setToken, setUserId} = useContext(AuthContext);
  
  console.log('Route', route.params);

    const sendJoinRequest = async gameId => {
        try {
            const response = await axios.post(
            `http://192.168.237.220:8000/games/${gameId}/request`,
            { userId, comment },
            );

            if (response.status == 200) {
            Alert.alert('Request Sent', 'please wait for the host to accept!', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => setModalVisible(false)},
            ]);
            }
            console.log('Request sent successfully:', response.data);
        } catch (error) {
            console.error('Failed to send request:', error);
        }
    };

   useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerStyle: { backgroundColor: '#294461' },
            headerLeft: () => (
            <View style={styles.topHeader}>
                <Text style={styles.topHeaderTxt}>Game</Text>
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="arrow-back" size={35} color="white"
                />
            </View>),
            headerRight: () => (
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Entypo name="share" size={26} color="white" />
                <Entypo name="dots-three-vertical" size={26} color="white" />
            </View>)
        })
    }, [])

  return (
    <>
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.nav}>
                    <View style={styles.gameDetail}>
                        <Text style={styles.gameTxt}>{route?.params?.item?.sport}</Text>
                        <View style={styles.gameType}>
                            <Text>Regular</Text>
                        </View>
                        <View style={styles.matchFull}>
                            <Text style={styles.matchFullTxt}> Match Full </Text>
                            <FontAwesome
                            //   onPress={() => toggleMatchFullStatus(route?.params?.item?._id)}
                            //   name={
                            //     matchFull || route?.params?.item?.matchFull == true
                            //       ? 'toggle-on'
                            //       : 'toggle-off'
                            //   }
                            name="toggle-on"
                            size={24}
                            color="white"
                            />
                        </View>
                    </View>

                    <View style={{marginTop: 10}}>
                    <Text style={styles.gameDate}>
                        {route?.params?.item?.time} • {route?.params?.item?.date}
                    </Text>
                    </View>

                    <Pressable style={styles.groundBtn}
                        // onPress={() =>
                        // navigation.navigate('Slot', {
                        //     place: route?.params?.item?.area, // Pass the selected venue object
                        //     sports: venue?.sportsAvailable || [], // Pass the sports available at the venue
                        //     date: route?.params?.item?.date,
                        //     slot: route?.params?.item?.time,
                        //     startTime: startTime,
                        //     endTime: endTime,
                        //     gameId: route?.params?.item?._id,
                        //     bookings: venue?.bookings,
                        // })
                        // }
                    >
                        <Entypo name="location" size={30} color="white" />

                        <View>
                        <Text style={styles.groundTxt}>
                            {route?.params?.item?.area}
                        </Text>
                        </View>
                    </Pressable>
                </View>

                <View style={styles.expense}>
                    <MaterialCommunityIcons name="directions-fork" size={40} color="#adcf17"/>
                    <View>
                        <Text style={{fontSize: 15}}>Add Expense</Text>
                        <View style={styles.expenseContainer}>
                            <Text style={{width: '80%', color: 'gray'}}>
                                Start adding your expenses to split cost among players
                            </Text>
                            <Entypo name="chevron-small-right" size={40} color="gray" />
                        </View>
                    </View>
                </View>

                <View style={{marginHorizontal: 15}}>
                    <Image
                        style={styles.saleImg}
                        source={{
                            // uri: 'https://playo.gumlet.io/OFFERS/PlayplusSpecialBadmintonOfferlzw64ucover1614258751575.png',
                            // uri: 'https://s3.ap-south-1.amazonaws.com/turfbooking.in-bucket/IndoreTurfs/escobar_turf_indore/escobar_banner_mobile_2.png',
                            // uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpKUUi_wB_0YrytzMkp6pJqCQGKut1XCWZGA4UB0Yd3kwkGxWE8-BBrIMXSkq10DNd950&usqp=CAU',
                            uri: 'https://cdn.prod.website-files.com/6185b708a2657014268d2eaf/645e42ce9dcbacd28d8c38ef_WjSYCvnQENhfBTRoSE15HbD_PJ797uDjff7nXEVUKhw.webp',
                        }}
                    />
                </View>

                <View style={styles.adminAndGame}>
                    <View style={styles.header}>
                        <Text style={styles.headerTxt1}>Players ({route?.params?.item?.players?.length})</Text>
                        <Ionicons name="earth" size={28} color="gray" />
                    </View>

                    <View style={styles.subheader}>
                        <Text style={styles.subheaderTxt1}>
                            ❤️ You are not covered 🙂
                        </Text>
                        <Text style={styles.subheaderTxt2}>Learn More</Text>
                    </View>

                    <View style={styles.admin}>
                        <View>
                            <Image
                                style={styles.adminImg}
                                source={{uri: route?.params?.item?.adminUrl}}
                            />
                        </View>
                        <View>
                            <View style={styles.host}>
                                <Text>{route?.params?.item?.adminName}</Text>
                                <View style={styles.hostTag}>
                                    <Text>HOST</Text>
                                </View>
                            </View>
                            <View style={styles.intermediateTag}>
                                <Text>INTERMEDIATE</Text>
                            </View>
                        </View>
                    </View>

                    {route?.params?.item?.isUserAdmin == true ? (
                        <View>
                            <View style={styles.break}/>
                            <Pressable style={styles.cohost}>
                                <View
                                    style={styles.cohostContainer}>
                                    <Image
                                        style={styles.cohostImg}
                                        source={{
                                            uri: 'https://cdn-icons-png.flaticon.com/128/343/343303.png',
                                        }}
                                    />
                                </View>
                                <Text style={styles.cohostTxt}>Add Co-Host</Text>
                                <MaterialCommunityIcons style={{textAlign: 'center'}}
                                    name="chevron-right" size={24} color="black"
                                />
                            </Pressable>
                            <View style={styles.break}/>

                            <View style={styles.add}>
                                <Pressable>
                                    <Pressable style={styles.actionBtn}>
                                        <Image
                                            style={styles.actionImg}
                                            source={{
                                                uri: 'https://cdn-icons-png.flaticon.com/128/1474/1474545.png',
                                            }}
                                        />
                                    </Pressable>
                                    <Text style={styles.actionTxt}>Add</Text>
                                </Pressable>

                                <Pressable>
                                    <Pressable style={styles.actionBtn}>
                                        <Image
                                            style={styles.actionImg}
                                            source={{
                                                uri: 'https://cdn-icons-png.flaticon.com/512/2919/2919976.png',
                                            }}
                                        />
                                    </Pressable>
                                    <Text style={styles.actionTxt}>Block</Text>
                                </Pressable>

                                <Pressable>
                                    <Pressable style={styles.actionBtn}
                                        // onPress={() =>
                                        //     navigation.navigate('Manage', {
                                        //     requests: requests,
                                        //     userId: userId,
                                        //     gameId: route?.params?.item?._id,
                                        // })
                                        // }
                                    >
                                    <Image
                                        style={styles.actionImg}
                                        source={{
                                            uri: 'https://cdn-icons-png.flaticon.com/128/7928/7928637.png',
                                        }}
                                    />
                                    </Pressable>
                                    <Text style={styles.actionTxt}>
                                        Manage {/* ({requests?.length}) */}
                                    </Text>
                                </Pressable>

                                <Pressable 
                                    style={styles.allplayer}
                                    onPress={() => navigation.navigate('Players', {players: players,})}
                                >
                                    <View style={styles.allplayerBtn}>
                                    <MaterialCommunityIcons
                                        style={{textAlign: 'center'}}
                                        name="chevron-right" size={24} color="black"
                                    />
                                    </View>
                                    <Text style={styles.allplayerTxt}>All Players</Text>
                                </Pressable>
                            </View>
                            <View style={styles.break}/>

                            <View style={styles.invite}>
                                <View style={styles.inviteContainer}>
                                    <Image
                                        style={styles.inviteImg}
                                        source={{
                                            uri: 'https://cdn-icons-png.flaticon.com/128/1511/1511847.png',
                                        }}
                                    />
                                </View>
                                <View>
                                    <Text style={{fontSize: 16, fontWeight: "600"}}>Not on TurfCrew? Invite</Text>
                                    <Text style={styles.inviteSubTxt}>
                                        Earn ₹ 500 by referring your friend | Share Referral code 
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <Pressable
                            // onPress={() => navigation.navigate('Players', { players: players, })}
                            style={styles.playersBtn}
                        >
                            <View style={styles.player}>
                                <MaterialCommunityIcons style={{textAlign: 'center'}} 
                                    name="chevron-right" size={24} color="black"
                                />
                            </View>
                            <Text style={styles.playerTxt}>All Players</Text>
                        </Pressable>
                    )}
                </View>

                <View style={styles.queryContainer}>
                    <View>
                        <Text style={styles.queryHeader}>Queries (0)</Text>
                        <View style={{marginVertical: 12}}>
                            <Text style={styles.queryTxt}>
                                There are no queries yet! Queries sent by players will be
                                shown here
                            </Text>
                    </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        
        {route?.params?.item?.isUserAdmin == true ? (
            <Pressable style={styles.chatBtn}>
                <Text style={styles.chatTxt}>
                    GAME CHAT
                </Text>
            </Pressable>
        ) : 
        // userRequested ? (
        //     <Pressable style={styles.cancel}>
        //     <Text style={styles.cancelTxt}>
        //         CANCEL REQUEST
        //     </Text>
        //     </Pressable>
        // ) : 
        (
            <View style={styles.queryAndJoin}>
                <Pressable style={styles.querySendBtn}>
                    <Text style={styles.querySendTxt}>
                        SEND QUERY
                    </Text>
                </Pressable>
                <Pressable style={styles.joinGameBtn}   
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.joinGameTxt}>
                    JOIN GAME
                    </Text>
                </Pressable>
            </View>
        )}

        
        <BottomModal
            onBackdropPress={() => setModalVisible(!modalVisible)}
            swipeDirection={['up', 'down']}
            swipeThreshold={200}
            modalAnimation={
                new SlideAnimation({
                    slideFrom: 'bottom',
                })
            }
            onHardwareBackPress={() => setModalVisible(!modalVisible)}
            visible={modalVisible}
            onTouchOutside={() => setModalVisible(!modalVisible)}
        >
        <ModalContent style={styles.modalContainer}>
            <View>
                <Text style={styles.join}>Join Game</Text>
                <Text style={styles.submsg}>
                    {route?.params?.item?.adminName} has been putting efforts to
                    organize this game. Please send the request if you are quite sure
                    to attend
                </Text>

                <View style={styles.req}>
                    <TextInput
                        value={comment}
                        multiline
                        style={{fontSize: comment ? 17 : 17}}
                        onChangeText={text => setComment(text)}
                        placeholder="Send a message to the host along with your request!"
                        //   placeholderTextColor={"black"}
                        />
                </View>
                <Pressable
                    onPress={() => sendJoinRequest(route?.params?.item?._id)}
                    style={styles.sendReqBtn}
                >
                    <Text style={styles.sendReqTxt}>
                        Send Request
                    </Text>
                </Pressable>
            </View>
        </ModalContent>
        </BottomModal>
    </>
  )
}

export default GameSetupScreen

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
    container: {
        // flex: 1,
        backgroundColor: 'white',
        // padding: 10,
    },
    break: {
        height: 1,
        borderWidth: 0.5,
        borderColor: '#E0E0E0',
        marginVertical: 12,
    },

    nav: {
        padding: 10,
        backgroundColor: '#294461',
        paddingBottom: 20,
        elevation: 8,
    },
    gameDetail: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingHorizontal: 18,
    },
    gameTxt: {
        color: 'white', 
        fontSize: 24, 
        fontWeight: 'bold'
    },
    gameType: {
        padding: 7,
        backgroundColor: 'white',
        borderRadius: 7,
        alignSelf: 'flex-start',
    },
    matchFull: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    matchFullTxt: {
        fontSize: 17, 
        fontWeight: '500', 
        color: 'white'
    }, 
    gameDate: {
        fontSize: 16, 
        color: 'white', 
        fontWeight: '600',
        marginHorizontal: 10,
    },
    groundBtn: {
        backgroundColor: '#E97451',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '90%',
        justifyContent: 'center',
        borderRadius: 8,
    },
    groundTxt: {
        color: 'white', 
        fontWeight: "600", 
        fontSize: 18
    },
    expense: {
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 20,
        marginHorizontal: 15,
        backgroundColor: 'white',
        padding: 10,
        gap: 15,
    },
    expenseContainer: {
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saleImg: {
        width: '100%',
        height: 220,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    adminAndGame: {
        marginVertical: 20,
        marginHorizontal: 15,
        backgroundColor: 'white',
        padding: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTxt1: {
        fontSize: 16, 
        fontWeight: '600'
    },
    subheader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    subheaderTxt1: {
        fontSize: 15, 
        fontWeight: '500'
    },
    subheaderTxt2: {
        fontWeight: '500'
    },
    admin: {
        marginVertical: 12, 
        flexDirection: 'row', 
        gap: 10
    },
    adminImg: {
        width: 60, 
        height: 60,
        borderRadius: 30
    },
    host: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 10
    },
    hostTag: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
    },
    intermediateTag: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
        borderRadius: 20,
        borderColor: 'orange',
        borderWidth: 1,
        alignSelf: 'flex-start',
    },
    cohost: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 14,
    },
    cohostContainer: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cohostImg: {
        width: 30, 
        height: 30, 
        resizeMode: 'contain',
    },
    cohostTxt:{
        fontSize: 15, 
        fontWeight: '500', 
        flex: 1,
    },
    add: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    actionBtn: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    actionImg: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionTxt: {
        marginTop: 8,
        fontWeight: '500',
        textAlign: 'center',
    },
    allplayer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    allplayerBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 10,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
    },    
    allplayerTxt: {
        marginBottom: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    playersBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: '#E0E0E0',
        borderTopWidth: 1,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    player: {
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 10,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
    },
    playerTxt: {
        marginBottom: 12, 
        fontWeight: '600'
    }, 
    invite: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 15
    }, 
    inviteContainer: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        },
    inviteImg: {
        width: 30, 
        height: 30, 
        resizeMode: 'contain',
    },
    inviteSubTxt: {
        marginTop: 6, 
        color: 'gray',
        width: '70%',
    },
    queryContainer: { 
        marginHorizontal: 15,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 6,
        marginBottom: 50,
    },
    queryHeader: {
        fontSize: 18, 
        fontWeight: '600'
    },
    queryTxt: {
        color: 'gray', 
        fontSize: 15, 
        textAlign: 'center'
    },
    cancel: {
        backgroundColor: 'red',
        marginTop: 'auto',
        marginBottom: 30,
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 4,
    },
    cancelTxt: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
    },        
    querySendBtn: {
        backgroundColor: '#E8E8E8',
        marginTop: 'auto',
        marginBottom: 12,
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 4,
        flex: 1,
    },
    querySendTxt: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500',
    },
    joinGameBtn: {
        backgroundColor: '#6495ED',
        marginTop: 'auto',
        marginBottom: 12,
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 4,
        flex: 1,
    },
    joinGameTxt: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
    },
    queryAndJoin: {
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        // paddingVertical: 12,
        backgroundColor: '#fff',
    },
    chatBtn: {
        backgroundColor: '#6495ED',
        marginTop: 'auto',
        marginBottom: 5,
        padding: 12,
        marginHorizontal: "5%",
        borderRadius: 4,
        width: "90%",
    },
    chatTxt: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
    },
    modalContainer: {
        width: '100%', 
        height: 400, 
        backgroundColor: 'white'
    },
    join: {
        fontSize: 15, 
        fontWeight: '500', 
        color: 'gray'
    },
    submsg: {
        marginTop: 25, 
        color: 'gray'
    },
    req: {
        borderColor: '#E0E0E0',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        height: 160,
        marginTop: 20,
    },
    sendReqBtn: {
        backgroundColor: '#6954ED',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        borderRadius: 5,
        justifyContent: 'center',
        padding: 10,
    },
    sendReqTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500',
    },
})