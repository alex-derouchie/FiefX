import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import AppNavigator from "./navigation/AppNavigator";

//Root component of the app. Calls AppNavigator to
//initialize the react-navigation components responsible
//for displaying the screens of the app.
export default class YourApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});