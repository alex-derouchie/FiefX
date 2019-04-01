import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart } from "victory-native";
import { connect } from "react-redux";

//This component is responsible for rendering the User's distance travelled per day in graph format.
class WeeklyChart extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart width={350} domainPadding={16}>
          <VictoryBar
            data={[
              {
                day: "Mon",
                distance: this.props.profile.dailyDistances[0] * 1000
              },
              {
                day: "Tues",
                distance: this.props.profile.dailyDistances[1] * 1000
              },
              {
                day: "Wed",
                distance: this.props.profile.dailyDistances[2] * 1000
              },
              {
                day: "Thu",
                distance: this.props.profile.dailyDistances[3] * 1000
              },
              {
                day: "Fri",
                distance: this.props.profile.dailyDistances[4] * 1000
              },
              {
                day: "Sat",
                distance: this.props.profile.dailyDistances[5] * 1000
              },
              {
                day: "Sun",
                distance: this.props.profile.dailyDistances[6] * 1000
              }
            ]}
            x="day"
            y="distance"
            barRatio={0.7}
            style={{
              data: { fill: "#81d3ee" },
              axis: { stroke: "none" }
            }}
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});

//This data will be replaced with the User's data from the Firebase Server in the future.
// const data = [
//   { day: "Mon", distance: this.props.profile.dailydistances[0] * 1000 },
//   { day: "Tues", distance: 16500 },
//   { day: "Wed", distance: 14250 },
//   { day: "Thu", distance: 3500 },
//   { day: "Fri", distance: 5600 },
//   { day: "Sat", distance: 10500 },
//   { day: "Sun", distance: 13500 }
// ];

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(
  mapStateToProps,
  null
)(WeeklyChart);
