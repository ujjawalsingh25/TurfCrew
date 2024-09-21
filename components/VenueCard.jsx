import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'

import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const VenueCard = ({item}) => {
  const navigation = useNavigation();

  return (
    <View style={{margin: 15}}>
      <Pressable 
        onPress={() => navigation.navigate('Turfs', {
          name: item.name,
          image: item.newImage,
          sportsAvailable: item.sportsAvailable,
          rating: item.rating,
          timings: item.timings,
          address: item.address,
          location: item.location,   
          bookings:item.bookings
        })}
        style={styles.container}
      >
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
            <Entypo name="star-outlined" size={30} color= {item?.rating >= 4 ? "#4F7942" : "#E97451"} />
              <Text 
                style={[
                  styles.ratingText, 
                  {color: item?.rating >= 4 ? "#4F7942" : "#E97451"}
                ]}
              >{item?.rating}</Text>
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
            <View style={{flexDirection: "row"}}>
              <MaterialIcons name="discount" size={20} color="black" />
              <Text>  Upto {item.sale}% off</Text>
            </View>
            <View style={{flexDirection: "row"}}>
            <FontAwesome name="rupee" size={18} color="black" />
              <Text> {item.priceOnwards} onwards</Text>
            </View>
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
    elevation: 1,
    gap: 6,
    padding: 6,
  },
  ratingText: {
    // color:"green",
    fontWeight:"bold", 
    paddingRight: 5
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
  discount: {
    backgroundColor: '#E5E4E2',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    elevation: 1,
    gap: 6,
    padding: 6,
  },
})