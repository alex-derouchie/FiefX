import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import NavigationOptions from "../components/MainNavigationOptions";
import WeeklyChart from "../components/WeeklyChart";
import { connect } from "react-redux";
import MapView from "react-native-maps";

/*
This is the React Component representing the HomeScreen of the application.
All of the rendered components are expressed in JSX within the return function.
*/
class HomeScreen extends React.Component {
  //This Object represents the top bar across the app and
  //handles the components and styling contained within the bar.
  static navigationOptions = NavigationOptions.navigationOptions;

  //Main body of the Home page
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.topContentContainer}
        >
          <View style={styles.topContentContainer}>
            <Text style={styles.titleText}>Map</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Map")}
            >
              <Text style={styles.mapText}>Map</Text>
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: 45.4216,
                    longitude: -75.6759,
                    latitudeDelta: 0.0422,
                    longitudeDelta: 0.0221
                  }}
                  showsCompass={true}
                  toolbarEnabled={true}
                  loadingEnabled={true}
                >
                  <MapView.Marker
                    coordinate={markerLocation}
                    opacity={0.7}
                    image={require("../assets/images/Bike.png")}
                  />
                </MapView>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Stats")}
            >
              <Text style={styles.titleText}>History</Text>
              <WeeklyChart />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Social")}
            >
              <View style={styles.socialCard}>
                <Image
                  source={require("../assets/images/RyRy.jpg")}
                  style={styles.profilePicture}
                />
                <View style={styles.socialText}>
                  <Text style={styles.titleText2}> Rylan Deck</Text>
                  <Text style={styles.subText}>
                    {"       Daily Distance: "}{" "}
                    {this.props.profile.dailyDistances[5]} {"Km"}
                  </Text>
                  <Text style={styles.subText}>
                    {"       Weekly Distance: "}{" "}
                    {this.props.profile.weeklyDistance} {"Km"}
                  </Text>
                </View>
              </View>
              <View style={styles.friendsContainer}>
                <Image
                  source={require("../assets/images/Alex.jpg")}
                  style={styles.friendPicture}
                />
                <Image
                  source={require("../assets/images/Ben.jpg")}
                  style={styles.friendPicture}
                />
                <Image
                  source={require("../assets/images/Rick.jpg")}
                  style={styles.friendPicture}
                />
              </View>
              <View style={styles.blankSpace} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const markerLocation = {
  latitude: 45.4216,
  longitude: -75.6759
};

//Styling and formatting
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  topContentContainer: {
    paddingTop: 10,
    borderTopWidth: 0,
    backgroundColor: "#FAFAFAFA"
  },
  contentContainer: {
    paddingTop: 10,
    borderTopColor: "#B0B0B0",
    borderTopWidth: StyleSheet.hairlineWidth
  },
  titleText: {
    fontSize: 24,
    color: "#838383",
    textAlign: "left",
    paddingVertical: 14,
    paddingHorizontal: 14
  },
  titleText2: {
    fontSize: 24,
    color: "#838383",
    textAlign: "left",
    paddingTop: 14
  },
  //This is just used as filler space for containers that don't have their content available yet.
  blankSpace: {
    paddingTop: 100
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  //This shouldn't work, but it does. Without this, map doesn't appear. Will be fixed soon.
  mapText: { height: 250 },
  profilePicture: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginVertical: 20,
    marginLeft: 15,
    borderRadius: 190,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  socialCard: {
    flexDirection: "row"
  },
  socialText: {
    flexDirection: "column",
    flex: 2
  },
  subText: {
    fontSize: 16,
    color: "#838383",
    paddingVertical: 4
  },
  friendsContainer: {
    flexDirection: "row",
    height: 50,
    paddingVertical: 20
  },
  friendPicture: {
    width: 47,
    height: 47,
    resizeMode: "contain",
    marginHorizontal: 10,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center"
  }
});

//Redux function responsible for assigning the state in the root index.js to this.props
function mapStateToProps(state) {
  return {
    profile: state.profile //access ProfileReducer from this.props.profile
  };
}

//Redux function which exports a version of HomeScreen with the State mapped to it (see mapStateToProps)
//Second argument is null, indicating no actions are being done to reducers within the HomeScreen.
export default connect(
  mapStateToProps,
  null
)(HomeScreen);
