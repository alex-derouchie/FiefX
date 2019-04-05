import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart } from "victory-native";
import { connect } from "react-redux";

//This component is responsible for rendering the User's distance travelled per day in graph format.
class WeeklyChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyDistances: [0, 0, 0, 0, 0, 0, 0]
    };
  }

  //This is a placeholder to display what the app will look like upon initial login vs. when data has been collected.
  componentWillMount() {
    setTimeout(() => {
      if (this.props.profile.profileName == "Alex Derouchie") {
        this.setState({ dailyDistances: this.props.profile.dailyDistances });
      } else {
        this.setState({ dailyDistances: [0, 0, 0, 0, 0, 0, 0] });
      }
    }, 250);
  }

  render() {
    return (
      <View style={styles.container}>
        <VictoryChart width={350} domainPadding={16}>
          <VictoryBar
            data={[
              {
                day: "Mon",
                distance: this.state.dailyDistances[0] * 1000
              },
              {
                day: "Tues",
                distance: this.state.dailyDistances[1] * 1000
              },
              {
                day: "Wed",
                distance: this.state.dailyDistances[2] * 1000
              },
              {
                day: "Thu",
                distance: this.state.dailyDistances[3] * 1000
              },
              {
                day: "Fri",
                distance: this.state.dailyDistances[4] * 1000
              },
              {
                day: "Sat",
                distance: this.state.dailyDistances[5] * 1000
              },
              {
                day: "Sun",
                distance: this.state.dailyDistances[6] * 1000
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
