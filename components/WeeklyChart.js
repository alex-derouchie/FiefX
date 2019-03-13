import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart } from "victory-native";

//This data will be replaced with the User's data from the Firebase Server in the future.
const data = [
  { day: "Mon", distance: 13000 },
  { day: "Tues", distance: 16500 },
  { day: "Wed", distance: 14250 },
  { day: "Thu", distance: 3500 },
  { day: "Fri", distance: 5600 },
  { day: "Sat", distance: 10500 },
  { day: "Sun", distance: 13500 }
];

//This component is responsible for rendering the User's distance travelled per day in graph format.
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart width={350} domainPadding={16}>
          <VictoryBar
            data={data}
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
