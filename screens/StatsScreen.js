import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import NavigationOptions from "../components/MainNavigationOptions";
import UserChart from "../components/UserChart";

/*
This class represents the Analytics/Statistics page of the app. Currently,
there are a lot of placeholders, but there is a basic Victory-native component
currently displayed, to show what the data being displayed will look like in
the future.
*/
export default class StatsScreen extends React.Component {
  static navigationOptions = NavigationOptions.navigationOptions;

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.topContentContainer}>
            <Text style={styles.titleText}>This Week</Text>
            <UserChart />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Today</Text>
            <Text style={styles.blankSpace} />
          </View>

          <View style={styles.contentContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Map")}
            >
              <Text style={styles.titleText}>Map View</Text>
              <Text style={styles.blankSpace} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
  titleText: {
    fontSize: 24,
    color: "#838383",
    textAlign: "center",
    paddingVertical: 14,
    paddingHorizontal: 14
  },
  blankSpace: {
    paddingTop: 200
  }
});
