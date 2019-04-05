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
  static navigationOptions = NavigationOptions.navigationOptions;

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      profilePic: require("../assets/images/profilePic.png"),
      dailyDistance: 0,
      weeklyDistance: 0
    };
  }

  componentWillMount() {
    if (this.props.profile.profileName == "Alex Derouchie") {
      this.setState({
        profilePic: require("../assets/images/Alex.jpg"),
        dailyDistance: this.props.profile.dailyDistances[4],
        weeklyDistance: this.props.profile.weeklyDistance
      });
    }
  }

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
          <View style={styles.topContentContainer}>
            <View style={styles.container}>
              <Text style={styles.text}>
                {"Age: "}
                {this.props.firebase.age}
              </Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.text}>
                {"Tire Size: "}
                {this.props.firebase.tireSize}
              </Text>
            </View>
          </View>
          <View style={styles.topContentContainer}>
            <View style={styles.container}>
              <Text style={styles.text}>
                {"City: "}
                {this.props.firebase.city}
              </Text>
            </View>
          </View>
          <View style={styles.topContentContainer}>
            <View style={styles.container}>
              <Text style={styles.text}>
                {"  "}
                Distance (Today): {this.state.dailyDistance} Km
              </Text>
            </View>
          </View>
          <View style={styles.topContentContainer}>
            <View style={styles.container}>
              <Text style={styles.text}>
                {"  "}
                Distance (This Week): {this.state.weeklyDistance} Km
              </Text>
            </View>
          </View>
          <View style={styles.topContentContainer}>
            <View style={styles.container}>
              <Text style={styles.text}>
                {" "}
                Distance Goal: {this.props.settings.dailyGoal * 7} Km
              </Text>
            </View>
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
    flexDirection: "row"
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
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
    color: Colors.themeColor,
    fontSize: 28,
    marginBottom: 20
  },
  text: {
    fontSize: 28,
    color: "#535353",
    textAlign: "center"
  }
});

//Redux Functions

function mapStateToProps(state) {
  return {
    profile: state.profile,
    firebase: state.firebase,
    settings: state.settings
  };
}

export default connect(
  mapStateToProps,
  null
)(ProfileScreen);
