import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import AuthNavigationOptions from "../components/AuthNavigationOptions";
import Color from "../constants/Colors";

/*
This class represents the Password Recovery page of the app. In the future, it will
ask the security question that the user chose upon registration. For now, it's mostly
a filler page.
*/
export default class RecoveryScreen extends React.Component {
  static navigationOptions = AuthNavigationOptions.navigationOptions;

  constructor(props) {
    super(props);
    this.state = {
      pass: "",
      passConfirm: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.blankSpace} />
        <Text style={styles.bigText}>Password Reset</Text>
        <Text style={styles.blankSpace} />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Password"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          secureTextEntry={true}
          value={this.state.pass}
          onChangeText={text => {
            this.setState({ pass: text });
          }}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Confirm Password"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          secureTextEntry={true}
          value={this.state.passConfirm}
          onChangeText={text => {
            this.setState({ passConfirm: text });
          }}
        />
        <View style={styles.buttonPadding}>
          <Button
            title="Reset Password"
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          />
        </View>
        <Text style={styles.blankSpace} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.themeColor
  },
  blankSpace: {
    paddingTop: 50
  },
  bigText: {
    fontSize: 40,
    color: "#FFFFFF",
    textAlign: "center"
  },
  buttonPadding: {
    paddingHorizontal: 50,
    paddingVertical: 10
  },
  input: {
    margin: 15,
    height: 40,
    backgroundColor: "#addcec",
    color: "#FFFFFF"
  }
});
