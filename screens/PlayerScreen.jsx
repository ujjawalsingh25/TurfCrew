import React, { useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const PlayerScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
        headerTitle: "",
        headerStyle: { backgroundColor: '#294461' },
        headerLeft: () => (
        <View style={styles.topHeader}>
            <Text style={styles.topHeaderTxt}>
              Players({route?.params?.players?.length})
            </Text>
            <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back" size={35} color="white"
            />
        </View>),
        headerRight: () => (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <View style={styles.pubContainer}>
            <Ionicons name="earth" size={30} color="white" />
            <Text style={styles.pubTxt}>Public</Text>
          </View>
            <Entypo name="share" size={26} color="white" />
            <Entypo name="dots-three-vertical" size={26} color="white" />
        </View>)
    })
}, [])

  return (
    <SafeAreaView>
      <View style={styles.card}>
        {route?.params?.players?.map((item, index) => (
          <Pressable 
            key={index}
            style={styles.playerBtn}
          >
            <View>
              <Image
                style={styles.img}
                source={{uri: item?.image}}
              />
            </View>
            <View>
              <Text>
                {item?.firstName} {item?.lastName}
              </Text>
              <View style={styles.tags}>
                <Text style={styles.intermediateTxt}>INTERMEDIATE</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default PlayerScreen;

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
    // flex: 1,
    backgroundColor: 'white',
    // padding: 10,
  },
  break: {
    height: 1,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    marginVertical: 12,
  },

  nav: {
    padding: 10,
    backgroundColor: '#294461',
    paddingBottom: 20,
  },
  playerCountContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerCount: {
    fontSize: 19, 
    fontWeight: '500', 
    color: 'white',
  },
  pubContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8
  },
  pubTxt:{
    color: 'white'
  },
  card: {
    padding: 12
  },
  img: {
    width: 60, 
    height: 60, 
    borderRadius: 30
  },
  playerBtn: {
    flexDirection:"row",
    alignItems:"center",
    marginVertical: 10,
    gap:10
  },
  tags: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    borderRadius: 20,
    borderColor: 'orange',
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  intermediateTxt: {
    fontSize:13,
    fontWeight:"400"
  },
});