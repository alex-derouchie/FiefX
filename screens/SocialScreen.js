import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import NavigationOptions from "../components/MainNavigationOptions";
import {VictoryPie} from 'victory-native';

/*
This class represents the Social page of the app. It displays primitive information about
the user, mainly the information that is visible to the users' friends, as well as displaying
the same type of data corresponding to the users' added friends. This is the Users' hub to
of the app's social features.
*/
export default class SocialScreen extends React.Component {
  static navigationOptions = NavigationOptions.navigationOptions;

  //In the future, the majority of the data being displayed in the app will come from the
  //database, but for now, mostly placeholders.0
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/RyRy.jpg")}
              style={styles.profilePicture}
            />
          </View>

          <Text style={styles.userName}>Rylan Deck</Text>
          <View style={styles.contentContainer}>
            <VictoryPie
            innerRadius={90}
            radius={105}
            colorScale={["#81d3ee", "#B0B0B0", "blue" ]}
             data={[
                { x: 1, y: 2, label: "Monday"},
                { x: 2, y: 3, label: "Tuesday"},
                { x: 3, y: 5, label: "Wednesday"}
              ]}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.containerTitle}>Friends</Text>
            <Text style={styles.smallText}>There are no friends</Text>
            <Text style={styles.blankSpace} />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.containerTitle}>Milestones/Achievements</Text>
            <Text style={styles.blankSpace} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#FAFAFA"
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  contentContainer: {
    borderTopColor: "#B0B0B0",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  profilePicture: {
    width: 125,
    height: 125,
    resizeMode: "contain",
    marginTop: 35,
    marginLeft: -10,
    borderRadius: 250,
    alignItems: "center",
    justifyContent: "center"
  },
  userName: {
    textAlign: "center",
    color: "#81d3ee",
    fontSize: 28,
    marginBottom: 20
  },
  containerTitle: {
    textAlign: "center",
    color: "#a1a1a1",
    fontSize: 22
  },
  blankSpace: {
    paddingTop: 200
  },
  smallText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 12,
    marginBottom: 12
  }
});
