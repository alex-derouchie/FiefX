import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert
} from "react-native";
import NavigationOptions from "../components/MainNavigationOptions";
import WeeklyChart from "../components/WeeklyChart";
import UserMap from "../components/UserMap";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";
import FriendChart from "../components/FriendChart";

/*
This class represents the Analytics/Statistics page of the app.
*/
class StatsScreen extends React.Component {
  static navigationOptions = NavigationOptions.navigationOptions;

  constructor(props) {
    super(props);
    this.state = {
      dailyDistance: 0
    };
  }

  componentDidMount() {
    if (this.props.profile.profileName == "Alex Derouchie") {
      this.setState({
        dailyDistance: this.props.profile.dailyDistances[4]
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.topContentContainer}>
            <Text style={styles.titleText}>This Week</Text>
            <WeeklyChart />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Today</Text>
            <View style={styles.todayStyle}>
              <View style={styles.pieBox}>
                <Progress.Pie
                  progress={
                    this.state.dailyDistance / this.props.settings.dailyGoal
                  }
                  color="#33FF11"
                  size={150}
                />
              </View>
              <View style={styles.todayTextBox}>
                <Text style={styles.todayText1}>
                  {" "}
                  Distance Goal: {this.props.settings.dailyGoal} Km
                </Text>
                <Text style={styles.todayText1}>
                  {" "}
                  Progress: {this.state.dailyDistance} Km
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Friends</Text>
            <FriendChart />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.button}>
              <Button
                title="Live Data"
                onPress={() => {
                  Alert.alert(
                    "Are you sure?",
                    "Viewing data in real time will significantly reduce the battery life of your device.",
                    [
                      { text: "Cancel" },
                      {
                        text: "View Live",
                        onPress: () =>
                          this.props.navigation.navigate("LiveData")
                      }
                    ],
                    { cancelable: false }
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Map View</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Map")}
            >
              <Text style={styles.blankSpace} />
              <UserMap />
            </TouchableOpacity>
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
    paddingTop: 300
  },
  todayStyle: {
    padding: 15,
    flexDirection: "row"
  },
  todayText1: {
    textAlign: "left",
    color: "#a1a1a1",
    fontSize: 18
  },
  todayText2: {
    textAlign: "left",
    color: "#a1a1a1",
    fontSize: 14
  },
  todayTextBox: {
    flexDirection: "column",
    flex: 4
  },
  pieBox: {
    flex: 3,
    padding: 5
  },
  button: { padding: 35 }
});

//Redux Functions

function mapStateToProps(state) {
  return {
    profile: state.profile,
    settings: state.settings
  };
}

export default connect(
  mapStateToProps,
  null
)(StatsScreen);
