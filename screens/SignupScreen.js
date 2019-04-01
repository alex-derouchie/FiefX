import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  Picker,
  ScrollView,
  Alert
} from "react-native";
import AuthNavigationOptions from "../components/AuthNavigationOptions";
import Color from "../constants/Colors";
import {
  createNewAccount,
  addNewUserInformation
} from "../src/DatabaseFunctions";

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
      email: "",
      password: "",
      passConfirm: "",
      question: "",
      answer: "",
      name: ""
    };
  }

  //Calls the Firebase function that creates a new User in the database,
  //after ensuring that all fields were filled out properly.
  signUpUser() {
    if (!this.state.email.includes("@")) {
      Alert.alert("Error", "Email invalid", [{ text: "Okay" }], {
        cancelable: false
      });
    } else if (this.state.password.length < 8) {
      Alert.alert("Error", "Password is too short", [{ text: "Okay" }], {
        cancelable: false
      });
    } else if (this.state.password != this.state.passConfirm) {
      Alert.alert("Error", "Passwords don't match", [{ text: "Okay" }], {
        cancelable: false
      });
    } else if (this.state.question == "") {
      Alert.alert("Error", "Choose a Security Question", [{ text: "Okay" }], {
        cancelable: false
      });
    } else {
      createNewAccount(this.state.email, this.state.password);
      this.props.navigation.navigate("UserInfo");
      setTimeout(() => {
        addNewUserInformation("Name", this.state.name);
        addNewUserInformation("Security Question", this.state.question);
        addNewUserInformation("SecurityQAnswer", this.state.answer);
        addNewUserInformation("WeeklyDistance", 0);
        addNewUserInformation("DailyDistance", 0);
        addNewUserInformation("WeeklyGoal", 5);
      }, 8000);
    }
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
          placeholder=" Email"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          value={this.state.email}
          onChangeText={text => {
            this.setState({ email: text });
          }}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Full Name"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          value={this.state.name}
          onChangeText={text => {
            this.setState({ name: text });
          }}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Password"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={text => {
            this.setState({ password: text });
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
          selectedValue={this.state.question}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ question: itemValue })
          }
        >
          <Picker.Item label="Choose a Security Question" value="" />
          <Picker.Item
            label="Mothers Maiden Name"
            value="Mothers maiden name"
          />
          <Picker.Item
            label="Childhood Best Friend"
            value="childhood best friend"
          />
          <Picker.Item
            label="Primary School Name"
            value="Primary School Name"
          />
          <Picker.Item
            label="Middle Name of Your Oldest Child"
            value="Middle Name of Your Oldest Child"
          />
          <Picker.Item
            label="Last 5 Digits of Your Drivers License Number"
            value="Last 5 Digits of Your Drivers License Number"
          />
          <Picker.Item
            label="Hospital/place You Were Born In"
            value="Hospital/place You Were Born In"
          />
          <Picker.Item label="Dream Vacation" value="Dream Vacation" />
        </Picker>

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Answer"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          value={this.state.answer}
          onChangeText={text => {
            this.setState({ answer: text });
          }}
        />

        {/*In the future, this button will need to check to make sure all the provided information is valid
             Before returning to the login page. */}
        <View style={styles.button}>
          <Button
            title="Sign Me Up!"
            onPress={() => {
              this.signUpUser();
            }}
          />
        </View>
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
