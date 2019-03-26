import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import NavigationOptions from "../components/MainNavigationOptions";
import { VictoryPie } from "victory-native";
import * as Progress from "react-native-progress";
import Colors from "../constants/Colors";
import { connect } from "react-redux";

/*
This class represents the profile page of the app. It displays information about
the user's friends, such as weekly travel distances, achievements, recent activity
and more. 
*/
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  static navigationOptions = NavigationOptions.navigationOptions;

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/Alex.jpg")}
              style={styles.profilePicture}
            />
          </View>

          <Text style={styles.userName}>{this.props.profile.profileName}</Text>
          <View style={styles.contentContainer}>
            <VictoryPie
              innerRadius={90}
              radius={105}
              colorScale={[Colors.themeColor, "#B0B0B0", "blue"]}
              data={[
                { x: 1, y: 2, label: "Monday" },
                { x: 2, y: 3, label: "Tuesday" },
                { x: 3, y: 5, label: "Wednesday" }
              ]}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.containerTitle}> Mutual Friends</Text>
            <View style={styles.friendsContainer}>
              <Image
                source={require("../assets/images/Ben.jpg")}
                style={styles.friendPicture}
              />
              <View style={styles.friendTextBox}>
                <Text style={styles.friendText1}>Ben Kluge</Text>
                <Text style={styles.friendText2}> Distance: </Text>
              </View>
            </View>
            <View style={styles.friendsContainer}>
              <Image
                source={require("../assets/images/Rick.jpg")}
                style={styles.friendPicture}
              />
              <View style={styles.friendTextBox}>
                <Text style={styles.friendText1}>Rick Astley</Text>
                <Text style={styles.friendText2}> Distance: </Text>
              </View>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.containerTitle}>Milestones/Achievements</Text>
            <View style={styles.achievementBox}>
              <Text style={styles.achievementText}>
                {" "}
                Travel 10000 Kilometers
              </Text>
              <Progress.Bar
                progress={this.props.profile.achievements[0]}
                color={Colors.themeColor}
              />
            </View>
            <View style={styles.achievementBox}>
              <Text style={styles.achievementText}>
                {" "}
                Travel 10 Kilometers in one day
              </Text>
              <Progress.Bar
                progress={this.props.profile.achievements[1]}
                color={Colors.themeColor}
              />
            </View>
            <View style={styles.achievementBox}>
              <Text style={styles.achievementText}> Travel for one hour</Text>
              <Progress.Bar
                progress={this.props.profile.achievements[2]}
                color={Colors.themeColor}
              />
            </View>
            <View style={styles.achievementBox}>
              <Text style={styles.achievementText}>
                {" "}
                Travel in a different city
              </Text>
              <Progress.Bar
                progress={this.props.profile.achievements[3]}
                color="#00FF88"
              />
            </View>
            <View style={styles.blankSpace} />
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
  friendPicture: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 2000,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 25,
    flex: 1
  },
  userName: {
    textAlign: "center",
    color: Colors.themeColor,
    fontSize: 28,
    marginBottom: 20
  },
  containerTitle: {
    textAlign: "center",
    color: "#a1a1a1",
    fontSize: 22,
    paddingVertical: 5
  },
  friendText1: {
    textAlign: "left",
    color: "#a1a1a1",
    fontSize: 18
  },
  friendText2: {
    textAlign: "left",
    color: "#a1a1a1",
    fontSize: 14
  },
  achievementText: {
    textAlign: "left",
    color: "#a1a1a1",
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 17
  },
  achievementBox: {
    padding: 10
  },
  blankSpace: {
    paddingTop: 200
  },
  smallText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 12,
    marginBottom: 12
  },
  friendsContainer: {
    flexDirection: "row",
    padding: 10
  },
  friendTextBox: {
    flexDirection: "column",
    paddingHorizontal: 20,
    flex: 2
  }
});

//Redux Functions

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(
  mapStateToProps,
  null
)(ProfileScreen);
