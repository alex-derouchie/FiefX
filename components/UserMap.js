import React from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

//This object exports a component that returns a Map object to be rendered by the calling component.
const UserMap = props => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 45.4216,
          longitude: -75.6759,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0221
        }}
      >
      <MapView.Marker coordinate={markerLocation}
        opacity= {0.7}
        image={require("../assets/images/Bike.png")}
      />
      </MapView>
    </View>
  );
};

const markerLocation = {
  latitude: 45.4216,
  longitude: -75.6759
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default UserMap;
