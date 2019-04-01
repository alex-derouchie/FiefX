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
import Color from "../constants/Colors";
import { signInWithParams } from "../src/DatabaseFunctions";
import { connect } from "react-redux";

/*
This class represents the Login page of the app. It is the root of the 
Authentication stack navigator and the root of the AppNavigator. The 
application opens into this screen.
*/
class LoginScreen extends React.Component {
  //This Object represents the top bar across the app and
  //handles the components and styling contained within the bar.
  static navigationOptions = AuthNavigationOptions.navigationOptions;

  //Create a local (non-redux) state which keeps track of the input fields
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  // The signIn function handles the Firebase Authentication of the application. It calls
  // the database function responsible for signing in the user, after ensuring the fields
  // have valid data in them, then pauses long enough for Google to respond to the function
  // call, at which point it either navigates to the HomeScreen or denies access to the app.
  signIn() {
    console.log("Test1");
    if (this.state.password == "" || this.state.email == "") {
      Alert.alert("Error", "There are empty fields", [{ text: "Okay" }], {
        cancelable: false
      });
    } else if (!this.state.email.includes("@")) {
      Alert.alert("Error", "Email invalid", [{ text: "Okay" }], {
        cancelable: false
      });
    } else if (this.state.password.length < 8) {
      Alert.alert("Error", "Password is too short", [{ text: "Okay" }], {
        cancelable: false
      });
    } else {
      signInWithParams(this.state.email, this.state.password);
      setTimeout(() => {
        console.log("Test2");
        if (this.props.profile.signedIn) {
          this.props.navigation.navigate("Home");
        } else {
          Alert.alert(
            "Error",
            "Sign In failed: check your credentials",
            [{ text: "Okay" }],
            {
              cancelable: false
            }
          );
        }
      }, 1500);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.blankSpace} />
        <Text style={styles.loginText}>Login</Text>

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Email or Username"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          onChangeText={text => this.setState({ email: text })}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Password"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
        />

        <View style={styles.buttonView}>
          <Button
            title="Login"
            onPress={() => {
              this.signIn();
            }}
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

//Styling and formatting
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.themeColor
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

//Redux Functions
function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(
  mapStateToProps,
  null
)(LoginScreen);
