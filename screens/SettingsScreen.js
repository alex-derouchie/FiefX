import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Picker
} from "react-native";
import NavigationOptions from "../components/MainNavigationOptions";
import Colors from "../constants/Colors";

export default class SettingsScreen extends React.Component {
  static navigationOptions = NavigationOptions.navigationOptions;

  constructor(props) {
    super(props);
    this.state = {
      distanceGoal: 2
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.bigText}>SETTINGS</Text>
          <View style={styles.devButton}>
            <Button
              title="Logout"
              onPress={() => this.props.navigation.navigate("Login")}
            />
          </View>
          <View style={styles.devButton}>
            <Button
              title="Delete Account"
              onPress={() =>
                Alert.alert(
                  "Are you sure?",
                  "This will permanently delete your account and all its data.",
                  [
                    { text: "Cancel" },
                    {
                      text: "Delete",
                      onPress: () => this.props.navigation.navigate("Login")
                    }
                  ],
                  { cancelable: false }
                )
              }
            />
            <Text style={styles.blankSpace} />
            <Text style={styles.smallText}>Daily Goal:</Text>
            <Picker
              style={{
                height: 40,
                width: 315,
                borderWidth: 2,
                paddingVertical: 15,
                borderColor: "black",
                color: "white",
                backgroundColor: "#00A0E0"
              }}
              mode="dropdown"
              selectedValue={this.state.distanceGoal}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ distanceGoal: itemValue })
              }
            >
              <Picker.Item label="2 Kilometers" value={2} />
              <Picker.Item label="3 Kilometers" value={3} />
              <Picker.Item label="4 Kilometers" value={4} />
              <Picker.Item label="5 Kilometers" value={5} />
              <Picker.Item label="6 Kilometers" value={6} />
              <Picker.Item label="7 Kilometers" value={7} />
              <Picker.Item label="8 Kilometers" value={8} />
              <Picker.Item label="9 Kilometers" value={9} />
              <Picker.Item label="10 Kilometers" value={10} />
              <Picker.Item label="12 Kilometers" value={12} />
              <Picker.Item label="15 Kilometers" value={15} />
              <Picker.Item label="18 Kilometers" value={18} />
              <Picker.Item label="20 Kilometers" value={20} />
              <Picker.Item label="25 Kilometers" value={25} />
              <Picker.Item label="30 Kilometers" value={30} />
            </Picker>
          </View>

          <Text style={styles.blankSpace} />
          <Text style={styles.blankSpace} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  topContentContainer: {
    paddingTop: 10,
    borderTopWidth: 0
  },
  contentContainer: {
    paddingTop: 10,
    borderTopColor: "#B0B0B0",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  blankSpace: {
    paddingTop: 50
  },
  devButton: {
    padding: 50,
    color: "#00A0E0"
  },
  bigText: {
    fontSize: 40,
    color: Colors.themeColor,
    textAlign: "center"
  },
  smallText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 15,
    marginBottom: 10,
    color: "#838383"
  },
  mediumText: {
    fontSize: 18,
    textAlign: "left",
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 30
  }
});
