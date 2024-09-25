import { 
    Image, 
    Pressable, 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TextInput, 
    View, 
    Platform, 
    Alert, 
} from 'react-native'
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

import {SlideAnimation} from 'react-native-modals';
import {BottomModal} from 'react-native-modals';
import {ModalContent} from 'react-native-modals';
import { AuthContext } from '../AuthContext';

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateActivity = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [sport, setSport] = useState("");
    const [area, setArea] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const [noOfPlayers, setnoOfPlayers] = useState(0);
    const [timeInterval, setTimeInterval] = useState("");
    const [taggedVenue, setTaggedVenue] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState(["Public"]);

    const generateDates = () => {
        const dates = [];
        for (let i = 0; i < 9; i++) {
          const date = moment().add(i, 'days');
          let displayDate;
          if (i === 0) {
            displayDate = 'Today';
          } else if (i === 1) {
            displayDate = 'Tomorrow';
          } else if (i === 2) {
            displayDate = 'Day after';
          } else {
            displayDate = date.format('Do MMMM');
          }
          dates.push({
            id: i.toString(),
            displayDate,
            dayOfWeek: date.format('dddd'),
            actualDate: date.format('Do MMMM'),
          });
        }
        return dates;
    };
    const dates = generateDates();
    // console.log('Dates', dates);

    const selectDate = date => {
        setModalVisible(false);
        setDate(date);
    };

    useEffect(() => {
        // console.log('Turf Tagged');
        if (route?.params?.taggedVenue) {
        setTaggedVenue(route?.params?.taggedVenue);
        }
    }, [route?.params]);
    console.log('tagged', route?.params?.taggedVenue);

    useEffect(() => {
        if (route?.params?.timeInterval) {
          setTimeInterval(route?.params?.timeInterval);
        }
    }, [route.params]);
    console.log(timeInterval); 
      
    useLayoutEffect(() => {
        navigation.setOptions({
        headerTitle: "",
        headerStyle: { backgroundColor: '#294461' },
        headerLeft: () => (
            <View style={styles.topHeader}>
                <Text style={styles.topHeaderTxt}>Create Activity</Text>
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="arrow-back" size={35} color="white"
                />
            </View>
        ),});
    }, [])


  return (
    <>
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Pressable
                        // onPress={() => navigation.navigate('Sport')}
                        style={[styles.formContainer]}
                    >
                        <MaterialCommunityIcons name="whistle" size={30} color="gray" />
                        <View style={styles.form}>
                            <Text style={styles.formHeader}>Sport</Text>
                            <TextInput
                                value={sport}
                                onChangeText={setSport}
                                style={styles.formInput}
                                placeholderTextColor="gray"
                                placeholder={'Eg Badminton / Footbal / Cricket'}
                            />
                        </View>
                        <AntDesign name="arrowright" size={30} color="gray" />
                    </Pressable>
                    <Text style={styles.break}/>

                    <Pressable
                        onPress={() => navigation.navigate('TagVenue')}
                        style={styles.formContainer}
                    >
                        <Entypo name="location" size={30} color="gray" />
                        <View style={styles.form}>
                            <Text style={styles.formHeader}>Area</Text>
                            <TextInput
                              value={area ? area : taggedVenue}
                              onChangeText={setArea}
                              placeholderTextColor="gray"
                              style={styles.formInput}
                              placeholder={'Locality or venue name'}
                            />
                        </View>
                        <AntDesign name="arrowright" size={30} color="gray" />
                    </Pressable>
                    <Text style={styles.break}/>

                    <Pressable
                        style={styles.formContainer}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Feather name="calendar" size={30} color="gray" />
                        <Pressable 
                            style={styles.form}    
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.formHeader}>Date</Text>
                            <TextInput
                                editable={false}
                                placeholderTextColor={date ? 'black' : 'gray'}
                                style={styles.formInput}
                                placeholder={date ? date : 'Pick a Day'}
                            />
                        </Pressable>
                        <AntDesign name="arrowright" size={30} color="gray" />
                    </Pressable>
                    <Text style={styles.break}/>

                    <Pressable
                        onPress={() => navigation.navigate('Time')}
                        style={styles.formContainer}
                    >
                        <AntDesign name="clockcircleo" size={30} color="gray" />
                        <Pressable 
                            style={styles.form}
                            onPress={() => navigation.navigate('Time')}
                        >
                            <Text style={styles.formHeader}>Time</Text>
                            <TextInput
                                style={styles.formInput}
                                placeholderTextColor={timeInterval ? 'black' : 'gray'}
                                placeholder={timeInterval ? timeInterval : 'Pick Exact Time'}
                            />
                        </Pressable>
                        <AntDesign name="arrowright" size={30} color="gray" />
                    </Pressable>
                    <Text style={styles.break}/>

                    <View style={styles.formContainer}>
                        <Feather name="activity" size={30} color="black" />
                        <View>
                            <Text style={styles.formHeader}>Activity Access</Text>
                            <Pressable style={styles.publicBtnContainer}>
                                <Pressable
                                    onPress={() => setSelected('Public')}
                                    style={[styles.publicBtn,
                                        {backgroundColor: selected.includes('Public') ? "#6495ED" : "white" }
                                    ]}
                                >
                                    <Ionicons
                                        name="earth" size={25}
                                        color={selected.includes('Public') ? 'white' : 'black'}
                                    />
                                    <Text style={[
                                        styles.publicBtnTxt, 
                                        {color: selected.includes('Public') ? "white" : "black" }
                                    ]}>
                                        Public
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => setSelected('invite only')}
                                    style={[styles.publicBtn,
                                        {backgroundColor: selected.includes('invite only') ? "#6495ED" : "white" }
                                    ]}
                                >
                                    <AntDesign
                                        name="lock1" size={26}
                                        color={selected.includes('invite only') ? 'white' : 'black'}
                                    />
                                    <Text
                                        style={[ styles.publicBtnTxt, 
                                            {color: selected.includes('invite only') ? "white" : "black" }
                                        ]}
                                    >
                                        Invite Only
                                    </Text>
                                </Pressable>
                            </Pressable>                    
                        </View>
                    </View>
                    <Text style={[styles.break, {marginTop: 6}]}/>

                    <View style={styles.totalPly}>
                        <Text style={styles.instHeaderTxt}>Total Players</Text>
                        <View style={styles.totalContainer}>
                            <View style={styles.totalHeader}>
                                <View>
                                    <TextInput
                                      value={noOfPlayers}
                                      onChangeText={setnoOfPlayers}
                                      style={styles.totalBox}
                                      placeholder="Total Players (including you)"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.break, {marginTop: 12}]}/>

                    <Text style={styles.instHeaderTxt}>Add Instructions</Text>
                        <View style={styles.instContainer}>
                            <View style={styles.instOpt}>
                                <View style={styles.instruction}>
                                    <Ionicons name="bag-check" size={24} color="#6495ED" />
                                    <Text style={styles.formHeader}>Bring your own equipments </Text>
                                </View>
                                <FontAwesome name="check-square" size={24} color="green" />
                            </View>

                            <View style={styles.instOpt}>
                                <View style={styles.instruction}>
                                    <MaterialCommunityIcons name="directions-fork" size={24} color="#FEBE10"/>
                                    <Text style={styles.formHeader}>Cost Shared</Text>
                                </View>
                                <FontAwesome name="check-square" size={24} color="green" />
                            </View>

                            <View style={styles.instOpt}>
                                <View style={styles.instruction}>
                                    <FontAwesome5 name="syringe" size={24} color="green" />
                                    <Text style={styles.formHeader}>Covid Vaccinated players preferred</Text>
                                </View>
                                <FontAwesome name="check-square" size={24} color="green" />
                            </View>

                            <TextInput
                                style={styles.inputBox}
                                placeholder="Add Additional Instructions"
                            />
                        </View>

                        <View style={styles.advSetting}>
                            <AntDesign name="setting" size={32} color="black" />
                            <View style={{flex: 1}}>
                                <Text style={styles.advHeader}>Advanced Settings</Text>
                        </View>
                        <AntDesign name="arrowright" size={24} color="gray" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

        <Pressable
            // onPress={createGame}
            style={styles.createBtn}
        >
        <Text style={styles.createTxt}> Create Activity</Text>
      </Pressable>

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
            <ModalContent style={styles.rehostContainer}>
                <View>
                <Text style={styles.rehostTxt}> Choose date/ time to rehost </Text>
                <View style={styles.hostDate}>
                    {dates?.map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={() => selectDate(item?.actualDate)}
                            style={styles.dateBtn}
                        >
                            <Text>{item?.displayDate}</Text>
                            <Text style={styles.dayOfWeek}>{item?.dayOfWeek} </Text>
                        </Pressable>
                    ))}
                </View>
                </View>
            </ModalContent>
        </BottomModal>
    </>
  )
}

