import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert
} from "react-native";
import AuthNavigationOptions from "../components/AuthNavigationOptions";
import Color from "../constants/Colors";
import { connect } from "react-redux";

/*
This class represents the Password Recovery page of the app. In the future, it will
ask the security question that the user chose upon registration. For now, it's mostly
a filler page.
*/
class RecoveryScreen extends React.Component {
  static navigationOptions = AuthNavigationOptions.navigationOptions;

  constructor(props) {
    super(props);
    this.state = {
      answer: "",
      question: "Mother's Maiden Name"
    };
  }

  checkAns() {
    if (this.props.settings.lastSA == this.state.answer) {
      this.props.navigation.navigate("PassReset");
    } else {
      Alert.alert("Error", "Invalid Answer", [{ text: "Okay" }], {
        cancelable: false
      });
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.blankSpace} />
        <Text style={styles.bigText}>Password Recovery</Text>
        <Text style={styles.blankSpace} />
        <Text style={styles.smallText}>
          Security Question: {this.props.settings.lastSQ}
        </Text>
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
        <View style={styles.buttonPadding}>
          <Button
            title="Recover Account"
            onPress={() => {
              this.checkAns();
            }}
          />
        </View>
        <Text style={styles.blankSpace} />
        <Text style={styles.blankSpace} />
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
  smallText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 15,
    marginBottom: 10,
    color: "#FFFFFF"
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

//Redux Functions
function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

export default connect(
  mapStateToProps,
  null
)(RecoveryScreen);
