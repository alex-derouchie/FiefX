import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from "react-native";
import NavigationOptions from "../components/MainNavigationOptions";
import { connect } from "react-redux";
import UserMap from "../components/UserMap";

const markerLocation = {
  latitude: 45.4216,
  longitude: -75.6759
};

class LiveDataScreen extends React.Component {
  static navigationOptions = NavigationOptions.navigationOptions;

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <View style={styles.topContentContainer}>
            <View style={styles.container}>
              <Text style={styles.titleText}>Ground Speed</Text>
              <Text style={styles.speedText}>
                {" "}
                {this.props.bluetooth.speed} Km/h{" "}
              </Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.titleText}>Wheel Speed</Text>
              <Text style={styles.speedText}>
                {this.props.bluetooth.tachometer} RPM
              </Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Global Position</Text>
            <Text style={styles.bigText}>
              Lat: {this.props.bluetooth.coords.latitude}
              {"      "} Long: {this.props.bluetooth.coords.longitude}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Acceleration Data</Text>
            <Text style={styles.bigText}>
              X: {this.props.bluetooth.accelerometer.accelX}
              {"      "} Y: {this.props.bluetooth.accelerometer.accelY}
              {"      "} Z: {this.props.bluetooth.accelerometer.accelZ}
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Gyroscopic Data</Text>
            <Text style={styles.bigText}>
              X: {this.props.bluetooth.gyroscope.gyroX}
              {"      "} Y: {this.props.bluetooth.gyroscope.gyroY}
              {"      "} Z: {this.props.bluetooth.gyroscope.gyroZ}
            </Text>
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
          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>Map</Text>
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
    borderTopWidth: 0,
    flexDirection: "row"
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
    paddingVertical: 9,
    paddingHorizontal: 14
  },
  bigText: {
    fontSize: 30,
    color: "#535353",
    textAlign: "center",
    paddingVertical: 14,
    paddingHorizontal: 14
  },
  speedText: {
    fontSize: 36,
    color: "#535353",
    textAlign: "center",
    paddingVertical: 14,
    paddingHorizontal: 14
  },
  button: { padding: 35 },
  blankSpace: {
    padding: 120
  }
});

function mapStateToProps(state) {
  return {
    bluetooth: state.bluetooth,
    settings: state.settings
  };
}

export default connect(
  mapStateToProps,
  null
)(LiveDataScreen);
