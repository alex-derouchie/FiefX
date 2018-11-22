import React from "react";
import { StyleSheet, View } from "react-native";
import AuthNavigationOptions from "../components/AuthNavigationOptions";
import UserMap from "../components/UserMap";

/*
This class represents the Map page of the app. It is mainly
a shell that renders the UserMap component which is where the MapView
component is initialized.
*/
export default class MapScreen extends React.Component {
  static navigationOptions = AuthNavigationOptions.navigationOptions;

  render() {
    return (
      <View style={styles.container}>
        <UserMap />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
