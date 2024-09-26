import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UpComingGame = ({item}) => {
    const navigation = useNavigation();
    console.log('Items:', item);
  return (
    <Pressable 
        onPress={() => navigation.navigate('Game', { item: item })}
        style={styles.container}
    >
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
            <Text style={styles.date}>{item?.sport}</Text><Text>
                    {item?.sport === 'Swimming' ? (
                        <FontAwesome6 
                            name="person-swimming" 
                            size={30} 
                            color="gray" 
                        />
                        ) : (
                        <MaterialCommunityIcons
                            style={{ textAlign: 'center' }}
                            name={item.sport.toLowerCase()}
                            size={30}
                            color="gray"
                        />
                    )}
                </Text>
            <Text style={styles.date}>With own equipments</Text>
        </View>
        <Text style={styles.break}/>

        <View style={styles.gameDetail}>
            <View>
                <Image
                    style={styles.adminImg}
                    source={{uri: item?.adminUrl}}
                />
            </View>

            <View style={{flex: 1}}>
                <Text style={styles.gameTxt}>{item?.adminName}'s {item?.sport} Game</Text>
                <View style={{flexDirection: "row", alignItems: "center", gap: 4,}}>
                    
                    <View style={{flexDirection: "column", alignItems: "center", gap: 4,}}>
                        <Text style={styles.location}>{item?.area}</Text>
                        <Text style={styles.tags}>{item?.date}</Text>
                    </View>

                    <Image 
                        source={require('../public/animations/calender.gif')}
                        style={styles.dateAnimation}
                    />
                </View>

                <View style={[styles.courtDetail, {padding: item?.isBooked ? 0 : 15}]}>
                    {item?.isBooked ? (
                        <>
                            <Text style={styles.courtNum}>{item?.courtNumber}</Text>
                            <View style={styles.bookedContainer}>
                                <Text style={styles.booked}>Booked</Text>
                            </View>
                        </>
                    ) : (
                        <Text style={styles.timeTxt}>{item?.time}</Text>
                    )}
                </View>
            </View>

            {/* Player Count */}
            <View style={styles.playerContainer}>
                <Text style={styles.playerCountTxt}>
                    {item?.players?.length}
                </Text>
                <Text style={styles.goingTxt}>GOING</Text>
            </View>
        </View>        
    </Pressable>
  )
}

export default UpComingGame;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 2,
        marginTop: 10,
        marginBottom: 10,
    },
    break: {
        borderColor: '#E0E0E0', 
        borderWidth: 0.7, 
        height: 1,
        marginTop: 10,
        marginBottom: 10,
    },
    tags: {
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 7,
        alignSelf: 'flex-start', 
    },
    adminImg: {
        width: 60, 
        height: 60, 
        borderRadius: 20
    },
    date: {
        backgroundColor: '#E0E0E0',
        backgroundColor: '#fffbde',
        borderColor: '#EEDC82',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        elevation: 3,
        fontSize: 15,
        fontWeight: "600",
    },
    gameDetail: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: 'white',
    },
    gameTxt: {
        fontSize: 15,
        fontWeight: '600',
        flexWrap: 'wrap', 
    },
    location: {
        color: 'gray',
        marginBottom: 10,
        flexShrink: 1,
        fontSize: 16,
    },
    bookedContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#56cc79',
        paddingVertical: 5,
    },
    booked : {
        fontSize: 13, 
        fontWeight: '500', 
        color: 'white'
    },
    courtDetail: {
        marginVertical: 10,
        borderRadius: 8,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        width: '90%', 
    },
    courtNum: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 13,
        paddingVertical: 10,
    },
    timeTxt: {
        textAlign: 'center', 
        fontWeight: '500',
        fontSize: 16,
    },
    playerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    playerCountTxt: {
        fontSize: 20, 
        fontWeight: 'bold'
    },
    goingTxt: {
        fontSize: 18, 
        fontWeight: '600', 
        marginTop: 10
    },
    dateAnimation: { 
        height: 80, 
        width: 90, 
        marginLeft: "auto", 
        marginRight: "auto" 
    },
})
