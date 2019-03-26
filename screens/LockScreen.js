import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import TabBarIcon from "../components/TabBarIcon";
import Color from "../constants/Colors";

/*
This class represents the Lock page of the app. It is a non-scrollable screen
that locks you out of all other app functionality until the password is presented.
*/
export default class LockScreen extends React.Component {
  //This object does not display the header bar that the rest of the app does display.
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.center}>
          <View style={styles.blankSpace} />
          <TabBarIcon name={"lock"} size={148} />
          <Text style={styles.lockText}>Your bike is locked!</Text>
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder=" Password"
            placeholderTextColor="#FFFFFF"
            autoCapitalize="none"
          />
          <View style={{ padding: 50 }}>
            <Button
              title="Unlock"
              onPress={() => this.props.navigation.navigate("Home")}
              style={{ width: 150 }}
            />
          </View>
        </View>
      </View>
    );
  }
}

//Styling and formatting
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.themeColor
  },
  blankSpace: {
    paddingTop: 120
  },
  background: {
    flex: 1,
    backgroundColor: Color.themeColor
  },
  center: {
    alignItems: "center"
  },
  lockText: {
    padding: 10,
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 35
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: "#FFFFFF",
    borderWidth: 1
  }
});
