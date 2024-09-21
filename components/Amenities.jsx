import React from "react";
import { StyleSheet, Text, View } from "react-native";

import services from "../api/data/services";

const Amenities = () => {
  
  return (
    <View style={{ padding: 10 }}>
      <Text style={styles.header}>
        Most Popular Facilities
      </Text>
      <View
        style={styles.facilities}
      >
        {services.map((item, index) => (
          <View
            style={styles.facilitiesBoxes}
            key={index}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Amenities;

const styles = StyleSheet.create({
  header: { 
    fontSize: 18, 
    fontWeight: "bold",
    marginHorizontal: 10, 
    marginTop: 2, 
  },
  facilities: { 
      flexDirection: "row", 
      alignItems: "center", 
      flexWrap: "wrap", 
  },
  facilitiesBoxes: {
      margin: 10,
      backgroundColor: "#6495ED",
      paddingHorizontal: 11,
      paddingVertical: 5,
      borderRadius: 25,
  },
});
