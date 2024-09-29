import moment from 'moment';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'

import Calendar from '../components/Calendar';
import timings from '../api/data/timing';
import { useNavigation, useRoute } from '@react-navigation/native'

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SlotScreen = () => {
    const today = moment().format('YYYY-MM-DD');
    const route = useRoute();
    const navigation = useNavigation();

    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState([]);
    const [selectDateTime, setSelectDateTime] = useState([]); 
    const [duration, setDuration] = useState(60); 
    const [selectedCourt, setSelectedCourt] = useState([]);
    const [selectedSport, setselectedSport] = useState(route.params.sports[0].name);

    const [timess, setTimes] = useState([]);
    const [checkedTimes, setCheckedTimes] = useState([]);
    // const [isOver, setIsOver] = useState(false);
    // const [timeOver, setTimeOver] = useState([]);  
    // const [bookingStatus, setBookingStatus] = useState(false);

    const courts = route.params.sports.filter(
        item => item.name === selectedSport,
    );
    // console.log("Courts: ",courts);
    const [price] = route.params.sports
    .filter(item => item.name === selectedSport)
    .map(item => item.price);
    // console.log("Price: ",price);


    useEffect(() => {
        generateTimes();
    }, [selectedDate]);

    const generateTimes = () => {
        const start = moment(selectedDate).startOf('day').add(6, 'hours');  // start at 6:00 am
        const end = moment(selectedDate).endOf('day');
        const interval = 60; // interval in minutes
        const result = [];
        
        let current = moment(start);
        while (current <= end) {
          result.push(current.format('h:mma'));
          current.add(interval, 'minutes');
        }
        setTimes(result);
    };
    

    const calculateEndTime = (startTime, duration) => {
        if (typeof startTime !== 'string') {
          console.error('Invalid startTime:', startTime);
          return;
        }      
        // console.log('Start time', startTime);
    
        const match = startTime.match(/(\d+:\d+)([APMapm]+)/);
        if (!match) {
          console.error('Invalid startTime format:', startTime);
          return;
        }
      
        const time = match[1];                              // The time part (e.g., '6:00')
        const modifier = match[2].toUpperCase();             // The AM/PM part (e.g., 'PM')
        // console.log('Start time', time);
        // console.log('Modifier', modifier);
      
        let [hours, minutes] = time.split(':');         // Parse the startTime
        hours = parseInt(hours, 10);
        minutes = parseInt(minutes, 10);
      
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
      
        const totalMinutes = hours * 60 + minutes + duration;       // Add duration to the time
        let endHours = Math.floor(totalMinutes / 60);
        let endMinutes = totalMinutes % 60;
      
        let endModifier = endHours >= 12 ? 'PM' : 'AM';         // Format the end time
        if (endHours >= 24) {
          endHours -= 24;
          endModifier = 'AM';
        }
        if (endHours >= 12) {
          endModifier = 'PM';
          if (endHours > 12) endHours -= 12;
        }
        if (endHours === 0) {
          endHours = 12;
          endModifier = 'AM';
        }
      
        const formattedEndHours = endHours.toString().padStart(2, '0');
        const formattedEndMinutes = endMinutes.toString().padStart(2, '0');
        return `${formattedEndHours}:${formattedEndMinutes} ${endModifier}`;
    };

    var times = [];
    useEffect(() => {
        const checkTime = () => {
        const currentDateTime = moment();                                   // Current date and time
        const selectedDateStart = moment(selectedDate).startOf('day');   // Start of the selected date

        const times = timess.map(item => {
            // Combine the selected date with the current time slot to create a full date-time
            const dateTime = moment(selectedDateStart).set({
            hour: moment(item, 'h:mma').get('hour'),
            minute: moment(item, 'h:mma').get('minute'),
            });

            // Determine if the time slot is in the past or future
            const status = currentDateTime.isBefore(dateTime);
            return {time: item, status: status};
        });

        setCheckedTimes(times);
        };

        checkTime();
    }, [selectedDate, timess]);

    const isSlotBooked = (time) => {
        return route?.params?.bookings.some((booking) => {
          // Check if the booking is on the selected date
          if (booking.date !== selectedDate) return false;
      
          // Extract the start and end times from the booking time range
          const [startTime, endTime] = booking.time.split(' - ');
      
          // Get the hour portion of the times to compare
          let chosenHour = parseInt(time.split(':')[0], 10);
          let startHour = parseInt(startTime.split(':')[0], 10);
          let endHour = parseInt(endTime.split(':')[0], 10);
      
          // Convert times to lowercase for consistent AM/PM checks
          const lowerStartTime = startTime.toLowerCase();
          const lowerEndTime = endTime.toLowerCase();
          const lowerChosenTime = time.toLowerCase();
    
        //   console.log("lower",lowerChosenTime)
        //   console.log("hihger",lowerEndTime)
      
          // Handle AM/PM for the start time
          if (lowerStartTime.includes('pm') && startHour < 12) startHour += 12;
          if (lowerStartTime.includes('am') && startHour === 12) startHour = 0;
      
          // Handle AM/PM for the end time
          if (lowerEndTime.includes('pm') && endHour < 12) endHour += 12;
          if (lowerEndTime.includes('am') && endHour === 12) endHour = 0;
      
          // Handle AM/PM for the chosen time
          if (lowerChosenTime.includes('pm') && chosenHour < 12) chosenHour += 12;
          if (lowerChosenTime.includes('am') && chosenHour === 12) chosenHour = 0;
      
          return chosenHour >= startHour && chosenHour < endHour;
        });
    };


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerStyle: { backgroundColor: '#294461' },
            headerLeft: () => (
            <View style={styles.topHeader}>
                <Text style={styles.topHeaderTxt}>{route.params.place}</Text>
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="arrow-back" size={35} color="white"
                />
            </View>),
        })
    }, [])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
            <ScrollView 
                horizontal
                contentContainerStyle={{marginLeft: 20}}
                showsHorizontalScrollIndicator={false}
            >
                {route.params.sports.map((item, index) => {
                    // if (item.name === selectedSport) {
                    //  showCalender
                    // }
                    return (
                        <View>
                            {selectedSport.includes(item.name) ? (
                                <Pressable 
                                    key={index} 
                                    style={styles.sportsBoxSel}
                                >
                                    {item?.name === 'Swimming'
                                        ? <FontAwesome6 
                                            name="person-swimming" size={30}  color="gray" 
                                        /> 
                                        : <MaterialCommunityIcons 
                                            name={item.icon} size={30} color="white"
                                        /> 
                                    }
                                    <Text style={[styles.sportsName, {color: "white"}]}>
                                        {item.name}
                                    </Text>
                                </Pressable>
                            ) : (
                                <Pressable
                                    onPress={() => {
                                        setselectedSport(item.name);
                                        setSelectedCourt([]);
                                    }}
                                    style={styles.sportsBox}
                                >
                                    {item?.name === 'Swimming'
                                        ? <FontAwesome6 
                                            name="person-swimming" 
                                            size={30}  color="gray" 
                                        /> :
                                        <MaterialCommunityIcons
                                            style={{textAlign: 'center'}}
                                            name={item.icon} size={30}  color="gray"
                                        /> 
                                    }
                                        <Text style={styles.sportsName}>
                                            {item.name}
                                        </Text>
                                </Pressable> 
                            )}
                        </View>
                    );
                })}
            </ScrollView> 

            {selectedSport && (
                <ScrollView>
                    <Calendar
                        selectedSport={selectedSport}
                        onSelectDate={setSelectedDate}
                        setSelectedTime={setSelectedTime}
                        selected={selectedDate}
                    />
                </ScrollView>
            )}

            <Pressable style={styles.timeBox}>
                <Pressable style={styles.timeContainer}>
                    <Text style={styles.timeTxt}>Game Start</Text>
                    <Text style={styles.time}>
                        {/* 06:30 AM */}
                        {route?.params?.startTime
                        ? route?.params?.startTime
                        : selectedTime.length > 0
                        ? selectedTime
                        : 'Choose Time'}
                    </Text>
                </Pressable>
                <Pressable style={[styles.timeContainer, {marginRight: 20,}]}>
                    <Text style={styles.timeTxt}>Game End</Text>
                    <Text style={styles.time}>
                        {/* 07:30 AM */}
                        {route?.params?.endTime
                            ? route.params.endTime
                            :  selectedTime.length > 0
                                ? calculateEndTime(selectedTime, duration)
                                : 'Choose Time'
                        }
                    </Text>
                </Pressable>
            </Pressable>

            <Text style={styles.durationTxt}>Duration</Text>
            <Pressable style={styles.durationContainer}>
                <Pressable
                    onPress={() => setDuration(Math.max(60, duration - 60))}
                    style={styles.plusMinusContainer}
                >
                    <Text style={styles.plusMinTxt}>-</Text>
                </Pressable>
                <Text style={styles.durationMinTxt}>
                    {duration} min
                </Text>
                <Pressable
                    onPress={() => setDuration(duration + 60)}
                    style={styles.plusMinusContainer}
                >
                    <Text style={styles.plusMinTxt}>+</Text>
                </Pressable>
            </Pressable>


            <Text style={styles.selSlotTxt}>Select Slot</Text>
            {selectedSport && (
                <ScrollView
                    horizontal
                    contentContainerStyle={{marginHorizontal: 10}}
                    showsHorizontalScrollIndicator={false}
                >
                    {checkedTimes?.map((item, index) => {
                        const disabled = isSlotBooked(item.time);
                        // console.log("disables",disabled)

                        return (
                            <View>
                                {item.status !== false && (selectedTime.includes(item.time) 
                                ? (
                                    <Pressable
                                        onPress={() => {setSelectedTime(item.time)}}
                                        disabled={item.status === false || disabled}
                                        style={[styles.slotTimeBtn, {backgroundColor: '#6594ED',}]}
                                    >
                                        <Text style={[styles.slotTimeTxt, {color: 'white'}]}>
                                            {item.time}
                                        </Text>
                                    </Pressable>
                                ) : (
                                    <Pressable
                                        disabled={item.status === false}
                                        // onPress={() => handleTimePress(item.time)}
                                        onPress={() => setSelectedTime(item.time)}
                                        style={styles.slotTimeBtn}
                                    >
                                        <Text style={styles.slotTimeTxt}>
                                            {item.time}
                                        </Text>
                                    </Pressable>
                                )
                            )}
                            </View>
                        );
                    })}
                </ScrollView>
            )}

            <View style={styles.courtContainer}>
                <View style={styles.courtName}>
                {courts.map(item => item.courts.map(court => selectedCourt.includes(court.name) 
                        ? (
                            <Pressable
                                onPress={() => setSelectedCourt(court.name)}
                                style={styles.courtNameBtnSel}
                            >
                            <Text style={styles.courtNameSel}>
                                {court.name}
                            </Text>
                            {selectedCourt.length > 0 && (
                                <Text style={styles.courtPriceTxt}>
                                    Court Price : Rs {price}
                                </Text>
                            )}
                            </Pressable>
                        ) : (
                            <Pressable
                                onPress={() => setSelectedCourt(court.name)}
                                style={styles.courtNameBtn}
                            >
                                <Text style={styles.courtNameTxt}>
                                    {court.name}
                                </Text>
                            </Pressable>
                        ),
                    ),
                )}
                </View>
            </View>
        </ScrollView>
      </SafeAreaView>

        <Pressable
            style={styles.nextBtn}
            onPress={() => navigation.navigate('Payment', {
                selectedCourt: selectedCourt,
                selectedSport: selectedSport,
                price: price,
                selectedTime: timings.time,
                selectedDate: selectedDate,
                place: route.params.place,
                gameId: route?.params?.gameId,
            })}
        >
            <Text style={styles.nextTxt}> Next </Text>
        </Pressable>
    </>
  )
}

