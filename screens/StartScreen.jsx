import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps';

import usersAtMap from '../api/data/usersAtMap';
import { useNavigation } from '@react-navigation/native';

const StartScreen = () => {
  const mapView = useRef(null);
  const navigation = useNavigation();

  const PATNA_COORDS = {
    latitude: 25.5938,
    longitude: 85.1865,
  };

  const generateCircularPoints = (center, radius, numPoints) => {
    const points = [];
    const angleStep = (2 * Math.PI) / numPoints;

    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep;
      const latitude = center.latitude + (radius / 111) * Math.cos(angle);
      const longitude = center.longitude + (radius / (111 * Math.cos(center.latitude))) * Math.sin(angle);
      points.push({latitude, longitude});
    }

    return points;
  };
  const numPoints = 6;        // Number of points in the circle
  const radius = 7;          // Radius of the circle in degrees (approx 1 km)
  
  const circularPoints = generateCircularPoints (
    PATNA_COORDS,
    radius,
    numPoints
  )
  // console.log("Points: ", circularPoints);

  useEffect(() => {
    mapView.current.fitToCoordinates(circularPoints, {
      edgePadding: {
        top: 70,
        bottom: 70,
        left: 70,
        right: 70,
      },
    });
  }, []);

  return (
    <SafeAreaView>
      <MapView 
        ref={mapView}
        style={{width: '100%', height: 400}}
        initialRegion={{
          latitude: 25.5938,
          longitude: 85.1605,
          latitudeDelta: 0.198,
          longitudeDelta: 0.198,
        }}>

          {/* {circularPoints?.map((point, index) => {
            const user = usersAtMap[index % usersAtMap.length];    // Cycle through users if more points than users
            return (
              <Marker key={index} coordinate={point}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    source={{uri: user.image}}
                    style={styles.userImg}
                  />
                </View>

                <View
                  style={styles.userMsgBox}>
                  <Text
                    style={styles.userMsg}>
                    {user?.description}
                  </Text>
                </View>
              </Marker>
            );
          })} */}
          {usersAtMap.map((user, index) => (
            <Marker
              key={user.id}
              coordinate={{
                latitude: parseFloat(user.latitude),  // Ensure latitude is a float
                longitude: parseFloat(user.longitude), // Ensure longitude is a float
              }}
            >
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={{uri: user.image}}
                  style={styles.userImg}
                />
              </View>

              <View style={styles.userMsgBox}>
                <Text style={styles.userMsg}>
                  {user.description}
                </Text>
              </View>
            </Marker>
          ))}
        </MapView>

        <View
          style={styles.header}>
          <Text
            style={styles.headerTxt}>
            Find Player in your Neighbourhood
          </Text>
        </View>

        <View style={styles.signup}>
          <Pressable 
            onPress={() => navigation.navigate('Register')}
            style={styles.signupBtn}
          >
            <Text style={styles.signupTxt}>Register</Text>
          </Pressable>
        </View>    
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.loginBtn}
        >
          <View style={{flexDirection: "row", gap: 5}}>
            <Text style={styles.loginQues}>Already have an account?</Text>
            <Text style={styles.login}>Login</Text>
          </View>
        </Pressable>

        <View style={styles.logo}>
          <Image 
              source={require('../public/logo.png')} // Corrected local image source
              style={styles.logoImg}
            />
          <Text style={styles.logoTxt}>Your Sports Community</Text>
          <Text style={styles.logoTxt}>&copy;Ujjawal Singh</Text>
          <Text style={[styles.logoTxt, {marginBottom: 15}]}>All Rights Reserved</Text>
        </View>
    </SafeAreaView>
  )
}

export default StartScreen

const styles = StyleSheet.create({
  userImg: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 35,
  },
  userMsgBox: {
    paddingHorizontal: 8,
    paddingVertical: 7,
    borderRadius: 7,
    backgroundColor: 'white',
  },
  userMsg: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
  },
  header: {
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: 22,
    fontWeight: '500',
    width: '50%',
    textAlign: 'center',
  },
  loginQues: {
    color:"#212121",
    fontSize:20,
  },
  signup: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupBtn: {
    backgroundColor: '#6495ED',
    borderRadius: 12,
    padding: 12,
    marginBottom: 5,
    elevation: 5,
  },
  signupTxt: {
    color:"#fff",
    fontSize:20,
  },
  loginBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    color:"#6495ED",
    fontSize:20,
  },
  logo: {
    marginTop: 40,
    marginLeft: "auto", 
    marginRight: "auto"
  },
  logoImg: {
    width: 250,
    height: 150,
    resizeMode: "contain",
    marginBottom: 12,
  },
  logoTxt: {
    color: "gray",
    textAlign: "center",
    fontSize: 16,
  },
})