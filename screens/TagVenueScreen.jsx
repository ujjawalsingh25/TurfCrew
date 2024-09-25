import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TagVenueScreen = () => {
    const navigation = useNavigation();
    const [venues, setVenues] = useState([]);
    const [taggedVenue, setTaggedVenue] = useState(null);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
              const response = await axios.get('http://192.168.237.220:8000/venues');
              setVenues(response.data);
            } catch (error) {
              console.error('Failed to fetch venues:', error);
            }
          };
      
          fetchVenues(); 
    }, [])
    // console.log('venues', venues);

    useEffect(() => {
        if (taggedVenue) {
            console.log("taggedVenue")
            navigation.goBack({taggedVenue});
        } 
    }, [taggedVenue, navigation]);

    const handleSelectVenue = (venue) => {
        navigation.navigate('Create', { taggedVenue: venue });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
        headerTitle: "",
        headerStyle: { backgroundColor: '#294461' },
        headerLeft: () => (
            <View style={styles.topHeader}>
                <Text style={styles.topHeaderTxt}>Tag Venue</Text>
                <Ionicons
                    onPress={() => navigation.goBack()}
                    name="arrow-back" size={35} color="white"
                />
            </View>
        ),});
    }, [])


  return (
    <SafeAreaView>
        <FlatList 
            data={venues}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
                <Pressable
                    onPress={() => handleSelectVenue(item?.name)}
                    style={styles.turfContainer}
                >
                    <View>
                        <View style={styles.tagContainer}>
                            <Image
                                style={styles.image}
                                source={{ uri: item?.image,}}
                            />
    
                            <View style={{flex: 1}}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.name}
                                >
                                    {item?.name}
                                </Text>
                    
                                <Text style={styles.address}>{item?.address}</Text>
                    
                                <Text style={[styles.rating, {color: item?.rating >= 4 ? "#4F7942" : "#E97451" }]}> 
                                    <Entypo 
                                        name="star-outlined" size={20} 
                                    /> {item?.rating}  ({item?.ratingCount}+ rating)
                                </Text>
                            </View>

                            <Ionicons name="shield-checkmark-sharp" size={40} color="green" />
                        </View>
                        <View style={styles.breakLine}/>

                        <View style={styles.offerContainer}>
                            <View style={styles.offerPrice}>
                                <MaterialIcons name="discount" size={20} color="black" />
                                {/* <Text>  Upto {item.sale}% off</Text> */}
                                <Text>  Upto 20% off</Text>
                            </View>
                            <View style={styles.offerPrice}>
                                <FontAwesome name="rupee" size={18} color="black" />
                                {/* <Text> {item.priceOnwards} onwards</Text> */}
                                <Text> 800 onwards</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
            )}
        /> 
    </SafeAreaView>
  )
}

export default TagVenueScreen;

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
        backgroundColor: 'white',
        // paddingTop: Platform.OS === 'android' ? 35 : 0,
        padding: 10,
    },
    turfContainer: {
        padding: 10,
        marginVertical: 10,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        marginHorizontal: 10,
    },
    tagContainer: {
        flexDirection: 'row', 
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10
    },
    image: {
        width: 120,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 7,
    },
    name: {
        fontSize: 18, 
        fontWeight: '500', 
        width: '100%'
    },
    address: {
        marginTop: 5, 
        fontSize: 14,
        color: 'gray'
    },
    rating: {
        marginTop: 8, 
        fontWeight: '500',
        gap: 4,
    },
    bookable: {
        textAlign: 'center', 
        color: 'gray',
    },
    offerContainer: {
        flexDirection: "row", 
        justifyContent: "space-between",
    },
    offerPrice: {
        flexDirection: "row",
        backgroundColor: '#E5E4E2',
        alignItems: 'center',
        borderRadius: 6,
        elevation: 1,
        gap: 6,
        padding: 6,
    },
    breakLine: {
    height: 1,
    borderWidth: 0.6,
    borderColor: '#E0E0E0',
    marginVertical: 10,
  },
})