export default CreateActivity;

const styles = StyleSheet.create({
    topHeader: {
        flexDirection:"row-reverse", 
        gap: 30, 
        marginHorizontal: 12
    },
    topHeaderTxt: {
        fontSize: 25, 
        fontWeight: 'bold', 
        color: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        // paddingTop: Platform.OS === 'android' ? 35 : 0,
        padding: 10,
    },
    header: {
        padding: 10,
    },
    headerTxt: {
        fontSize: 25, 
        fontWeight: 'bold'
    },
    break: {
        borderColor: '#E0E0E0', 
        borderWidth: 0.7, 
        height: 1
    },
    formContainer: {
        // backgroundColor: "green",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginTop: 10,
        marginVertical: 10,
    },
    form: {
        flex: 1
    },
    formHeader: {
        fontSize: 18, 
        fontWeight: '500'
    },
    formInput: {
        marginTop: 7, 
        fontSize: 16,
    },
    publicBtnContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    publicBtn: { 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: 140,
        borderRadius: 12,
        padding: 8,
        marginTop: 3,
    },
    publicBtnTxt: {
        color: 'black', 
        fontWeight: 'bold', 
        fontSize: 15
    },
    inputHeaderTxt: {
        fontSize: 18,
        marginTop: 15, 
        marginLeft: 25,
    },
    inputHeader: {
        marginVertical: 5
    },
    inputContainer: {
        padding: 10,
        backgroundColor: '#F0F0F0',
        marginTop: 10,
        borderRadius: 6,
    },
    inputBox: {
        padding: 10,
        backgroundColor: 'white',
        borderColor: '#D0D0D0',
        borderWidth: 1,
    },
    totalPly: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
    },
    totalContainer: {
        marginTop: 10,
    },
    totalBox: {
        backgroundColor: 'white',
        borderColor: '#D0D0D0',
        borderRadius: 15,
        borderWidth: 1,
        padding: 10,
    },
    instruction: {
        // backgroundColor: 'pink',
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: "space-between",
        gap: 8,
    },
    instContainer: {
        padding: 10,
        backgroundColor: '#F0F0F0',
        marginTop: 10,
        borderRadius: 6,
    },
    instOpt: {
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "space-between"
    },
    instHeaderTxt: {
        marginTop: 20, 
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 20,
    },
    advSetting: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginTop: 20,
        marginVertical: 10,
    },
    advHeader: {
        fontSize: 20, 
        fontWeight: '600'
    },
    createBtn: {
        backgroundColor: '#6495ED',
        marginTop: 'auto',
        marginBottom: 20,
        padding: 12,
        marginHorizontal: 10,
        borderRadius: 4,
    },
    createTxt: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
    },
    rehostContainer: {
        backgroundColor: 'white',
        height: 400, 
        width: '100%', 
    },
    rehostTxt: {
        textAlign: 'center', 
        fontSize: 16, 
        fontWeight: 'bold',
    },
    hostDate: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        flexWrap: 'wrap',
        marginVertical: 20,
    },    
    dateBtn: {
        padding: 10,
        borderRadius: 10,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
  },
    dayOfWeek: {
        color: 'gray', 
        marginTop: 8
    },
})
