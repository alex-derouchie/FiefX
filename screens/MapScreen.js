import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
  Keyboard,
  TouchableOpacity,
  Button
} from "react-native";
import AuthNavigationOptions from "../components/AuthNavigationOptions";
import MapView, { Polyline } from "react-native-maps";
import placeKey from "../constants/places_api_key";
import routeKey from "../constants/routes_api_key";
import _ from "lodash";
import PolyLine from "@mapbox/polyline";
import Color from "../constants/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { collectData } from "../src/actions/index";

/*
This class represents the Map page of the app. Along with rendering the map itself,
this component includes functions which trigger API calls to Google's Places and Routes
APIs. This allows the user to search for Points of Interest and be navigated to them by
the application.
*/
class MapScreen extends React.Component {
  static navigationOptions = AuthNavigationOptions.navigationOptions;

  //Creates a local state object which stores various Map, Places, and Routes values.
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      coords: {
        latitude: this.props.bluetooth.coords.latitude,
        longitude: this.props.bluetooth.coords.longitude
      },
      region: {
        latitude: this.props.bluetooth.coords.latitude,
        longitude: this.props.bluetooth.coords.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221
      },
      destination: "",
      placeResults: [],
      pointCoords: [
        {
          latitude: this.props.bluetooth.coords.latitude,
          longitude: this.props.bluetooth.coords.longitude
        }
      ],
      checkName: null,
      cancelName: null,
      destOpacity: 0,
      isNavigating: false,
      firstNav: true,
      placeID: "",
      mainText: ""
    };
    this.onChangeDestinationDB = _.debounce(this.onChangeDestination, 200);
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.profile.collectingData) {
        console.log("Executing");
        // this.setState({
        //   pointCoords: [
        //     {
        //       latitude: this.props.bluetooth.coords.latitude,
        //       longitude: this.props.bluetooth.coords.longitude
        //     }
        //   ]
        // });
        this.getRoute(this.state.placeID, this.state.mainText);
      }
    }, 750);
  }

  //This hides the destination marker and the confirm/cancel buttons
  confirm() {
    this.props.collectData(true);
    this.setState({ destOpacity: 0, checkName: null, isNavigating: true });
  }

  //Resets the zoom level and button states of the Map upon pressing the Cancel button
  cancel() {
    this.props.collectData(false);
    this.setState({
      destOpacity: 0,
      checkName: null,
      cancelName: null,
      pointCoords: [
        {
          latitude: this.props.bluetooth.coords.latitude,
          longitude: this.props.bluetooth.coords.longitude
        }
      ],
      isNavigating: false,
      firstNav: true
    });
  }

  //This function is responsible for making the Places API call and storing the place predictions in the local State.
  async onChangeDestination(destination) {
    console.log("Dest. Change.");
    this.setState({ destination });
    const apiCall = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${placeKey}&input=${destination}&location=${
      this.props.bluetooth.coords.latitude
    },${this.props.bluetooth.coords.longitude}&radius=3000`;
    try {
      const destResults = await fetch(apiCall);
      const resultsJson = await destResults.json();
      this.setState({
        placeResults: resultsJson.predictions
      });
    } catch (err) {
      console.error(err);
    }
  }

  //This function calls the Routes API to get a Polyline object representing the Route from the users'
  //current location to the place selected by the user.
  async getRoute(placeID, newDest) {
    try {
      const routeResult = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${
          this.props.bluetooth.coords.latitude
        },${
          this.props.bluetooth.coords.longitude
        }&destination=place_id:${placeID}&key=AIzaSyC9W1-LE3WBzlJQPRzFf-GTYw6C1QAMvJc`
      );
      const routeJson = await routeResult.json();
      const points = PolyLine.decode(
        routeJson.routes[0].overview_polyline.points
      );
      const pointCoords = points.map(point => {
        return { latitude: point[0], longitude: point[1] };
      });
      this.setState({ pointCoords, placeResults: [], destination: newDest });
      Keyboard.dismiss();
      if (this.state.firstNav) {
        this.setState({ firstNav: false });
        this.map.fitToCoordinates(pointCoords);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    //this const displays all the results of the Places API call
    //as a list where the user can select the desired location
    const predictions = this.state.placeResults.map(prediction => (
      <TouchableHighlight
        key={prediction.id}
        onPress={() => {
          this.getRoute(
            prediction.place_id,
            prediction.structured_formatting.main_text
          );
          this.setState({
            destOpacity: 100,
            checkName: "check",
            cancelName: "cancel",
            placeID: prediction.place_id,
            mainText: prediction.structured_formatting.main_text
          });
        }}
      >
        <View>
          <Text style={styles.resultsText}>{prediction.description}</Text>
        </View>
      </TouchableHighlight>
    ));

    return (
      <View style={styles.container}>
        <MapView
          ref={map => {
            this.map = map;
          }}
          style={styles.map}
          initialRegion={this.state.region}
          //onRegionChange={region => this.onRegionChange(region)}
          showsCompass={true}
          toolbarEnabled={true}
          loadingEnabled={true}
        >
          <Polyline
            coordinates={this.state.pointCoords}
            strokeWidth={4}
            strokeColor={Color.themeColor}
          />
          <MapView.Marker
            coordinate={this.props.bluetooth.coords}
            opacity={0.7}
            image={require("../assets/images/Bike.png")}
          />
          <MapView.Marker
            coordinate={
              this.state.pointCoords[this.state.pointCoords.length - 1]
            }
            opacity={this.state.destOpacity}
          />
        </MapView>
        <TextInput
          style={styles.inputField}
          placeholder="Enter Destination"
          value={this.state.destination}
          onChangeText={destination => {
            this.onChangeDestinationDB(destination);
            this.setState({ destination });
          }}
        />
        <View style={styles.button}>
          <Button
            title="            Live Data            "
            onPress={() => this.props.navigation.navigate("LiveData")}
          />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={() => this.confirm()}>
            <Icon name={this.state.checkName} size={36} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.cancel()}>
            <Icon name={this.state.cancelName} size={36} color={"#000"} />
          </TouchableOpacity>
        </View>
        {predictions}
      </View>
    );
  }
}

//Styling and formatting
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  inputField: {
    marginHorizontal: 5,
    marginTop: 5,
    height: 40,
    paddingHorizontal: 5,
    backgroundColor: "#FAFAFAFA",
    borderWidth: 0.5
  },
  resultsText: {
    backgroundColor: "#FAFAFAFA",
    padding: 5,
    fontSize: 16,
    borderWidth: 0.5,
    marginHorizontal: 5
  },
  bottomContainer: {
    position: "absolute",
    bottom: 16,
    right: 16
  },
  button: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 50
  }
});

//Redux functions

function mapStateToProps(state) {
  return {
    bluetooth: state.bluetooth,
    settings: state.settings,
    profile: state.profile
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ collectData: collectData }, dispatch);
}

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(MapScreen);
