import React from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import NavigationOptions from "../components/MainNavigationOptions";

/*
This class represents the Settings page of the app. Currently, there aren't 
a whole lot of settings, partially because we don't have a lot of finalized 
components and we havent decided what we want the user to be able to customize.
*/
export default class SettingsScreen extends React.Component {
  static navigationOptions = NavigationOptions.navigationOptions;

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.blankSpace} />
          <Text style={styles.bigText}>SETTINGS</Text>
          <Text style={styles.smallText}>(There aren't any yet)</Text>

          <Text style={styles.blankSpace} />
          <View style={styles.contentContainer}>
            {/*Developer options will not be available upon release, however during development
              we can place our bypasses here, such as the login screen button until we have a
              finalized logout feature. */}
            <Text style={styles.mediumText}>Developer Options</Text>
            <View style={styles.devButton}>
              <Button
                title="Go To Login"
                onPress={() => this.props.navigation.navigate("Login")}
              />
            </View>
          </View>
          <Text style={styles.blankSpace} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  topContentContainer: {
    paddingTop: 10,
    borderTopWidth: 0
  },
  contentContainer: {
    paddingTop: 10,
    borderTopColor: "#B0B0B0",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  blankSpace: {
    paddingTop: 125
  },
  devButton: {
    padding: 50
  },
  bigText: {
    fontSize: 40,
    color: "#81d3ee",
    textAlign: "center"
  },
  smallText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 20
  },
  mediumText: {
    fontSize: 18,
    textAlign: "left",
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 30
  }
});
