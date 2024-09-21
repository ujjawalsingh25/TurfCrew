import React from 'react'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView, StyleSheet, Text, View, Pressable, ScrollView, Image } from 'react-native'

import Entypo from '@expo/vector-icons/Entypo';
import Amenities from '../components/Amenities';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TurfsInfoScreen = () => {
  const route = useRoute();
  // console.log(route?.params);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <>
            <View>
              <Image
                style={styles.topImg}
                source={{ uri: route?.params?.image }}
              />
            </View>

            <View style={{padding: 10}}>
              <Text style={styles.nameTxt}> 
                {route?.params?.name} 
              </Text>
              
              <View style={styles.timing}>
                <Feather name="clock" size={24} color="black" />
                <Text style={styles.timeTxt}> 
                  {route.params.timings}
                </Text>
              </View>              
              <View style={styles.location}>
                <Entypo name="location-pin" size={30} color="black" />
                <Text style={styles.locationTxt}>
                  {route?.params?.location} 
                </Text>
              </View>
            </View>

            <View style={styles.ratingConatiner}>
              {/* <View> */}
                <View style={{flexDirection: 'row'}}>
                  {[0, 0, 0, 0, 0].map((en, i) => (
                    <AntDesign 
                      key={i}
                      style={{paddingHorizontal: 3}}
                      name={
                        i < Math.floor(route.params.rating) ? 'star' : 'staro'
                      }
                      size={25}
                      color="#E49B0F"
                    />
                  ))}
                  <Text style={{fontSize: 18, fontWeight: "bold"}}>  {route.params.rating}  (500+ ratings)</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 6}}>
                  <MaterialIcons name="add-task" size={24} color="black" />
                  <Text style={{fontSize: 16, fontWeight: "600",}}>
                    20+ total Activities{' '}
                  </Text>
                </View>
              {/* </View> */}
            </View>

            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 40}}>
              <Pressable style={styles.groundRating}>
                <Text>Rate</Text>
              </Pressable>
              <Pressable style={styles.upcommingBtn}>
                <Text>3 Upcomming</Text>
              </Pressable>
            </View>
                
            <Text style={styles.sportHeaderTxt}>Sports Available</Text>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {route.params.sportsAvailable.map((item, index) => (
                <View 
                  key={index}
                  style={styles.sportsIcon}
                >
                  {item?.name === 'Swimming'
                    ? <FontAwesome6 
                        name="person-swimming" 
                        size={30} 
                        color="gray" 
                      /> 
                    : <MaterialCommunityIcons
                        style={{textAlign: 'center'}}
                        name={item.icon}
                        size={30}
                        color="gray"
                      /> 
                  }
                  <Text style={styles.sportsTxt}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </ScrollView>   

            <Amenities />

            <View style={{marginHorizontal: 10}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Activities</Text>
              <Pressable
                onPress={() =>
                    navigation.navigate("Create", {
                      area: route.params.name,
                    })
                  }
                style={styles.activityBtn}>
                <AntDesign name="pluscircleo" size={30} color="black" />
                <Text style={{fontSize: 17}}>Create Activity</Text>
              </Pressable>
            </View>
          </>
        </ScrollView>
      </SafeAreaView>

      <Pressable style={styles.bookingBtn}>
        <Text style={styles.bookingTxt}>
          Book Now
        </Text>
      </Pressable>
    </>
  )
}

export default TurfsInfoScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  topImg: {
    width: '100%', 
    height: 200, 
    resizeMode: 'cover'
  },
  timing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
    marginLeft: 10,
  },
  location: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 8,
    gap: 5,
  },
  nameTxt: {
    fontSize: 25, 
    fontWeight: '600',
    marginTop: 3,
  },
  timeTxt: {
    fontSize: 17, 
    fontWeight: '500',
  },
  locationTxt: {
    fontSize: 16, 
    width: '80%', 
    fontWeight: '600',
    marginTop: 5,
  },
  ratingConatiner: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  groundRating: {
    borderColor: '#686868',
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 6,
    width: 160,
    padding: 10,
    backgroundColor: '#E5E4E2',  
    elevation: 3,
  },
  upcommingBtn: {
    borderColor: '#686868',
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 6,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E5E4E2',  
    elevation: 3,
  },
  sportHeaderTxt: {
    fontSize: 18, 
    fontWeight: 'bold',
    marginHorizontal: 15, 
    marginTop: 15,
  },
  sportsIcon: {
    borderColor: '#686868',
    margin: 10,
    padding: 20,
    width: 130,
    height: 90,
    borderWidth: 1,
    borderRadius: 5,
  },
  sportsTxt: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  activityBtn: {
    borderColor: '#787878',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 25,
    padding: 10,
    gap: 10,
  },
  bookingBtn: {
    backgroundColor: '#6495ED',
    padding: 8,
    marginBottom: 30,
    borderRadius: 15,
    marginHorizontal: 15,
  },
  bookingTxt: {
    textAlign: 'center', 
    color: 'white', 
    fontWeight: 'bold',
    fontSize: 22,
  },
})