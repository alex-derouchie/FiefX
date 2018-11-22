import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AuthNavigationOptions from "../components/AuthNavigationOptions";

/*
This class represents the Password Recovery page of the app. In the future, it will
ask the security question that the user chose upon registration. For now, it's mostly
a filler page.
*/
export default class RecoveryScreen extends React.Component {
  static navigationOptions = AuthNavigationOptions.navigationOptions;

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.blankSpace} />
        <Text style={styles.bigText}>Password Recovery</Text>
        <Text style={styles.blankSpace} />
        <Text style={styles.smallText}>
          Security Question: Gallo 12 or Gallo 24?
        </Text>
        <View style={styles.buttonPadding}>
          <Button
            title="Gallo 12"
            onPress={() => this.props.navigation.navigate("Lock")}
          />
        </View>
        <View style={styles.buttonPadding}>
          <Button
            title="Neither"
            onPress={() => this.props.navigation.navigate("Login")}
          />
          <Text style={styles.blankSpace} />
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
  blankSpace: {
    paddingTop: 100
  },
  smallText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 35,
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
  }
});
