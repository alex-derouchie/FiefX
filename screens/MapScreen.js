import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
  Keyboard,
  Marker
} from "react-native";
import AuthNavigationOptions from "../components/AuthNavigationOptions";
import MapView, { Polyline } from "react-native-maps";
import placeKey from "../constants/places_api_key";
import routeKey from "../constants/routes_api_key";
import _ from "lodash";
import PolyLine from "@mapbox/polyline";
import Color from "../constants/Colors";

/*
This class represents the Map page of the app. It is mainly
a shell that renders the UserMap component which is where the MapView
component is initialized.
*/
export default class MapScreen extends React.Component {
  static navigationOptions = AuthNavigationOptions.navigationOptions;

  constructor(props) {
    super(props);
    this.state = {
      error: "",
      coords: {
        latitude: 45.4216,
        longitude: -75.6759
      },
      destination: "",
      placeResults: [],
      pointCoords: []
    };
    this.onChangeDestinationDB = _.debounce(this.onChangeDestination, 200);
  }

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
    const predictions = this.state.placeResults.map(prediction => (
      <TouchableHighlight
        key={prediction.id}
        onPress={() =>
          this.getRoute(
            prediction.place_id,
            prediction.structured_formatting.main_text
          )
        }
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
          initialRegion={{
            latitude: this.state.coords.latitude,
            longitude: this.state.coords.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221
          }}
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
        {predictions}
      </View>
    );
  }
}

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
  }
});
