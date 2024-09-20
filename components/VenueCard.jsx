import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'

import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

const VenueCard = ({item}) => {
  return (
    <View style={{margin: 15}}>
      <Pressable style={styles.container}>
        <View>
          <Image 
            style={styles.img}
            source={{uri: item?.image}}
          />
        </View>

        <View style={{paddingVertical: 10, paddingHorizontal: 15}}>
          <View style={styles.cardDetails}>
            <Text>
              { 
                item?.name.length > 40 
                  ? item?.name?.substring(0,40) + "..." 
                  : item?.name 
              }
            </Text>
            <View style={styles.rating}> 
            <Entypo name="star-outlined" size={30} color="green" />
              <Text style={{color:"green",fontWeight:"bold", paddingRight: 5}}>{item?.rating}</Text>
            </View>
          </View>
          <Text style={{color: 'gray'}}>
            {
              item?.address.length > 40 
                ? item?.address?.substring(0,40) + "..." 
                : item?.address 
            }
          </Text>

          <View style={styles.breakLine}/> 

          <View style={styles.cardDetails}>
            <Text>Upto 10% off</Text>
            <Text>₹500 onwards</Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default VenueCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  img: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  rating: {
    backgroundColor: '#E5E4E2',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    elevation:3,
    gap: 6,
    padding: 6,
  },
  breakLine: {
    height: 1,
    borderWidth: 0.6,
    borderColor: '#E0E0E0',
    marginVertical: 10,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})