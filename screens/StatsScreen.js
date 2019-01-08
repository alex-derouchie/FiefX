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
import UserMap from "../components/UserMap";
import * as Progress from 'react-native-progress';

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
            <View style={styles.todayStyle}>
              <View style={styles.pieBox}>
                <Progress.Pie progress={0.8} color="#33FF11" size={150}/>
              </View>
              <View style={styles.todayTextBox}>
                <Text style={styles.todayText1}> Distance Goal: 10km</Text>
                <Text style={styles.todayText1}> Progress: 8km</Text>
              </View>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Map View</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Map")}
            >
              <Text style={styles.blankSpace}></Text>
              <UserMap/>
            </TouchableOpacity>
            <Text style={styles.blankSpace}/>
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
  todayStyle:{
    padding: 15,
    flexDirection:'row'
  },
  todayText1:{
    textAlign: "left",
    color: "#a1a1a1",
    fontSize: 18,
  },
  todayText2:{
    textAlign: "left",
    color: "#a1a1a1",
    fontSize: 14,
  },
  todayTextBox:{
    flexDirection:'column',
    flex:4
  },
  pieBox:{
    flex:3,
    padding:5
  }
});
