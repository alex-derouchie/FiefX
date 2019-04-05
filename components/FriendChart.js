import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart } from "victory-native";
import { connect } from "react-redux";

/*****************************************************************************************
 * This component is responsible for rendering the graph which displays the current users'
 * distance data compared to the distance data of the current users' friends.
 *****************************************************************************************/
class FriendChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendDistances: []
    };
  }

  componentWillMount() {
    if (this.props.profile.profileName == "Alex Derouchie") {
      this.setState({ friendDistances: this.props.profile.friendDistances });
    } else {
      this.setState({ friendDistances: [0, 0, 0, 0] });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <VictoryChart width={350} domainPadding={16}>
          <VictoryBar
            data={[
              {
                friend: "Ken",
                distance: this.state.friendDistances[0] * 1000
              },
              {
                friend: "Rylan",
                distance: this.state.friendDistances[1] * 1000
              },
              {
                friend: "Ben",
                distance: this.state.friendDistances[2] * 1000
              },
              {
                friend: "Alex",
                distance: this.state.friendDistances[3] * 1000
              }
            ]}
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

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default connect(
  mapStateToProps,
  null
)(FriendChart);