export default SlotScreen;

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

    sportsBoxSel: {
        backgroundColor: '#6594ED',
        margin: 10,
        padding: 20,
        width: 80,
        height: 90,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    sportsBox: {
        borderColor: '#686868',
        margin: 10,
        padding: 20,
        width: 80,
        height: 90,
        borderWidth: 2,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sportsName: {
        fontSize: 10,
        fontWeight: 'bold',
        width: 80,
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 10,
    },
    timeBox: {
        // backgroundColor:"red",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        // width: '100%',
        paddingLeft: 10,
        margin: 10,
    },
    timeContainer: {
        // backgroundColor:"green",
        flex: 1, 
        borderColor: '#E0E0E0',
        borderWidth: 1,
        paddingVertical: 15,
        // paddingHorizontal: 60,
    },
    timeTxt: {
        // backgroundColor:"orange",
        fontSize: 16, 
        fontWeight: '400', 
        textAlign: 'center'
    },
    time:{
        // backgroundColor:"blue",
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 8,
    },
    durationTxt: {
        fontSize: 24,
        marginTop: 15,
        textAlign: 'center',
        fontWeight: '500',
    },
    durationContainer: {
        gap: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    plusMinusContainer:{
        width: 40,
        height: 40,
        borderRadius: 25,
        borderColor: 'gray',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    plusMinTxt: {
        textAlign: 'center', 
        fontSize: 30, 
        fontWeight: '600'
    },
    durationMinTxt: {
        textAlign: 'center', 
        fontSize: 22, 
        fontWeight: '500'
    },
    selSlotTxt: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 25,
        fontWeight: '500',
    },
    slotTimeTxt: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    slotTimeBtn: {
        margin: 10,
        borderColor: '#6594ED',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
    },
    courtContainer: {
        marginHorizontal: 10,
    },
    courtName: {
        // backgroundColor: "yellow",
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent:"center",
        flexWrap: 'wrap',
    },
    courtNameBtnSel: {
        backgroundColor: '#6594ED',
        borderRadius: 6,
        padding: 15,
        width: 180,
        margin: 10,
    },
    courtNameBtn: {
        borderColor: '#6594ED',
        borderRadius: 6,
        padding: 15,
        width: 180,
        margin: 10,
        borderWidth: 1,
    }, 
    courtNameSel: {
        textAlign: 'center', 
        fontWeight: "500",
        color: '#fff'
    },
    courtNameTxt: {
        textAlign: 'center', 
        fontWeight: "500",
        color: '#212121'
    },
    courtPriceTxt:{
        color: "orange",
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        fontSize: 15,
        fontWeight: '600',
    },
    nextBtn: {
        backgroundColor: '#6495ED',
        padding: 8,
        marginBottom: 20,
        borderRadius: 15,
        marginHorizontal: 15,
    },
    nextTxt: {
        textAlign: 'center', 
        color: 'white', 
        fontSize: 22,
        fontWeight: 'bold'
    },
})
