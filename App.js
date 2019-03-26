import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import firebase from "@firebase/app";
import "@firebase/database";
import { updateBluetooth } from "./src/BluetoothIngest";
import { connect } from "react-redux";

import AppNavigator from "./navigation/AppNavigator";

//Root component of the app. Calls AppNavigator to
//initialize the react-navigation components responsible
//for displaying the screens of the app. Also initializes the
//Firebase object and updates Bluetooth data periodically.

class YourApp extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDHD8AFvTRKau3Ao2NE8Qv3nGRgj7OeXM8",
      authDomain: "testproj-7213b.firebaseapp.com",
      databaseURL: "https://testproj-7213b.firebaseio.com",
      projectId: "testproj-7213b",
      storageBucket: "testproj-7213b.appspot.com",
      messagingSenderId: "384434208146"
    };
    firebase.initializeApp(config);
    console.log("Firestore Initialized");

    setInterval(() => {
      if (this.props.profile.signedIn) {
        updateBluetooth();
      }
    }, 400);
  }

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

//Redux functions

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(
  mapStateToProps,
  null
)(YourApp);
