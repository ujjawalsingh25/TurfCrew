import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';


import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Game = ({item}) => {
    const navigation = useNavigation();

  return (
    <Pressable 
    //   onPress={() => navigation.navigate('Game', { item: item }) }
      style={styles.container}
    >
        <View style={{marginTop: 10}}>

            <View style={styles.playerContainer}>
                <View style={{flexDirection: 'row'}}>
                    <Image
                        style={styles.userImg}
                        source={{uri: item?.adminUrl}}
                    />
                    <View style={styles.players}>
                        {item?.players
                            ?.filter(c => c?.name !== item?.adminName)
                            .map((player, index) => (
                            <Image
                                key={index} 
                                style={styles.playerImg}
                                source={{uri: player?.imageUrl}}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.playerCount}>
                    <Text style={styles.playerCountTxt}>
                        • {item?.players.length}/{item?.totalPlayers} Going
                    </Text>
                </View>

                <View style={styles.sport}>
                    <Text style={styles.sportTxt}>
                        {item.sport}
                    </Text>
                    <Text>
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
                </View>
            </View>

            <View style={styles.gameDetail}>
                <View>
                    <Text style={styles.adminTxt}> {item?.adminName} | ₹500 | On Fire </Text>
                    <Text style={styles.gameDate}>{item?.date}, {item?.time}</Text>
                </View>
                {item?.matchFull && (
                    <Image
                    style={styles.matchFullImg}
                    source={{
                        uri: 'https://playo.co/_next/image?url=https%3A%2F%2Fplayo-website.gumlet.io%2Fplayo-website-v3%2Fmatch_full.png&w=256&q=75',
                    }}
                    />
                )}
            </View>

            <View style={styles.location}>
                <SimpleLineIcons name="location-pin" size={20} color="black" />
                <Text style={styles.locationTxt} >
                    {item?.area}
                </Text>
                <Feather name="bookmark" size={28} color="black" />
            </View>

            <View style={styles.tags}>
                <View style={styles.level}>
                    <Text style={styles.levelTxt}>
                        Intermediate to Advanced
                    </Text>
                </View>
                <View style={styles.level}>
                    <Text style={styles.levelTxt}>
                        Only {item?.totalPlayers - item?.players.length} slots left 🚀
                    </Text>
                </View>
            </View>

        </View>
    </Pressable>
  )
}

export default Game

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 14,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    playerContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    bookmark: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },
    regularTxt: {
        color: 'gray', fontSize: 16, 
        marginHorizontal: 15
    },
    userImg: {
        width: 56, 
        height: 56, 
        borderRadius: 28
    },
    players: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -7,
    },
    playerImg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginLeft: -7,
    },
    playerCount: {
        marginLeft: 10, 
        flex: 1
    },
    playerCountTxt: {
        fontSize: 16, 
        fontWeight: '500'
    }, 
    sport: {
        backgroundColor: '#fffbde',
        borderColor: '#EEDC82',
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: 'row-reverse',
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        elevation: 5,
        gap: 10,
    },
    sportTxt: {
        fontSize: 16,
        fontWeight: "500",
    },
    gameDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    adminTxt: {
        marginTop: 10, 
        color: 'gray', 
        fontSize: 15
    },
    gameDate: {
        marginTop: 10, 
        fontSize: 14, 
        fontWeight: '500',
    },
    matchFullImg: {
        width: 100, 
        height: 70, 
        resizeMode: 'contain'
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        marginRight: 20,
    },
    locationTxt: {
        flex: 1,
        fontSize: 16, 
    },
    level: {
        backgroundColor: '#E0E0E0',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 7,
        marginTop: 12,
        alignSelf: 'flex-start', // This line ensures the width is based on the content
    },
    levelTxt : {
        fontSize: 14, 
        fontWeight: '400'
    },
    tags: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})