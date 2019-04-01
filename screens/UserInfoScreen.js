import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Alert,
  Picker
} from "react-native";
import AuthNavigationOptions from "../components/AuthNavigationOptions";
import Color from "../constants/Colors";
import { addNewUserInformation } from "../src/DatabaseFunctions";

/*
This React Component asks for further data from the user upon initial signup.
*/
export default class SignupScreen extends React.Component {
  static navigationOptions = AuthNavigationOptions.navigationOptions;

  constructor(props) {
    super(props);
    this.state = {
      age: "",
      bodyWeight: "",
      tireSize: "",
      city: ""
    };
  }

  writeUserData(age, bodyWeight, tireSize, city) {
    if (age == "" || bodyWeight == "" || tireSize == "" || city == "") {
      Alert.alert(
        "Invalid Input",
        "Make sure all fields are filled in",
        [{ text: "Okay" }],
        { cancelable: false }
      );
    } else {
      addNewUserInformation("Age", age);
      addNewUserInformation("bodyWeight", bodyWeight);
      addNewUserInformation("TireSize", tireSize);
      addNewUserInformation("City", city);
      this.props.navigation.navigate("Home");
    }
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: Color.themeColor, flex: 1 }}>
        <Text style={styles.blankSpace} />
        <View>
          <Text style={styles.bigText}>User Information</Text>
        </View>

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Age"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          value={this.state.age}
          onChangeText={text => {
            this.setState({ age: text });
          }}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Body Weight (lbs)"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          value={this.state.bodyWeight}
          onChangeText={text => {
            this.setState({ bodyWeight: text });
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
          selectedValue={this.state.tireSize}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ tireSize: itemValue })
          }
        >
          <Picker.Item label="Tire Size" value="" />
          <Picker.Item label="12 inches" value="12" />
          <Picker.Item label="14 inches" value="14" />
          <Picker.Item label="16 inches" value="16" />
          <Picker.Item label="17 inches" value="17" />
          <Picker.Item label="18 inches" value="18" />
          <Picker.Item label="20 inches" value="20" />
          <Picker.Item label="22 inches" value="22" />
          <Picker.Item label="24 inches" value="24" />
          <Picker.Item label="25 inches" value="25" />
          <Picker.Item label="26 inches" value="26" />
          <Picker.Item label="27 inches" value="27" />
          <Picker.Item label="27.5 inches" value="27.5" />
          <Picker.Item label="28 inches" value="28" />
          <Picker.Item label="29 inches" value="29" />
        </Picker>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" City"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          value={this.state.city}
          onChangeText={text => {
            this.setState({ city: text });
          }}
        />

        <View style={styles.button}>
          <Button
            title="Add Information"
            onPress={() => {
              this.writeUserData(
                this.state.age,
                this.state.bodyWeight,
                this.state.tireSize,
                this.state.city
              );
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Skip"
            onPress={() => {
              Alert.alert(
                "Are you sure?",
                "Skipping this information will prevent some parts of the app from being used.",
                [
                  { text: "Cancel" },
                  {
                    text: "Skip",
                    onPress: () => this.props.navigation.navigate("Login")
                  }
                ],
                { cancelable: false }
              );
            }}
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
  header: {
    fontSize: 26,
    color: "#FFFFFF",
    textAlign: "center"
  },
  button: { paddingTop: 30, paddingHorizontal: 35 }
});
