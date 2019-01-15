import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import NavigationOptions from "../components/MainNavigationOptions";
import UserMap from "../components/UserMap";
import UserChart from "../components/UserChart";
import Color from "../constants/Colors";

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
            <Text style={styles.titleText}>Map</Text>
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
              <View style = {styles.socialCard}>
                <Image
                  source={require("../assets/images/RyRy.jpg")}
                  style={styles.profilePicture}
                />
                <View style = {styles.socialText}>
                  <Text style = {styles.titleText2}> Rylan Deck</Text>
                  <Text style = {styles.subText}>       Daily Distance: </Text>
                  <Text style = {styles.subText}>       Weekly Distance: </Text>
                </View>
              </View>
              <View style = {styles.friendsContainer}>
                <Image
                  source={require("../assets/images/Alex.jpg")}
                  style={styles.friendPicture}
                />
                <Image
                  source={require("../assets/images/Ben.jpg")}
                  style={styles.friendPicture}
                />
                <Image
                  source={require("../assets/images/Rick.jpg")}
                  style={styles.friendPicture}
                />
              </View>
              <View style = {styles.blankSpace}></View>
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
    backgroundColor: "#FAFAFAFA"
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
  titleText2: {
    fontSize: 24,
    color: "#838383",
    textAlign: "left",
    paddingTop: 14
  },
  //This is just used as filler space for containers that don't have their content available yet.
  blankSpace: {
    paddingTop: 100
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  //This shouldn't work, but it does. Without this, map doesn't appear. Will be fixed soon.
  mapText: { height: 250 },
  profilePicture: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginVertical: 20,
    marginLeft: 15,
    borderRadius: 190,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  socialCard: {
    flexDirection: "row"
  },
  socialText: {
    flexDirection: "column",
    flex: 2
  },
  subText: {
    fontSize: 16,
    color: "#838383",
    paddingVertical: 4
  },
  friendsContainer:{
    flexDirection: 'row',
    height: 50,
    paddingVertical: 20
  },
  friendPicture: {
    width: 47,
    height: 47,
    resizeMode: "contain",
    marginHorizontal: 10,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
});
