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

/*
This class represents the Map page of the app. Along with rendering the map itself,
this component includes functions which trigger API calls to Google's Places and Routes
APIs. This allows the user to search for Points of Interest and be navigated to them by
the application.
*/
export default class MapScreen extends React.Component {
  static navigationOptions = AuthNavigationOptions.navigationOptions;

  //Creates a local state object which stores various Map, Places, and Routes values.
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      coords: {
        latitude: 45.4216,
        longitude: -75.6759
      },
      region: {
        latitude: 45.4216,
        longitude: -75.6759,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221
      },
      destination: "",
      placeResults: [],
      pointCoords: [
        {
          latitude: 45.4216,
          longitude: -75.6759
        }
      ],
      checkName: null,
      cancelName: null,
      destOpacity: 0
    };
    this.onChangeDestinationDB = _.debounce(this.onChangeDestination, 200);
  }

  //This hides the destination marker and the confirm/cancel buttons
  confirm() {
    this.setState({ destOpacity: 0, checkName: null, cancelName: null });
  }

  //Resets the zoom level and button states of the Map upon pressing the Cancel button
  cancel() {
    this.setState({
      destOpacity: 0,
      checkName: null,
      cancelName: null,
      pointCoords: [
        {
          latitude: 45.4216,
          longitude: -75.6759
        }
      ],
      region: {
        latitude: 45.4216,
        longitude: -75.6759,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0221
      }
    });
  }

  //Updates the region object of the local state to reflect the state of the Map.
  onRegionChange(region) {
    this.setState({ region: region });
  }

  //This function is responsible for making the Places API call and storing the place predictions in the local State.
  async onChangeDestination(destination) {
    this.setState({ destination });
    const apiCall = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${placeKey}&input=${destination}&location=${
      this.state.coords.latitude
    },${this.state.coords.longitude}&radius=3000`;
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
          this.state.coords.latitude
        },${
          this.state.coords.longitude
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
      this.map.fitToCoordinates(pointCoords);
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
            cancelName: "cancel"
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
          region={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}
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
            coordinate={this.state.coords}
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
            title="Live Data"
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
    paddingTop: 470,
    paddingHorizontal: 75
  }
});
