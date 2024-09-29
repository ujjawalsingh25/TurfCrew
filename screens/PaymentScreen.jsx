import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../AuthContext';
import axios from 'axios';


const PaymentScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const {userId} = useContext(AuthContext);
    console.log(route?.params);
    
    const total = route.params.price + 199;

    const courtNumber = route.params.selectedCourt 
    const date = route.params.selectedDate;
    const time = route.params.selectedTime; 
    const name = route.params.place
    const game = route.params?.gameId;
    // console.log("Game: ",game)
    
    const bookSlot = async () => {
        try {
            const response = await axios.post('http://192.168.237.220:8000/book', {
                courtNumber,
                date,
                time,
                userId,
                name,
                game,
            });
        
            if (response.status === 200) {
            console.log('Booking successful:', response.data);
    
            navigation.replace("Main")
            // Handle successful booking (e.g., show a success message, navigate to another screen, etc.)
            } else {
            console.error('Booking failed:', response.data.message);
            // Handle booking failure (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error booking slot:', error);
            // Handle server or network errors (e.g., show an error message)
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerStyle: { backgroundColor: '#294461' },
            headerLeft: () => (
            <View style={styles.topHeader}>
                <Text style={styles.topHeaderTxt}>Payment</Text>
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="arrow-back" size={35} color="white"
                />
            </View>),
        })
    }, [])

  return (
    <>
        <ScrollView style={{marginTop:40, padding: 12}}>
            <View style={{ padding: 15 }}>
                <Text style={styles.sportName}>{route.params.selectedSport}</Text>

                <View style={styles.gameDetailContainer}>
                    <View style={styles.gameDetail}>
                        <MaterialCommunityIcons name="fireplace-off" size={20} color="black" />
                        <Text style={styles.gameDetailTxt}>
                            {route.params.selectedCourt}
                        </Text>
                    </View>
                    <View style={styles.gameDetail}>
                        <Feather name="calendar" size={20} color="black" />
                        <Text style={styles.gameDetailTxt}>
                            {route.params.selectedDate}
                        </Text>
                    </View>
                    <View style={styles.gameDetail}>
                        <Feather name="clock" size={20} color="black" />
                        <Text style={styles.gameDetailTxt}>
                            {route.params.selectedTime}
                        </Text>
                    </View>
                    <View style={styles.gameDetail}>
                        <MaterialCommunityIcons name="currency-rupee" size={20} color="black"/>
                        <Text style={styles.gameDetailTxt}>
                            {route.params.price}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.billContainer}>
                <View style={styles.courtBillContainer}>
                    <View style={styles.bill}>
                        <Text style={styles.billTagTxt}>Court Price</Text>
                        <EvilIcons name="question" size={24} color="black" />
                    </View>
                    <Text style={styles.billTxt}>
                        ₹ {route.params.price}
                    </Text>
                </View>

                <View style={styles.convBillContainer}>
                    <View style={styles.bill}>
                        <Text style={styles.billTagTxt}>Convenience Fee</Text>
                        <EvilIcons name="question" size={24} color="black" />
                    </View>
                    <Text style={styles.billTxt}>₹ 199</Text>
                </View>
            </View>
            <Text style={styles.break2} />

            <View style={styles.total}>
                <Text style={styles.totalAmtTxt}>Total Amount</Text>
                <Text style={styles.totalAmt}>{total}</Text>
            </View>

            <View style={styles.payContainer}>
                <View style={styles.payAmt}>
                    <Text style={styles.payTotalTxt}>Total Amount</Text>
                    <Text style={styles.toBePaidTxt}>
                        To be paid at Venue
                    </Text>
                </View>

                <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                    justifyContent: "space-between",
                }}
                >
                    <Text style={styles.inrTotalTxt}>₹ {total}</Text>
                    <Text style={styles.payAmtTxt}>₹ {total}</Text>
                </View>
            </View>

            <Text style={styles.break2}/>

            <View style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}>
                <Image
                    source={require('../public/logo.png')} 
                    style={styles.logoImg}
                />
            </View>
        </ScrollView>

        <Pressable
            onPress={bookSlot}
            style={styles.payBtn}
        >
            <Text style={{fontSize:18,fontWeight:"500",color:"white", marginHorizontal: 18,}}>₹ {total}</Text>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{ fontSize:18,fontWeight:"500",color:"white" }}>
                    Proceed to Pay
                </Text>
                <MaterialIcons name="navigate-next" size={30} color="white" />
            </View>
        </Pressable>
    </>
  )
}

export default PaymentScreen;

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
    payImg: {
        width: 300,
        height: 200,
        resizeMode: "contain", 
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        // padding: 10,
    },
    break: {
        height: 1,
        borderWidth: 0.5,
        borderColor: '#E0E0E0',
        marginVertical: 12,
    },
    break2: {
        height: 1,
        borderColor: "#E0E0E0",
        borderWidth: 3,
        marginTop: 20,
    },

    sportName: { 
        fontSize: 28, 
        fontWeight: "600", 
        color: "green",
        marginLeft: "auto",
        marginRight: "auto", 
    },
    gameDetailContainer: {
        borderColor: "#E0E0E0",
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 2,
        elevation: 3,
    },
    gameDetail: {
        marginVertical: 3,
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    gameDetailTxt: { 
        fontSize: 18, 
        fontWeight: "600" 
    },
    billContainer: { 
        marginTop: 15, 
        marginHorizontal: 15 
    },
    courtBillContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        justifyContent: "space-between",
    },
    convBillContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        marginTop: 15,
        justifyContent: "space-between",
    },
    bill: {
        flexDirection: "row", 
        alignItems: "center", 
        gap: 7,
    },
    billTxt: { 
        fontSize: 16,
        fontWeight: "500",
    }, 
    billTagTxt: {
        fontSize: 16,
        // fontWeight: "500",
    },
    total: {
        marginHorizontal: 15,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    totalAmt:{ 
        fontSize: 22, 
        fontWeight: "500", 
        color: "green" 
    },
    totalAmtTxt: { 
        fontSize: 18,
    }, 
    payContainer: {
        marginHorizontal: 15,
        marginTop: 10,
        borderColor: "#C0C0C0",
        borderWidth: 2,
        padding: 8,
        borderRadius: 6,
    },
    payAmt: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    payTotalTxt: { 
        fontSize: 18, 
    },
    toBePaidTxt: { 
        fontSize: 17, 
        fontWeight: "500" 
    },
    inrTotalTxt: { 
        fontSize: 18, 
    },
    payAmtTxt: { 
        fontSize: 22, 
        fontWeight: "500" ,
        textAlign: 'center', 
        color: 'green', 
        fontSize: 22,
        fontWeight: 'bold'
    },
    payBtn: {
        backgroundColor: "#6495ED",
        marginBottom: 20,
        marginHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        borderRadius: 15,
    },
    logoImg: {
        width: 200,
        height: 150,
        resizeMode: "contain",
        marginBottom: 12,
    },
})    
