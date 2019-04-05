import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import TabBarIcon from "../components/TabBarIcon";
import Color from "../constants/Colors";
import { connect } from "react-redux";

/*
This class represents the Lock page of the app. It is a non-scrollable screen
that locks you out of all other app functionality until the password is presented.
*/
class LockScreen extends React.Component {
  //This object does not display the header bar that the rest of the app does display.
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      textEntry: ""
    };
  }

  unlock() {
    if (this.state.textEntry == this.props.profile.curPass) {
      this.props.navigation.navigate("Home");
    } else {
      Alert.alert("Error", "Incorrect Password", [{ text: "Okay" }], {
        cancelable: false
      });
    }
  }

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.blankSpace} />
        <View style={styles.center}>
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
            value={this.state.textEntry}
            secureTextEntry={true}
            onChangeText={text => {
              this.setState({ textEntry: text });
            }}
          />
          <View style={{ padding: 50 }}>
            <Button
              title="Unlock"
              onPress={() => this.unlock()}
              style={{ width: 150 }}
            />
          </View>
          <View style={styles.blankSpace} />
          <View style={styles.blankSpace} />
          <View style={styles.blankSpace} />
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
    paddingTop: 60
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
    borderWidth: 1,
    color: "#FFFFFF"
  }
});

//Redux Functions

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(
  mapStateToProps,
  null
)(LockScreen);
