import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  Alert
} from "react-native";
import AuthNavigationOptions from "../components/AuthNavigationOptions";

/*
This class represents the Login page of the app. It is the root of the 
Authentication stack navigator and the root of the AppNavigator. The 
application opens into this screen.
*/
export default class LoginScreen extends React.Component {
  //This Object represents the top bar across the app and
  //handles the components and styling contained within the bar.
  static navigationOptions = AuthNavigationOptions.navigationOptions;

  constructor(props) {
    super(props);
    this.state = {
      username: "alex1167",
      password: "password",
      userIn: "",
      passIn: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.blankSpace} />
        <View>
          {/*Currently, this screen has a login bypass where you can just press the
             Login text to get into the app. Will be removed after development. */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Email or Username"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          onChangeText={text => this.setState({ userIn: text })}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Password"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={text => this.setState({ passIn: text })}
        />

        <View style={styles.buttonView}>
          <Button
            title="Login"
            onPress={() =>
              this.state.passIn == this.state.password &&
              this.state.userIn == this.state.username
                ? this.props.navigation.navigate("Home")
                : Alert.alert(
                    "Incorrect user ID or password.",
                    "Type the correct user ID and password, and try again.",
                    [{ text: "Okay" }],
                    { cancelable: false }
                  )
            }
          />
        </View>

        <View style={styles.buttonView}>
          <Button
            title="Sign Me Up!"
            onPress={() => this.props.navigation.navigate("Signup")}
          />
        </View>
        <View>
          <Text style={styles.blankSpace} />
          <Text style={styles.blankSpace} />
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Recovery")}
          >
            <Text style={styles.passwordRecovery}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#81d3ee"
  },
  //Provides some whitespace between components to space things out nicely.
  blankSpace: {
    paddingTop: 40
  },
  input: {
    margin: 15,
    height: 40,
    backgroundColor: "#addcec",
    color: "#FFFFFF"
  },
  loginText: {
    fontSize: 40,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 25
  },
  passwordRecovery: {
    fontSize: 14,
    color: "#FFFFFF",
    textAlign: "center",
    textDecorationLine: "underline"
  },
  buttonView: { paddingHorizontal: 50, paddingVertical: 20 }
});
