import React from "react";
import { Image, View, StyleSheet } from "react-native";

export default class NavigationOptions extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <View style={styles.container}>
        {/*The LockIcon Views balance the flex while allowing for a lock icon (or any other icon) to be displayed on either edge of the navigation bar in the future.*/}
        <View style={styles.lockIcon} />
        <View style={styles.logo}>
          <Image
            source={require("../assets/images/FiefX.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.lockIcon} />
      </View>
    )
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    maxHeight: "9%",
    elevation: 100
  },
  logo: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  lockIcon: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginTop: 3,
    marginBottom: 2
  }
});
