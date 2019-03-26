import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import AuthNavigationOptions from "../components/AuthNavigationOptions";
import Color from "../constants/Colors";
import firebase from "@firebase/app";
import "@firebase/database";

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
      firebase
        .database()
        .ref(`Users/`)
        .push({
          age,
          bodyWeight,
          tireSize,
          city
        })
        .then(data => {
          //success callback
          console.log("data ", data);
          this.props.navigation.navigate("Login");
          this.state.nextUID++;
        })
        .catch(error => {
          //error callback
          console.log("error ", error);
        });
    }
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: Color.themeColor, flex: 1 }}>
        <Text style={styles.blankSpace} />
        <View>
          <Text style={styles.bigText}>User Information</Text>
          <Text style={styles.header}>(Optional)</Text>
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
          placeholder=" Body Weight"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          value={this.state.bodyWeight}
          onChangeText={text => {
            this.setState({ bodyWeight: text });
          }}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" Tire Size"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          secureTextEntry={true}
          value={this.state.tireSize}
          onChangeText={text => {
            this.setState({ tireSize: text });
          }}
        />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder=" City"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          secureTextEntry={true}
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
              this.props.navigation.navigate("Login");
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
