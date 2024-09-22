import React, { useLayoutEffect } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppHeader = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View>
          <Image
            source={require('../public/title-logo.png')}
            style={{ height: 25, width: 220, marginLeft: 10 }}
          />
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRt}>
          <Ionicons name="chatbox-outline" size={30} color="black" />
          <Ionicons name="notifications-outline" size={30} color="black" />
          <Pressable>
            {/* <Image
              style={styles.accountImg}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/4140/4140061.png"
              }}
            /> */}
          </Pressable>
        </View>
      )
    });
  }, []);

  return null;
};

const styles = StyleSheet.create({
  accountImg: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  headerRt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    margin: 15,
  },
});

export default AppHeader;
