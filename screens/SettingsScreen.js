import React from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import NavigationOptions from "../components/MainNavigationOptions";
import Colors from "../constants/Colors";
import {themeChangeGreen} from '../src/actions';
import { connect } from 'react-redux';

/*
This class represents the Settings page of the app. Currently, there aren't 
a whole lot of settings, partially because we don't have a lot of finalized 
components and we havent decided what we want the user to be able to customize.
*/
class SettingsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      themeColor: "#81d3ee"
    };
  }

  static navigationOptions = NavigationOptions.navigationOptions;

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.bigText}>SETTINGS</Text>
          <Text style = {{fontSize: 26, color: this.props.themeColor, textAlign: "center", padding: 15}}>Test</Text>
          <View style={styles.devButton}>
              <Button
                title="Green"
                onPress={() => this.props.themeChangeGreen}
              />
            </View>
            <View style={styles.devButton}>
              <Button
                title="Blue"
                onPress={() => this.props.navigation.navigate("Login")}
              />
            </View>

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
    color: Colors.themeColor,
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

function mapStateToProps(state){
  return {
    themeColor : state.color
  }
}

export default connect(mapStateToProps, {themeChangeGreen})(SettingsScreen);