import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart } from "victory-native";

//This data will be replaced with the User's data from the Firebase Server in the future.
const data = [
  { friend: "Alex", distance: 16500 },
  { friend: "Ben", distance: 13000 },
  { friend: "Rylan", distance: 14250 },
  { friend: "Ken", distance: 10000 }
];

//This component is responsible for rendering the User's distance travelled per day in graph format.
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart width={350} domainPadding={16}>
          <VictoryBar
            data={data}
            y="distance"
            x="friend"
            barRatio={0.7}
            style={{
              data: { fill: "#81d3ee" },
              axis: { stroke: "none" }
            }}
            horizontal={true}
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
