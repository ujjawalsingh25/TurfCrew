import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import times from '../api/data/times';
import Ionicons from '@expo/vector-icons/Ionicons';

const SelectTimeScreen = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState('');
  const [timeType, setTimeType] = useState('');
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const formatTime = time => {
    if (!time) return 'Select Time';
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const selectTime = item => {
    setTime(item);
    navigation.goBack();
  };

  useEffect(() => {
    console.log(startTime);
    console.log(endTime);
    if (startTime && endTime) {
      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(endTime);
      const timeInterval = `${formattedStartTime} - ${formattedEndTime}`;
      navigation.goBack({timeInterval});
    }
  }, [startTime, endTime, navigation]);

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleConfirmStartTime = time => {
    setStartTime(time);
    hideStartTimePicker();
  };

  const handleConfirmEndTime = time => {
    setEndTime(time);
    hideEndTimePicker();
    if (startTime) {
        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(time);
        const timeInterval = `${formattedStartTime} - ${formattedEndTime}`;
        navigation.navigate('Create', { timeInterval });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
    headerTitle: "",
    headerStyle: { backgroundColor: '#294461' },
    headerLeft: () => (
        <View style={styles.topHeader}>
            <Text style={styles.topHeaderTxt}>Select Suitable Time</Text>
            <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back" size={35} color="white"
            />
        </View>
    ),});
  }, []) 
  
  return (
    <View style={styles.container}>
        <Pressable style={styles.timeContainer}>
            {times.map((item, index) => (
                <Pressable
                    // onPress={() => selectTime(item.type)}
                    key={index}
                    onPress={() => {
                        setTimeType(item.type);
                        navigation.navigate('Create', { timeType: item.type });
                    }}
                    style={styles.timeBtn}
                >
                    {item.icon}
                    <Text style={styles.timeTxt}>{item.type}</Text>
                    <Text style={styles.timeTxt}>{item.timings}</Text>
                </Pressable>
            ))}
        </Pressable>
      
        <View style={styles.container2}>
            <View style={styles.timeContainer2}>
                <Text style={styles.label}>Start Time </Text>
                <Button title={formatTime(startTime)} onPress={showStartTimePicker} />
                <DateTimePickerModal
                    isVisible={isStartTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmStartTime}
                    onCancel={hideStartTimePicker}
                    is24Hour={false}
                />
            </View>
            
            <View style={styles.timeContainer2}>
                <Text style={styles.label}>End Time</Text>
                <Button title={formatTime(endTime)} onPress={showEndTimePicker} />
                <DateTimePickerModal
                    isVisible={isEndTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmEndTime}
                    onCancel={hideEndTimePicker}
                    is24Hour={false}
                />
            </View>
        
            {startTime && endTime && ( 
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryText}>
                        Selected Interval: {formatTime(startTime)} - {formatTime(endTime)}
                    </Text>
                </View>
            )} 

            <Image 
                // source={require('../public/animations/calender.gif')}
                source={require('../public/animations/hourglass.gif')}
                style={styles.timeAnimation}
            />
      
        </View>
    </View>
  )
}

export default SelectTimeScreen

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
        // backgroundColor: 'white',
        padding: 15,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 25,
        marginBottom: 20,
    },
    timeBtn: {
        backgroundColor: 'white',
        margin: 20,
        width: 160,
        height: 120,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        elevation: 3,
    },
    timeTxt: {
        fontSize: 18,
    },
    container2: {
        flexDirection: "column",
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    timeContainer2: {
        marginBottom: 16,
        alignItems: 'center',
    },
    label: {
        fontSize: 20,
        marginBottom: 8,
    },
    summaryContainer: {
        marginTop: 32,
        alignItems: 'center',
    },
    summaryText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    timeAnimation: { 
        height: 180, 
        width: 180, 
        marginLeft: "auto", 
        marginRight: "auto" 
    },
})