import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

//This data will be replaced with the User's data from the Firebase Server in the future.
const data = [
  { day: "Monday", distance: 13000 },
  { day: "Tuesday", distance: 16500 },
  { day: "Wednesday", distance: 14250 },
  { day: "Thursday", distance: 3500 }
];

//This component is responsible for rendering the User's distance travelled per day in graph format.
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="day" y="distance" />
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
