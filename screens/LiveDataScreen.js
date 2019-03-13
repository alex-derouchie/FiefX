import React from "react";
import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import NavigationOptions from "../components/MainNavigationOptions";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";

class LiveDataScreen extends React.Component {
  static navigationOptions = NavigationOptions.navigationOptions;

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.topContentContainer}>
            <Text style={styles.titleText}>Today</Text>
            <View style={styles.todayStyle}>
              <View style={styles.pieBox}>
                <Progress.Pie
                  progress={this.props.profile.dailyGoals[5]}
                  color="#33FF11"
                  size={150}
                />
              </View>
              <View style={styles.todayTextBox}>
                <Text style={styles.todayText1}> Distance Goal: 5 Km</Text>
                <Text style={styles.todayText1}>
                  {" "}
                  Progress: {this.props.profile.dailyDistances[5]} Km
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.button}>
              <Button
                title="Statistics"
                onPress={() => {
                  this.props.navigation.navigate("Stats");
                }}
              />
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
    borderTopWidth: 0
  },
  contentContainer: {
    paddingVertical: 10,
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
  todayStyle: {
    padding: 15,
    flexDirection: "row"
  },
  todayText1: {
    textAlign: "left",
    color: "#a1a1a1",
    fontSize: 18
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

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(
  mapStateToProps,
  null
)(LiveDataScreen);
