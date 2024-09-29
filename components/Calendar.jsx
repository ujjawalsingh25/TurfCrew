import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Date from './Date';

const Calendar = ({ onSelectDate, selected,selectedSport,setSelectedTime }) => {
    const [dates, setDates] = useState([])
    const [scrollPosition, setScrollPosition] = useState(0)
    const [currentMonth, setCurrentMonth] = useState();

    useEffect(() => {
        getDates()
      }, []);

    useEffect(() => {
        getCurrentMonth()
    }, [scrollPosition]);

    const getCurrentMonth = () => {
        const month = moment(dates[0]).add(scrollPosition / 60, 'days').format('MMMM')
        setCurrentMonth(month)
    }
    const getDates = () => {
        const _dates = []
        for (let i = 0; i <10; i++) {
          const date = moment().add(i, 'days');
          _dates.push(date)
        }
        setDates(_dates);
    }

  return (
    <>
        <View style={styles.centered}>
            <Text style={styles.title}>{selectedSport}</Text>
            {/* <Text>{selectedSport}</Text> */}
        </View>

        <View style={styles.dateSection}>
            <View style={styles.scroll}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    // onScroll is a native event that returns the number of pixels the user has scrolled
                    scrollEventThrottle={16}
                    onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
                >
                    {dates.map((date, index) => (
                        <Date
                            key={index}
                            date={date}
                            setSelectedTime={setSelectedTime}
                            onSelectDate={onSelectDate}
                            selected={selected}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    </>
  )
}

export default Calendar;

const styles = StyleSheet.create({
    centered: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginTop:6,
      fontWeight: '600',
    },
    dateSection: {
      width: '100%',
      padding: 15,
      justifyContent:"center",
      alignItems:"center",
    },      
})