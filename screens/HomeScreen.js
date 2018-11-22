import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import NavigationOptions from "../components/MainNavigationOptions";
import UserMap from "../components/UserMap";
import UserChart from "../components/UserChart";

/*
This class represents the Home page of the app. It is mainly
responsible for initiating the components of the page and applying styling to them.
*/
export default class HomeScreen extends React.Component {
  //This Object represents the top bar across the app and
  //handles the components and styling contained within the bar.
  static navigationOptions = NavigationOptions.navigationOptions;

  //Main body of the Home page
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.topContentContainer}
        >
          <View style={styles.topContentContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Map")}
            >
              <Text style={styles.mapText}>Map</Text>
              <UserMap />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Stats")}
            >
              <Text style={styles.titleText}>History</Text>
              <UserChart />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Social")}
            >
              <Text style={styles.titleText}>Social</Text>
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
    borderTopWidth: 0,
    backgroundColor: "#DDDDDD"
  },
  contentContainer: {
    paddingTop: 10,
    borderTopColor: "#B0B0B0",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  titleText: {
    fontSize: 24,
    color: "#838383",
    textAlign: "left",
    paddingVertical: 14,
    paddingHorizontal: 14
  },
  //This is just used as filler space for containers that don't have their content available yet.
  blankSpace: {
    paddingTop: 200
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  //This shouldn't work, but it does. Without this, map doesn't appear. Will be fixed soon.
  mapText: { height: 250 }
});
