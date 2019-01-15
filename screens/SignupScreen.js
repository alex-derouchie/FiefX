import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  Picker,
  ScrollView
} from "react-native";
import AuthNavigationOptions from "../components/AuthNavigationOptions";
import Color from "../constants/Colors";

/*
This class represents the Signup page of the app. It asks the user to provide
all the authentication information as well as password recovery options that will
be needed to initialize a user account.
*/
export default class SignupScreen extends React.Component {
  static navigationOptions = AuthNavigationOptions.navigationOptions;

  //We need a constructor to be able to dynmically tie the value the user chose in the
  //Picker with the answer provided to the selected question. To be displayed in the
  //recovery screen.
  constructor(props) {
    super(props);
    this.state = {
      pickerVal: ""
    };
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: Color.themeColor, flex: 1 }}>
        <Text style={styles.blankSpace} />
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={styles.bigText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Email or Username"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Password"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          secureTextEntry = {true}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Confirm Password"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          secureTextEntry = {true}
        />
        <Picker
          style={{
            height: 40,
            margin: 15,
            borderWidth: 1,
            borderColor: "white",
            color: "white",
            backgroundColor: "#addcec"
          }}
          mode="dropdown"
          selectedValue={this.state.pickerVal}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ pickerVal: itemValue })
          }
        >
          <Picker.Item
            label="Choose a Security Question"
            value="Choose a Security Question"
          />
          <Picker.Item
            label="Mothers Maiden Name"
            value="Mothers maiden name"
          />
          <Picker.Item
            label="Childhood Best Friend"
            value="childhood best friend"
          />
        </Picker>

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Answer"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
        />

        {/*In the future, this button will need to check to make sure all the provided information is valid
             Before returning to the login page. */}
        <View style={styles.button}>
          <Button
            title="Sign Me Up!"
            onPress={() => this.props.navigation.navigate("Login")}
          />
        </View>
        <Text style={styles.blankSpace} />
        <Text style={styles.blankSpace} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.themeColor
  },
  blankSpace: {
    paddingTop: 100
  },
  input: {
    margin: 15,
    height: 40,
    backgroundColor: "#addcec",
    color: "#FFFFFF"
  },
  submitButton: {
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: "white"
  },
  bigText: {
    fontSize: 40,
    color: "#FFFFFF",
    textAlign: "center"
  },
  button: { padding: 50 }
});
