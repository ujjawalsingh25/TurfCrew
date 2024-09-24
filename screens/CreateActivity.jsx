import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Platform, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateActivity = () => {
    const navigation = useNavigation();
    const [sport, setSport] = useState("");
    const [area, setArea] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [noOfPlayers, setnoOfPlayers] = useState(0);
    const [timeInterval, setTimeInterval] = useState("");
    
  const [selected, setSelected] = useState(["Public"]);

    useLayoutEffect(() => {
        navigation.setOptions({
        headerTitle: "",
        headerLeft: () => (
            <View style={styles.logoContainer}>
            <Image 
                source={require('../public/title-logo.png')}
                style={{ height:25, width: 220, marginLeft: 10}}
            />
            <MaterialIcons name="keyboard-arrow-down" size={30} color="black" />
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
    }, [])


  return (
    <>
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerTxt}>Create Activity</Text>

                    <Pressable
                        // onPress={() => navigation.navigate('Sport')}
                        style={[styles.formContainer, {marginTop: 15}]}
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
                        //   onPress={() => navigation.navigate('TagVenue')}
                        style={styles.formContainer}
                    >
                        <Entypo name="location" size={30} color="gray" />
                        <View style={styles.form}>
                            <Text style={styles.formHeader}>Area</Text>
                            <TextInput
                            //   value={area ? area : taggedVenue}
                            value={area}
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
                        //   onPress={() => setModalVisible(!modalVisible)}
                        style={styles.formContainer}
                    >
                        <Feather name="calendar" size={30} color="gray" />
                        <Pressable style={styles.form}>
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
                        // onPress={() => navigation.navigate('Time')}
                        style={styles.formContainer}
                    >
                        <AntDesign name="clockcircleo" size={30} color="gray" />
                        <View style={styles.form}>
                            <Text style={styles.formHeader}>Time</Text>
                            <TextInput
                                placeholderTextColor={timeInterval ? 'black' : 'gray'}
                                style={styles.formInput}
                                placeholder={timeInterval ? timeInterval : 'Pick Exact Time'}
                            />
                        </View>
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

    </>
  )
}

export default CreateActivity;

const styles = StyleSheet.create({
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
})
