import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import moment from 'moment';

const Date = ({ date, onSelectDate, selected ,setSelectedTime}) => {
    const day = 
        moment(date).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
        ? "Today" : moment(date).format("ddd");       // get the day number e.g 1, 2, 3, 4, 5, 6, 7
    const dayNumber = moment(date).format("D");
    const month = moment(date).format("MMM");

    // Use this to compare the date to the selected date
    const fullDate = moment(date).format("YYYY-MM-DD");     // get the full date e.g 2021-01-01 
    // console.log(fullDate);

  return (
    <TouchableOpacity 
        onPress={() => {
            setSelectedTime([]);
            onSelectDate(fullDate)
        }}
      style={[
        styles.card,
        selected === fullDate && { backgroundColor: "#6594ED" },
      ]}
    >
        <Text style={[styles.big, selected === fullDate && { color: "#fff" }]}>
            {day}
        </Text>
        {/* <View style={{ height: 5 }} /> */}
        <Text
            style={[
            styles.medium,
            selected === fullDate && {
                color: "#fff",
                fontWeight: "bold",
                fontSize: 18,
            },
            ]}
        >
            {dayNumber}
        </Text>
            <Text style={[
            styles.medium,
            selected === fullDate && {
                color: "#fff",
                fontWeight: "bold",
                fontSize: 18,
            },
            ]}
        >
            {month}
        </Text>
    </TouchableOpacity>
  )
}

export default Date;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#e0e0e0",
        borderRadius: 10,
        borderColor: "#ddd",
        height: 80,
        width: 75,
        padding: 4,
        marginVertical: 10,
        alignItems: "center",
        marginHorizontal: 5,
    },
    big: {
        fontWeight: "600",
        fontSize: 18,
    },
    medium: {
        fontSize: 18,
        fontWeight: "600",
    },
    medium2: {
        fontSize: 16,
        fontWeight: "600",
    },
})