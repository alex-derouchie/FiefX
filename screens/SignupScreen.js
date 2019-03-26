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
import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/firestore";

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

  writeUserData(email, name, password, passConfirm, question, answer) {
    if (password != passConfirm) {
      Alert.alert(
        "Invalid Input",
        "Make sure your passwords match.",
        [{ text: "Okay" }],
        { cancelable: false }
      );
    } else if (
      email == "" ||
      name == "" ||
      password == "" ||
      passConfirm == "" ||
      question == "" ||
      answer == ""
    ) {
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
          email,
          name,
          password,
          question,
          answer
        })
        .then(data => {
          //success callback
          console.log("data ", data);
          this.props.navigation.navigate("UserInfo");
        })
        .catch(error => {
          //error callback
          console.log("error ", error);
        });
    }
  }

  firestoreTest(
    collectionName,
    docID,
    email,
    name,
    password,
    passConfirm,
    question,
    answer
  ) {
    if (password != passConfirm) {
      Alert.alert(
        "Invalid Input",
        "Make sure your passwords match.",
        [{ text: "Okay" }],
        { cancelable: false }
      );
    } else if (
      email == "" ||
      name == "" ||
      password == "" ||
      passConfirm == "" ||
      question == "" ||
      answer == ""
    ) {
      Alert.alert(
        "Invalid Input",
        "Make sure all fields are filled in",
        [{ text: "Okay" }],
        { cancelable: false }
      );
    } else {
      firebase
        .firestore()
        .collection(collectionName)
        .doc(docID)
        .set({
          email: email,
          name: name,
          password: password,
          question: question,
          answer: answer
        })
        .then(data => {
          //success callback
          console.log("data ", data);
          this.props.navigation.navigate("UserInfo");
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
          placeholder=" Name"
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
              this.props.navigation.navigate("UserInfo");
              // this.writeUserData(
              //   this.state.email,
              //   this.state.name,
              //   this.state.password,
              //   this.state.passConfirm,
              //   this.state.question,
              //   this.state.answer
              // );
            }}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Firestore Test"
            onPress={() => {
              console.log("Pressed");
              this.firestoreTest(
                "Users",
                "User1",
                this.state.email,
                this.state.name,
                this.state.password,
                this.state.passConfirm,
                this.state.question,
                this.state.answer
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
  button: { padding: 50 }
});

{
  /* <Button
title="Data Test"
onPress={() =>
  this.writeUserData(
    "004",
    "alexderand@sympatico.ca",
    "Alex",
    "Derouchie",
    "9006"
  )
}
/> */
}
